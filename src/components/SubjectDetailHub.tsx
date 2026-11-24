import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SubjectData, UserStats, Flashcard, StudentUser } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { VideoLessonsSection } from './VideoLessonsSection';
import { QuizGameSection } from './QuizGameSection';
import { FlashcardsSection } from './FlashcardsSection';
import { EssayCorrectionSection } from './EssayCorrectionSection';
import { Video, HelpCircle, Layers, ArrowLeft, Sparkles, BookOpen, TreeDeciduous, Info, CheckCircle2, MessageSquare, StickyNote, Search, X, Filter, Volume2, PenTool } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface SubjectDetailHubProps {
  subject: SubjectData;
  initialTab?: 'videos' | 'quiz' | 'flashcards' | 'redacao';
  onBackToAlphabetical: () => void;
  userStats: UserStats;
  currentUser?: StudentUser | null;
  onCompleteVideo: (videoId: string, xpReward: number) => void;
  onCompleteQuiz: (score: number, total: number, earnedXp: number) => void;
  onToggleMasteredFlashcard: (cardId: string, isMastered: boolean) => void;
  onAddCustomFlashcard: (card: Omit<Flashcard, 'id'>) => void;
  onAddXp?: (amount: number, badgeId?: string) => void;
  onOpenLogin?: () => void;
}

