import React, { useState, useMemo } from 'react';
import { SubjectData, SubjectId, SubjectCategory, UserStats } from '../types';
import { AnimalAvatar } from './AnimalAvatar';
import { Search, Sparkles, BookOpen, Video, HelpCircle, Layers, CheckCircle2, ArrowRight, Filter, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface SubjectsAlphabeticalGridProps {
  subjects: SubjectData[];
  onSelectSubject: (subjectId: SubjectId, initialTab?: 'videos' | 'quiz' | 'flashcards') => void;
  userStats: UserStats;
}

export const SubjectsAlphabeticalGrid: React.FC<SubjectsAlphabeticalGridProps> = ({
  subjects,
  onSelectSubject,
  userStats,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [playingAnimalId, setPlayingAnimalId] = useState<SubjectId | null>(null);

  const handlePlayAnimal = (e: React.MouseEvent, subjectId: SubjectId) => {
    e.stopPropagation();
    soundManager.unlockAudio();
    const duration = soundManager.playAnimalSound(subjectId);
    if (duration > 0) {
      setPlayingAnimalId(subjectId);
      setTimeout(() => {
        setPlayingAnimalId((prev) => (prev === subjectId ? null : prev));
      }, duration);
    }
  };

  // Ensure strict alphabetical sorting by name (A-Z)
  const sortedSubjects = useMemo(() => {
    return [...subjects].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [subjects]);

  // Categories list
  const categories = ['Todas', 'Ciências da Natureza', 'Ciências Humanas', 'Linguagens', 'Matemática'];

  // Filtered subjects based on search & category
  const filteredSubjects = useMemo(() => {
    return sortedSubjects.filter((subject) => {
      const matchesSearch =
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.recommendedTopics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'Todas' || subject.category === (selectedCategory as SubjectCategory);

      return matchesSearch && matchesCategory;
    });
  }, [sortedSubjects, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Section Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ordem Alfabética (A-Z)</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              Matérias da Floresta do Saber
            </h1>
            <p className="text-sm text-emerald-200/90 max-w-2xl">
              Escolha uma disciplina para explorar a sala temática do seu animal guardião com videoaulas completas, quizzes gamificados e flashcards de fixação.
            </p>
          </div>

          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-700/60 text-right shrink-0">
            <span className="text-xs text-emerald-300 block font-medium">Progresso Geral</span>
            <div className="text-2xl font-black text-amber-300">
              {Object.keys(userStats.completedQuizzes).length} de {subjects.length} Matérias
            </div>
            <span className="text-[11px] text-emerald-400">Desafios respondidos</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="subject-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por matéria, animal (ex: Onça-pintada, Quati) ou tópico..."
              className="w-full pl-10 pr-4 py-2.5 bg-emerald-950/60 border border-emerald-700/60 rounded-xl text-white placeholder-emerald-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="md:col-span-7 flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-emerald-300 font-semibold flex items-center mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1" /> Área:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-800/80 border border-emerald-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Alphabet Quick Alphabet Anchor Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          Exibindo {filteredSubjects.length} {filteredSubjects.length === 1 ? 'matéria' : 'matérias'} em ordem alfabética:
        </span>
        <div className="flex items-center space-x-1.5 font-bold text-emerald-700 dark:text-emerald-400">
          {['B', 'F', 'H', 'I', 'M', 'P', 'Q', 'S'].map((letter) => (
            <span key={letter} className="w-6 h-6 flex items-center justify-center rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Alphabetical Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub, index) => {
          const isQuizzCompleted = sub.quizzes.some((q) => userStats.completedQuizzes[q.id] !== undefined);
          const firstLetter = sub.name.charAt(0).toUpperCase();

          return (
            <div
              key={sub.id}
              id={`subject-card-${sub.id}`}
              className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Alphabet Letter and Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Alphabet index tag */}
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-300 dark:bg-emerald-950 dark:text-amber-400 font-heading font-black text-lg flex items-center justify-center shadow-xs border border-slate-700">
                      {firstLetter}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {sub.category}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">#{index + 1} na ordem A-Z</div>
                    </div>
                  </div>

                  {isQuizzCompleted && (
                    <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completado</span>
                    </span>
                  )}
                </div>

                {/* Subject Name & Animal Guide */}
                <div className="flex items-center justify-between gap-2 my-3">
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <AnimalAvatar animalId={sub.id} size="lg" showBadge />
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {sub.name}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold">
                        <span>Guardião:</span>
                        <span className="text-slate-800 dark:text-slate-200 truncate">{sub.animal.name}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handlePlayAnimal(e, sub.id)}
                    title={`Ouvir som de ${sub.animal.name}`}
                    className={`shrink-0 p-2.5 rounded-xl border transition-all ${
                      playingAnimalId === sub.id
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm scale-105'
                        : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/80'
                    }`}
                  >
                    <Volume2 className={`w-4 h-4 ${playingAnimalId === sub.id ? 'animate-bounce' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 my-2 leading-relaxed">
                  {sub.description}
                </p>

                {/* Thematic Quote by Animal */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/60 my-3 text-xs italic text-slate-700 dark:text-slate-300">
                  <span className="text-amber-500 font-bold mr-1">“</span>
                  {sub.animal.tipQuote}
                  <span className="text-amber-500 font-bold ml-1">”</span>
                </div>

                {/* Recommended high school topics chips */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {sub.recommendedTopics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons to 3 Pillars */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                  
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectSubject(sub.id, 'videos');
                    }}
                    title="Ver videoaulas"
                    className="flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors border border-emerald-200 dark:border-emerald-800/80"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Aulas</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectSubject(sub.id, 'quiz');
                    }}
                    title="Jogar Quiz da matéria"
                    className="flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-colors border border-amber-200 dark:border-amber-800/80"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Quiz</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectSubject(sub.id, 'flashcards');
                    }}
                    title="Estudar Flashcards 3D"
                    className="flex items-center justify-center space-x-1 py-2 px-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 hover:bg-purple-100 transition-colors border border-purple-200 dark:border-purple-800/80"
                  >
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    <span>Cards</span>
                  </button>
                </div>

                {/* Primary Hub Entry Button */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onSelectSubject(sub.id);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-sm transition-all group-hover:shadow-md active:scale-98"
                >
                  <span>Entrar na Sala do {sub.animal.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-slate-200">
            Nenhuma matéria encontrada para "{searchTerm}"
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tente buscar por termos como "Biologia", "Química", "Onça-pintada", "Quati" ou selecione a categoria "Todas".
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Todas');
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
          >
            Limpar filtros
          </button>
        </div>
      )}

    </div>
  );
};
