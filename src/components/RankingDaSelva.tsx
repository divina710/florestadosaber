import React, { useEffect, useState } from 'react';
import { StudentUser, UserStats } from '../types';
import { isAdmin } from '../utils/authManager';
import { soundManager } from '../utils/soundEffects';
import {
  addRankingPlayer,
  RANKING_CONSTRAINTS,
  RankingEntry,
  subscribeToTopRanking,
  validateRankingInput,
} from '../services/rankingFirebaseService';
import {
  Trophy,
  Crown,
  Medal,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Award,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Radio,
  UserCheck,
} from 'lucide-react';

interface RankingDaSelvaProps {
  currentUser: StudentUser | null;
  userStats: UserStats;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onBackToHome: () => void;
  onGoToChallenge?: () => void;
  onGoToSubjects?: () => void;
}

function formatDateTime(entry: RankingEntry): string {
  if (entry.isPendingTimestamp || !entry.criadoEm) {
    return 'Registrando horário...';
  }
  return entry.criadoEm.toDate().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatShortTime(entry: RankingEntry): string {
  if (entry.isPendingTimestamp || !entry.criadoEm) {
    return 'Agora';
  }
  return entry.criadoEm.toDate().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export const RankingDaSelva: React.FC<RankingDaSelvaProps> = ({
  currentUser,
  userStats,
  onBackToHome,
  onGoToChallenge,
  onGoToSubjects,
}) => {
  const [topEntries, setTopEntries] = useState<RankingEntry[]>([]);
  const [totalFetched, setTotalFetched] = useState<number>(0);
  const [tiedScores, setTiedScores] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listenerError, setListenerError] = useState<string>('');

  // Form state for adding a new player score (testing & quick entry)
  const [playerName, setPlayerName] = useState<string>('');
  const [playerScore, setPlayerScore] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setListenerError('');

    const unsubscribe = subscribeToTopRanking(
      (result) => {
        setTopEntries(result.topEntries);
        setTotalFetched(result.totalFetched);
        setTiedScores(result.tiedScores);
        setIsLoading(false);
        setListenerError('');
      },
      (err) => {
        setIsLoading(false);
        setListenerError(
          err.message.includes('Missing or insufficient permissions')
            ? 'Permissão negada ao consultar o ranking no Firestore. Verifique as regras de segurança.'
            : 'Não foi possível sincronizar o ranking em tempo real no momento.'
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const validation = validateRankingInput(playerName, playerScore);
    if (!validation.valid) {
      setFormError(validation.error || 'Dados inválidos.');
      soundManager.playError();
      return;
    }

    setIsSubmitting(true);
    try {
      await addRankingPlayer(validation.nome, validation.pontuacao);
      soundManager.playSuccess();
      setFormSuccess(
        `Jogador "${validation.nome}" registrado com ${validation.pontuacao.toLocaleString('pt-BR')} pts!`
      );
      setPlayerName('');
      setPlayerScore('');
    } catch (err) {
      soundManager.playError();
      const rawMessage = err instanceof Error ? err.message : '';
      if (rawMessage.includes('Missing or insufficient permissions')) {
        setFormError(
          'As regras do Firestore recusaram este envio. Confira se o nome tem de 2 a 40 caracteres e se a pontuação é positiva.'
        );
      } else {
        setFormError(rawMessage || 'Erro ao salvar pontuação no Firestore.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickPublishCurrentStudent = async () => {
    if (!currentUser || isAdmin(currentUser)) return;
    setFormError('');
    setFormSuccess('');

    const cleanName = currentUser.name.trim().slice(0, RANKING_CONSTRAINTS.NOME_MAX_LENGTH);
    const xpScore = userStats.xp;

    const validation = validateRankingInput(cleanName, xpScore);
    if (!validation.valid) {
      setFormError(validation.error || 'Dados inválidos.');
      soundManager.playError();
      return;
    }

    setIsSubmitting(true);
    try {
      await addRankingPlayer(validation.nome, validation.pontuacao);
      soundManager.playSuccess();
      setFormSuccess(
        `Seu XP atual (${validation.pontuacao.toLocaleString('pt-BR')} pts) foi publicado no Ranking da Selva!`
      );
    } catch {
      soundManager.playError();
      setFormError('Não foi possível publicar sua pontuação agora.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const podiumFirst = topEntries[0];
  const podiumSecond = topEntries[1];
  const podiumThird = topEntries[2];
  const userIsAdmin = isAdmin(currentUser);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm ring-2 ring-amber-300/60"
          title="1º Lugar"
        >
          <Crown className="w-5 h-5" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-slate-900 flex items-center justify-center font-black text-sm shadow-sm ring-2 ring-slate-300/60"
          title="2º Lugar"
        >
          <Medal className="w-5 h-5" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-300 via-amber-600 to-orange-700 text-white flex items-center justify-center font-black text-sm shadow-sm ring-2 ring-orange-400/50"
          title="3º Lugar"
        >
          <Medal className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-heading font-extrabold text-sm tabular-nums">
        {rank}º
      </div>
    );
  };

  const getRowHighlightClasses = (rank: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-r from-amber-50/95 via-yellow-50/60 to-white dark:from-amber-950/45 dark:via-amber-900/15 dark:to-slate-900 border-l-4 border-l-amber-400';
    }
    if (rank === 2) {
      return 'bg-gradient-to-r from-slate-100/90 via-slate-50/50 to-white dark:from-slate-800/65 dark:via-slate-800/30 dark:to-slate-900 border-l-4 border-l-slate-400';
    }
    if (rank === 3) {
      return 'bg-gradient-to-r from-orange-50/90 via-amber-50/40 to-white dark:from-orange-950/40 dark:via-orange-900/15 dark:to-slate-900 border-l-4 border-l-orange-500';
    }
    return 'hover:bg-slate-50 dark:hover:bg-slate-800/40';
  };

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 space-y-8 pb-16 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onBackToHome();
          }}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Floresta</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800/70">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Tempo Real · Cloud Firestore (Top 10)</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-700/60">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Trophy className="w-4 h-4" />
              <span>Leaderboard Oficial · Coleção ranking</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-black text-white">
              Ranking da Selva
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              Classificação sincronizada ao vivo com os 10 melhores jogadores. Em caso de empate na pontuação, quem atingiu a marca primeiro permanece na frente.
            </p>
          </div>

          {currentUser && !userIsAdmin && (
            <div className="shrink-0 bg-slate-900/75 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 space-y-2.5 min-w-[235px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
                  Sua Pontuação Local
                </span>
                <span className="text-xs font-extrabold text-amber-300 tabular-nums">
                  {userStats.xp.toLocaleString('pt-BR')} XP
                </span>
              </div>
              <button
                type="button"
                disabled={isSubmitting || userStats.xp <= 0}
                onClick={handleQuickPublishCurrentStudent}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Publicar Meu XP no Ranking</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Simple Form to Insert New Player & Score */}
      <section
        aria-label="Adicionar Novo Jogador ao Ranking"
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Inserir Novo Jogador e Pontuação</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Registre um participante diretamente no Firestore para testar a ordenação em tempo real e o critério de desempate.
            </p>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Nome: 2 a 40 caracteres · Pontuação &gt; 0
          </span>
        </div>

        <form onSubmit={handleSubmitScore} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-6 space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="ranking-player-name"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Nome do Jogador
              </label>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {playerName.trim().length}/{RANKING_CONSTRAINTS.NOME_MAX_LENGTH}
              </span>
            </div>
            <input
              id="ranking-player-name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              minLength={RANKING_CONSTRAINTS.NOME_MIN_LENGTH}
              maxLength={RANKING_CONSTRAINTS.NOME_MAX_LENGTH}
              placeholder="Ex: Maria Silva"
              required
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <label
              htmlFor="ranking-player-score"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Pontuação
            </label>
            <input
              id="ranking-player-score"
              type="number"
              min="1"
              step="any"
              max={RANKING_CONSTRAINTS.MAX_PONTUACAO}
              value={playerScore}
              onChange={(e) => setPlayerScore(e.target.value)}
              placeholder="Ex: 1500"
              required
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white tabular-nums focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              id="ranking-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all active:scale-98 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Enviar Pontos</span>
                </>
              )}
            </button>
          </div>
        </form>

        {formError && (
          <div
            role="alert"
            className="flex items-start space-x-2 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {formSuccess && (
          <div
            role="status"
            className="flex items-start space-x-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{formSuccess}</span>
          </div>
        )}
      </section>

      {/* Listener Error Banner */}
      {listenerError && (
        <div
          role="alert"
          className="flex items-start space-x-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-medium"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{listenerError}</span>
        </div>
      )}

      {/* Top 3 Visual Podium */}
      {!isLoading && topEntries.length > 0 && (
        <section
          aria-label="Pódio dos 3 Primeiros Colocados"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          {/* 2nd Place */}
          {podiumSecond ? (
            <div className="order-2 md:order-1 bg-gradient-to-b from-slate-100/80 via-white to-white dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-5 border-2 border-slate-300 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-black text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                  <Medal className="w-4 h-4 text-slate-400" />
                  <span>2º Lugar · Prata</span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 tabular-nums">
                  <Clock className="w-3 h-3" />
                  <span>{formatShortTime(podiumSecond)}</span>
                </span>
              </div>
              <div className="text-center space-y-2 py-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-slate-900 flex items-center justify-center font-heading font-black text-xl shadow-md">
                  2º
                </div>
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white truncate">
                  {podiumSecond.nome}
                </h3>
                <div className="font-heading text-2xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
                  {podiumSecond.pontuacao.toLocaleString('pt-BR')} pts
                </div>
                {tiedScores.has(podiumSecond.pontuacao) && (
                  <span className="inline-block text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg">
                    Desempate por horário
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:block order-2 md:order-1" />
          )}

          {/* 1st Place (Elevated Gold Card) */}
          {podiumFirst && (
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-100/90 via-amber-50/40 to-white dark:from-amber-950/60 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-6 border-2 border-amber-400 dark:border-amber-500/80 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-black text-sm text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span>1º Lugar · Líder Ouro</span>
                </span>
                <span className="text-[11px] text-amber-700 dark:text-amber-300 flex items-center space-x-1 tabular-nums">
                  <Clock className="w-3 h-3" />
                  <span>{formatShortTime(podiumFirst)}</span>
                </span>
              </div>
              <div className="text-center space-y-2.5 py-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-heading font-black text-2xl shadow-lg ring-4 ring-amber-300/40">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white truncate">
                  {podiumFirst.nome}
                </h3>
                <div className="font-heading text-3xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                  {podiumFirst.pontuacao.toLocaleString('pt-BR')} pts
                </div>
                {tiedScores.has(podiumFirst.pontuacao) && (
                  <span className="inline-block text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-200/70 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-lg">
                    Venceu desempate (atingiu primeiro)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {podiumThird ? (
            <div className="order-3 bg-gradient-to-b from-orange-100/70 via-white to-white dark:from-orange-950/40 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-5 border-2 border-orange-300 dark:border-orange-700/70 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-black text-sm text-orange-800 dark:text-orange-300 flex items-center space-x-1.5">
                  <Medal className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span>3º Lugar · Bronze</span>
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1 tabular-nums">
                  <Clock className="w-3 h-3" />
                  <span>{formatShortTime(podiumThird)}</span>
                </span>
              </div>
              <div className="text-center space-y-2 py-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-orange-300 via-amber-600 to-orange-700 text-white flex items-center justify-center font-heading font-black text-xl shadow-md">
                  3º
                </div>
                <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white truncate">
                  {podiumThird.nome}
                </h3>
                <div className="font-heading text-2xl font-black text-orange-700 dark:text-orange-400 tabular-nums">
                  {podiumThird.pontuacao.toLocaleString('pt-BR')} pts
                </div>
                {tiedScores.has(podiumThird.pontuacao) && (
                  <span className="inline-block text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-lg">
                    Desempate por horário
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:block order-3" />
          )}
        </section>
      )}

      {/* Real-time Top 10 Leaderboard Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-900/80">
          <div>
            <h2 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Tabela de Classificação (Top 10)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ordenada da maior pontuação para a menor · Desempate por ordem de chegada (criadoEm)
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">
            {isLoading
              ? 'Conectando...'
              : `${topEntries.length} exibidos${totalFetched > topEntries.length ? ` de ${totalFetched}+ registros` : ''}`}
          </span>
        </div>

        {isLoading ? (
          <div className="px-6 py-14 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Sincronizando classificação em tempo real com o Firestore...
            </p>
          </div>
        ) : topEntries.length === 0 ? (
          <div className="px-6 py-12 text-center space-y-2">
            <Trophy className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
              Nenhum jogador registrado ainda
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Use o formulário acima para adicionar o primeiro jogador e acompanhar a atualização instantânea via Firestore!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-950/30">
                  <th className="py-3 px-4 sm:px-6 font-bold">Posição</th>
                  <th className="py-3 px-4 font-bold">Jogador</th>
                  <th className="py-3 px-4 font-bold hidden sm:table-cell">Registrado em</th>
                  <th className="py-3 px-4 sm:px-6 font-bold text-right">Pontuação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {topEntries.map((entry, idx) => {
                  const rank = idx + 1;
                  const isTied = tiedScores.has(entry.pontuacao);

                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${getRowHighlightClasses(rank)}`}
                    >
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-2.5">
                          {getRankBadge(rank)}
                          {rank <= 3 && (
                            <span className="hidden md:inline text-xs font-extrabold text-slate-700 dark:text-slate-200">
                              {rank === 1 ? 'Ouro' : rank === 2 ? 'Prata' : 'Bronze'}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                            {entry.nome}
                          </span>
                          {isTied && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                              Empate · ordem de chegada
                            </span>
                          )}
                        </div>
                        <div className="sm:hidden text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-1 tabular-nums">
                          <Clock className="w-3 h-3" />
                          <span>{formatDateTime(entry)}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 hidden sm:table-cell text-xs text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap">
                        <span className="inline-flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDateTime(entry)}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <span
                          className={`font-heading font-black text-sm sm:text-lg tabular-nums ${
                            rank === 1
                              ? 'text-amber-600 dark:text-amber-400'
                              : rank === 2
                              ? 'text-slate-700 dark:text-slate-200'
                              : rank === 3
                              ? 'text-orange-600 dark:text-orange-400'
                              : 'text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          {entry.pontuacao.toLocaleString('pt-BR')} pts
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Action Footer to Earn More XP */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100/80 dark:bg-slate-900/70 rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Quer acumular mais pontos? Resolva quizzes diversificados, domine flashcards ou envie uma redação ENEM!
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          {onGoToSubjects && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onGoToSubjects();
              }}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Estudar Matérias</span>
            </button>
          )}

          {onGoToChallenge && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onGoToChallenge();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Desafio da Floresta</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