export const SubjectDetailHub: React.FC<SubjectDetailHubProps> = ({
  subject,
  initialTab = 'videos',
  onBackToAlphabetical,
  userStats,
  currentUser = null,
  onCompleteVideo,
  onCompleteQuiz,
  onToggleMasteredFlashcard,
  onAddCustomFlashcard,
  onAddXp,
  onOpenLogin,
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'quiz' | 'flashcards' | 'redacao'>(initialTab);
  const [showAnimalInfoModal, setShowAnimalInfoModal] = useState(false);
  const [studentNote, setStudentNote] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAnimalSound, setIsPlayingAnimalSound] = useState(false);
  const soundTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (soundTimeoutRef.current) {
        window.clearTimeout(soundTimeoutRef.current);
      }
    };
  }, []);

  const handlePlayAnimalSound = () => {
    soundManager.unlockAudio();
    const duration = soundManager.playAnimalSound(subject.id);
    if (duration > 0) {
      if (soundTimeoutRef.current) {
        window.clearTimeout(soundTimeoutRef.current);
      }
      setIsPlayingAnimalSound(true);
      soundTimeoutRef.current = window.setTimeout(() => {
        setIsPlayingAnimalSound(false);
        soundTimeoutRef.current = null;
      }, duration);
    }
  };

  const query = searchQuery.trim().toLowerCase();

  // Combine subject flashcards
  const subjectCustomCards = userStats.customFlashcards.filter(
    (c) => c.topic.toLowerCase() === subject.name.toLowerCase() || c.topic === subject.id
  );
  const allSubjectFlashcards = [...subject.flashcards, ...subjectCustomCards];

  // Calculate search matches across all content types in this subject
  const matchingVideos = useMemo(() => {
    if (!query) return subject.videoLessons;
    return subject.videoLessons.filter((vid) => {
      const inTitle = vid.title.toLowerCase().includes(query);
      const inTopic = vid.topic.toLowerCase().includes(query);
      const inSummary = vid.summary.some((s) => s.toLowerCase().includes(query));
      const inTerms = vid.keyTerms.some(
        (t) => t.term.toLowerCase().includes(query) || t.definition.toLowerCase().includes(query)
      );
      return inTitle || inTopic || inSummary || inTerms;
    });
  }, [subject.videoLessons, query]);

  const matchingQuizzes = useMemo(() => {
    if (!query) return subject.quizzes;
    return subject.quizzes.filter((q) => {
      const inQuestion = q.question.toLowerCase().includes(query);
      const inContext = q.context ? q.context.toLowerCase().includes(query) : false;
      const inExplanation = q.explanation.toLowerCase().includes(query);
      const inYear = q.yearSource ? q.yearSource.toLowerCase().includes(query) : false;
      const inOptions = q.options.some((o) => o.text.toLowerCase().includes(query));
      return inQuestion || inContext || inExplanation || inYear || inOptions;
    });
  }, [subject.quizzes, query]);

  const matchingFlashcards = useMemo(() => {
    if (!query) return allSubjectFlashcards;
    return allSubjectFlashcards.filter((card) => {
      const inFront = card.front.toLowerCase().includes(query);
      const inBack = card.back.toLowerCase().includes(query);
      const inTopic = card.topic.toLowerCase().includes(query);
      const inHint = card.hint ? card.hint.toLowerCase().includes(query) : false;
      return inFront || inBack || inTopic || inHint;
    });
  }, [allSubjectFlashcards, query]);

  const totalMatches = query
    ? matchingVideos.length + matchingQuizzes.length + matchingFlashcards.length
    : 0;

  const handleClearSearch = () => {
    soundManager.playClick();
    setSearchQuery('');
  };

  const handleSelectTopicTag = (topic: string) => {
    soundManager.playClick();
    setSearchQuery(topic);
  };

  const handleSaveNote = () => {
    soundManager.playSuccess();
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Breadcrumb & Return Button */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-alphabetical-btn"
          onClick={() => {
            soundManager.playClick();
            onBackToAlphabetical();
          }}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Matérias (A-Z)</span>
        </button>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Ambiente Virtual:</span>
          <span className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
            Sala do {subject.animal.name}
          </span>
        </div>
      </div>

      {/* Thematic Animal Header Banner */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/80 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950`}>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center space-x-4">
            <AnimalAvatar animalId={subject.id} size="xl" showBadge />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs font-bold uppercase tracking-wider">
                  {subject.category}
                </span>
                <span className="text-xs text-amber-300 font-semibold">
                  Guardião Temático: {subject.animal.name}
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-4xl font-black text-white">
                {subject.name}
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
                {subject.highSchoolFocus}
              </p>
            </div>
          </div>

          {/* Quick Guardian Quote & Animal Bio Trigger */}
          <div className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-emerald-700/60 max-w-sm space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-amber-300 font-bold">
              <span className="flex items-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Fala do Guardião</span>
              </span>
              <div className="flex items-center space-x-2">
                <button
                  id={`play-animal-sound-${subject.id}`}
                  onClick={handlePlayAnimalSound}
                  title={`Ouvir vocalização/som do ${subject.animal.name}`}
                  className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all shadow-xs ${
                    isPlayingAnimalSound
                      ? 'bg-amber-400 text-slate-950 scale-105 ring-2 ring-amber-300/50'
                      : 'bg-emerald-800/80 text-amber-300 hover:bg-emerald-700/80 border border-emerald-600/50'
                  }`}
                >
                  <Volume2 className={`w-3 h-3 ${isPlayingAnimalSound ? 'animate-bounce text-slate-950' : 'text-amber-400'}`} />
                  <span>
                    {isPlayingAnimalSound
                      ? subject.id === 'matematica'
                        ? 'ESTURRO! 🐆'
                        : 'Tocando...'
                      : subject.id === 'matematica'
                      ? 'Rugido da Onça 🐆'
                      : 'Ouvir Animal 🐾'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setShowAnimalInfoModal(true);
                  }}
                  className="text-[11px] text-emerald-300 hover:text-white underline"
                >
                  Sobre &rarr;
                </button>
              </div>
            </div>
            <p className="italic text-emerald-100/90">
              "{subject.animal.greetingMessage}"
            </p>
          </div>

        </div>
      </div>

      {/* Subject Internal Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id={`search-input-${subject.id}`}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Pesquisar videoaulas, conceitos, fórmulas ou quizzes em ${subject.name}...`}
              className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                title="Limpar pesquisa"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Result Summary Badge */}
          {query && (
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {totalMatches} resultado{totalMatches !== 1 ? 's' : ''}
              </span>
              <button
                onClick={handleClearSearch}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Limpar
              </button>
            </div>
          )}
        </div>

        {/* Quick Topic Chips & Cross-Tab Jump Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Tópicos rápidos:</span>
          </span>
          {subject.recommendedTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleSelectTopicTag(topic)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                searchQuery.toLowerCase() === topic.toLowerCase()
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Dynamic Category Match Bar when search is active */}
        {query && (
          <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-emerald-900 dark:text-emerald-200 font-medium">
              Resultados para <strong>"{searchQuery}"</strong>:
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('videos');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'videos'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                }`}
              >
                📹 {matchingVideos.length} Videoaulas
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('quiz');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
                }`}
              >
                ❓ {matchingQuizzes.length} Quizzes
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('flashcards');
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'flashcards'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100'
                }`}
              >
                🗂️ {matchingFlashcards.length} Flashcards
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3 Main Interactive Tabs (Videoaulas, Quizzes, Flashcards) */}
      <div className="flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs inline-flex space-x-2">
          
          <button
            id="tab-videos-btn"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('videos');
            }}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'videos'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>
              Videoaulas {query ? `(${matchingVideos.length}/${subject.videoLessons.length})` : `(${subject.videoLessons.length})`}
            </span>
          </button>

          <button
            id="tab-quiz-btn"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('quiz');
            }}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>
              Quizzes Gamificados {query ? `(${matchingQuizzes.length}/${subject.quizzes.length})` : `(${subject.quizzes.length})`}
            </span>
          </button>

          <button
            id="tab-flashcards-btn"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('flashcards');
            }}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>
              Flashcards 3D {query ? `(${matchingFlashcards.length}/${allSubjectFlashcards.length})` : `(${allSubjectFlashcards.length})`}
            </span>
          </button>

          {subject.id === 'portugues' && (
            <button
              id="tab-redacao-btn"
              onClick={() => {
                soundManager.playClick();
                setActiveTab('redacao');
              }}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'redacao'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md ring-2 ring-rose-400/50 scale-105'
                  : 'text-rose-600 dark:text-rose-400 hover:text-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950/40'
              }`}
            >
              <PenTool className="w-4 h-4 text-rose-500" />
              <span>✍️ Redação com IA</span>
            </button>
          )}

        </div>
      </div>

      {/* Active Tab Content Area */}
      <div>
        {activeTab === 'videos' && (
          <VideoLessonsSection
            subject={subject}
            completedVideos={userStats.completedVideos}
            onCompleteVideo={onCompleteVideo}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizGameSection
            subject={subject}
            onCompleteQuiz={onCompleteQuiz}
            onSwitchToFlashcards={() => setActiveTab('flashcards')}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsSection
            subject={subject}
            masteredFlashcards={userStats.masteredFlashcards}
            onToggleMastered={onToggleMasteredFlashcard}
            customFlashcards={userStats.customFlashcards}
            onAddCustomFlashcard={onAddCustomFlashcard}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
          />
        )}

        {activeTab === 'redacao' && subject.id === 'portugues' && (
          <EssayCorrectionSection
            subject={subject}
            currentUser={currentUser}
            onAddXp={onAddXp || ((amount) => onCompleteQuiz(10, 10, amount))}
            onOpenLogin={onOpenLogin || (() => {})}
          />
        )}
      </div>

      {/* Student Study Scratchpad */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StickyNote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Caderno de Anotações do Estudante ({subject.name})
            </h4>
          </div>
          {isNoteSaved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Anotação salva!</span>
            </span>
          )}
        </div>

        <textarea
          rows={3}
          value={studentNote}
          onChange={(e) => setStudentNote(e.target.value)}
          placeholder={`Escreva aqui suas próprias anotações, fórmulas ou dúvidas sobre ${subject.name}...`}
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSaveNote}
            disabled={!studentNote.trim()}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              studentNote.trim()
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            Salvar no Caderno
          </button>
        </div>
      </div>

      {/* Animal Fauna Bio Modal */}
      {showAnimalInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 animate-scale-up">
            
            <div className="flex items-center space-x-4">
              <AnimalAvatar animalId={subject.id} size="xl" showBadge className="border-2 border-emerald-400 shadow-xl" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Fauna Brasileira • Guia da Floresta
                </span>
                <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                  {subject.animal.species}
                </h3>
                <p className="text-xs italic text-slate-500 dark:text-slate-400">
                  {subject.animal.scientificName}
                </p>
                <div className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                  Guardião de {subject.name}
                </div>
              </div>
            </div>

            {/* Guardian Full Photography Display */}
            {subject.animal.illustrationUrl && (
              <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-emerald-700/40 shadow-inner group">
                <img
                  src={subject.animal.illustrationUrl}
                  alt={`${subject.animal.name} - ${subject.animal.species}`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold text-emerald-100">{subject.animal.species}</span>
                  <span className="italic text-amber-300 text-[11px] font-mono">{subject.animal.scientificName}</span>
                </div>
              </div>
            )}

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">
                  🌿 Habitat Natural:
                </strong>
                <span>{subject.animal.habitat}</span>
              </div>

              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
                <strong className="text-amber-800 dark:text-amber-300 block mb-1">
                  ✨ Curiosidade Ecológica:
                </strong>
                <span>{subject.animal.funFact}</span>
              </div>

              <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800">
                <strong className="text-purple-800 dark:text-purple-300 block mb-1">
                  🧠 Por que é o Guardião de {subject.name}?
                </strong>
                <span>{subject.animal.personality}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePlayAnimalSound}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                  isPlayingAnimalSound
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAnimalSound ? 'animate-bounce' : ''}`} />
                <span>{isPlayingAnimalSound ? 'Tocando Som...' : `Ouvir ${subject.animal.name}`}</span>
              </button>
              <button
                onClick={() => setShowAnimalInfoModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Fechar Informações
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
