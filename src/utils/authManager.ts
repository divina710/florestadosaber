import { StudentUser, EssaySubmission, SubjectId, UserStats } from '../types';

const AUTH_USER_KEY = 'floresta_student_user_v1';
const USERS_LIST_KEY = 'floresta_registered_users_v1';
const ESSAYS_STORAGE_PREFIX = 'floresta_student_essays_';
const USER_STATS_PREFIX = 'floresta_student_stats_';
const LEGACY_ADMIN_SESSION_KEY = 'floresta_admin_impersonating_session_v1';

export const ALLOWED_ADMIN_EMAILS = [
  'yara.lohanny@aluno.edu.pi.gov.br',
  'divina.araujo@aluno.edu.pi.gov.br',
  'kemilly.meneses@aluno.edu.pi.gov.br',
];

export const ALL_SUBJECT_IDS: SubjectId[] = [
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

// Master Administrator Profile Template (no secrets stored client-side)
export const DEFAULT_ADMIN_ACCOUNT: StudentUser = {
  id: 'admin-coordenacao-seduc',
  name: 'Administração Floresta do Saber',
  email: 'divina.araujo@aluno.edu.pi.gov.br',
  school: 'Seduc-PI - Coordenação do Ensino Médio',
  state: 'PI - Piauí',
  grade: 'Pré-Vestibular / ENEM',
  favoriteAnimal: 'guilherme',
  role: 'admin',
  favoriteSubjects: ALL_SUBJECT_IDS,
  studyTarget: 'Gestão Pedagógica, Monitoramento & Tutoria',
  isVerifiedStudent: true,
  createdAt: '2026-01-01',
};

// Legacy seeded bot/demo IDs to purge cleanly from existing browser storage
const LEGACY_BOT_USER_IDS = new Set([
  'aluno-divina-pi',
  'aluno-lucas-sp',
  'aluna-beatriz-mg',
  'aluno-gabriel-ce',
  'aluna-mariana-ba',
  'aluno-rafael-rj',
  'aluna-camila-pr',
  'aluno-thiago-am',
  'aluna-larissa-pe',
  'aluno-matheus-rs',
  'aluna-juliana-go',
  'aluno-pedro-sc',
]);

function isBotOrGuestUser(user: Partial<StudentUser> | null | undefined): boolean {
  if (!user || !user.id) return true;
  if (LEGACY_BOT_USER_IDS.has(user.id)) return true;
  if (user.id.startsWith('guest-')) return true;
  return false;
}

const LUIZ_CLEANUP_KEY = 'floresta_cleanup_luiz_v1';

/**
 * Strip password and passwordHash before storing active user session or returning profiles to UI.
 */
export function sanitizeUserForSession(user: StudentUser): StudentUser {
  const { password: _pw, passwordHash: _hash, ...safeUser } = user;
  return safeUser;
}

function generateSaltHex(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback deterministic FNV-1a mix if SubtleCrypto is unavailable in non-secure context
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= c + i;
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
}

export async function hashStudentPassword(password: string, existingSalt?: string): Promise<string> {
  const salt = existingSalt || generateSaltHex();
  const digest = await sha256Hex(`${salt}:${password.trim()}`);
  return `${salt}:${digest}`;
}

export async function verifyStudentPasswordHash(passwordAttempt: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt] = parts;
  const computed = await hashStudentPassword(passwordAttempt, salt);
  return computed === storedHash;
}

export function deleteStudentAccount(userId: string): void {
  try {
    const rawUsers = localStorage.getItem(USERS_LIST_KEY);
    if (rawUsers) {
      const parsed = JSON.parse(rawUsers);
      if (Array.isArray(parsed)) {
        const remaining = parsed.filter((u: StudentUser) => u.id !== userId);
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(remaining));
      }
    }

    const rawCurrent = localStorage.getItem(AUTH_USER_KEY);
    if (rawCurrent) {
      const parsedCurrent = JSON.parse(rawCurrent) as StudentUser;
      if (parsedCurrent.id === userId && parsedCurrent.role !== 'admin') {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }

    localStorage.removeItem(`${USER_STATS_PREFIX}${userId}`);
    localStorage.removeItem(`${ESSAYS_STORAGE_PREFIX}${userId}`);
  } catch {
    // ignore storage errors
  }
}

