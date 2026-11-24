import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export const RANKING_COLLECTION = 'ranking';

// Synchronized verbatim with firebase-blueprint.json & firestore.rules
export const RANKING_CONSTRAINTS = {
  NOME_MIN_LENGTH: 2,
  NOME_MAX_LENGTH: 40,
  MAX_PONTUACAO: 100000000,
  TOP_LIMIT: 10,
} as const;

export interface RankingEntry {
  id: string;
  nome: string;
  pontuacao: number;
  criadoEm: Timestamp | null;
  createdAtMs: number;
  isPendingTimestamp: boolean;
}

export interface RankingSnapshotResult {
  topEntries: RankingEntry[];
  totalFetched: number;
  tiedScores: Set<number>;
}

export interface RankingValidationResult {
  valid: boolean;
  nome: string;
  pontuacao: number;
  error?: string;
}

export function validateRankingInput(
  rawNome: string,
  rawPontuacao: number | string
): RankingValidationResult {
  const nome = rawNome.trim();
  if (nome.length < RANKING_CONSTRAINTS.NOME_MIN_LENGTH || nome.length > RANKING_CONSTRAINTS.NOME_MAX_LENGTH) {
    return {
      valid: false,
      nome,
      pontuacao: 0,
      error: `O nome deve ter entre ${RANKING_CONSTRAINTS.NOME_MIN_LENGTH} e ${RANKING_CONSTRAINTS.NOME_MAX_LENGTH} caracteres.`,
    };
  }

  const pontuacao = typeof rawPontuacao === 'number' ? rawPontuacao : Number(String(rawPontuacao).replace(',', '.'));
  if (!Number.isFinite(pontuacao) || pontuacao <= 0) {
    return {
      valid: false,
      nome,
      pontuacao: 0,
      error: 'A pontuação deve ser um número positivo maior que zero.',
    };
  }

  if (pontuacao > RANKING_CONSTRAINTS.MAX_PONTUACAO) {
    return {
      valid: false,
      nome,
      pontuacao,
      error: `A pontuação máxima permitida é ${RANKING_CONSTRAINTS.MAX_PONTUACAO.toLocaleString('pt-BR')}.`,
    };
  }

  return { valid: true, nome, pontuacao };
}

export async function addRankingPlayer(rawNome: string, rawPontuacao: number | string): Promise<string> {
  const validation = validateRankingInput(rawNome, rawPontuacao);
  if (!validation.valid) {
    throw new Error(validation.error || 'Dados inválidos para o ranking.');
  }

  try {
    const docRef = await addDoc(collection(db, RANKING_COLLECTION), {
      nome: validation.nome,
      pontuacao: validation.pontuacao,
      criadoEm: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, RANKING_COLLECTION);
  }
}

export function subscribeToTopRanking(
  onData: (result: RankingSnapshotResult) => void,
  onError: (err: Error) => void
): Unsubscribe {
  // Single-field orderBy avoids composite index requirement while letting us apply deterministic
  // tie-breaking (earlier criadoEm first) across top candidates before slicing Top 10.
  const rankingQuery = query(
    collection(db, RANKING_COLLECTION),
    orderBy('pontuacao', 'desc'),
    limit(100)
  );

  return onSnapshot(
    rankingQuery,
    (snapshot) => {
      const entries: RankingEntry[] = [];

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const nome = typeof data.nome === 'string' ? data.nome : '';
        const pontuacao = typeof data.pontuacao === 'number' && Number.isFinite(data.pontuacao) ? data.pontuacao : 0;
        const criadoEm = data.criadoEm instanceof Timestamp ? data.criadoEm : null;
        const isPendingTimestamp = criadoEm === null;
        const createdAtMs = criadoEm ? criadoEm.toMillis() : Date.now();

        if (nome && pontuacao > 0) {
          entries.push({
            id: docSnap.id,
            nome,
            pontuacao,
            criadoEm,
            createdAtMs,
            isPendingTimestamp,
          });
        }
      });

      // Primary: highest score first.
      // Tie-breaker: whoever reached the score first (smallest criadoEm timestamp) stays ahead.
      entries.sort((a, b) => {
        if (b.pontuacao !== a.pontuacao) {
          return b.pontuacao - a.pontuacao;
        }
        if (a.createdAtMs !== b.createdAtMs) {
          return a.createdAtMs - b.createdAtMs;
        }
        return a.id.localeCompare(b.id);
      });

      const topEntries = entries.slice(0, RANKING_CONSTRAINTS.TOP_LIMIT);

      const scoreCounts = new Map<number, number>();
      topEntries.forEach((entry) => {
        scoreCounts.set(entry.pontuacao, (scoreCounts.get(entry.pontuacao) || 0) + 1);
      });

      const tiedScores = new Set<number>();
      scoreCounts.forEach((count, score) => {
        if (count > 1) {
          tiedScores.add(score);
        }
      });

      onData({
        topEntries,
        totalFetched: entries.length,
        tiedScores,
      });
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, RANKING_COLLECTION);
      } catch (wrappedError) {
        onError(wrappedError instanceof Error ? wrappedError : new Error(String(wrappedError)));
      }
    }
  );
}
