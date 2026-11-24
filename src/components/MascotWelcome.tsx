import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  MessageSquare,
  Award,
  CheckCircle2,
  Trees,
  ShieldCheck,
  Lightbulb,
  Compass,
  Zap,
  Volume2,
  VolumeX,
  Mic,
  Flame,
  User,
  LogIn,
  UserPlus,
  Crown,
} from 'lucide-react';
import { SubjectData, SubjectId, UserStats, StudentUser } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { GUILHERME_SPEECH_QUOTES } from '../data/animalsAndSubjects';
import oncaGuilhermeImg from '../assets/images/onca_matematica_real_1789479778223.jpg';
import { soundManager } from '../utils/soundEffects';

interface MascotWelcomeProps {
  subjects: SubjectData[];
  onSelectSubject: (subjectId: SubjectId) => void;
  onGoToAlphabeticalList: () => void;
  onStartChallenge: () => void;
  userStats?: UserStats;
  currentUser?: StudentUser | null;
  onOpenStreak?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onOpenRanking?: () => void;
  ambientEnabled?: boolean;
  onToggleAmbient?: () => void;
}

export const MascotWelcome: React.FC<MascotWelcomeProps> = ({
  subjects,
  onSelectSubject,
  onGoToAlphabeticalList,
  onStartChallenge,
  userStats,
  currentUser,
  onOpenStreak,
  onOpenLogin,
  onOpenRegister,
  onOpenRanking,
  ambientEnabled,
  onToggleAmbient,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isRoaring, setIsRoaring] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [playingCardAnimalId, setPlayingCardAnimalId] = useState<SubjectId | null>(null);

  const handleNextQuote = () => {
    soundManager.playClick();
    if (isSpeaking) {
      soundManager.stopSpeech();
      setIsSpeaking(false);
    }
    setQuoteIndex((prev) => (prev + 1) % GUILHERME_SPEECH_QUOTES.length);
  };

  const handleRoar = () => {
    soundManager.unlockAudio();
    const duration = soundManager.playMascotRoar();
    if (duration > 0) {
      setIsRoaring(true);
      setTimeout(() => setIsRoaring(false), duration);
    }
  };

  const handlePlayGuardianSound = (e: React.MouseEvent, subjectId: SubjectId) => {
    e.stopPropagation();
    soundManager.unlockAudio();
    const duration = soundManager.playAnimalSound(subjectId);
    if (duration > 0) {
      setPlayingCardAnimalId(subjectId);
      setTimeout(() => {
        setPlayingCardAnimalId((prev) => (prev === subjectId ? null : prev));
      }, duration);
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      soundManager.stopSpeech();
      setIsSpeaking(false);
      return;
    }

    soundManager.unlockAudio();
    setIsSpeaking(true);
    soundManager.speakText(`A Onça-Pintada diz: ${GUILHERME_SPEECH_QUOTES[quoteIndex]}`, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section: Onça-Pintada & Floresta do Saber */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-emerald-800/60">
        
        {/* Ambient forest light circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
                <Trees className="w-4 h-4 text-amber-400" />
                <span>Ambiente Interativo de Aprendizagem • Ensino Médio</span>
              </div>

              {onOpenLogin && (
                <button
                  id="hero-student-login-pill"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenLogin();
                  }}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {currentUser ? `Estudante: ${currentUser.name.split(' ')[0]}` : 'Entrar / Criar Conta de Aluno'}
                  </span>
                </button>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
              Floresta do <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-emerald-300 bg-clip-text text-transparent">Saber</span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Aprenda as matérias escolares do <strong className="text-amber-300 font-semibold">Ensino Médio e ENEM</strong> através de videoaulas ricas, quizzes interativos gamificados e flashcards em 3D, guiado pelo nosso mascote principal, a <strong className="text-amber-300 font-semibold">Onça-Pintada</strong>, e pelos guardiões da rica fauna brasileira.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                id="hero-explore-subjects-btn"
                onClick={() => {
                  soundManager.playClick();
                  onGoToAlphabeticalList();
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explorar Matérias (A-Z)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                id="hero-daily-challenge-btn"
                onClick={() => {
                  soundManager.playClick();
                  onStartChallenge();
                }}
                className="flex items-center space-x-2 bg-emerald-800/80 hover:bg-emerald-700/80 text-white font-semibold px-5 py-3.5 rounded-2xl border border-emerald-600/60 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Desafio da Floresta</span>
              </button>

              {/* Ranking da Selva CTA */}
              {onOpenRanking && currentUser && (
                <button
                  id="hero-ranking-btn"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenRanking();
                  }}
                  className="flex items-center space-x-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold px-5 py-3.5 rounded-2xl border border-amber-400/50 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span>Ranking da Selva</span>
                </button>
              )}

              {/* Quick Registration Button in Hero */}
              {onOpenRegister && !currentUser && (
                <button
                  id="hero-register-btn"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenRegister();
                  }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-5 py-3.5 rounded-2xl shadow-lg shadow-emerald-900/40 transition-all hover:scale-105 active:scale-95 border border-emerald-400/50 cursor-pointer"
                  title="Abrir Área de Cadastro para criar sua conta gratuita de estudante"
                >
                  <UserPlus className="w-5 h-5 text-amber-300" />
                  <span>Cadastre-se Grátis</span>
                </button>
              )}

              {/* Quick Daily Streak Button in Hero */}
              {userStats && onOpenStreak && (
                <button
                  id="hero-streak-btn"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenStreak();
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 ${
                    userStats.todayCheckedIn
                      ? 'bg-orange-950/60 border-orange-500/60 text-orange-200'
                      : 'bg-gradient-to-r from-orange-600/90 to-amber-600/90 border-amber-400 text-white shadow-lg shadow-orange-700/30 animate-pulse'
                  }`}
                >
                  <Flame className="w-4 h-4 fill-orange-400 text-orange-300" />
                  <span>
                    {userStats.streakDays || 0}d de Ofensiva • {userStats.todayCheckedIn ? 'Presença Confirmada ✓' : 'Fazer Check-in (+50 XP) 🔥'}
                  </span>
                </button>
              )}

              {/* Ambient Sound Trigger in Hero */}
              {onToggleAmbient && (
                <button
                  id="hero-ambient-toggle-btn"
                  onClick={() => {
                    soundManager.playClick();
                    onToggleAmbient();
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
                    ambientEnabled
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-900/40 ring-2 ring-emerald-400/40'
                      : 'bg-emerald-900/40 border-emerald-700/60 text-emerald-300 hover:bg-emerald-800/50'
                  }`}
                >
                  <Trees className={`w-4 h-4 ${ambientEnabled ? 'text-emerald-400 animate-pulse' : 'text-emerald-300'}`} />
                  <span>{ambientEnabled ? 'Som da Floresta Ativo 🍃' : 'Ativar Sons da Floresta 🍃'}</span>
                </button>
              )}
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-800/60 text-xs sm:text-sm">
              <div className="flex items-center space-x-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>12 Matérias A-Z</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Quizzes & XP</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Flashcards 3D</span>
              </div>
            </div>
          </div>

          {/* Right Mascot Card: Onça Guilherme Interactive Stage */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-amber-500/10 via-emerald-900/40 to-slate-900/80 rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-2xl backdrop-blur-md">
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-full font-bold text-xs uppercase tracking-wider flex items-center space-x-1 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mascote Principal</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    id="mascot-roar-btn"
                    onClick={handleRoar}
                    title="Ouvir o esturro e rugido autêntico da Onça-Pintada"
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md active:scale-95 ${
                      isRoaring
                        ? 'bg-amber-400 text-slate-950 scale-105 ring-4 ring-amber-300/40 shadow-amber-500/50'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${isRoaring ? 'animate-bounce text-slate-950' : 'text-amber-400'}`} />
                    <span>{isRoaring ? 'ROAARRR! 🐾' : 'Rugido da Onça 🐆'}</span>
                  </button>
                </div>
              </div>

              {/* Mascot Card with Real Photography */}
              <div className="space-y-3 my-2">
                <button
                  type="button"
                  id="mascot-jaguar-frame"
                  onClick={handleRoar}
                  title="Toque na imagem da Onça-Pintada para ouvir seu esturro autêntico!"
                  className={`group relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer block text-left focus:outline-none ${
                    isRoaring
                      ? 'border-amber-400 ring-4 ring-amber-400/50 scale-[1.02] shadow-amber-500/40 shadow-xl'
                      : 'border-amber-400/60 hover:border-amber-300 shadow-lg'
                  }`}
                >
                  <img
                    src={oncaGuilhermeImg}
                    alt="Onça-Pintada, mascote da Floresta do Saber"
                    className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                      isRoaring ? 'scale-110 brightness-110' : 'group-hover:scale-105'
                    }`}
                  />
                  {/* Subtle dark gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top Action Pill */}
                  <div className="absolute top-2.5 right-2.5 bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <span>{isRoaring ? 'ROAARRR! 🐾' : 'TOQUE P/ RUGIR 🐆'}</span>
                  </div>

                  {/* Bottom Identity Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div>
                      <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase block">
                        Panthera onca • Fauna Brasileira
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white drop-shadow-sm">
                        Onça-Pintada
                      </h3>
                    </div>
                    <div className="bg-emerald-600/90 text-white rounded-full p-1.5 border border-emerald-400 shadow-md">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                <div className="text-center">
                  <p className="text-xs text-emerald-200 font-medium">
                    {isRoaring ? (
                      <span className="text-amber-300 font-bold animate-pulse">
                        🐆 Esturro característico de Panthera onca ecoando na floresta!
                      </span>
                    ) : (
                      'Guardião Mestre da Floresta & Sábio da Matemática'
                    )}
                  </p>
                </div>
              </div>

              {/* Mascot's Speech Bubble with Read-Aloud Audio */}
              <div className="mt-4 relative bg-white/10 dark:bg-slate-900/60 rounded-2xl p-4 border border-emerald-700/50 text-sm text-emerald-100">
                <div className="flex items-start space-x-2.5">
                  <MessageSquare className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <p className="italic text-xs sm:text-sm font-normal text-amber-100">
                      "{GUILHERME_SPEECH_QUOTES[quoteIndex]}"
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-emerald-300/80 border-t border-emerald-800/40 mt-2">
                      <span>Dica #{quoteIndex + 1} de {GUILHERME_SPEECH_QUOTES.length}</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={handleToggleSpeech}
                          title={isSpeaking ? 'Pausar leitura de voz' : 'Ouvir conselho narrado'}
                          className={`font-semibold flex items-center space-x-1 transition-colors ${
                            isSpeaking
                              ? 'text-amber-400 animate-pulse font-bold'
                              : 'text-emerald-300 hover:text-white'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isSpeaking ? 'Falando...' : 'Ouvir voz'}</span>
                        </button>

                        <button
                          onClick={handleNextQuote}
                          className="text-amber-300 hover:text-amber-200 font-semibold flex items-center space-x-1 underline underline-offset-2"
                        >
                          <Lightbulb className="w-3 h-3" />
                          <span>Próximo conselho</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Fauna Guardians Carousel / Map Overview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Conheça os Guardiões da Fauna Brasileira</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Animais Temáticos da Floresta do Saber
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Cada matéria escolar conta com um animal especialista da nossa fauna brasileira, trazendo dicas, curiosidades ecológicas e desafios para você:
            </p>
          </div>

          <button
            onClick={onGoToAlphabeticalList}
            className="self-start sm:self-auto flex items-center space-x-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 underline underline-offset-4"
          >
            <span>Ver em ordem alfabética</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 9 Fauna Guardians Mini Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => {
                soundManager.playClick();
                onSelectSubject(sub.id);
              }}
              className="group relative cursor-pointer bg-white dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <AnimalAvatar animalId={sub.id} size="md" showBadge />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      {sub.name}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {sub.category}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white mt-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {sub.animal.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                    {sub.animal.funFact}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
                <button
                  type="button"
                  onClick={(e) => handlePlayGuardianSound(e, sub.id)}
                  title={`Ouvir o som de ${sub.animal.name}`}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-bold transition-all ${
                    playingCardAnimalId === sub.id
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${playingCardAnimalId === sub.id ? 'animate-bounce' : ''}`} />
                  <span>{playingCardAnimalId === sub.id ? 'Tocando...' : 'Ouvir som'}</span>
                </button>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                  Entrar &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (Gamification & High School Prep) */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-amber-50/40 dark:from-slate-900 dark:to-emerald-950/30 rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-200 dark:border-emerald-800/50">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-3 py-1 rounded-full">
            Metodologia Floresta do Saber
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            Como você aprende no Ensino Médio
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Combinamos técnicas comprovadas de aprendizagem com a dinâmica envolvente da floresta brasileira.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-xs border border-emerald-100 dark:border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xl">
              📹
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              1. Videoaulas & Resumos
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Aulas selecionadas e resumos estruturados com termos-chave para você absorver os conceitos essenciais do ENEM e vestibulares.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-xs border border-emerald-100 dark:border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-xl">
              🎯
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              2. Quizzes com Feedback
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Questões contextualizadas onde os animais guardiões explicam detalhadamente a lógica de cada alternativa certa ou errada.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 shadow-xs border border-emerald-100 dark:border-slate-700 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xl">
              🎴
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              3. Flashcards 3D & Repetição
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Memorização ativa (Active Recall) com cartões interativos 3D e a possibilidade de criar seus próprios flashcards de revisão.
            </p>
          </div>

        </div>
      </section>

      {/* Registration Callout Section: Área de Cadastro do Estudante */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500/40 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Área de Cadastro Oficial de Estudantes</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Crie seu Cadastro Gratuito na Floresta do Saber
            </h3>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Junte-se a estudantes do Ensino Médio e pré-vestibulandos de todo o Brasil. Cadastre-se em instantes para salvar seu XP, manter sua sequência diária, colecionar medalhas e receber mentoria dos guardiões da fauna!
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-emerald-200">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Gratuito & Seguro</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mascote Guardião Personalizado</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Preparatório ENEM e Vestibulares</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
            {onOpenRegister && (
              <button
                id="cta-section-register-btn"
                onClick={() => {
                  soundManager.playClick();
                  onOpenRegister();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 cursor-pointer border border-amber-200"
              >
                <UserPlus className="w-5 h-5 text-slate-950" />
                <span>Acessar Área de Cadastro</span>
              </button>
            )}
            {onOpenLogin && (
              <button
                id="cta-section-login-btn"
                onClick={() => {
                  soundManager.playClick();
                  onOpenLogin();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-emerald-400/30 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-emerald-300" />
                <span>Já possuo uma conta (Entrar)</span>
              </button>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