// Purge legacy bot accounts, sessionStorage admin state, and plaintext passwords
export function purgeLegacyBotAccounts(): void {
  try {
    sessionStorage.removeItem(LEGACY_ADMIN_SESSION_KEY);

    const rawUsers = localStorage.getItem(USERS_LIST_KEY);
    if (rawUsers) {
      const parsed = JSON.parse(rawUsers);
      if (Array.isArray(parsed)) {
        const realUsers = parsed.filter((u: StudentUser) => !isBotOrGuestUser(u));
        if (realUsers.length !== parsed.length) {
          localStorage.setItem(USERS_LIST_KEY, JSON.stringify(realUsers));
        }
      }
    }

    const rawCurrent = localStorage.getItem(AUTH_USER_KEY);
    if (rawCurrent) {
      const parsedCurrent = JSON.parse(rawCurrent) as StudentUser;
      if (parsedCurrent.role === 'admin' || LEGACY_BOT_USER_IDS.has(parsedCurrent.id)) {
        localStorage.removeItem(AUTH_USER_KEY);
      } else if (parsedCurrent.password || parsedCurrent.passwordHash) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(sanitizeUserForSession(parsedCurrent)));
      }
    }

    LEGACY_BOT_USER_IDS.forEach((botId) => {
      localStorage.removeItem(`${USER_STATS_PREFIX}${botId}`);
      localStorage.removeItem(`${ESSAYS_STORAGE_PREFIX}${botId}`);
    });

    if (!localStorage.getItem(LUIZ_CLEANUP_KEY)) {
      const luizMatcher = (u: Partial<StudentUser> | null | undefined) => {
        if (!u || u.role === 'admin') return false;
        const name = (u.name || '').toLowerCase();
        const email = (u.email || '').toLowerCase();
        return /\blu[ií][zs]\b/i.test(name) || email.includes('luiz') || email.includes('luis');
      };

      const usersAfterBots = localStorage.getItem(USERS_LIST_KEY);
      if (usersAfterBots) {
        const parsed = JSON.parse(usersAfterBots);
        if (Array.isArray(parsed)) {
          parsed.forEach((u: StudentUser) => {
            if (luizMatcher(u)) {
              deleteStudentAccount(u.id);
            }
          });
        }
      }

      const activeRaw = localStorage.getItem(AUTH_USER_KEY);
      if (activeRaw) {
        const parsedActive = JSON.parse(activeRaw) as StudentUser;
        if (luizMatcher(parsedActive)) {
          deleteStudentAccount(parsedActive.id);
        }
      }

      localStorage.setItem(LUIZ_CLEANUP_KEY, 'done');
    }
  } catch {
    // ignore storage errors
  }
}

purgeLegacyBotAccounts();

export function getStoredUser(): StudentUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StudentUser;
      // Admin sessions must be server-verified in memory, never restored from localStorage
      if (parsed.role === 'admin' || LEGACY_BOT_USER_IDS.has(parsed.id)) {
        localStorage.removeItem(AUTH_USER_KEY);
        return null;
      }
      return sanitizeUserForSession(parsed);
    }
  } catch {
    // ignore corrupted localStorage entry
  }
  return null;
}

export function saveStoredUser(user: StudentUser): void {
  try {
    const safeSessionUser = sanitizeUserForSession(user);
    if (safeSessionUser.role !== 'admin') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(safeSessionUser));
    }

    // Only persist real registered student accounts to the students directory
    if (user.role !== 'admin' && !isBotOrGuestUser(user)) {
      const users = readRawRegisteredUsers();
      const existingIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
      const recordToStore: StudentUser = {
        ...safeSessionUser,
        role: 'student',
        passwordHash: user.passwordHash || (existingIndex >= 0 ? users[existingIndex].passwordHash : undefined),
      };
      if (existingIndex >= 0) {
        users[existingIndex] = { ...users[existingIndex], ...recordToStore };
      } else {
        users.push(recordToStore);
      }
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
    }
  } catch {
    // ignore storage errors
  }
}

