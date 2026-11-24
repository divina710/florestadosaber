/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SubjectId, UserStats, Flashcard, StudentUser } from './types';
import { SUBJECTS_DATA } from './data/animalsAndSubjects';
import { Navbar } from './components/Navbar';
import { MascotWelcome } from './components/MascotWelcome';
import { SubjectsAlphabeticalGrid } from './components/SubjectsAlphabeticalGrid';
import { SubjectDetailHub } from './components/SubjectDetailHub';
import { ForestChallengeSection } from './components/ForestChallengeSection';
import { StudentProfileModal } from './components/StudentProfileModal';
import { DailyStreakModal } from './components/DailyStreakModal';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { RankingDaSelva } from './components/RankingDaSelva';
import { CelebrationParticles, CelebrationEvent } from './components/CelebrationParticles';
import { soundManager } from './utils/soundEffects';
import { syncStreakOnLoad, registerDailyCheckIn } from './utils/streakManager';
import {
  getStoredUser,
  saveStoredUser,
  removeStoredUser,
  getStudentStats,
  saveStudentStats,
  isAdmin,
} from './utils/authManager';
import { Trees, Sparkles, Heart, ShieldCheck, ArrowLeft } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'floresta_do_saber_stats_v2';
const THEME_STORAGE_KEY = 'floresta_theme_mode';

