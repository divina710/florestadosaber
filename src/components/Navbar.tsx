import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Trees,
  BookOpen,
  Trophy,
  Compass,
  Flame,
  Moon,
  Sun,
  Sliders,
  Check,
  User,
  LogIn,
  UserPlus,
  ShieldCheck,
  Crown,
  Lock,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { UserStats, StudentUser } from '../types';

interface NavbarProps {
  activeView: 'welcome' | 'subjects' | 'subject-detail' | 'challenge' | 'login' | 'register' | 'admin' | 'ranking';
  onNavigate: (view: 'welcome' | 'subjects' | 'challenge' | 'login' | 'register' | 'admin' | 'ranking') => void;
  userStats: UserStats;
  currentUser?: StudentUser | null;
  onOpenProfile: () => void;
  onOpenStreak: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  ambientEnabled: boolean;
  onToggleAmbient: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedSubjectName?: string;
  onReturnToSubject?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  userStats,
  currentUser,
  onOpenProfile,
  onOpenStreak,
  onOpenLogin,
  onOpenRegister,
  onOpenAdmin,
  soundEnabled,
  onToggleSound,
  ambientEnabled,
  onToggleAmbient,
  isDarkMode,
  onToggleDarkMode,
  selectedSubjectName,
  onReturnToSubject,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(soundManager.ambientVolume);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAmbientVolume(val);
    soundManager.setAmbientVolume(val);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-950/50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('welcome')} id="brand-logo-btn">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white text-xl sm:text-2xl transform transition-transform hover:scale-105 border border-amber-200">
              🐆
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-emerald-900 dark:text-emerald-300 tracking-tight">
                  Floresta do Saber
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
                  Ensino Médio
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
                Com o Mascote Onça-Pintada & Guardiões da Fauna
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Navegação Principal">
            <button
              id="nav-welcome-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('welcome');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeView === 'welcome'
                  ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Apresentação</span>
            </button>

            <button
              id="nav-subjects-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('subjects');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeView === 'subjects'
                  ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Matérias (A-Z)</span>
            </button>

            {activeView === 'subject-detail' && selectedSubjectName && (
              <button
                id="nav-subject-active-btn"
                onClick={() => {
                  soundManager.playClick();
                  if (onReturnToSubject) onReturnToSubject();
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300 shadow-xs animate-pulse"
              >
                <Trees className="w-4 h-4 text-amber-600" />
                <span>Sala: {selectedSubjectName}</span>
              </button>
            )}

            <button
              id="nav-challenge-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('challenge');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeView === 'challenge'
                  ? 'bg-orange-100 text-orange-900 dark:bg-orange-950/40 dark:text-orange-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Desafio</span>
            </button>

            <button
              id="nav-ranking-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('ranking');
              }}
              title={currentUser ? 'Ver Ranking da Selva (Top 10 Global)' : 'Ranking da Selva (Exclusivo para usuários logados)'}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeView === 'ranking'
                  ? 'bg-amber-100/90 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-500" />
              <span>Ranking</span>
              {!currentUser && <Lock className="w-3 h-3 text-slate-400" />}
            </button>

            <button
              id="nav-register-btn"
              onClick={() => {
                soundManager.playClick();
                onNavigate('register');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeView === 'register' || activeView === 'login'
                  ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Cadastro</span>
            </button>

            {/* Administrator Portal Button */}
            <button
              id="nav-admin-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenAdmin();
              }}
              title="Acesso exclusivo da Coordenação Pedagógica e Administrador"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeView === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Action Tools: Sound, Streak, Theme & XP Stats */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* Audio Toggles & Forest Ambient Sound */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
              {/* Sound FX Toggle */}
              <button
                id="toggle-sound-fx-btn"
                onClick={onToggleSound}
                title={soundEnabled ? 'Efeitos sonoros ativados' : 'Efeitos sonoros desativados'}
                className={`p-1.5 rounded-lg transition-colors ${
                  soundEnabled ? 'text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-400'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Ambient Forest Sound Toggle */}
              <button
                id="toggle-ambient-btn"
                onClick={onToggleAmbient}
                title={
                  ambientEnabled
                    ? 'Som da floresta ativo (brisa, grilos e pássaros) - Clique para pausar'
                    : 'Ativar som ambiente da floresta tropical'
                }
                className={`p-1.5 rounded-lg transition-all flex items-center space-x-1 text-xs ${
                  ambientEnabled
                    ? 'text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-700 shadow-xs font-semibold ring-2 ring-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Trees className="w-4 h-4" />
                  {ambientEnabled && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-[10px]">
                  {ambientEnabled ? 'Floresta ON 🍃' : 'Floresta'}
                </span>
              </button>

              {/* Volume Slider Trigger */}
              {ambientEnabled && (
                <button
                  onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  title="Ajustar volume do som da floresta"
                  className="p-1 rounded-lg text-emerald-600 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700"
                >
                  <Sliders className="w-3 h-3" />
                </button>
              )}

              {/* Popover Volume Slider */}
              {showVolumeSlider && ambientEnabled && (
                <div className="absolute top-12 left-0 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl shadow-xl space-y-2 w-48 animate-scale-up">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-200">
                    <span>Volume Floresta</span>
                    <span className="text-emerald-500">{Math.round(ambientVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={ambientVolume}
                    onChange={handleVolumeChange}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400 text-center">Brisa, cigarras e pássaros</div>
                </div>
              )}
            </div>

            {/* Dark Mode / Night Mode Toggle */}
            <button
              id="toggle-dark-mode-btn"
              onClick={() => {
                soundManager.playClick();
                onToggleDarkMode();
              }}
              title={isDarkMode ? 'Modo Noturno ativado (clique para modo claro)' : 'Ativar Modo Noturno'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-500 dark:text-amber-400 hover:scale-105 transition-transform"
            >
              {isDarkMode ? <Moon className="w-4 h-4 fill-amber-400 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-600" />}
            </button>

            {/* Interactive Streak Counter Button */}
            <button
              id="navbar-streak-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenStreak();
              }}
              title="Clique para ver sua Sequência Diária e fazer Check-in"
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border font-semibold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer ${
                userStats.todayCheckedIn
                  ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800/80 shadow-orange-500/10'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 animate-pulse'
              }`}
            >
              <Flame className={`w-4 h-4 ${userStats.todayCheckedIn ? 'text-orange-500 fill-orange-500' : 'text-amber-500 fill-amber-500'}`} />
              <span className="font-bold">{userStats.streakDays || 0}d</span>
              {userStats.todayCheckedIn ? (
                <span className="hidden sm:inline-block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.2 rounded-md">
                  ✓ Hoje
                </span>
              ) : (
                <span className="hidden sm:inline-block text-[10px] text-orange-700 dark:text-orange-300 font-bold bg-orange-100 dark:bg-orange-900/60 px-1.5 py-0.2 rounded-md">
                  Check-in!
                </span>
              )}
            </button>

            {/* XP & Profile Button */}
            <button
              id="user-profile-badge-btn"
              onClick={() => {
                soundManager.playClick();
                onOpenProfile();
              }}
              title="Ver nível e conquistas de XP do estudante"
              className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-700/20 transition-transform active:scale-95"
            >
              <Trophy className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
              <div className="text-left leading-tight hidden xs:block sm:block">
                <div className="text-[9px] sm:text-[10px] text-emerald-100 font-normal uppercase tracking-wider">Nível {userStats.level}</div>
                <div className="font-bold">{userStats.xp} XP</div>
              </div>
            </button>

          </div>
        </div>

        {/* Mobile Navigation bar with Streak and Register inclusion */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium">
          <button
            onClick={() => onNavigate('welcome')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeView === 'welcome' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Compass className="w-4 h-4 mb-0.5" />
            <span>Início</span>
          </button>
          <button
            onClick={() => onNavigate('subjects')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeView === 'subjects' || activeView === 'subject-detail' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>Matérias</span>
          </button>
          <button
            onClick={() => onNavigate('ranking')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeView === 'ranking' ? 'text-amber-500 font-bold' : 'text-slate-500'
            }`}
          >
            <Crown className="w-4 h-4 mb-0.5 text-amber-500" />
            <span>Ranking</span>
          </button>
          <button
            onClick={onOpenStreak}
            className="flex flex-col items-center py-1 px-2 text-orange-500"
          >
            <Flame className="w-4 h-4 mb-0.5 fill-orange-500" />
            <span>{userStats.streakDays || 0}d Fogo</span>
          </button>
          <button
            onClick={() => {
              if (currentUser) {
                onOpenProfile();
              } else {
                onOpenRegister();
              }
            }}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeView === 'login' || activeView === 'register' ? 'text-amber-500 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-semibold'
            }`}
          >
            {currentUser ? (
              <>
                <Trophy className="w-4 h-4 mb-0.5" />
                <span>Perfil</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mb-0.5 text-amber-500" />
                <span className="text-amber-600 dark:text-amber-400 font-bold">Cadastro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

