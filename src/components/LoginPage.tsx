import React, { useState } from 'react';
import { StudentUser, SubjectId, GradeLevel } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { soundManager } from '../utils/soundEffects';
import { saveStoredUser, registerStudentUser, authenticateUser, ALL_SUBJECT_IDS } from '../utils/authManager';
import { SUBJECTS_DATA } from '../data/animalsAndSubjects';
import confetti from 'canvas-confetti';
import {
  LogIn,
  UserPlus,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Trees,
  BookOpen,
  Compass,
  ArrowRight,
  AlertCircle,
  GraduationCap,
  Layers,
  Check,
} from 'lucide-react';

interface LoginPageProps {
  currentUser: StudentUser | null;
  initialTab?: 'login' | 'register';
  onLoginSuccess: (user: StudentUser) => void;
  onBackToHome: () => void;
}

const GUARDIAN_OPTIONS: { id: SubjectId | 'guilherme'; name: string; title: string }[] = [
  { id: 'guilherme', name: 'Onça-Pintada', title: 'Mestre da Floresta' },
  { id: 'artes', name: 'Uirapuru Ulisses', title: 'Guardião das Artes' },
  { id: 'biologia', name: 'Rã-de-Vidro Rafaela', title: 'Guardiã da Biologia' },
  { id: 'espanhol', name: 'Macaco-de-cheiro', title: 'Guardião do Espanhol' },
  { id: 'filosofia', name: 'Borboleta Morpho', title: 'Guardiã da Filosofia' },
  { id: 'fisica', name: 'Queixada Quintino', title: 'Guardião da Física' },
  { id: 'geografia', name: 'Ariranha Arthur', title: 'Guardião da Geografia' },
  { id: 'historia', name: 'Harpia Helena', title: 'Guardiã da História' },
  { id: 'ingles', name: 'Coruja Olívia', title: 'Guardião do Inglês' },
  { id: 'matematica', name: 'Onça-Pintada (Matemática)', title: 'Guardiã da Matemática' },
  { id: 'portugues', name: 'Quati Quirino', title: 'Guardião do Português & Redação' },
  { id: 'quimica', name: 'Tartaruga Tarsila', title: 'Guardiã da Química' },
  { id: 'sociologia', name: 'Acará-disco', title: 'Guardião da Sociologia' },
];

