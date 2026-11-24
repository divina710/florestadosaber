import React, { useState, useEffect } from 'react';
import { UserStats, StudentUser, EssaySubmission, SubjectId } from '../types';
import { FOREST_BADGES, SUBJECTS_DATA } from '../data/animalsAndSubjects';
import { AnimalAvatar } from './AnimalAvatar';
import { authenticateUser, getStudentEssays, saveStoredUser } from '../utils/authManager';
import { soundManager } from '../utils/soundEffects';
import {
  Trophy,
  X,
  Sparkles,
  Award,
  CheckCircle2,
  Flame,
  BookOpen,
  Layers,
  Video,
  LogIn,
  LogOut,
  School,
  ShieldCheck,
  UserPlus,
  Lock,
  FileText,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface StudentProfileModalProps {
  userStats: UserStats;
  currentUser?: StudentUser | null;
  onLoginSuccess?: (user: StudentUser) => void;
  onClose: () => void;
  onOpenStreak?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onLogout?: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  userStats,
  currentUser,
  onLoginSuccess,
  onClose,
  onOpenStreak,
  onOpenLogin,
  onOpenRegister,
  onLogout,
}) => {
  // Inline login state if not logged in
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [studentEssays, setStudentEssays] = useState<EssaySubmission[]>([]);

  useEffect(() => {
    if (currentUser?.id) {
      setStudentEssays(getStudentEssays(currentUser.id));
    } else {
      setStudentEssays([]);
    }
  }, [currentUser]);

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Informe seu e-mail cadastrado.');
      soundManager.playError();
      return;
    }

    const auth = await authenticateUser(loginEmail, loginPassword);
    if (!auth.success || !auth.user) {
      setLoginError(auth.message || 'Credenciais inválidas.');
      soundManager.playError();
      return;
    }

    soundManager.playSuccess();
    saveStoredUser(auth.user);
    if (onLoginSuccess) {
      onLoginSuccess(auth.user);
    }
  };

  const getRankTitle = (lvl: number) => {
    if (lvl >= 10) return 'Mestre Supremo da Floresta do Saber 👑';
    if (lvl >= 7) return 'Guardião Sênior da Fauna 🐆';
    if (lvl >= 4) return 'Rastreador do Conhecimento 🌿';
    if (lvl >= 2) return 'Explorador da Mata 🐾';
    return 'Iniciado da Floresta 🎒';
  };

  const currentLevelXp = userStats.xp % 200;
  const xpPercent = Math.min(100, Math.round((currentLevelXp / 200) * 100));

  // If user is not logged in, enforce strict privacy: ONLY the registered student can view their profile!
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-scale-up">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Acesso Privado do Estudante</span>
            </div>
            <h3 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white pt-1">
              Perfil Protegido por Senha
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Por segurança e privacidade, apenas o estudante titular do cadastro pode acessar seu perfil, notas de redação e histórico escolar.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleInlineLogin} className="space-y-3 pt-1">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                E-mail do Estudante:
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="ex: seu.nome@escola.edu.br"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Senha Cadastrada:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Acessar Meu Perfil</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">Ainda não tem cadastro?</span>
            <button
              onClick={() => {
                onClose();
                if (onOpenRegister) onOpenRegister();
              }}
              className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Cadastre-se Grátis</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Enrolled subjects for this student (all 12 subjects or chosen focus)
  const enrolledSubjectIds = currentUser.favoriteSubjects && currentUser.favoriteSubjects.length > 0
    ? currentUser.favoriteSubjects
    : SUBJECTS_DATA.map((s) => s.id);

  const enrolledSubjects = SUBJECTS_DATA.filter((s) => enrolledSubjectIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* Header with Student Mascot Avatar & Rank */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-600 flex items-center justify-center text-3xl shadow-lg border-2 border-amber-300 shrink-0">
              <AnimalAvatar animalId={currentUser.favoriteAnimal || 'guilherme'} size="md" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
                  {getRankTitle(userStats.level)}
                </span>
                {currentUser.isVerifiedStudent && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Estudante Verificado</span>
                  </span>
                )}
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {currentUser.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser.school || 'Ensino Médio'} • {currentUser.grade} • {currentUser.state || 'Brasil'}
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Perfil Autenticado: {currentUser.email}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Shortcuts: Logout & Add another */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <School className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-600 dark:text-slate-300">
              Foco ENEM: <strong>{currentUser.studyTarget || 'ENEM & Vestibulares 2026'}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenRegister && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Área de Cadastro</span>
              </button>
            )}

            {onLogout && (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair da Conta</span>
              </button>
            )}
          </div>
        </div>

        {/* Enrolled Subjects in Registration */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Disciplinas Cadastradas do Estudante ({enrolledSubjects.length} matérias)</span>
            </h4>
            <span className="text-[11px] text-slate-500">Ensino Médio</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {enrolledSubjects.map((sub) => (
              <div
                key={sub.id}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {sub.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {sub.animal.name.split(' ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student's Private Essays History */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-rose-500" />
              <span>Minhas Redações Corrigidas com IA ({studentEssays.length})</span>
            </h4>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              🔒 Visível apenas para {currentUser.name.split(' ')[0]}
            </span>
          </div>

          {studentEssays.length === 0 ? (
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 flex items-center justify-between">
              <span>Você ainda não enviou redações. Acesse a matéria de <strong>Português</strong> para escrever sua primeira redação e receber nota de 0 a 1000!</span>
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {studentEssays.map((essay) => (
                <div
                  key={essay.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {essay.title || 'Redação Sem Título'}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">
                      {essay.theme}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono font-bold text-xs">
                      {essay.scores.total} / 1000
                    </span>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      {new Date(essay.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* XP & Level Progress */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white p-5 rounded-2xl border border-emerald-700/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold flex items-center space-x-1.5 text-amber-300">
              <Trophy className="w-4 h-4" />
              <span>{userStats.xp} XP Total Acumulado</span>
            </span>
            <span className="text-emerald-200">Próximo Nível: {200 - currentLevelXp} XP</span>
          </div>

          <div className="w-full bg-emerald-950 h-3 rounded-full overflow-hidden p-0.5 border border-emerald-700">
            <div
              className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Activity Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div
            onClick={onOpenStreak}
            className="cursor-pointer bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 dark:hover:bg-orange-900/50 p-2.5 rounded-2xl border border-orange-200 dark:border-orange-800/60 transition-transform active:scale-95"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 mx-auto mb-1" />
            <div className="font-bold text-base text-orange-600 dark:text-orange-400">{userStats.streakDays || 0} dias</div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400">Sequência Diária 🔥</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Video className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <div className="font-bold text-base text-slate-900 dark:text-white">{userStats.completedVideos.length}</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Aulas Vistas</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <div className="font-bold text-base text-slate-900 dark:text-white">{Object.keys(userStats.completedQuizzes).length}</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Quizzes Feitos</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Layers className="w-4 h-4 text-purple-600 mx-auto mb-1" />
            <div className="font-bold text-base text-slate-900 dark:text-white">{userStats.masteredFlashcards.length}</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Cards Dominados</span>
          </div>
        </div>

        {/* Unlocked Badges */}
        <div>
          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Medalhas & Conquistas ({userStats.unlockedBadges.length}/{FOREST_BADGES.length})</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5">
            {FOREST_BADGES.map((badge) => {
              const isUnlocked = userStats.unlockedBadges.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border flex items-start space-x-3 transition-all ${
                    isUnlocked
                      ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60 shadow-2xs'
                      : 'opacity-40 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <AnimalAvatar animalId={badge.animalId} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span className="truncate">{badge.title}</span>
                      {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-1" />}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          Fechar Perfil
        </button>
      </div>
    </div>
  );
};