export function removeStoredUser(): void {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch {
    // ignore storage errors
  }
}

function readRawRegisteredUsers(): StudentUser[] {
  try {
    const raw = localStorage.getItem(USERS_LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((u: StudentUser) => !isBotOrGuestUser(u));
      }
    }
  } catch {
    // ignore storage errors
  }
  return [];
}

export function getRegisteredUsers(): StudentUser[] {
  return readRawRegisteredUsers().map(sanitizeUserForSession);
}

export async function registerStudentUser(
  userInput: Omit<StudentUser, 'password' | 'passwordHash' | 'role'>,
  plainPassword: string
): Promise<{ success: boolean; user?: StudentUser; message?: string }> {
  const cleanEmail = userInput.email.trim().toLowerCase();
  const users = readRawRegisteredUsers();

  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return {
      success: false,
      message: 'Já existe uma conta cadastrada com este e-mail. Entre na aba "Já tenho Conta".',
    };
  }

  const passwordHash = await hashStudentPassword(plainPassword);
  const fullRecord: StudentUser = {
    ...userInput,
    email: cleanEmail,
    role: 'student',
    passwordHash,
  };

  users.push(fullRecord);
  try {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
  } catch {
    // ignore storage errors
  }

  const safeUser = sanitizeUserForSession(fullRecord);
  saveStoredUser(fullRecord);
  return { success: true, user: safeUser };
}

export async function authenticateUser(
  email: string,
  passwordAttempt: string
): Promise<{ success: boolean; user?: StudentUser; message?: string }> {
  const users = readRawRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const foundIndex = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

  if (foundIndex < 0) {
    return {
      success: false,
      message: 'Nenhum estudante encontrado com este e-mail. Por favor, crie seu cadastro primeiro.',
    };
  }

  const found = users[foundIndex];
  const cleanAttempt = passwordAttempt.trim();

  if (found.passwordHash) {
    const valid = await verifyStudentPasswordHash(cleanAttempt, found.passwordHash);
    if (!valid) {
      return {
        success: false,
        message: 'Senha incorreta. Digite a senha cadastrada para acessar este perfil.',
      };
    }
  } else if (found.password) {
    // Migrate legacy plaintext record to salted hash upon verification
    if (cleanAttempt !== found.password) {
      return {
        success: false,
        message: 'Senha incorreta. Digite a senha cadastrada para acessar este perfil.',
      };
    }
    const migratedHash = await hashStudentPassword(cleanAttempt);
    const { password: _legacyPw, ...rest } = found;
    users[foundIndex] = { ...rest, passwordHash: migratedHash };
    try {
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
    } catch {
      // ignore storage errors
    }
  }

  return {
    success: true,
    user: sanitizeUserForSession(found),
  };
}