const GRADE_OPTIONS: GradeLevel[] = [
  '1º Ano EM',
  '2º Ano EM',
  '3º Ano EM',
  'Pré-Vestibular / ENEM',
];

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  initialTab = 'login',
  onLoginSuccess,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login Form States
  const [loginEmail, setLoginEmail] = useState(currentUser?.email || '');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regGrade, setRegGrade] = useState<GradeLevel>('3º Ano EM');
  const [regSchool, setRegSchool] = useState('');
  const [regState, setRegState] = useState('PI - Piauí');
  const [regAnimal, setRegAnimal] = useState<SubjectId | 'guilherme'>('guilherme');
  const [regTarget, setRegTarget] = useState('ENEM & Vestibulares 2026');
  const [regSubjects, setRegSubjects] = useState<SubjectId[]>(ALL_SUBJECT_IDS);

  const toggleSubject = (subId: SubjectId) => {
    soundManager.playClick();
    setRegSubjects((prev) =>
      prev.includes(subId) ? prev.filter((id) => id !== subId) : [...prev, subId]
    );
  };

  const handleSelectAllSubjects = () => {
    soundManager.playClick();
    setRegSubjects(ALL_SUBJECT_IDS);
  };

  const handleClearSubjects = () => {
    soundManager.playClick();
    setRegSubjects([]);
  };

  // Synchronize activeTab if initialTab changes
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail.trim()) {
      setErrorMsg('Por favor, informe seu e-mail institucional ou cadastrado.');
      soundManager.playError();
      return;
    }

    if (!loginPassword) {
      setErrorMsg('Por favor, digite sua senha de acesso.');
      soundManager.playError();
      return;
    }

    const authResult = await authenticateUser(loginEmail, loginPassword);
    if (!authResult.success || !authResult.user) {
      setErrorMsg(authResult.message || 'Falha no login. Verifique se o e-mail e senha estão corretos.');
      soundManager.playError();
      return;
    }

    const loggedUser = authResult.user;

    soundManager.unlockAudio();
    soundManager.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    saveStoredUser(loggedUser);
    setSuccessMsg(`Login efetuado com sucesso! Boas-vindas de volta, ${loggedUser.name}!`);
    setTimeout(() => {
      onLoginSuccess(loggedUser);
    }, 450);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim()) {
      setErrorMsg('Por favor, informe seu nome completo.');
      soundManager.playError();
      return;
    }

    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMsg('Por favor, informe um e-mail válido.');
      soundManager.playError();
      return;
    }

    if (regPassword.length < 4) {
      setErrorMsg('A senha deve ter pelo menos 4 caracteres.');
      soundManager.playError();
      return;
    }

    if (regConfirmPassword && regPassword !== regConfirmPassword) {
      setErrorMsg('As senhas não coincidem. Digite a mesma senha em ambos os campos.');
      soundManager.playError();
      return;
    }

    const regResult = await registerStudentUser(
      {
        id: `user-${Date.now()}`,
        name: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        school: regSchool.trim() || 'Escola do Ensino Médio',
        state: regState,
        grade: regGrade,
        favoriteAnimal: regAnimal,
        favoriteSubjects: regSubjects.length > 0 ? regSubjects : ALL_SUBJECT_IDS,
        studyTarget: regTarget || 'ENEM & Vestibulares',
        isVerifiedStudent: regEmail.includes('.edu.') || regEmail.includes('.gov.br'),
        createdAt: new Date().toISOString().split('T')[0],
      },
      regPassword
    );

    if (!regResult.success || !regResult.user) {
      setErrorMsg(regResult.message || 'Não foi possível concluir o cadastro.');
      soundManager.playError();
      return;
    }

    const newUser = regResult.user;

    soundManager.unlockAudio();
    soundManager.playLevelUp();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setSuccessMsg(`Conta criada com sucesso! Boas-vindas à Floresta, ${newUser.name}! Suas disciplinas foram salvas.`);
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 500);
  };

  const handleGuestLogin = () => {
    soundManager.playClick();
    const guestUser: StudentUser = {
      id: `guest-${Date.now()}`,
      name: 'Explorador Convidado',
      email: 'visitante@floresta.edu.br',
      school: 'Acesso Visitante',
      state: 'Brasil',
      grade: '3º Ano EM',
      favoriteAnimal: 'guilherme',
      studyTarget: 'Exploração Geral',
      isVerifiedStudent: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    saveStoredUser(guestUser);
    onLoginSuccess(guestUser);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-8 animate-fade-in">
      
      {/* Top Breadcrumb & Return Button */}
      <div className="flex items-center justify-between">
        <button
          id="login-back-to-home-btn"
          onClick={() => {
            soundManager.playClick();
            onBackToHome();
          }}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Floresta</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Ambiente Escolar Seguro • Ensino Médio</span>
        </div>
      </div>

      {/* Hero Welcome Banner for Login/Register */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-700/60">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{activeTab === 'register' ? 'Área de Cadastro Oficial' : 'Portal do Estudante'}</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              {activeTab === 'register' ? 'Área de Cadastro do Aluno' : 'Identificação do Estudante'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              {activeTab === 'register'
                ? 'Cadastre-se gratuitamente para salvar seu progresso, acumular XP com os guardiões da fauna e se preparar para o ENEM.'
                : 'Entre com sua conta escolar institucional ou crie seu cadastro para salvar seus pontos de experiência (XP), medalhas e ofensiva de estudos.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30">
            <AnimalAvatar animalId="guilherme" size="lg" />
            <div className="text-left">
              <div className="font-heading font-bold text-amber-300 text-sm">
                Onça-Pintada
              </div>
              <div className="text-[11px] text-emerald-200">
                {activeTab === 'register' ? 'Faça seu cadastro e receba mentoria!' : 'Identifique-se para acumular XP!'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Login / Register Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        
        {/* Tab Toggle Navigation */}
        <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <button
            id="tab-login-btn"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-4 px-6 text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'login'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Já tenho Conta (Entrar)</span>
          </button>

          <button
            id="tab-register-btn"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-4 px-6 text-sm font-bold flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'register'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-extrabold">Área de Cadastro (Criar Conta)</span>
          </button>
        </div>

        {/* Notifications */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center space-x-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center space-x-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  E-mail do Estudante / Institucional:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-email-input"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ex: seu.nome@escola.edu.br"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Aceita e-mails institucionais estaduais (.gov.br / .edu.br) e contas pessoais.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Senha de Acesso:
                  </label>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
                    Esqueceu a senha?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Digite sua senha de acesso"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Lembrar meu login neste dispositivo</span>
                </label>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  id="submit-login-btn"
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Entrar na Floresta do Saber</span>
                </button>

                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 pt-1">
                  <span>Ou prefere testar antes?</span>
                  <button
                    type="button"
                    onClick={handleGuestLogin}
                    className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Continuar como Convidado
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              
              {/* Registration Banner & Value Props */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="p-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      <UserPlus className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-emerald-950 dark:text-emerald-300">
                        Área de Cadastro do Estudante
                      </h3>
                      <p className="text-xs text-emerald-800 dark:text-emerald-400">
                        100% Gratuito • Ensino Médio & Pré-Vestibular
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                  <div className="bg-white/80 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-emerald-100 dark:border-slate-700 flex items-center space-x-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Salva XP e Níveis</span>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-emerald-100 dark:border-slate-700 flex items-center space-x-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Sequência Diária</span>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-emerald-100 dark:border-slate-700 flex items-center space-x-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Mascote Guardião</span>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-emerald-100 dark:border-slate-700 flex items-center space-x-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Simulados ENEM</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nome Completo do Estudante: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-name-input"
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="ex: Seu nome completo"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    E-mail Institucional ou Pessoal: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="reg-email-input"
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="ex: seu.nome@escola.edu.br"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <p className="text-[11px] text-slate-500">
                    E-mails institucionais estaduais (.gov.br / .edu.br) ganham o selo de Estudante Verificado.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Série / Ano Escolar: <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={regGrade}
                    onChange={(e) => setRegGrade(e.target.value as GradeLevel)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Estado / Rede de Ensino:
                  </label>
                  <input
                    type="text"
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                    placeholder="ex: PI - Piauí"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nome da Escola / CETI:
                  </label>
                  <input
                    type="text"
                    value={regSchool}
                    onChange={(e) => setRegSchool(e.target.value)}
                    placeholder="ex: CETI Ensino Médio"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Criar Senha de Acesso: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo de 4 caracteres"
                      className="w-full px-4 py-3 pr-10 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confirmar Senha: <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-confirm-password-input"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repita sua senha"
                      className={`w-full px-4 py-3 pr-10 bg-slate-50 dark:bg-slate-800/80 border rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                        regConfirmPassword && regPassword !== regConfirmPassword
                          ? 'border-rose-400 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {regConfirmPassword && regPassword === regConfirmPassword && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Senhas conferem!</span>
                    </p>
                  )}
                  {regConfirmPassword && regPassword !== regConfirmPassword && (
                    <p className="text-[11px] text-rose-500">
                      As senhas não coincidem ainda.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Principal Objetivo de Estudos:
                </label>
                <input
                  type="text"
                  value={regTarget}
                  onChange={(e) => setRegTarget(e.target.value)}
                  placeholder="ex: ENEM 2026 / Medicina / Engenharia / Ciências Humanas"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* All 12 High School Subjects Selection Section */}
              <div className="space-y-3 pt-2 bg-slate-50/70 dark:bg-slate-800/40 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white">
                        Matérias de Foco do Ensino Médio (12 Disciplinas)
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Marque as matérias que você estuda ou deseja priorizar para o ENEM e Vestibulares:
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 self-end sm:self-auto">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {regSubjects.length} de {SUBJECTS_DATA.length} selecionadas
                    </span>
                    <button
                      type="button"
                      onClick={handleSelectAllSubjects}
                      className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Marcar Todas
                    </button>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <button
                      type="button"
                      onClick={handleClearSubjects}
                      className="text-[11px] font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline cursor-pointer"
                    >
                      Limpar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
                  {SUBJECTS_DATA.map((subject) => {
                    const isChecked = regSubjects.includes(subject.id);
                    return (
                      <button
                        key={subject.id}
                        type="button"
                        onClick={() => toggleSubject(subject.id)}
                        className={`p-3 rounded-2xl border text-left cursor-pointer transition-all select-none relative flex flex-col justify-between ${
                          isChecked
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/50 shadow-xs'
                            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-90 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <AnimalAvatar animalId={subject.id} size="sm" />
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <div className="font-heading font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1">
                            <span>{subject.name}</span>
                            {subject.id === 'portugues' && (
                              <span className="text-[9px] bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-1 rounded font-bold">
                                + Redação
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {subject.category}
                          </div>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[9px] text-emerald-700 dark:text-emerald-400 font-semibold truncate">
                          🐾 {subject.animal.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animal Mascot Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Escolha seu Animal Guardião Companheiro:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {GUARDIAN_OPTIONS.map((opt) => {
                    const isSelected = regAnimal === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setRegAnimal(opt.id);
                        }}
                        className={`p-2.5 rounded-2xl border text-center flex flex-col items-center space-y-1.5 transition-all ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500 text-emerald-950 dark:text-emerald-200'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-300'
                        }`}
                      >
                        <AnimalAvatar animalId={opt.id} size="sm" />
                        <span className="text-[11px] font-bold truncate max-w-full">
                          {opt.name.split(' ')[0]}
                        </span>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {opt.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3">
                <button
                  id="submit-register-btn"
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center space-x-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Concluir Cadastro & Começar a Estudar</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
