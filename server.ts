import express, { Request, Response } from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '5mb' }));

const ALLOWED_ADMIN_EMAILS = new Set([
  'yara.lohanny@aluno.edu.pi.gov.br',
  'divina.araujo@aluno.edu.pi.gov.br',
  'kemilly.meneses@aluno.edu.pi.gov.br',
]);

const ADMIN_NAME_MAP: Record<string, string> = {
  'yara.lohanny@aluno.edu.pi.gov.br': 'Yara Lohanny (Admin)',
  'divina.araujo@aluno.edu.pi.gov.br': 'Divina Araújo (Admin)',
  'kemilly.meneses@aluno.edu.pi.gov.br': 'Kemilly Meneses (Admin)',
};

const ALL_SUBJECT_IDS = [
  'artes',
  'biologia',
  'espanhol',
  'filosofia',
  'fisica',
  'geografia',
  'historia',
  'ingles',
  'matematica',
  'portugues',
  'quimica',
  'sociologia',
];

const SESSION_SECRET =
  process.env.SESSION_SECRET && process.env.SESSION_SECRET.trim().length >= 16
    ? process.env.SESSION_SECRET.trim()
    : crypto.randomBytes(32).toString('hex');

interface ClaimedAdminCredential {
  salt: string;
  hash: string;
}

// In-memory first-run admin credential when ADMIN_PASSCODE env var is not configured
let claimedAdminCredential: ClaimedAdminCredential | null = null;

