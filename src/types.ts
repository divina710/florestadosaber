export type SubjectId =
  | 'artes'
  | 'biologia'
  | 'espanhol'
  | 'filosofia'
  | 'fisica'
  | 'geografia'
  | 'historia'
  | 'ingles'
  | 'matematica'
  | 'portugues'
  | 'quimica'
  | 'sociologia';

export type SubjectCategory = 'Linguagens' | 'Matemática' | 'Ciências da Natureza' | 'Ciências Humanas';

export interface ThematicAnimal {
  name: string;
  species: string;
  scientificName: string;
  habitat: string;
  funFact: string;
  personality: string;
  greetingMessage: string;
  tipQuote: string;
  avatarIcon: string; // Key for icon/avatar rendering
  illustrationUrl: string; // High-quality illustrative image of the animal
  themeColor: string;
  accentColor: string;
  bgGradient: string;
}

export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  topic: string;
  channel?: string; // Educational channel name (e.g. Curso Enem Gratuito, Brasil Escola)
  videoUrl?: string; // YouTube embed or educational preview
  youtubeId?: string;
  summary: string[];
  keyTerms: { term: string; definition: string }[];
  xpReward: number;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  context?: string; // Optional ENEM-style context text
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  yearSource?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  hint?: string;
  isCustom?: boolean;
}

export interface SubjectData {
  id: SubjectId;
  name: string;
  category: SubjectCategory;
  description: string;
  highSchoolFocus: string;
  animal: ThematicAnimal;
  videoLessons: VideoLesson[];
  quizzes: QuizQuestion[];
  flashcards: Flashcard[];
  recommendedTopics: string[];
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  bestStreak?: number;
  lastActiveDate?: string; // YYYY-MM-DD
  todayCheckedIn?: boolean;
  studyDaysHistory?: string[]; // Array of YYYY-MM-DD
  completedQuizzes: Record<string, number>; // quizId -> best score
  completedVideos: string[]; // video IDs
  masteredFlashcards: string[]; // flashcard IDs
  customFlashcards: Flashcard[];
  unlockedBadges: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  animalId: SubjectId | 'guilherme' | 'floresta';
  unlockedAt?: string;
}

export type GradeLevel = '1º Ano EM' | '2º Ano EM' | '3º Ano EM' | 'Pré-Vestibular / ENEM';

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  school?: string;
  state?: string;
  grade: GradeLevel;
  favoriteAnimal: SubjectId | 'guilherme';
  favoriteSubjects?: SubjectId[];
  studyTarget: string;
  isVerifiedStudent?: boolean;
  role?: 'student' | 'admin';
  avatarSeed?: string;
  createdAt: string;
}

export interface EssayCompetencyScore {
  score: number; // 0 to 200
  title: string;
  feedback: string;
}

export interface EssaySubmission {
  id: string;
  userId: string;
  studentName?: string;
  theme: string;
  title: string;
  content: string;
  wordCount: number;
  lineCount: number;
  createdAt: string;
  scores: {
    c1: EssayCompetencyScore; // Norma culta
    c2: EssayCompetencyScore; // Tema e repertório sociocultural
    c3: EssayCompetencyScore; // Argumentação e projeto de texto
    c4: EssayCompetencyScore; // Coesão e conectivos
    c5: EssayCompetencyScore; // Proposta de intervenção
    total: number; // 0 to 1000
  };
  feedback: {
    levelLabel: string;
    generalReview: string;
    strengths: string[];
    improvements: string[];
    quatiTip: string;
  };
}
