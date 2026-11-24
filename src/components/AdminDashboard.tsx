import React, { useState, useMemo, useEffect } from 'react';
import { StudentUser, UserStats, EssaySubmission, SubjectId } from '../types';
import {
  getRegisteredUsers,
  getStudentStats,
  getStudentEssays,
  isAdmin,
  fetchAdminAuthStatus,
  loginAdminAccess,
  claimAdminAccess,
  verifyAdminSessionToken,
  deleteStudentAccount,
  ALL_SUBJECT_IDS,
} from '../utils/authManager';
import { SUBJECTS_DATA } from '../data/animalsAndSubjects';
import { AnimalAvatar } from './AnimalAvatar';
import { soundManager } from '../utils/soundEffects';
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Search,
  Filter,
  LogIn,
  ArrowRight,
  BookOpen,
  Trophy,
  Flame,
  Award,
  FileText,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  ArrowLeft,
  School,
  GraduationCap,
  Calendar,
  Layers,
  ChevronRight,
  AlertCircle,
  BarChart3,
  ExternalLink,
  X,
  Trash2,
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: StudentUser | null;
  adminToken?: string | null;
  onImpersonateStudent: (student: StudentUser) => void;
  onBackToApp: () => void;
  onAdminLoginSuccess?: (adminUser: StudentUser, token: string) => void;
  onAdminLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  adminToken = null,
  onImpersonateStudent,
  onBackToApp,
  onAdminLoginSuccess,
  onAdminLogout,
}) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [needsInitialClaim, setNeedsInitialClaim] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState<boolean>(false);

  // Verify in-memory admin token against the server and check setup status
  useEffect(() => {
    let active = true;

    async function checkAdminSession() {
      setIsCheckingAuth(true);
      try {
        if (adminToken && isAdmin(currentUser)) {
          const verifiedAdmin = await verifyAdminSessionToken(adminToken);
          if (active && verifiedAdmin) {
            setIsAdminAuthenticated(true);
            setNeedsInitialClaim(false);
            setIsCheckingAuth(false);
            return;
          }
        }

        if (active) {
          setIsAdminAuthenticated(false);
          const status = await fetchAdminAuthStatus();
          if (active) {
            setNeedsInitialClaim(!status.envConfigured && !status.claimed);
          }
        }
      } catch {
        if (active) {
          setIsAdminAuthenticated(false);
        }
      } finally {
        if (active) {
          setIsCheckingAuth(false);
        }
      }
    }

    checkAdminSession();
    return () => {
      active = false;
    };
  }, [currentUser, adminToken]);

  // Admin Auth Gate Inputs
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Dashboard Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<StudentUser | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Active view tab inside dashboard
  const [adminTab, setAdminTab] = useState<'students' | 'essays' | 'analytics'>('students');

  // Load registered users
  const [usersList, setUsersList] = useState<StudentUser[]>(() => {
    return getRegisteredUsers();
  });

  useEffect(() => {
    if (isAdminAuthenticated) {
      setUsersList(getRegisteredUsers());
    }
  }, [isAdminAuthenticated]);

  const handleAdminAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!adminEmail.trim()) {
      setAuthError('Por favor, informe o e-mail de administrador autorizado.');
      soundManager.playError();
      return;
    }

    if (!adminPassword.trim()) {
      setAuthError('Por favor, informe a senha de acesso administrativo.');
      soundManager.playError();
      return;
    }

    if (needsInitialClaim) {
      if (adminPassword.trim().length < 4) {
        setAuthError('A senha inicial do administrador deve ter pelo menos 4 caracteres.');
        soundManager.playError();
        return;
      }
      if (adminPassword !== adminConfirmPassword) {
        setAuthError('As senhas digitadas não coincidem.');
        soundManager.playError();
        return;
      }
    }

    setIsSubmittingAuth(true);
    try {
      const res = needsInitialClaim
        ? await claimAdminAccess(adminEmail, adminPassword)
        : await loginAdminAccess(adminEmail, adminPassword);

      if (res.success && res.admin && res.token) {
        soundManager.playSuccess();
        setAuthSuccess(
          needsInitialClaim
            ? 'Senha inicial configurada e acesso administrativo liberado!'
            : 'Acesso administrativo autorizado!'
        );
        setNeedsInitialClaim(false);
        setIsAdminAuthenticated(true);
        setAdminPassword('');
        setAdminConfirmPassword('');
        onAdminLoginSuccess?.(res.admin, res.token);
      } else {
        if ('needsSetup' in res && res.needsSetup) {
          setNeedsInitialClaim(true);
        }
        soundManager.playError();
        setAuthError(res.message || 'E-mail ou senha de administrador inválidos.');
      }
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // Calculate filtered students
  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return usersList.filter((student) => {
      // Exclude admin role accounts from student list view
      if (student.role === 'admin') {
        return false;
      }

      const matchSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q) ||
        (student.school && student.school.toLowerCase().includes(q)) ||
        (student.state && student.state.toLowerCase().includes(q)) ||
        (student.studyTarget && student.studyTarget.toLowerCase().includes(q));

      const matchGrade =
        selectedGradeFilter === 'all' ||
        (selectedGradeFilter === 'essays'
          ? getStudentEssays(student.id).length > 0
          : student.grade === selectedGradeFilter);

      return matchSearch && matchGrade;
    });
  }, [usersList, searchQuery, selectedGradeFilter]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const studentsOnly = usersList.filter((u) => u.role !== 'admin');

    let totalXp = 0;
    let totalEssays = 0;
    let totalEssayScoreSum = 0;
    let activeStreaks = 0;

    studentsOnly.forEach((st) => {
      const stats = getStudentStats(st.id);
      totalXp += stats.xp || 0;
      if (stats.streakDays && stats.streakDays > 0) activeStreaks++;

      const essays = getStudentEssays(st.id);
      totalEssays += essays.length;
      essays.forEach((es) => {
        totalEssayScoreSum += es.scores.total;
      });
    });

    const avgEssayScore = totalEssays > 0 ? Math.round(totalEssayScoreSum / totalEssays) : 0;
    const avgXp = studentsOnly.length > 0 ? Math.round(totalXp / studentsOnly.length) : 0;

    return {
      totalStudents: studentsOnly.length,
      totalXp,
      avgXp,
      totalEssays,
      avgEssayScore,
      activeStreaks,
    };
  }, [usersList]);

  // All student essays flattened for the Essays Review tab
  const allStudentEssays = useMemo(() => {
    const list: { student: StudentUser; essay: EssaySubmission }[] = [];
    usersList.forEach((st) => {
      if (st.role !== 'admin') {
        const essays = getStudentEssays(st.id);
        essays.forEach((essay) => {
          list.push({ student: st, essay });
        });
      }
    });
    return list.sort(
      (a, b) => new Date(b.essay.createdAt).getTime() - new Date(a.essay.createdAt).getTime()
    );
  }, [usersList]);

  // Security Gate: Render login if not verified as admin
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 animate-fade-in space-y-6">
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToApp();
          }}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Floresta</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {needsInitialClaim ? 'Configuração Inicial • Primeiro Acesso' : 'Acesso Restrito • Gestão Pedagógica'}
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {needsInitialClaim ? 'Definir Senha do Administrador' : 'Painel do Administrador'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                {needsInitialClaim
                  ? 'Nenhuma senha de administrador foi configurada no servidor ainda. Um dos e-mails autorizados pode definir a senha inicial agora.'
                  : 'Apenas administradores autorizados podem acessar este painel para monitorar o progresso dos alunos e gerenciar contas.'}
              </p>
            </div>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-email-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                E-mail do Administrador Autorizado:
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email-input"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Digite seu e-mail autorizado"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-passcode-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {needsInitialClaim ? 'Criar Senha Administrativa:' : 'Senha de Acesso:'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-passcode-input"
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder={needsInitialClaim ? 'Defina uma senha (mín. 4 caracteres)' : 'Digite a senha de administrador'}
                  autoComplete={needsInitialClaim ? 'new-password' : 'current-password'}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {needsInitialClaim && (
              <div className="space-y-1.5">
                <label htmlFor="admin-confirm-passcode-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Confirmar Senha Administrativa:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="admin-confirm-passcode-input"
                    type={showPassword ? 'text' : 'password'}
                    value={adminConfirmPassword}
                    onChange={(e) => setAdminConfirmPassword(e.target.value)}
                    placeholder="Repita a senha escolhida"
                    autoComplete="new-password"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            )}

            <button
              id="admin-verify-btn"
              type="submit"
              disabled={isCheckingAuth || isSubmittingAuth}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isSubmittingAuth
                  ? 'Verificando...'
                  : needsInitialClaim
                  ? 'Definir Senha & Acessar Painel'
                  : 'Desbloquear Acesso de Administrador'}
              </span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Administrator View
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8 animate-fade-in">
      
      {/* Top Bar with Admin Identity & Exit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-xl font-bold shadow-md">
            🛡️
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg text-white">
                Painel do Administrador & Coordenação
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {currentUser?.name || 'GESTOR MASTER'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {currentUser?.email ? `Conectado como ${currentUser.email} • ` : ''}
              Visualização de contas de alunos, acompanhamento de notas de redação e progresso.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToApp();
            }}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center space-x-1.5 border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Floresta</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setIsAdminAuthenticated(false);
              setAdminEmail('');
              setAdminPassword('');
              setAuthError('');
              setAuthSuccess('');
              onAdminLogout?.();
            }}
            className="px-4 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-colors flex items-center space-x-1.5 border border-rose-500/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Encerrar Sessão Admin</span>
          </button>
        </div>
      </div>

      {/* Aggregate Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">Estudantes</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading text-2xl font-black text-slate-900 dark:text-white">
            {metrics.totalStudents}
          </div>
          <p className="text-[10px] text-slate-400">Contas cadastradas ativas</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">Redações Avaliadas</span>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading text-2xl font-black text-slate-900 dark:text-white">
            {metrics.totalEssays}
          </div>
          <p className="text-[10px] text-slate-400">Corrigidas pelo laboratório IA</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">Média de Redação</span>
            <GraduationCap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="font-heading text-2xl font-black text-amber-600 dark:text-amber-400">
            {metrics.avgEssayScore} <span className="text-xs text-slate-400 font-normal">/1000</span>
          </div>
          <p className="text-[10px] text-slate-400">Desempenho ENEM da turma</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">Total XP Turma</span>
            <Trophy className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="font-heading text-2xl font-black text-slate-900 dark:text-white">
            {metrics.totalXp}
          </div>
          <p className="text-[10px] text-slate-400">Média {metrics.avgXp} XP / aluno</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold">Ofensivas Ativas</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="font-heading text-2xl font-black text-orange-600 dark:text-orange-400">
            {metrics.activeStreaks} alunos
          </div>
          <p className="text-[10px] text-slate-400">Estudando diariamente</p>
        </div>
      </div>

      {/* Tabs Selector for Admin Sections */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => {
            soundManager.playClick();
            setAdminTab('students');
          }}
          className={`py-2 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
            adminTab === 'students'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Gestão de Alunos & Acesso às Contas ({metrics.totalStudents})</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setAdminTab('essays');
          }}
          className={`py-2 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
            adminTab === 'essays'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Banco de Redações dos Alunos ({allStudentEssays.length})</span>
        </button>
      </div>

      {/* TAB 1: STUDENTS DIRECTORY & DIRECT ACCOUNT ACCESS */}
      {adminTab === 'students' && (
        <div className="space-y-4">
          
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar estudante por nome, e-mail, CETI/escola ou estado..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setSelectedGradeFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedGradeFilter === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedGradeFilter('3º Ano EM')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedGradeFilter === '3º Ano EM'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                3º Ano EM
              </button>
              <button
                onClick={() => setSelectedGradeFilter('2º Ano EM')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedGradeFilter === '2º Ano EM'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                2º Ano EM
              </button>
              <button
                onClick={() => setSelectedGradeFilter('essays')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedGradeFilter === 'essays'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                ✍️ Com Redações
              </button>
            </div>
          </div>

          {/* Notice about Administrator Privilege */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 p-4 rounded-3xl flex items-start space-x-3 text-xs text-amber-900 dark:text-amber-200">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Privilégio Exclusivo do Administrador:</span> Você pode clicar em <strong>"Acessar Conta do Aluno"</strong> em qualquer estudante para entrar diretamente na conta dele e visualizar seu painel e progresso exatamente como ele enxerga. Para retornar ao painel admin a qualquer momento, use a barra superior.
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStudents.map((student) => {
              const stats = getStudentStats(student.id);
              const essays = getStudentEssays(student.id);
              const enrolledSubjectIds = student.favoriteSubjects || ALL_SUBJECT_IDS;

              return (
                <div
                  key={student.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 dark:hover:border-amber-500 transition-all space-y-4"
                >
                  {/* Student Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <AnimalAvatar animalId={student.favoriteAnimal} size="md" />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                            {student.name}
                          </h4>
                          {student.isVerifiedStudent && (
                            <span title="Estudante Verificado (Rede Pública / Institucional)">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {student.email}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                          {student.school || 'Ensino Médio'} • {student.state}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {student.grade}
                      </span>
                    </div>
                  </div>

                  {/* Student Progress Stats Pills */}
                  <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-center">
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl">
                      <span className="text-[10px] text-slate-500 block">Nível & XP</span>
                      <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">
                        Nv.{stats.level} ({stats.xp}xp)
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl">
                      <span className="text-[10px] text-slate-500 block">Ofensiva</span>
                      <span className="font-bold text-xs text-orange-600 dark:text-orange-400 flex items-center justify-center space-x-0.5">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        <span>{stats.streakDays || 0}d</span>
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl">
                      <span className="text-[10px] text-slate-500 block">Redações</span>
                      <span className="font-bold text-xs text-amber-600 dark:text-amber-400">
                        {essays.length > 0 ? `${essays.length} (${essays[0].scores.total}p)` : '0'}
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl">
                      <span className="text-[10px] text-slate-500 block">Matérias</span>
                      <span className="font-bold text-xs text-slate-700 dark:text-slate-200">
                        {enrolledSubjectIds.length}/12
                      </span>
                    </div>
                  </div>

                  {/* Enrolled Subjects Micro-Chips */}
                  <div className="text-[10px] text-slate-500 flex flex-wrap gap-1 items-center">
                    <span className="font-semibold text-slate-400">Foco:</span>
                    {enrolledSubjectIds.slice(0, 5).map((id) => (
                      <span
                        key={id}
                        className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300 font-medium capitalize"
                      >
                        {id}
                      </span>
                    ))}
                    {enrolledSubjectIds.length > 5 && (
                      <span className="text-slate-400 font-medium">
                        +{enrolledSubjectIds.length - 5} outras
                      </span>
                    )}
                  </div>

                  {/* Administrator Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedStudentForDetail(student);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center space-x-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Ver Progresso</span>
                      </button>

                      {confirmDeleteId === student.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              soundManager.playClick();
                              deleteStudentAccount(student.id);
                              setUsersList(getRegisteredUsers());
                              setConfirmDeleteId(null);
                              if (selectedStudentForDetail?.id === student.id) {
                                setSelectedStudentForDetail(null);
                              }
                            }}
                            className="px-2.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playClick();
                            setConfirmDeleteId(student.id);
                          }}
                          title="Remover esta conta de estudante"
                          className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playSuccess();
                        onImpersonateStudent(student);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-sm transition-all active:scale-95 flex items-center space-x-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Acessar Conta do Aluno</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStudents.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-xl">
                {metrics.totalStudents === 0 ? '🌱' : '🔍'}
              </div>
              <h4 className="font-heading font-bold text-slate-800 dark:text-slate-200">
                {metrics.totalStudents === 0
                  ? 'Nenhum estudante cadastrado até o momento'
                  : 'Nenhum estudante encontrado com este filtro'}
              </h4>
              <p className="text-xs text-slate-500">
                {metrics.totalStudents === 0
                  ? 'Assim que alunos reais criarem suas contas na Área de Cadastro, eles aparecerão aqui.'
                  : 'Tente buscar por outro termo ou limpe os filtros para visualizar os alunos cadastrados.'}
              </p>
              {metrics.totalStudents > 0 && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedGradeFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold"
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL ESSAYS REVIEW */}
      {adminTab === 'essays' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Todas as Redações Corrigidas pela IA ({allStudentEssays.length})
            </h3>
            <span className="text-xs text-slate-500">
              Critérios oficiais do ENEM (Competências C1 a C5)
            </span>
          </div>

          <div className="space-y-4">
            {allStudentEssays.map(({ student, essay }) => (
              <div
                key={essay.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <AnimalAvatar animalId={student.favoriteAnimal} size="sm" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                          {student.name}
                        </span>
                        <span className="text-[10px] text-slate-500">({student.school || student.grade})</span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        Tema: <span className="text-slate-800 dark:text-slate-200">{essay.theme}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-heading font-black text-xl text-emerald-600 dark:text-emerald-400">
                        {essay.scores.total} <span className="text-xs text-slate-400 font-normal">/1000</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold">
                        {essay.feedback.levelLabel}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundManager.playSuccess();
                        onImpersonateStudent(student);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center space-x-1"
                      title="Entrar na conta deste aluno para ver sua folha pautada"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Acessar Aluno</span>
                    </button>
                  </div>
                </div>

                {/* Essay Title and text preview */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <h5 className="font-heading font-bold text-xs text-slate-900 dark:text-white italic">
                    "{essay.title || 'Redação Sem Título'}"
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-serif line-clamp-4">
                    {essay.content}
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 pt-1">
                    <span>{essay.wordCount} palavras</span>
                    <span>•</span>
                    <span>{essay.lineCount} linhas</span>
                    <span>•</span>
                    <span>Enviada em: {new Date(essay.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                {/* 5 Competencies Score Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-[10px] text-slate-500 block font-semibold">C1: Norma Culta</span>
                    <span className="font-bold text-slate-900 dark:text-white">{essay.scores.c1.score} / 200</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-[10px] text-slate-500 block font-semibold">C2: Repertório</span>
                    <span className="font-bold text-slate-900 dark:text-white">{essay.scores.c2.score} / 200</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-[10px] text-slate-500 block font-semibold">C3: Projeto/Tese</span>
                    <span className="font-bold text-slate-900 dark:text-white">{essay.scores.c3.score} / 200</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-[10px] text-slate-500 block font-semibold">C4: Coesão</span>
                    <span className="font-bold text-slate-900 dark:text-white">{essay.scores.c4.score} / 200</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block font-semibold">C5: Intervenção</span>
                    <span className="font-bold text-slate-900 dark:text-white">{essay.scores.c5.score} / 200</span>
                  </div>
                </div>

                {/* Quati Tip / Feedback */}
                {essay.feedback.quatiTip && (
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
                    <span className="text-base">🦝</span>
                    <div>
                      <span className="font-bold">Orientação do Mascote Quati Quirino: </span>
                      <span>{essay.feedback.quatiTip}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {allStudentEssays.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-2">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-heading font-bold text-slate-800 dark:text-slate-200">
                  Nenhuma redação enviada até o momento
                </h4>
                <p className="text-xs text-slate-500">
                  As redações escritas e corrigidas pela IA na matéria de Português aparecerão aqui para monitoramento pedagógico.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DETAILED STUDENT PROGRESS MODAL (INSPECTOR) */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <AnimalAvatar animalId={selectedStudentForDetail.favoriteAnimal} size="md" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading font-extrabold text-lg text-white">
                      {selectedStudentForDetail.name}
                    </h3>
                    {selectedStudentForDetail.isVerifiedStudent && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-mono">
                    {selectedStudentForDetail.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <span className="text-slate-400 block text-[10px]">Escola / CETI:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedStudentForDetail.school || 'Não informado'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <span className="text-slate-400 block text-[10px]">Série:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedStudentForDetail.grade}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <span className="text-slate-400 block text-[10px]">Estado:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedStudentForDetail.state}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl sm:col-span-2">
                  <span className="text-slate-400 block text-[10px]">Foco / Objetivo de Estudo:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedStudentForDetail.studyTarget}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <span className="text-slate-400 block text-[10px]">Cadastro Realizado em:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedStudentForDetail.createdAt}
                  </span>
                </div>
              </div>

              {/* Progress and Gamification Stats */}
              {(() => {
                const stats = getStudentStats(selectedStudentForDetail.id);
                const essays = getStudentEssays(selectedStudentForDetail.id);
                return (
                  <div className="space-y-4">
                    <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span>Estatísticas de Aprendizado & Gamificação</span>
                    </h4>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                        <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold block">Nível e XP</span>
                        <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                          Nv. {stats.level}
                        </span>
                        <span className="text-[10px] text-slate-500 block">{stats.xp} XP total</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800">
                        <span className="text-[10px] text-orange-800 dark:text-orange-300 font-bold block">Sequência (Ofensiva)</span>
                        <span className="text-lg font-black text-orange-600 dark:text-orange-400 flex items-center justify-center space-x-1">
                          <Flame className="w-4 h-4 fill-orange-500" />
                          <span>{stats.streakDays || 0}d</span>
                        </span>
                        <span className="text-[10px] text-slate-500 block">Recorde: {stats.bestStreak || stats.streakDays || 0}d</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                        <span className="text-[10px] text-amber-800 dark:text-amber-300 font-bold block">Quizzes Respondidos</span>
                        <span className="text-lg font-black text-amber-700 dark:text-amber-400">
                          {Object.keys(stats.completedQuizzes || {}).length}
                        </span>
                        <span className="text-[10px] text-slate-500 block">Com acertos computados</span>
                      </div>
                    </div>

                    {/* Essays History Section */}
                    <div className="space-y-3 pt-2">
                      <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>Redações ENEM Realizadas ({essays.length})</span>
                      </h4>

                      {essays.length > 0 ? (
                        <div className="space-y-2.5">
                          {essays.map((es) => (
                            <div
                              key={es.id}
                              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {es.title || es.theme}
                                </span>
                                <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                                  {es.scores.total} pts
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-2">
                                {es.content}
                              </p>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                                <span>{es.wordCount} palavras • {es.lineCount} linhas</span>
                                <span>{new Date(es.createdAt).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">
                          O aluno ainda não enviou redações no laboratório de português.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedStudentForDetail(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                Fechar
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSuccess();
                  const target = selectedStudentForDetail;
                  setSelectedStudentForDetail(null);
                  onImpersonateStudent(target);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Acessar a Conta deste Estudante Agora</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
