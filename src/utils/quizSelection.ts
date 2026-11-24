import { QuizQuestion, SubjectData, SubjectId } from '../types';

export interface ChallengeItem {
  question: QuizQuestion;
  subjectId: SubjectId;
  subjectName: string;
}

/**
 * Fisher-Yates shuffle returning a new shuffled array without mutating the input.
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Deduplicate quiz questions by id and normalized question statement.
 */
export function deduplicateQuestions(questions: readonly QuizQuestion[]): QuizQuestion[] {
  const seenIds = new Set<string>();
  const seenStatements = new Set<string>();
  const unique: QuizQuestion[] = [];

  for (const q of questions) {
    const normalizedText = q.question.trim().toLowerCase();
    if (!seenIds.has(q.id) && !seenStatements.has(normalizedText)) {
      seenIds.add(q.id);
      seenStatements.add(normalizedText);
      unique.push(q);
    }
  }

  return unique;
}

export function getSeenQuestionIds(storageKey: string): string[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function markQuestionsAsSeen(storageKey: string, ids: string[]): string[] {
  const existing = getSeenQuestionIds(storageKey);
  const merged = Array.from(new Set([...existing, ...ids]));
  try {
    localStorage.setItem(storageKey, JSON.stringify(merged));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
  return merged;
}

export function clearSeenQuestionIds(storageKey: string, idsToClear?: string[]): string[] {
  if (!idsToClear) {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors
    }
    return [];
  }

  const removeSet = new Set(idsToClear);
  const remaining = getSeenQuestionIds(storageKey).filter((id) => !removeSet.has(id));
  try {
    localStorage.setItem(storageKey, JSON.stringify(remaining));
  } catch {
    // Ignore storage errors
  }
  return remaining;
}

/**
 * Build a non-repeating challenge round across diverse subjects, prioritizing unseen questions.
 */
export function selectNonRepeatingChallengeQuestions(
  subjects: readonly SubjectData[],
  storageKey: string,
  count: number = 8
): { items: ChallengeItem[]; unseenBeforeRound: number; totalUniquePool: number; cycleReset: boolean } {
  const seenGlobal = new Set(getSeenQuestionIds(storageKey));
  const seenStatements = new Set<string>();
  const seenIds = new Set<string>();

  const perSubject = new Map<SubjectId, ChallengeItem[]>();
  const allItems: ChallengeItem[] = [];

  for (const sub of subjects) {
    const uniqueSubQs = deduplicateQuestions(sub.quizzes);
    const itemsForSub: ChallengeItem[] = [];
    for (const q of uniqueSubQs) {
      const normalized = q.question.trim().toLowerCase();
      if (!seenIds.has(q.id) && !seenStatements.has(normalized)) {
        seenIds.add(q.id);
        seenStatements.add(normalized);
        const item: ChallengeItem = {
          question: q,
          subjectId: sub.id,
          subjectName: sub.name,
        };
        itemsForSub.push(item);
        allItems.push(item);
      }
    }
    perSubject.set(sub.id, itemsForSub);
  }

  if (allItems.length === 0) {
    return { items: [], unseenBeforeRound: 0, totalUniquePool: 0, cycleReset: false };
  }

  let unseenItems = allItems.filter((item) => !seenGlobal.has(item.question.id));
  let cycleReset = false;

  if (unseenItems.length === 0) {
    clearSeenQuestionIds(storageKey);
    unseenItems = [...allItems];
    cycleReset = true;
  }

  const unseenBeforeRound = unseenItems.length;

  // Group unseen items by subject to maximize interdisciplinary variety
  const unseenBySubject = new Map<SubjectId, ChallengeItem[]>();
  for (const item of shuffleArray(unseenItems)) {
    const list = unseenBySubject.get(item.subjectId) || [];
    list.push(item);
    unseenBySubject.set(item.subjectId, list);
  }

  const selected: ChallengeItem[] = [];
  const selectedIds = new Set<string>();

  // Pass 1: 1 unseen question from each shuffled subject
  for (const subjectId of shuffleArray(Array.from(unseenBySubject.keys()))) {
    if (selected.length >= count) break;
    const pool = unseenBySubject.get(subjectId);
    if (pool && pool.length > 0) {
      const picked = pool.shift()!;
      selected.push(picked);
      selectedIds.add(picked.question.id);
    }
  }

  // Pass 2: fill remaining slots from other unseen items
  if (selected.length < count) {
    const remainingUnseen = shuffleArray(
      unseenItems.filter((item) => !selectedIds.has(item.question.id))
    );
    for (const item of remainingUnseen) {
      if (selected.length >= count) break;
      selected.push(item);
      selectedIds.add(item.question.id);
    }
  }

  // Pass 3: if fewer than `count` unseen remained in total, reset seen history and top up without duplicating inside this round
  if (selected.length < count && allItems.length > selected.length) {
    clearSeenQuestionIds(storageKey);
    cycleReset = true;
    const topUpPool = shuffleArray(
      allItems.filter((item) => !selectedIds.has(item.question.id))
    );
    for (const item of topUpPool) {
      if (selected.length >= count) break;
      selected.push(item);
      selectedIds.add(item.question.id);
    }
  }

  return {
    items: shuffleArray(selected),
    unseenBeforeRound,
    totalUniquePool: allItems.length,
    cycleReset,
  };
}
