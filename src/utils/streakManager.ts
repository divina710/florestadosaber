import { UserStats } from '../types';

/**
 * Returns YYYY-MM-DD in local time
 */
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns yesterday's YYYY-MM-DD in local time
 */
export function getYesterdayDateString(date: Date = new Date()): string {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

/**
 * Synchronizes and computes streak on application load or day change
 */
export function syncStreakOnLoad(stats: UserStats): UserStats {
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  const history = Array.isArray(stats.studyDaysHistory) ? [...stats.studyDaysHistory] : [];
  const currentStreak = stats.streakDays || 0;
  const bestStreak = stats.bestStreak || Math.max(currentStreak, 3);
  const lastActive = stats.lastActiveDate;

  // Case 1: Already active today
  if (lastActive === today) {
    return {
      ...stats,
      todayCheckedIn: true,
      streakDays: Math.max(1, currentStreak),
      bestStreak: Math.max(bestStreak, currentStreak),
      studyDaysHistory: history.includes(today) ? history : [...history, today],
    };
  }

  // Case 2: Active yesterday - streak is intact, waiting for today's check-in
  if (lastActive === yesterday) {
    return {
      ...stats,
      todayCheckedIn: false,
      streakDays: currentStreak,
      bestStreak: Math.max(bestStreak, currentStreak),
      studyDaysHistory: history,
    };
  }

  // Case 3: Initial or fresh setup (give welcoming 3-day momentum or start at 1)
  if (!lastActive) {
    return {
      ...stats,
      todayCheckedIn: false,
      streakDays: currentStreak > 0 ? currentStreak : 3,
      bestStreak: Math.max(bestStreak, 3),
      studyDaysHistory: history,
    };
  }

  // Case 4: Missed one or more days - reset streak to 0 until today is checked in
  return {
    ...stats,
    todayCheckedIn: false,
    streakDays: 0,
    bestStreak,
    studyDaysHistory: history,
  };
}

/**
 * Performs daily check-in (registers today's streak and awards XP)
 */
export function registerDailyCheckIn(stats: UserStats): {
  updatedStats: UserStats;
  isNewCheckIn: boolean;
  xpAwarded: number;
  newBadges: string[];
} {
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  // If already checked in today, do not double-increment
  if (stats.lastActiveDate === today && stats.todayCheckedIn) {
    return {
      updatedStats: stats,
      isNewCheckIn: false,
      xpAwarded: 0,
      newBadges: [],
    };
  }

  const prevStreak = stats.streakDays || 0;
  let newStreak = 1;

  if (stats.lastActiveDate === yesterday) {
    newStreak = prevStreak + 1;
  } else if (prevStreak > 0 && !stats.lastActiveDate) {
    newStreak = prevStreak + 1;
  }

  const newBest = Math.max(stats.bestStreak || 0, newStreak);
  const history = Array.isArray(stats.studyDaysHistory) ? [...stats.studyDaysHistory] : [];
  if (!history.includes(today)) {
    history.push(today);
  }

  const xpBonus = 50;
  const newBadges: string[] = [];

  const existingBadges = stats.unlockedBadges || [];
  if (newStreak >= 3 && !existingBadges.includes('badge-streak-3')) {
    newBadges.push('badge-streak-3');
  }
  if (newStreak >= 7 && !existingBadges.includes('badge-streak-7')) {
    newBadges.push('badge-streak-7');
  }
  if (newStreak >= 14 && !existingBadges.includes('badge-streak-14')) {
    newBadges.push('badge-streak-14');
  }

  const updatedStats: UserStats = {
    ...stats,
    streakDays: newStreak,
    bestStreak: newBest,
    todayCheckedIn: true,
    lastActiveDate: today,
    studyDaysHistory: history,
    xp: stats.xp + xpBonus,
    level: Math.floor((stats.xp + xpBonus) / 200) + 1,
    unlockedBadges: [...existingBadges, ...newBadges],
  };

  return {
    updatedStats,
    isNewCheckIn: true,
    xpAwarded: xpBonus,
    newBadges,
  };
}

/**
 * Returns 7 days for the weekly strip (centered on current week: Mon to Sun)
 */
export function getWeeklyStreakDays(stats: UserStats): {
  dayName: string;
  shortDate: string;
  fullDate: string;
  isToday: boolean;
  isCheckedIn: boolean;
}[] {
  const todayStr = getLocalDateString();
  const history = stats.studyDaysHistory || [];
  const now = new Date();

  // Find Monday of current week (0 is Sun, 1 is Mon)
  const currentDayOfWeek = now.getDay(); // 0-6
  const distanceToMonday = (currentDayOfWeek + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - distanceToMonday);

  const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = getLocalDateString(d);

    const isToday = dateStr === todayStr;
    const isCheckedIn = history.includes(dateStr) || (isToday && !!stats.todayCheckedIn);

    weekDays.push({
      dayName: dayLabels[i],
      shortDate: `${d.getDate()}/${d.getMonth() + 1}`,
      fullDate: dateStr,
      isToday,
      isCheckedIn,
    });
  }

  return weekDays;
}

/**
 * Inspiring quote from Guilherme according to streak level
 */
export function getGuilhermeStreakQuote(streak: number, checkedInToday: boolean): string {
  if (!checkedInToday) {
    return 'Roar! O dia de hoje ainda não acabou. Faça seu check-in de estudos para manter sua chama acesa!';
  }
  if (streak >= 14) {
    return 'Impressionante! Com 14 dias ou mais de ofensiva, sua dedicação é digna do topo da cadeia da floresta!';
  }
  if (streak >= 7) {
    return 'Uma semana inteira sem parar! A constância é o segredo para conquistar as notas mais altas do ENEM!';
  }
  if (streak >= 3) {
    return '3 dias seguidos! O hábito de estudar já está enraizado na sua mente como uma sumaúma.';
  }
  return 'Primeiro passo dado! Toda grande jornada de aprovação começa com um único dia consistente.';
}
