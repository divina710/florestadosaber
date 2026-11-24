import React, { useState, useMemo, useEffect } from 'react';
import { SubjectData } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { Sparkles, Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Clock, Zap } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { motion } from 'framer-motion';
import {
  getSeenQuestionIds,
  markQuestionsAsSeen,
  selectNonRepeatingChallengeQuestions,
} from '../utils/quizSelection';

const CHALLENGE_SEEN_KEY = 'floresta_seen_challenge_v1';
const CHALLENGE_ROUND_SIZE = 8;

interface ForestChallengeSectionProps {
  subjects: SubjectData[];
  onCompleteChallenge: (score: number, total: number, earnedXp: number) => void;
  onBackToHome: () => void;
}

export const ForestChallengeSection: React.FC<ForestChallengeSectionProps> = ({
  subjects,
  onCompleteChallenge,
  onBackToHome,
}) => {
  const [roundSeed, setRoundSeed] = useState(0);
  const [answeredCorrectIds, setAnsweredCorrectIds] = useState<string[]>([]);
  const [seenIdsState, setSeenIdsState] = useState<string[]>(() => getSeenQuestionIds(CHALLENGE_SEEN_KEY));

  // Pick 8 non-repeating questions across diverse subjects
  const challengeRound = useMemo(() => {
    return selectNonRepeatingChallengeQuestions(subjects, CHALLENGE_SEEN_KEY, CHALLENGE_ROUND_SIZE);
  }, [subjects, roundSeed]);

  const challengeQuestions = challengeRound.items;

  useEffect(() => {
    setSeenIdsState(getSeenQuestionIds(CHALLENGE_SEEN_KEY));
  }, [challengeRound]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const score = answeredCorrectIds.length;
  const currentItem = challengeQuestions[currentIdx];

  const remainingUnseenInBank = useMemo(() => {
    const seenSet = new Set(seenIdsState);
    let unseen = 0;
    const countedIds = new Set<string>();
    subjects.forEach((sub) => {
      sub.quizzes.forEach((q) => {
        if (!countedIds.has(q.id)) {
          countedIds.add(q.id);
          if (!seenSet.has(q.id)) unseen++;
        }
      });
    });
    return unseen;
  }, [subjects, seenIdsState]);

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    soundManager.playClick();
    setSelectedOptionId(optId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isAnswerSubmitted || !currentItem) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionId === currentItem.question.correctOptionId;

    const updatedSeen = markQuestionsAsSeen(CHALLENGE_SEEN_KEY, [currentItem.question.id]);
    setSeenIdsState(updatedSeen);

    if (isCorrect) {
      soundManager.playSuccess();
      setAnsweredCorrectIds((prev) =>
        prev.includes(currentItem.question.id) ? prev : [...prev, currentItem.question.id]
      );
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx + 1 < challengeQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      finishChallenge();
    }
  };

  const finishChallenge = () => {
    setIsFinished(true);
    const finalScore = answeredCorrectIds.length;
    const earnedXp = finalScore * 60 + 100; // Bonus challenge XP
    soundManager.playLevelUp();
    onCompleteChallenge(finalScore, challengeQuestions.length, earnedXp);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setAnsweredCorrectIds([]);
    setIsFinished(false);
    setRoundSeed((prev) => prev + 1);
  };

  if (!currentItem && !isFinished) {
    return <div className="p-8 text-center">Nenhuma questão disponível.</div>;
  }

  if (isFinished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / challengeQuestions.length) * 100);
    const earnedXp = finalScore * 60 + 100;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl text-center max-w-2xl mx-auto space-y-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: [0, 1.2, 1], rotate: [-20, 8, 0] }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center text-4xl shadow-xl shadow-orange-500/20"
        >
          ⚡
        </motion.div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-950 px-3 py-1 rounded-full">
            Desafio da Floresta Concluído!
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
            Prova dos Guardiões Finalizada!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Você enfrentou {challengeQuestions.length} questões inéditas de diversas matérias escolares do Ensino Médio ({remainingUnseenInBank} inéditas restantes no banco).
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 my-6">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 block">Pontuação</span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {finalScore}/{challengeQuestions.length}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 block">Desempenho</span>
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

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nova Rodada Sem Repetir</span>
          </button>
          <button
            onClick={onBackToHome}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
          >
            <span>Voltar ao Início</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  const q = currentItem.question;
  const isCurrentCorrect = selectedOptionId === q.correctOptionId;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-orange-100">
            <Zap className="w-4 h-4" />
            <span>Torneio Interdisciplinar • Sem Repetições</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Desafio da Floresta do Saber
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 mt-1">
            {challengeQuestions.length} questões inéditas sorteadas de diferentes matérias • {remainingUnseenInBank} de {challengeRound.totalUniquePool} inéditas no banco!
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
          🐆
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AnimalAvatar animalId={currentItem.subjectId} size="sm" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md">
              Matéria: {currentItem.subjectName}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Pergunta {currentIdx + 1} de {challengeQuestions.length}
          </span>
        </div>

        {q.context && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-300 border-l-4 border-amber-500 italic">
            "{q.context}"
          </div>
        )}

        <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {q.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === q.correctOptionId;

            let cardStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-orange-400';
            let letterStyle = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

            if (isSelected && !isAnswerSubmitted) {
              cardStyle = 'bg-orange-50 dark:bg-orange-950/60 border-orange-500 ring-2 ring-orange-500';
              letterStyle = 'bg-orange-600 text-white';
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
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3.5 ${cardStyle}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 uppercase ${letterStyle}`}>
                  {opt.id}
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 flex-1">
                  {opt.text}
                </span>
                {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              </div>
            );
          })}
        </div>

        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
              selectedOptionId
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white active:scale-98'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            Confirmar Resposta
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
              isCurrentCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-950 dark:text-amber-200'
            }`}>
              <strong>{isCurrentCorrect ? '✓ Muito bem!' : '✗ Veja a explicação:'}</strong>
              <p className="leading-relaxed">{q.explanation}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md"
            >
              <span>{currentIdx + 1 < challengeQuestions.length ? 'Próxima Questão do Desafio' : 'Ver Resultado Final'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
