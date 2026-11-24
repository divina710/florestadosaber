import React, { useMemo } from 'react';
import { StudentUser, UserStats } from '../types';
import { getGlobalRanking, isAdmin } from '../utils/authManager';
import { AnimalAvatar } from './AnimalAvatar';
import { soundManager } from '../utils/soundEffects';
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Lock,
  LogIn,
  UserPlus,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  BookOpen,
  Award,
  TrendingUp,
} from 'lucide-react';

interface RankingDaSelvaProps {
  currentUser: StudentUser | null;
  userStats: UserStats;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onBackToHome: () => void;
  onGoToChallenge?: () => void;
  onGoToSubjects?: () => void;
}

export const RankingDaSelva: React.FC<RankingDaSelvaProps> = ({
  currentUser,
  userStats,
  onOpenLogin,
  onOpenRegister,
  onBackToHome,
  onGoToChallenge,
  onGoToSubjects,
}) => {
  const { topList, currentUserEntry, totalParticipants } = useMemo(() => {
    if (!currentUser) {
      return { topList: [], currentUserEntry: null, totalParticipants: 0 };
    }
    return getGlobalRanking(currentUser, userStats, 10);
  }, [currentUser, userStats]);

  // STRICT AUTH GATE: Accessible only to logged-in users
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 space-y-6 animate-fade-in">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onBackToHome();
          }}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Floresta</span>
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Acesso Restrito a Usuários Logados
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Ranking da Selva
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Para proteger a privacidade dos estudantes e exibir a classificação oficial dos 10 melhores alunos por XP global, é necessário entrar na sua conta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
            <button
              id="ranking-gate-login-btn"
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenLogin();
              }}
              className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Fazer Login</span>
            </button>

            <button
              id="ranking-gate-register-btn"
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenRegister();
              }}
              className="flex-1 py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Criar Cadastro</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const podiumFirst = topList[0];
  const podiumSecond = topList[1];
  const podiumThird = topList[2];
  const tenthPlaceXp = topList.length >= 10 ? topList[9].stats.xp : 0;
  const userIsAdmin = isAdmin(currentUser);

  const getRankDisplay = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-sm">
          <Crown className="w-5 h-5" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-slate-900 flex items-center justify-center font-black text-sm shadow-sm">
          <Medal className="w-5 h-5" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-300 via-amber-600 to-orange-700 text-white flex items-center justify-center font-black text-sm shadow-sm">
          <Medal className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-heading font-extrabold text-sm tabular-nums">
        {rank}º
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 space-y-8 pb-16 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onBackToHome();
          }}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Floresta</span>
        </button>

        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Top 10 Global</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{totalParticipants} estudantes classificados</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            Conectado como {currentUser.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-700/60">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Trophy className="w-4 h-4" />
              <span>Classificação Oficial · Floresta do Saber</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-black text-white">
              Ranking da Selva
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              Os 10 melhores estudantes do Ensino Médio por pontuação de XP global. Conclua videoaulas, acerte quizzes, envie redações e mantenha sua ofensiva diária para alcançar o topo!
            </p>
          </div>

          {/* Current User Rank Summary Card */}
          {!userIsAdmin && currentUserEntry && (
            <div className="shrink-0 bg-slate-900/70 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 min-w-[240px]">
              <AnimalAvatar animalId={currentUser.favoriteAnimal} size="md" />
              <div>
                <div className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
                  Sua Posição Global
                </div>
                <div className="font-heading text-2xl font-black text-white tabular-nums">
                  {currentUserEntry.rank}º lugar
                </div>
                <div className="text-xs text-amber-300 font-bold tabular-nums">
                  {currentUserEntry.stats.xp.toLocaleString('pt-BR')} XP · Nível {currentUserEntry.stats.level}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top 3 Podium */}
      {topList.length >= 3 && (
        <section aria-label="Pódio dos 3 Primeiros Colocados" className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* 2nd Place */}
          {podiumSecond && (
            <div
              className={`order-2 md:order-1 bg-white dark:bg-slate-900 rounded-3xl p-5 border shadow-sm transition-all ${
                podiumSecond.student.id === currentUser.id
                  ? 'border-emerald-500 ring-2 ring-emerald-500/40'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-sm text-slate-500 dark:text-slate-300 flex items-center space-x-1.5">
                  <Medal className="w-4 h-4 text-slate-400" />
                  <span>2º Lugar · Prata</span>
                </span>
                <span className="text-xs font-bold text-orange-500 flex items-center space-x-1 tabular-nums">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{podiumSecond.stats.streakDays || 0}d</span>
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2.5">
                <AnimalAvatar animalId={podiumSecond.student.favoriteAnimal} size="lg" />
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center justify-center space-x-1">
                    <span>{podiumSecond.student.name}</span>
                    {podiumSecond.student.isVerifiedStudent && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {podiumSecond.student.state || 'Brasil'} · {podiumSecond.student.grade}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 w-full">
                  <div className="font-heading text-2xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
                    {podiumSecond.stats.xp.toLocaleString('pt-BR')} XP
                  </div>
                  <div className="text-[11px] text-slate-500">Nível {podiumSecond.stats.level}</div>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place (Elevated) */}
          {podiumFirst && (
            <div
              className={`order-1 md:order-2 bg-gradient-to-b from-amber-50/90 via-white to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-6 border-2 shadow-lg transition-all ${
                podiumFirst.student.id === currentUser.id
                  ? 'border-emerald-500 ring-2 ring-emerald-500/40'
                  : 'border-amber-400 dark:border-amber-500/70'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-sm text-amber-700 dark:text-amber-300 flex items-center space-x-1.5">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span>1º Lugar · Líder da Selva</span>
                </span>
                <span className="text-xs font-bold text-orange-500 flex items-center space-x-1 tabular-nums">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{podiumFirst.stats.streakDays || 0}d</span>
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-3">
                <AnimalAvatar animalId={podiumFirst.student.favoriteAnimal} size="xl" />
                <div>
                  <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white flex items-center justify-center space-x-1.5">
                    <span>{podiumFirst.student.name}</span>
                    {podiumFirst.student.isVerifiedStudent && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {podiumFirst.student.school || 'Ensino Médio'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {podiumFirst.student.state || 'Brasil'} · {podiumFirst.student.grade}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-amber-200/70 dark:border-amber-800/50 w-full">
                  <div className="font-heading text-3xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                    {podiumFirst.stats.xp.toLocaleString('pt-BR')} XP
                  </div>
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Nível {podiumFirst.stats.level} · {podiumFirst.stats.unlockedBadges.length} medalhas
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {podiumThird && (
            <div
              className={`order-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border shadow-sm transition-all ${
                podiumThird.student.id === currentUser.id
                  ? 'border-emerald-500 ring-2 ring-emerald-500/40'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-sm text-amber-800 dark:text-orange-400 flex items-center space-x-1.5">
                  <Medal className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span>3º Lugar · Bronze</span>
                </span>
                <span className="text-xs font-bold text-orange-500 flex items-center space-x-1 tabular-nums">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{podiumThird.stats.streakDays || 0}d</span>
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-2.5">
                <AnimalAvatar animalId={podiumThird.student.favoriteAnimal} size="lg" />
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center justify-center space-x-1">
                    <span>{podiumThird.student.name}</span>
                    {podiumThird.student.isVerifiedStudent && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {podiumThird.student.state || 'Brasil'} · {podiumThird.student.grade}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 w-full">
                  <div className="font-heading text-2xl font-black text-slate-800 dark:text-slate-100 tabular-nums">
                    {podiumThird.stats.xp.toLocaleString('pt-BR')} XP
                  </div>
                  <div className="text-[11px] text-slate-500">Nível {podiumThird.stats.level}</div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Full Top 10 List */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-900/80">
          <div>
            <h2 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Top 10 Melhores Alunos por XP Global
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pontuação acumulada em videoaulas, quizzes, flashcards 3D e redações ENEM
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Atualizado em tempo real
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {topList.length === 0 ? (
            <div className="px-6 py-12 text-center space-y-2">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
              <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
                Nenhum estudante no ranking ainda
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                A classificação é composta apenas por estudantes reais cadastrados. Crie uma conta de estudante, responda quizzes e acumule XP para estrear no Top 10!
              </p>
            </div>
          ) : (
            topList.map((entry) => {
            const isCurrentStudent =
              entry.student.id === currentUser.id ||
              entry.student.email.toLowerCase() === currentUser.email.toLowerCase();

            return (
              <div
                key={entry.student.id}
                className={`px-4 sm:px-6 py-4 flex items-center justify-between gap-3 transition-colors ${
                  isCurrentStudent
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-l-4 border-l-emerald-500'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                  <div className="shrink-0">{getRankDisplay(entry.rank)}</div>
                  <div className="shrink-0">
                    <AnimalAvatar animalId={entry.student.favoriteAnimal} size="sm" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                        {entry.student.name}
                      </span>
                      {entry.student.isVerifiedStudent && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                          aria-label="Estudante Verificado"
                        />
                      )}
                      {isCurrentStudent && (
                        <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 ml-1">
                          (Você)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      <span>{entry.student.school || 'Ensino Médio'}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{entry.student.state || 'Brasil'}</span>
                      <span className="hidden sm:inline mx-1.5" aria-hidden="true">·</span>
                      <span className="hidden sm:inline">{entry.student.grade}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6 shrink-0 text-right">
                  <div className="hidden md:block text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    <span className="font-semibold text-orange-600 dark:text-orange-400 inline-flex items-center space-x-1">
                      <Flame className="w-3.5 h-3.5 fill-orange-500" />
                      <span>{entry.stats.streakDays || 0}d</span>
                    </span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>Nível {entry.stats.level}</span>
                  </div>

                  <div>
                    <div className="font-heading font-black text-sm sm:text-lg text-emerald-700 dark:text-emerald-400 tabular-nums">
                      {entry.stats.xp.toLocaleString('pt-BR')} XP
                    </div>
                    <div className="text-[11px] text-slate-400 md:hidden tabular-nums">
                      Nv. {entry.stats.level} · {entry.stats.streakDays || 0}d fogo
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          )}
        </div>
      </section>

      {/* If logged-in student is outside the Top 10, show their exact standing and XP gap */}
      {!userIsAdmin && currentUserEntry && currentUserEntry.rank > 10 && (
        <section className="bg-emerald-50/80 dark:bg-emerald-950/40 rounded-3xl p-5 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-heading font-black text-sm tabular-nums">
              {currentUserEntry.rank}º
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Sua Classificação Atual: {currentUserEntry.rank}º de {totalParticipants}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Você está com <strong>{currentUserEntry.stats.xp.toLocaleString('pt-BR')} XP</strong>. Faltam apenas{' '}
                <strong>{Math.max(1, tenthPlaceXp - currentUserEntry.stats.xp + 1)} XP</strong> para entrar no Top 10 da Selva!
              </p>
            </div>
          </div>

          {onGoToChallenge && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onGoToChallenge();
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Subir no Ranking Agora</span>
            </button>
          )}
        </section>
      )}

      {/* Action Footer to Earn More XP */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-100/80 dark:bg-slate-900/70 rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Quer aumentar seu XP global? Resolva quizzes diversificados, domine flashcards ou envie uma redação ENEM em Português!
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          {onGoToSubjects && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onGoToSubjects();
              }}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Estudar Matérias</span>
            </button>
          )}

          {onGoToChallenge && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onGoToChallenge();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Desafio da Floresta</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