// Student Essay Submissions Persistence
export function getStudentEssays(userId: string): EssaySubmission[] {
  try {
    const raw = localStorage.getItem(`${ESSAYS_STORAGE_PREFIX}${userId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return [];
}

export function saveStudentEssay(userId: string, essay: EssaySubmission): void {
  try {
    const current = getStudentEssays(userId);
    const updated = [essay, ...current.filter((e) => e.id !== essay.id)];
    localStorage.setItem(`${ESSAYS_STORAGE_PREFIX}${userId}`, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}

// Check if user is an authenticated Administrator with an authorized email
export function isAdmin(user: StudentUser | null): boolean {
  if (!user) return false;
  return user.role === 'admin' && ALLOWED_ADMIN_EMAILS.includes(user.email.trim().toLowerCase());
}

export interface AdminAuthStatus {
  envConfigured: boolean;
  claimed: boolean;
}

export async function fetchAdminAuthStatus(): Promise<AdminAuthStatus> {
  const res = await fetch('/api/admin/status');
  if (!res.ok) {
    throw new Error('Não foi possível consultar o status de autenticação administrativa.');
  }
  return res.json();
}

export async function loginAdminAccess(
  email: string,
  passcode: string
): Promise<{ success: boolean; admin?: StudentUser; token?: string; needsSetup?: boolean; message?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, passcode }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        needsSetup: Boolean(data.needsSetup),
        message: data.error || 'Falha na autenticação administrativa.',
      };
    }
    return {
      success: true,
      admin: data.admin,
      token: data.token,
    };
  } catch {
    return {
      success: false,
      message: 'Servidor de autenticação indisponível no momento.',
    };
  }
}

export async function claimAdminAccess(
  email: string,
  passcode: string
): Promise<{ success: boolean; admin?: StudentUser; token?: string; message?: string }> {
  try {
    const res = await fetch('/api/admin/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, passcode }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.error || 'Não foi possível definir a senha inicial do administrador.',
      };
    }
    return {
      success: true,
      admin: data.admin,
      token: data.token,
    };
  } catch {
    return {
      success: false,
      message: 'Servidor de autenticação indisponível no momento.',
    };
  }
}

export async function verifyAdminSessionToken(token: string): Promise<StudentUser | null> {
  try {
    const res = await fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.valid && data.admin ? data.admin : null;
  } catch {
    return null;
  }
}

// Per-student Gamification Stats Persistence & Retrieval
export function getStudentStats(userId: string): UserStats {
  try {
    const raw = localStorage.getItem(`${USER_STATS_PREFIX}${userId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }

  return {
    xp: 0,
    level: 1,
    streakDays: 0,
    bestStreak: 0,
    todayCheckedIn: false,
    completedQuizzes: {},
    completedVideos: [],
    masteredFlashcards: [],
    customFlashcards: [],
    unlockedBadges: ['badge-guilherme'],
  };
}

export function saveStudentStats(userId: string, stats: UserStats): void {
  try {
    localStorage.setItem(`${USER_STATS_PREFIX}${userId}`, JSON.stringify(stats));
  } catch {
    // ignore storage errors
  }
}

export interface GlobalRankingEntry {
  rank: number;
  student: StudentUser;
  stats: UserStats;
  essaysCount: number;
}

/**
 * Returns the global ranking of real registered students sorted by total XP (descending).
 * Incorporates live stats for the currently logged-in student.
 */
export function getGlobalRanking(
  currentUser: StudentUser | null,
  currentUserStats?: UserStats,
  limit = 10
): { topList: GlobalRankingEntry[]; currentUserEntry: GlobalRankingEntry | null; totalParticipants: number } {
  const allUsers = getRegisteredUsers().filter((u) => u.role !== 'admin' && !isBotOrGuestUser(u));

  // If current user is a real logged-in student, ensure they are in the ranking pool
  if (
    currentUser &&
    currentUser.role !== 'admin' &&
    !isBotOrGuestUser(currentUser) &&
    !allUsers.some((u) => u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase())
  ) {
    allUsers.push(sanitizeUserForSession(currentUser));
  }

  const enriched = allUsers.map((student) => {
    const isCurrent =
      currentUser !== null &&
      (student.id === currentUser.id || student.email.toLowerCase() === currentUser.email.toLowerCase());
    const stats = isCurrent && currentUserStats ? currentUserStats : getStudentStats(student.id);
    const essaysCount = getStudentEssays(student.id).length;
    return {
      student,
      stats,
      essaysCount,
    };
  });

  enriched.sort((a, b) => {
    if (b.stats.xp !== a.stats.xp) return b.stats.xp - a.stats.xp;
    return (b.stats.streakDays || 0) - (a.stats.streakDays || 0);
  });

  const ranked: GlobalRankingEntry[] = enriched.map((item, idx) => ({
    rank: idx + 1,
    ...item,
  }));

  const currentUserEntry =
    currentUser !== null
      ? ranked.find(
          (r) =>
            r.student.id === currentUser.id ||
            r.student.email.toLowerCase() === currentUser.email.toLowerCase()
        ) || null
      : null;

  return {
    topList: ranked.slice(0, limit),
    currentUserEntry,
    totalParticipants: ranked.length,
  };
}