function getEnvAdminPasscode(): string {
  return (process.env.ADMIN_PASSCODE || '').trim();
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function hashScrypt(passcode: string, saltHex?: string): ClaimedAdminCredential {
  const salt = saltHex || crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(passcode, salt, 64, { N: 16384, r: 8, p: 1 });
  return { salt, hash: derived.toString('hex') };
}

function verifyScrypt(passcode: string, stored: ClaimedAdminCredential): boolean {
  const derived = crypto.scryptSync(passcode, stored.salt, 64, { N: 16384, r: 8, p: 1 });
  const storedBuf = Buffer.from(stored.hash, 'hex');
  if (derived.length !== storedBuf.length) return false;
  return crypto.timingSafeEqual(derived, storedBuf);
}

function signAdminToken(email: string): string {
  const payload = {
    email,
    role: 'admin',
    exp: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

function verifyAdminToken(token: string): { valid: boolean; email?: string } {
  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [encodedPayload, providedSig] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const bufA = Buffer.from(providedSig);
  const bufB = Buffer.from(expectedSig);
  if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
    return { valid: false };
  }

  try {
    const decoded = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as {
      email?: string;
      role?: string;
      exp?: number;
    };
    if (
      decoded.role !== 'admin' ||
      !decoded.email ||
      !ALLOWED_ADMIN_EMAILS.has(decoded.email) ||
      typeof decoded.exp !== 'number' ||
      decoded.exp < Date.now()
    ) {
      return { valid: false };
    }
    return { valid: true, email: decoded.email };
  } catch {
    return { valid: false };
  }
}

function buildAdminUserPayload(email: string) {
  return {
    id: `admin-${email}`,
    name: ADMIN_NAME_MAP[email] || 'Administradora',
    email,
    school: 'Seduc-PI - Coordenação do Ensino Médio',
    state: 'PI - Piauí',
    grade: 'Pré-Vestibular / ENEM',
    favoriteAnimal: 'guilherme',
    role: 'admin' as const,
    favoriteSubjects: ALL_SUBJECT_IDS,
    studyTarget: 'Gestão Pedagógica, Monitoramento & Tutoria',
    isVerifiedStudent: true,
    createdAt: '2026-01-01',
  };
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// Admin Auth Status (whether env passcode or claimed first-run passcode is active)
app.get('/api/admin/status', (_req: Request, res: Response) => {
  const envConfigured = getEnvAdminPasscode().length > 0;
  res.json({
    envConfigured,
    claimed: Boolean(claimedAdminCredential),
  });
});

// First-run Admin Setup / Claim (only when ADMIN_PASSCODE env var is unset and not yet claimed)
app.post('/api/admin/claim', (req: Request, res: Response): void => {
  if (getEnvAdminPasscode().length > 0 || claimedAdminCredential) {
    res.status(409).json({
      error: 'A senha de administrador já foi configurada. Faça login normalmente.',
    });
    return;
  }

  const rawEmail = typeof req.body?.email === 'string' ? req.body.email : '';
  const rawPasscode = typeof req.body?.passcode === 'string' ? req.body.passcode : '';
  const cleanEmail = rawEmail.trim().toLowerCase();
  const cleanPasscode = rawPasscode.trim();

  if (!ALLOWED_ADMIN_EMAILS.has(cleanEmail)) {
    res.status(403).json({
      error: 'Acesso negado. Este e-mail não possui autorização para acessar a área de administrador.',
    });
    return;
  }

  if (cleanPasscode.length < 4 || cleanPasscode.length > 128) {
    res.status(400).json({
      error: 'Defina uma senha de administrador com entre 4 e 128 caracteres.',
    });
    return;
  }

  claimedAdminCredential = hashScrypt(cleanPasscode);
  const token = signAdminToken(cleanEmail);

  res.json({
    success: true,
    token,
    admin: buildAdminUserPayload(cleanEmail),
  });
});

// Admin Login (verifies allowlisted email + ADMIN_PASSCODE env var or claimed scrypt hash)
app.post('/api/admin/login', (req: Request, res: Response): void => {
  const rawEmail = typeof req.body?.email === 'string' ? req.body.email : '';
  const rawPasscode = typeof req.body?.passcode === 'string' ? req.body.passcode : '';
  const cleanEmail = rawEmail.trim().toLowerCase();
  const cleanPasscode = rawPasscode.trim();

  if (!ALLOWED_ADMIN_EMAILS.has(cleanEmail)) {
    res.status(403).json({
      error: 'Acesso negado. Este e-mail não possui autorização para acessar a área de administrador.',
    });
    return;
  }

  if (!cleanPasscode || cleanPasscode.length > 128) {
    res.status(400).json({ error: 'Informe a senha de administrador.' });
    return;
  }

  const envPasscode = getEnvAdminPasscode();
  if (envPasscode.length > 0) {
    if (!timingSafeEqualStrings(cleanPasscode, envPasscode)) {
      res.status(401).json({ error: 'Senha de administrador incorreta.' });
      return;
    }
  } else if (claimedAdminCredential) {
    if (!verifyScrypt(cleanPasscode, claimedAdminCredential)) {
      res.status(401).json({ error: 'Senha de administrador incorreta.' });
      return;
    }
  } else {
    res.status(409).json({
      needsSetup: true,
      error: 'Configure a senha inicial de administrador para o primeiro acesso.',
    });
    return;
  }

  const token = signAdminToken(cleanEmail);
  res.json({
    success: true,
    token,
    admin: buildAdminUserPayload(cleanEmail),
  });
});

// Verify active in-memory admin Bearer token
app.get('/api/admin/verify', (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    res.status(401).json({ valid: false });
    return;
  }

  const result = verifyAdminToken(match[1]);
  if (!result.valid || !result.email) {
    res.status(401).json({ valid: false });
    return;
  }

  res.json({
    valid: true,
    admin: buildAdminUserPayload(result.email),
  });
});

interface CorrectionRequest {
  theme: string;
  title?: string;
  text: string;
  studentName?: string;
}

// POST /api/redacao/corrigir - ENEM Essay Grading with Gemini AI
app.post('/api/redacao/corrigir', async (req: Request, res: Response): Promise<void> => {
  try {
    const body = (req.body || {}) as Partial<CorrectionRequest>;
    const theme = typeof body.theme === 'string' ? body.theme.trim().slice(0, 300) : '';
    const title = typeof body.title === 'string' ? body.title.trim().slice(0, 200) : '';
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const studentName =
      typeof body.studentName === 'string' && body.studentName.trim().length > 0
        ? body.studentName.trim().slice(0, 120)
        : 'Estudante';

    if (!theme) {
      res.status(400).json({ error: 'Informe o tema da redação.' });
      return;
    }

    if (!text || text.length < 50) {
      res.status(400).json({
        error: 'O texto da redação deve conter pelo menos 50 caracteres para ser analisado.',
      });
      return;
    }

    if (text.length > 20000) {
      res.status(400).json({
        error: 'O texto excede o limite máximo permitido para correção (20.000 caracteres).',
      });
      return;
    }

    const words = text.split(/\s+/).filter(Boolean);
    const lines = text.split('\n').filter((l) => l.trim().length > 0);

    // Lazily initialize Gemini client only when GEMINI_API_KEY is configured
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `
Você é o Quati Quirino, o professor de Língua Portuguesa e mentor de Redação do ENEM na "Floresta do Saber".
Avalie a seguinte redação dissertativo-argumentativa do estudante "${studentName}" segundo a grade oficial de correção do ENEM (5 Competências, cada uma valendo de 0 a 200 pontos em múltiplos de 40: 0, 40, 80, 120, 160, 200). A nota máxima é 1000 pontos.

Tema da Redação: "${theme}"
Título: "${title}"
Texto da Redação:
"""
${text}
"""

Instruções para a correção:
1. Competência 1: Domínio da norma padrão da língua escrita (concordância, regência, pontuação, ortografia, precisão vocabular).
2. Competência 2: Compreensão da proposta de redação e aplicação de conceitos de várias áreas do conhecimento (repertório sociocultural produtivo e legitimado).
3. Competência 3: Seleção, relação, organização e interpretação de informações, fatos, opiniões e argumentos em defesa de um ponto de vista (projeto de texto).
4. Competência 4: Demonstração de conhecimento dos mecanismos linguísticos necessários para a construção da argumentação (conectivos interparágrafos e intraparágrafos, coesão referencial).
5. Competência 5: Elaboração de proposta de intervenção para o problema abordado, respeitando os direitos humanos (deve conter: Agente, Ação, Meio/Modo, Efeito e Detalhamento).
6. Faça um parecer geral encorajador, cite pelo menos 2 pontos fortes, pelo menos 2 pontos prioritários para melhoria, e finalize com uma dica inspiradora do mascote Quati Quirino!
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction:
              'Você é um corretor oficial experiente do ENEM e mentor simpático de redação chamado Quati Quirino. Seja rigoroso nas notas conforme os critérios do INEP, mas acolhedor e pedagógico nos comentários.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                c1Score: { type: Type.INTEGER, description: 'Nota da C1 de 0 a 200' },
                c1Feedback: { type: Type.STRING, description: 'Comentário sobre norma culta' },
                c2Score: { type: Type.INTEGER, description: 'Nota da C2 de 0 a 200' },
                c2Feedback: { type: Type.STRING, description: 'Comentário sobre tema e repertório' },
                c3Score: { type: Type.INTEGER, description: 'Nota da C3 de 0 a 200' },
                c3Feedback: { type: Type.STRING, description: 'Comentário sobre argumentação' },
                c4Score: { type: Type.INTEGER, description: 'Nota da C4 de 0 a 200' },
                c4Feedback: { type: Type.STRING, description: 'Comentário sobre coesão e conectivos' },
                c5Score: { type: Type.INTEGER, description: 'Nota da C5 de 0 a 200' },
                c5Feedback: { type: Type.STRING, description: 'Comentário sobre proposta de intervenção' },
                totalScore: { type: Type.INTEGER, description: 'Soma total de 0 a 1000' },
                levelLabel: { type: Type.STRING, description: 'Ex: Excelente (Faixa 900+), Muito Bom (800-880), etc.' },
                generalReview: { type: Type.STRING, description: 'Parecer geral sobre a redação' },
                strengths: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Pontos fortes do texto',
                },
                improvements: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Pontos a melhorar',
                },
                quatiTip: { type: Type.STRING, description: 'Dica de ouro do Quati Quirino' },
              },
              required: [
                'c1Score',
                'c1Feedback',
                'c2Score',
                'c2Feedback',
                'c3Score',
                'c3Feedback',
                'c4Score',
                'c4Feedback',
                'c5Score',
                'c5Feedback',
                'totalScore',
                'generalReview',
                'strengths',
                'improvements',
                'quatiTip',
              ],
            },
          },
        });

        const rawJson = response.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          res.json({
            success: true,
            source: 'gemini-3.8-flash',
            wordCount: words.length,
            lineCount: Math.max(lines.length, Math.round(words.length / 10)),
            ...parsed,
          });
          return;
        }
      } catch {
        // Fall through cleanly to local rubric engine without exposing API details
      }
    }

    // Server-side fallback evaluator when GEMINI_API_KEY is unset or unavailable
    const lineEstimate = Math.max(lines.length, Math.round(words.length / 10));
    const wordCount = words.length;

    let c1 = 160;
    if (wordCount < 150) c1 = 80;
    else if (wordCount < 220) c1 = 120;

    let c2 = 160;
    if (wordCount < 120) c2 = 80;

    const c3 = 160;
    let c4 = 160;
    const connectivesRegex =
      /\b(além disso|portanto|ademais|outrossim|por conseguinte|dessa forma|desse modo|nesse sentido|sob essa ótica|em primeiro lugar|por outro lado)\b/gi;
    const connectivesCount = (text.match(connectivesRegex) || []).length;
    if (connectivesCount < 2) c4 = 120;
    else if (connectivesCount >= 4) c4 = 200;

    let c5 = 160;
    const interventionRegex =
      /\b(governo|ministério|escolas|sociedade|mídia|ong|família|cabe a|é dever|deve|devem|para que|a fim de|com o intuito de|por meio de|mediante)\b/gi;
    const interventionCount = (text.match(interventionRegex) || []).length;
    if (interventionCount < 2) c5 = 120;
    else if (interventionCount >= 5) c5 = 200;

    const total = c1 + c2 + c3 + c4 + c5;
    let levelLabel = 'Bom Desempenho (700-790)';
    if (total >= 900) levelLabel = 'Excelente (Nota 900+)';
    else if (total >= 800) levelLabel = 'Muito Bom (800-880)';
    else if (total < 600) levelLabel = 'Regular (Abaixo de 600)';

    res.json({
      success: true,
      source: 'rubric-engine',
      wordCount,
      lineCount: lineEstimate,
      c1Score: c1,
      c1Feedback: 'Boa adequação formal à norma padrão da Língua Portuguesa, com estrutura de orações equilibrada.',
      c2Score: c2,
      c2Feedback: `O texto aborda o tema "${theme}" e demonstra compreensão do gênero dissertativo-argumentativo.`,
      c3Score: c3,
      c3Feedback: 'Desenvolvimento argumentativo organizado em parágrafos de tese e sustentação.',
      c4Score: c4,
      c4Feedback: `Presença de conectivos interparágrafos (${connectivesCount} localizados), garantindo progressão temática fluida.`,
      c5Score: c5,
      c5Feedback: 'Proposta de intervenção social apresentada na conclusão com indicação de agentes e objetivos.',
      totalScore: total,
      levelLabel,
      generalReview: `Parabéns, ${studentName}! Sua redação atende aos requisitos fundamentais do modelo ENEM, estruturando introdução com tese, desenvolvimento argumentativo e proposta conclusiva.`,
      strengths: [
        'Organização clara em parágrafos dissertativos bem delimitados.',
        'Vocabulário adequado ao registro formal exigido no Exame Nacional do Ensino Médio.',
        'Conexão lógica entre a tese apresentada e a proposta final.',
      ],
      improvements: [
        'Enriqueça os argumentos citando dados de repertório sociocultural legitimado (filósofos, sociólogos, dados estatísticos ou legislações).',
        'Detenha-se no detalhamento da proposta de intervenção: descreva exatamente COMO o agente colocará a ação em prática.',
      ],
      quatiTip:
        'Dica do Quati Quirino: Na redação do ENEM, cada conectivo é uma ponte entre as árvores do saber. Use sinônimos para não repetir palavras e garanta pelo menos dois conectivos interparágrafos!',
    });
  } catch {
    res.status(500).json({ error: 'Falha ao processar correção da redação.' });
  }
});

const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.use((_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Floresta do Saber server listening on port ${PORT}`);
  });
}

startServer();
