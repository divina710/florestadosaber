import React, { useState, useEffect } from 'react';
import { SubjectData, QuizQuestion } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, Trophy, RotateCcw, ArrowRight, Clock, Award, MessageSquare } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { motion } from 'framer-motion';
import {
  clearSeenQuestionIds,
  deduplicateQuestions,
  getSeenQuestionIds,
  markQuestionsAsSeen,
  shuffleArray,
} from '../utils/quizSelection';

interface QuizGameSectionProps {
  subject: SubjectData;
  onCompleteQuiz: (score: number, total: number, earnedXp: number) => void;
  onSwitchToFlashcards?: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const QuizGameSection: React.FC<QuizGameSectionProps> = ({
  subject,
  onCompleteQuiz,
  onSwitchToFlashcards,
  searchQuery = '',
  onClearSearch,
}) => {
  const query = searchQuery.trim().toLowerCase();
  const storageKey = `floresta_seen_quiz_${subject.id}`;

  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Fácil' | 'Médio' | 'Difícil'>('all');
  const [answeredHistory, setAnsweredHistory] = useState<Record<string, { isCorrect: boolean; selectedId: string }>>({});
  const [roundSeed, setRoundSeed] = useState(0);
  const [seenIdsState, setSeenIdsState] = useState<string[]>(() => getSeenQuestionIds(storageKey));

  const uniqueQuizzes = React.useMemo(
    () => deduplicateQuestions(subject.quizzes),
    [subject.quizzes]
  );

  const diffCounts = React.useMemo(() => {
    const counts = { all: uniqueQuizzes.length, Fácil: 0, Médio: 0, Difícil: 0 };
    uniqueQuizzes.forEach((q) => {
      if (counts[q.difficulty] !== undefined) {
        counts[q.difficulty]++;
      }
    });
    return counts;
  }, [uniqueQuizzes]);

  const filteredPool: QuizQuestion[] = React.useMemo(() => {
    let list = uniqueQuizzes;
    if (query) {
      list = list.filter((q) => {
        const inQuestion = q.question.toLowerCase().includes(query);
        const inContext = q.context ? q.context.toLowerCase().includes(query) : false;
        const inExplanation = q.explanation.toLowerCase().includes(query);
        const inYear = q.yearSource ? q.yearSource.toLowerCase().includes(query) : false;
        const inOptions = q.options.some((o) => o.text.toLowerCase().includes(query));
        return inQuestion || inContext || inExplanation || inYear || inOptions;
      });
    }
    if (difficultyFilter !== 'all') {
      list = list.filter((q) => q.difficulty === difficultyFilter);
    }
    return list;
  }, [uniqueQuizzes, query, difficultyFilter]);

  const roundData = React.useMemo(() => {
    if (filteredPool.length === 0) {
      return { questions: [] as QuizQuestion[], cycleReset: false };
    }
    const seenSet = new Set(getSeenQuestionIds(storageKey));
    const unseen = filteredPool.filter((q) => !seenSet.has(q.id));

    if (unseen.length > 0) {
      return {
        questions: shuffleArray(unseen),
        cycleReset: false,
      };
    }

    return {
      questions: shuffleArray(filteredPool),
      cycleReset: true,
    };
    // Intentionally excludes live seenIdsState so active round list stays stable while answering
  }, [filteredPool, storageKey, roundSeed]);

  const questions = roundData.questions;

  useEffect(() => {
    if (roundData.cycleReset && filteredPool.length > 0) {
      const updated = clearSeenQuestionIds(
        storageKey,
        filteredPool.map((q) => q.id)
      );
      setSeenIdsState(updated);
    } else {
      setSeenIdsState(getSeenQuestionIds(storageKey));
    }
  }, [roundData, filteredPool, storageKey]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Optional timer
  const [timerEnabled, setTimerEnabled] = useState(false);

  const score = React.useMemo(
    () => Object.keys(answeredHistory).filter((id) => answeredHistory[id].isCorrect).length,
    [answeredHistory]
  );

  const remainingUnseenCount = React.useMemo(() => {
    const seenSet = new Set(seenIdsState);
    return filteredPool.filter((q) => !seenSet.has(q.id)).length;
  }, [filteredPool, seenIdsState]);

  // Reset quiz state when subject, search, or difficulty changes
  useEffect(() => {
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsFinished(false);
    setAnsweredHistory({});
    setSeenIdsState(getSeenQuestionIds(storageKey));
    if (timerEnabled) setTimeLeft(60);
  }, [subject.id, query, difficultyFilter, storageKey]);

  const currentQuestion = questions[currentQuestionIdx];

  // Timer countdown if enabled
  useEffect(() => {
    if (!timerEnabled || isAnswerSubmitted || isFinished || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timerEnabled, timeLeft, isAnswerSubmitted, isFinished]);

  if (questions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto text-xl font-bold">
          ❓
        </div>
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-slate-900 dark:text-white">
            Nenhuma questão encontrada
          </h3>
          <p className="text-xs text-slate-500">
            Nenhum quiz de {subject.name} corresponde à pesquisa "{searchQuery}".
          </p>
        </div>
        {onClearSearch && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-colors"
          >
            Limpar Pesquisa & Ver Todos os Quizzes
          </button>
        )}
      </div>
    );
  }

  const handleStartTimer = () => {
    setTimerEnabled(true);
    setTimeLeft(60); // 60 seconds per question
  };

  const handleTimeOut = () => {
    if (!currentQuestion || isAnswerSubmitted) return;
    soundManager.playError();
    setIsAnswerSubmitted(true);
    setAnsweredHistory((prev) => ({
      ...prev,
      [currentQuestion.id]: { isCorrect: false, selectedId: selectedOptionId || '' },
    }));
    const updatedSeen = markQuestionsAsSeen(storageKey, [currentQuestion.id]);
    setSeenIdsState(updatedSeen);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    soundManager.playClick();
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted || !currentQuestion) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;

    setAnsweredHistory((prev) => ({
      ...prev,
      [currentQuestion.id]: { isCorrect, selectedId: selectedOptionId },
    }));

    const updatedSeen = markQuestionsAsSeen(storageKey, [currentQuestion.id]);
    setSeenIdsState(updatedSeen);

    if (isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    if (idx === currentQuestionIdx) return;
    soundManager.playClick();
    setCurrentQuestionIdx(idx);
    const targetQ = questions[idx];
    const prevAnswer = answeredHistory[targetQ.id];
    if (prevAnswer) {
      setSelectedOptionId(prevAnswer.selectedId);
      setIsAnswerSubmitted(true);
    } else {
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      if (timerEnabled) setTimeLeft(60);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentQuestionIdx + 1 < questions.length) {
      const nextIdx = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextIdx);
      const nextQ = questions[nextIdx];
      const prevAnswer = answeredHistory[nextQ.id];
      if (prevAnswer) {
        setSelectedOptionId(prevAnswer.selectedId);
        setIsAnswerSubmitted(true);
      } else {
        setSelectedOptionId(null);
        setIsAnswerSubmitted(false);
        if (timerEnabled) setTimeLeft(60);
      }
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const finalScore = Object.keys(answeredHistory).filter((id) => answeredHistory[id].isCorrect).length;
    const earnedXp = finalScore * 50 + (finalScore === questions.length ? 100 : 25);

    soundManager.playLevelUp();
    onCompleteQuiz(finalScore, questions.length, earnedXp);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setAnsweredHistory({});
    setIsFinished(false);
    setRoundSeed((prev) => prev + 1);
    if (timerEnabled) setTimeLeft(60);
  };

  if (isFinished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const earnedXp = finalScore * 50 + (finalScore === questions.length ? 100 : 25);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl text-center max-w-2xl mx-auto space-y-6"
      >
        
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: [0, 1.2, 1], rotate: [ -25, 10, 0 ] }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20"
        >
          🏆
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Quiz Concluído com Sucesso!
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
            Desafio de {subject.name} Finalizado!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Você respondeu ao quiz temático do guardião <strong className="text-slate-900 dark:text-white">{subject.animal.name}</strong>.
          </p>
        </div>

        {/* Score & XP Cards */}
        <div className="grid grid-cols-3 gap-3 my-6">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 block">Acertos</span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {finalScore}/{questions.length}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 block">Aproveitamento</span>
            <div className="text-2xl font-black text-amber-500">
              {percentage}%
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 block">XP Ganho</span>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
              +{earnedXp} XP
            </div>
          </div>
        </div>

        {/* Animal Mascot Feedback */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800 text-left flex items-start space-x-3.5">
          <AnimalAvatar animalId={subject.id} size="md" showBadge />
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Mensagem do Guardião {subject.animal.name}:
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic">
              {percentage >= 70
                ? `Excelente domínio! Suas garras estão afiadas para o ENEM. Continue explorando os flashcards para consolidar a memória!`
                : `Bom esforço! Na floresta, cada tentativa nos torna mais sábios. Revise a videoaula e tente novamente para gabaritar!`}
            </p>
          </div>
        </div>

        {/* Next Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>
              {remainingUnseenCount > 0
                ? `Próximas Questões Inéditas (${remainingUnseenCount})`
                : `Novo Ciclo Embaralhado (${filteredPool.length})`}
            </span>
          </button>

          {onSwitchToFlashcards && (
            <button
              onClick={onSwitchToFlashcards}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Praticar Flashcards 3D</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </motion.div>
    );
  }

  const isCurrentCorrect = selectedOptionId === currentQuestion.correctOptionId;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {query && (
        <div className="px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
          <span className="font-medium">
            Mostrando <strong>{questions.length}</strong> de {subject.quizzes.length} questões para a busca: <strong>"{searchQuery}"</strong>
          </span>
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className="text-amber-800 dark:text-amber-300 font-bold underline hover:text-amber-950 dark:hover:text-white"
            >
              Ver todas
            </button>
          )}
        </div>
      )}

      {/* Difficulty Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-semibold">
          <span>Dificuldade dos Quizzes:</span>
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md">
            Sem repetições • {remainingUnseenCount} de {filteredPool.length} inéditas restantes
          </span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setDifficultyFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              difficultyFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
            }`}
          >
            Todas ({diffCounts.all})
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setDifficultyFilter('Fácil');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
              difficultyFilter === 'Fácil'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <span>🟢 Fácil</span>
            <span className="text-[10px] opacity-80">({diffCounts.Fácil})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setDifficultyFilter('Médio');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
              difficultyFilter === 'Médio'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
            }`}
          >
            <span>🟡 Médio</span>
            <span className="text-[10px] opacity-80">({diffCounts.Médio})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setDifficultyFilter('Difícil');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
              difficultyFilter === 'Difícil'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            <span>🔴 Difícil (ENEM)</span>
            <span className="text-[10px] opacity-80">({diffCounts.Difícil})</span>
          </button>
        </div>
      </div>

      {/* Quiz Progress & Timer Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
            Questão {currentQuestionIdx + 1} de {questions.length}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
            currentQuestion.difficulty === 'Fácil'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
              : currentQuestion.difficulty === 'Difícil'
              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>

        {/* Interactive Question Jump Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {questions.map((q, i) => {
            const hist = answeredHistory[q.id];
            const isCurrent = i === currentQuestionIdx;
            let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent';

            if (hist) {
              btnClass = hist.isCorrect
                ? 'bg-emerald-500 text-white font-bold'
                : 'bg-rose-500 text-white font-bold';
            }

            if (isCurrent) {
              btnClass += ' ring-2 ring-emerald-500 font-black shadow-xs';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleJumpToQuestion(i)}
                title={`Ir para questão ${i + 1} (${q.difficulty})`}
                className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all ${btnClass}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Timer Simulation Toggle */}
        <div className="flex items-center space-x-2">
          {!timerEnabled ? (
            <button
              onClick={handleStartTimer}
              className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center space-x-1"
              title="Ativar cronômetro de 60s por questão"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Simular Tempo</span>
            </button>
          ) : (
            <div className={`flex items-center space-x-1 font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
              timeLeft !== null && timeLeft <= 15
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Context / Year Source Tag */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
            {currentQuestion.yearSource || `Nível: ${currentQuestion.difficulty}`}
          </span>
          <span className="text-slate-400 font-medium">
            Vale +50 XP
          </span>
        </div>

        {/* Context text if available */}
        {currentQuestion.context && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300 border-l-4 border-emerald-500 italic">
            "{currentQuestion.context}"
          </div>
        )}

        {/* Question Statement */}
        <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {currentQuestion.question}
        </h3>

        {/* 4 Options Grid */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.id === currentQuestion.correctOptionId;

            let cardStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400';
            let letterStyle = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

            if (isSelected && !isAnswerSubmitted) {
              cardStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500';
              letterStyle = 'bg-emerald-600 text-white';
            } else if (isAnswerSubmitted) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 ring-2 ring-emerald-500';
                letterStyle = 'bg-emerald-600 text-white';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-100 dark:bg-rose-950 border-rose-500 ring-2 ring-rose-500';
                letterStyle = 'bg-rose-600 text-white';
              } else {
                cardStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3.5 ${cardStyle}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors uppercase ${letterStyle}`}>
                  {option.id}
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed flex-1">
                  {option.text}
                </span>
                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Next Button */}
        {!isAnswerSubmitted ? (
          <button
            id="submit-quiz-answer-btn"
            onClick={handleSubmitAnswer}
            disabled={!selectedOptionId}
            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
              selectedOptionId
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white active:scale-98'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            Confirmar Resposta
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            
            {/* Guardian Explanation Box */}
            <div className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 ${
              isCurrentCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            }`}>
              <div className="flex items-center space-x-2 font-bold">
                <AnimalAvatar animalId={subject.id} size="sm" />
                <span>
                  {isCurrentCorrect
                    ? `Correto! Explicação do ${subject.animal.name}:`
                    : `Não foi dessa vez! O ${subject.animal.name} explica a resposta:`}
                </span>
              </div>
              <p className="leading-relaxed pl-10 text-slate-800 dark:text-slate-200">
                {currentQuestion.explanation}
              </p>
            </div>

            <button
              id="next-quiz-question-btn"
              onClick={handleNextQuestion}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all active:scale-98"
            >
              <span>{currentQuestionIdx + 1 < questions.length ? 'Próxima Questão' : 'Ver Resultado do Desafio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