export default function App() {
  const [activeView, setActiveView] = useState<
    'welcome' | 'subjects' | 'subject-detail' | 'challenge' | 'login' | 'register' | 'admin' | 'ranking'
  >('welcome');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('biologia');
  const [selectedInitialTab, setSelectedInitialTab] = useState<'videos' | 'quiz' | 'flashcards'>('videos');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientEnabled, setAmbientEnabled] = useState(false);

  // Active student or in-memory admin account
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    return getStoredUser();
  });

  // In-memory server-issued Bearer token for Admin access (never stored in Web Storage)
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Track in-memory if admin is currently inspecting a student account
  const [impersonatingAdmin, setImpersonatingAdmin] = useState<StudentUser | null>(null);

  const handleLoginSuccess = (user: StudentUser) => {
    setImpersonatingAdmin(null);
    setAdminToken(null);
    setCurrentUser(user);
    const studentStats = syncStreakOnLoad(getStudentStats(user.id));
    prevLevelRef.current = studentStats.level;
    setUserStats(studentStats);
    setActiveView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = (adminUser: StudentUser, token: string) => {
    setAdminToken(token);
    setImpersonatingAdmin(null);
    setCurrentUser(adminUser);
  };

  const handleImpersonateStudent = (student: StudentUser) => {
    if (!isAdmin(currentUser) || !currentUser || !adminToken) {
      return;
    }
    setImpersonatingAdmin(currentUser);
    setCurrentUser(student);
    const nextStats = syncStreakOnLoad(getStudentStats(student.id));
    prevLevelRef.current = nextStats.level;
    setUserStats(nextStats);
    setActiveView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToAdmin = () => {
    soundManager.playClick();
    if (impersonatingAdmin && adminToken) {
      setCurrentUser(impersonatingAdmin);
    }
    setImpersonatingAdmin(null);
    setActiveView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    soundManager.playClick();
    removeStoredUser();
    setImpersonatingAdmin(null);
    setAdminToken(null);
    setCurrentUser(null);
  };

  // Night Mode (defaults to true as requested: "deixe no modo noturno")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
    } catch {
      // ignore
    }
    return true; // Night mode by default
  });

  // Apply dark class to document root and body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // User Gamification Stats with robust Daily Streak initialization
  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const storedUser = getStoredUser();
      if (storedUser && storedUser.role !== 'admin') {
        return syncStreakOnLoad(getStudentStats(storedUser.id));
      }
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('floresta_do_saber_stats_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return syncStreakOnLoad(parsed);
      }
    } catch {
      // ignore
    }
    return syncStreakOnLoad({
      xp: 150,
      level: 1,
      streakDays: 3,
      bestStreak: 3,
      todayCheckedIn: false,
      completedQuizzes: {},
      completedVideos: [],
      masteredFlashcards: [],
      customFlashcards: [],
      unlockedBadges: ['badge-guilherme', 'badge-streak-3'],
    });
  });

  const prevLevelRef = useRef<number>(userStats.level);
  const [celebrationEvent, setCelebrationEvent] = useState<CelebrationEvent | null>(null);

  const triggerCelebration = useCallback(
    (type: CelebrationEvent['type'], payload: Omit<CelebrationEvent, 'id' | 'type'>) => {
      setCelebrationEvent((prev) => {
        // Keep levelup priority if triggered alongside quiz completion
        if (prev && prev.type === 'levelup' && type === 'quiz' && Date.now() - prev.id < 500) {
          return prev;
        }
        return {
          id: Date.now() + Math.random(),
          type,
          ...payload,
        };
      });
    },
    []
  );

  const dismissCelebration = useCallback(() => {
    setCelebrationEvent(null);
  }, []);

  // Sync streak on component mount
  useEffect(() => {
    setUserStats((prev) => syncStreakOnLoad(prev));
  }, []);

  // Detect Level-Up across any XP source and fire Framer Motion particles
  useEffect(() => {
    if (userStats.level > prevLevelRef.current) {
      const achievedLevel = userStats.level;
      prevLevelRef.current = achievedLevel;
      soundManager.playLevelUp();
      triggerCelebration('levelup', {
        title: `Nível ${achievedLevel} Alcançado!`,
        subtitle: 'Sua jornada na Floresta do Saber acaba de subir para um novo patamar!',
        level: achievedLevel,
      });
    } else {
      prevLevelRef.current = userStats.level;
    }
  }, [userStats.level, triggerCelebration]);

  // Persist user stats to localStorage (and per-user record for ranking & admin)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userStats));
      if (currentUser && currentUser.role !== 'admin') {
        saveStudentStats(currentUser.id, userStats);
      }
    } catch {
      // ignore
    }
  }, [userStats, currentUser]);

  // Audio toggles
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.soundEnabled = next;
    if (next) {
      soundManager.unlockAudio();
      soundManager.playSuccess();
    }
  };

  const handleToggleAmbient = () => {
    const next = !ambientEnabled;
    setAmbientEnabled(next);
    soundManager.unlockAudio();
    soundManager.toggleAmbient(next);
  };

  // Subject Selection and Navigation
  const handleSelectSubject = (subjectId: SubjectId, initialTab: 'videos' | 'quiz' | 'flashcards' = 'videos') => {
    setSelectedSubjectId(subjectId);
    setSelectedInitialTab(initialTab);
    setActiveView('subject-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger streak check-in on any active study event (quiz, video, flashcard)
  const autoCheckInStreak = () => {
    setUserStats((prev) => {
      if (!prev.todayCheckedIn) {
        const res = registerDailyCheckIn(prev);
        return res.updatedStats;
      }
      return prev;
    });
  };

  // Add XP helper with automatic Level Up calculation
  const addXp = (amount: number, badgeIdToUnlock?: string) => {
    setUserStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 200) + 1;
      const updatedBadges = [...prev.unlockedBadges];

      if (badgeIdToUnlock && !updatedBadges.includes(badgeIdToUnlock)) {
        updatedBadges.push(badgeIdToUnlock);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        unlockedBadges: updatedBadges,
      };
    });
    autoCheckInStreak();
  };

  // Complete Video Lesson
  const handleCompleteVideo = (videoId: string, xpReward: number) => {
    setUserStats((prev) => {
      if (prev.completedVideos.includes(videoId)) return prev;
      return {
        ...prev,
        completedVideos: [...prev.completedVideos, videoId],
      };
    });
    addXp(xpReward);
  };

  // Complete Subject Quiz
  const handleCompleteQuiz = (score: number, total: number, earnedXp: number) => {
    const badgeMap: Record<SubjectId, string> = {
      artes: 'badge-art',
      biologia: 'badge-bio',
      espanhol: 'badge-esp',
      filosofia: 'badge-fil',
      fisica: 'badge-fis',
      geografia: 'badge-geo',
      historia: 'badge-his',
      ingles: 'badge-ing',
      matematica: 'badge-mat',
      portugues: 'badge-por',
      quimica: 'badge-qui',
      sociologia: 'badge-soc',
    };

    const subjectBadge = badgeMap[selectedSubjectId];

    setUserStats((prev) => {
      return {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [selectedSubjectId]: Math.max(prev.completedQuizzes[selectedSubjectId] || 0, score),
        },
      };
    });

    addXp(earnedXp, subjectBadge);

    const subjectName = SUBJECTS_DATA.find((s) => s.id === selectedSubjectId)?.name || 'Disciplina';
    triggerCelebration('quiz', {
      title: `Quiz de ${subjectName} Concluído!`,
      subtitle: `Você acertou ${score} de ${total} questões.`,
      xp: earnedXp,
    });
  };

  // Complete Forest Tournament Challenge
  const handleCompleteChallenge = (score: number, total: number, earnedXp: number) => {
    addXp(earnedXp, 'badge-guilherme');
    triggerCelebration('quiz', {
      title: 'Desafio da Floresta Concluído!',
      subtitle: `Você concluiu o torneio com ${score} de ${total} acertos.`,
      xp: earnedXp,
    });
  };

  // Toggle Mastered Flashcard
  const handleToggleMasteredFlashcard = (cardId: string, isMastered: boolean) => {
    setUserStats((prev) => {
      const current = prev.masteredFlashcards;
      if (isMastered && !current.includes(cardId)) {
        addXp(15);
        return { ...prev, masteredFlashcards: [...current, cardId] };
      } else if (!isMastered && current.includes(cardId)) {
        return { ...prev, masteredFlashcards: current.filter((id) => id !== cardId) };
      }
      return prev;
    });
  };

  // Add Custom Flashcard
  const handleAddCustomFlashcard = (card: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = {
      ...card,
      id: `custom-fc-${Date.now()}`,
    };
    setUserStats((prev) => ({
      ...prev,
      customFlashcards: [...prev.customFlashcards, newCard],
    }));
    addXp(30);
  };

  const currentSelectedSubject = SUBJECTS_DATA.find((s) => s.id === selectedSubjectId) || SUBJECTS_DATA[0];

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Framer Motion Confetti & Particle Celebration Overlay */}
      <CelebrationParticles event={celebrationEvent} onDismiss={dismissCelebration} />

      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userStats={userStats}
        currentUser={currentUser}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenStreak={() => setShowStreakModal(true)}
        onOpenLogin={() => {
          setActiveView('login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRegister={() => {
          setActiveView('register');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setActiveView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        ambientEnabled={ambientEnabled}
        onToggleAmbient={handleToggleAmbient}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        selectedSubjectName={activeView === 'subject-detail' ? currentSelectedSubject.name : undefined}
        onReturnToSubject={() => setActiveView('subject-detail')}
      />

      {/* Admin Impersonation Return Banner */}
      {impersonatingAdmin && currentUser && activeView !== 'admin' && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                Modo Administrador: visualizando a conta de <strong>{currentUser.name}</strong> ({currentUser.email})
              </span>
            </div>
            <button
              type="button"
              onClick={handleReturnToAdmin}
              className="px-3 py-1 rounded-lg bg-slate-950 text-amber-300 hover:bg-slate-800 text-xs font-extrabold inline-flex items-center space-x-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Painel Admin</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        
        {/* VIEW 0: PÁGINA DE LOGIN / ÁREA DE CADASTRO DO ESTUDANTE */}
        {(activeView === 'login' || activeView === 'register') && (
          <LoginPage
            currentUser={currentUser}
            initialTab={activeView === 'register' ? 'register' : 'login'}
            onLoginSuccess={handleLoginSuccess}
            onBackToHome={() => {
              setActiveView('welcome');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 1: APRESENTAÇÃO COM O MASCOTE PRINCIPAL ONÇA-PINTADA */}
        {activeView === 'welcome' && (
          <MascotWelcome
            subjects={SUBJECTS_DATA}
            onSelectSubject={handleSelectSubject}
            onGoToAlphabeticalList={() => {
              setActiveView('subjects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartChallenge={() => {
              setActiveView('challenge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            userStats={userStats}
            currentUser={currentUser}
            onOpenStreak={() => setShowStreakModal(true)}
            onOpenLogin={() => {
              setActiveView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRegister={() => {
              setActiveView('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRanking={() => {
              setActiveView('ranking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            ambientEnabled={ambientEnabled}
            onToggleAmbient={handleToggleAmbient}
          />
        )}

        {/* VIEW 2: BLOCOS COM NOMES DAS MATÉRIAS EM ORDEM ALFABÉTICA (A-Z) */}
        {activeView === 'subjects' && (
          <SubjectsAlphabeticalGrid
            subjects={SUBJECTS_DATA}
            onSelectSubject={handleSelectSubject}
            userStats={userStats}
          />
        )}

        {/* VIEW 3: SALA TEMÁTICA DO ANIMAL (VIDEOAULAS, QUIZZES E FLASHCARDS) */}
        {activeView === 'subject-detail' && (
          <SubjectDetailHub
            subject={currentSelectedSubject}
            initialTab={selectedInitialTab}
            onBackToAlphabetical={() => {
              setActiveView('subjects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            userStats={userStats}
            currentUser={currentUser}
            onCompleteVideo={handleCompleteVideo}
            onCompleteQuiz={handleCompleteQuiz}
            onToggleMasteredFlashcard={handleToggleMasteredFlashcard}
            onAddCustomFlashcard={handleAddCustomFlashcard}
            onAddXp={addXp}
            onOpenLogin={() => {
              setActiveView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 4: DESAFIO DA FLORESTA (TORNEIO INTERDISCIPLINAR) */}
        {activeView === 'challenge' && (
          <ForestChallengeSection
            subjects={SUBJECTS_DATA}
            onCompleteChallenge={handleCompleteChallenge}
            onBackToHome={() => {
              setActiveView('welcome');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: RANKING DA SELVA (EXCLUSIVO PARA USUÁRIOS LOGADOS) */}
        {activeView === 'ranking' && (
          <RankingDaSelva
            currentUser={currentUser}
            userStats={userStats}
            onOpenLogin={() => {
              setActiveView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRegister={() => {
              setActiveView('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToHome={() => {
              setActiveView('welcome');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToChallenge={() => {
              setActiveView('challenge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToSubjects={() => {
              setActiveView('subjects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 6: PAINEL DO ADMINISTRADOR */}
        {activeView === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            adminToken={adminToken}
            onImpersonateStudent={handleImpersonateStudent}
            onAdminLoginSuccess={handleAdminLoginSuccess}
            onAdminLogout={handleLogout}
            onBackToApp={() => {
              setActiveView('welcome');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Daily Streak & Check-in Modal */}
      {showStreakModal && (
        <DailyStreakModal
          userStats={userStats}
          onUpdateStats={(newStats) => setUserStats(newStats)}
          onClose={() => setShowStreakModal(false)}
        />
      )}

      {/* Student Profile & Badges Modal */}
      {showProfileModal && (
        <StudentProfileModal
          userStats={userStats}
          currentUser={currentUser}
          onLoginSuccess={handleLoginSuccess}
          onOpenStreak={() => {
            setShowProfileModal(false);
            setShowStreakModal(true);
          }}
          onOpenLogin={() => {
            setShowProfileModal(false);
            setActiveView('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenRegister={() => {
            setShowProfileModal(false);
            setActiveView('register');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Footer with Educational Project Info */}
      <footer className="mt-auto border-t border-emerald-100 dark:border-emerald-950/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center space-x-2 font-heading font-bold text-slate-800 dark:text-slate-200">
            <span className="text-lg">🐆</span>
            <span className="text-sm">Floresta do Saber • Projeto Educacional para o Ensino Médio</span>
          </div>

          <p className="max-w-xl mx-auto leading-relaxed">
            Desenvolvido para conectar o aprendizado das 12 disciplinas escolares do Ensino Médio à valorização da fauna e biodiversidade brasileira, com a mentoria do Mascote Onça-Pintada.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] pt-2 text-emerald-800 dark:text-emerald-400 font-semibold">
            <span>🎨 Artes (Uirapuru)</span>
            <span>🐸 Biologia (Rã-de-vidro)</span>
            <span>🐒 Espanhol (Macaco-de-cheiro)</span>
            <span>🦋 Filosofia (Borboleta Morpho)</span>
            <span>🐗 Física (Queixada)</span>
            <span>🦦 Geografia (Ariranha)</span>
            <span>🦅 História (Harpia)</span>
            <span>🦉 Inglês (Coruja-orelhuda)</span>
            <span>🐆 Matemática (Onça-pintada)</span>
            <span>🦝 Português (Quati)</span>
            <span>🐢 Química (Tartaruga-da-Amazônia)</span>
            <span>🐠 Sociologia (Acará-disco)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
