import React, { useState } from 'react';
import { UserStats } from '../types';
import { getWeeklyStreakDays, registerDailyCheckIn, getGuilhermeStreakQuote } from '../utils/streakManager';
import { soundManager } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Flame, X, Trophy, CheckCircle2, Award, Sparkles, Calendar, Zap } from 'lucide-react';

interface DailyStreakModalProps {
  userStats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
  onClose: () => void;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({
  userStats,
  onUpdateStats,
  onClose,
}) => {
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  const weekDays = getWeeklyStreakDays(userStats);
  const quote = getGuilhermeStreakQuote(userStats.streakDays || 0, !!userStats.todayCheckedIn);

  const handleDoCheckIn = () => {
    soundManager.unlockAudio();
    const result = registerDailyCheckIn(userStats);

    if (result.isNewCheckIn) {
      soundManager.playLevelUp();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#eab308', '#10b981', '#ffffff'],
        });
      } catch {
        // ignore
      }
      setJustCheckedIn(true);
      onUpdateStats(result.updatedStats);
    } else {
      soundManager.playClick();
    }
  };

  const streakMilestones = [
    { days: 3, title: 'Chama da Constância', xp: '+100 XP', badgeId: 'badge-streak-3' },
    { days: 7, title: 'Fogo Sagrado (1 Semana)', xp: '+250 XP', badgeId: 'badge-streak-7' },
    { days: 14, title: 'Lenda da Disciplina', xp: '+500 XP', badgeId: 'badge-streak-14' },
    { days: 30, title: 'Mestre da Selva', xp: '+1000 XP', badgeId: 'badge-streak-30' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-orange-200 dark:border-orange-500/30 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-scale-up">
        
        {/* Header with Flame Banner */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-3xl shadow-lg shadow-orange-600/30 animate-pulse">
                <Flame className="w-8 h-8 text-white fill-white drop-shadow-md" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-slate-900">
                {userStats.streakDays || 0}d
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800/60">
                Ofensiva de Estudos
              </span>
              <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                Sequência Diária
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recorde: <strong className="text-orange-600 dark:text-amber-300">{userStats.bestStreak || userStats.streakDays || 1} dias</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Interactive Flame Counter Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/60 dark:from-orange-950/80 dark:via-slate-900 dark:to-amber-950/60 border border-orange-300 dark:border-orange-500/40 rounded-2xl p-5 text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-orange-600 dark:text-amber-400">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500 animate-bounce" />
            <span className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {userStats.streakDays || 0} {userStats.streakDays === 1 ? 'Dia de Fogo' : 'Dias Seguidos'}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
            {userStats.todayCheckedIn || justCheckedIn
              ? '🔥 Presença de hoje já confirmada! Você garantiu +50 XP e sua chama continua queimando firme!'
              : 'Estude pelo menos 5 minutos ou confirme sua presença hoje para não quebrar a sua sequência!'}
          </p>

          {/* Action Check-in Button */}
          {!userStats.todayCheckedIn && !justCheckedIn ? (
            <button
              id="confirm-daily-streak-btn"
              onClick={handleDoCheckIn}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-md shadow-orange-500/30 flex items-center justify-center space-x-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Confirmar Presença de Hoje (+50 XP)</span>
            </button>
          ) : (
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-600/50 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-4 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Check-in concluído hoje! Volte amanhã para continuar.</span>
            </div>
          )}
        </div>

        {/* 7-Day Weekly Calendar Strip */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1.5 font-bold text-slate-700 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>Esta Semana</span>
            </span>
            <span>Segunda a Domingo</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
            {weekDays.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-between p-2 rounded-xl border transition-all ${
                  item.isCheckedIn
                    ? 'bg-orange-50 dark:bg-gradient-to-b dark:from-orange-950/80 dark:to-amber-950/50 border-orange-300 dark:border-orange-500/60 shadow-xs'
                    : item.isToday
                    ? 'bg-amber-50 dark:bg-slate-800 border-amber-400 ring-2 ring-amber-400/30'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                }`}
              >
                <span className="text-[11px] font-bold uppercase text-slate-700 dark:text-slate-200">{item.dayName}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 my-0.5">{item.shortDate}</span>

                <div className="mt-1">
                  {item.isCheckedIn ? (
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    </div>
                  ) : item.isToday ? (
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-400/10 border border-dashed border-amber-500 dark:border-amber-400/60 flex items-center justify-center animate-pulse">
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">Hoje</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs">
                      •
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot Advice Quote */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-3.5 flex items-start space-x-3 text-xs">
          <span className="text-2xl shrink-0">🐆</span>
          <div className="space-y-1">
            <div className="font-bold text-emerald-800 dark:text-emerald-300">Conselho da Onça-Pintada:</div>
            <p className="text-emerald-900/90 dark:text-emerald-100/80 italic leading-relaxed">
              "{quote}"
            </p>
          </div>
        </div>

        {/* Streak Milestones */}
        <div className="space-y-2">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Marcos de Sequência</span>
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {streakMilestones.map((m, idx) => {
              const reached = (userStats.streakDays || 0) >= m.days;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    reached
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-200'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{m.days} dias: {m.title}</div>
                    <div className="text-[10px] opacity-75">{m.xp}</div>
                  </div>
                  {reached ? (
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 ml-1.5" />
                  ) : (
                    <span className="text-[10px] text-slate-400 dark:text-slate-600">{m.days}d</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs transition-colors"
        >
          Continuar Estudando
        </button>

      </div>
    </div>
  );
};
