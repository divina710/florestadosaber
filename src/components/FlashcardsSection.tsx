import React, { useState } from 'react';
import { Flashcard, SubjectData } from '../types';
import { RotateCw, CheckCircle2, RefreshCw, Shuffle, Plus, Sparkles, HelpCircle, Layers, Lightbulb, X, BookmarkCheck } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface FlashcardsSectionProps {
  subject: SubjectData;
  masteredFlashcards: string[];
  onToggleMastered: (cardId: string, isMastered: boolean) => void;
  customFlashcards: Flashcard[];
  onAddCustomFlashcard: (card: Omit<Flashcard, 'id'>) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({
  subject,
  masteredFlashcards,
  onToggleMastered,
  customFlashcards,
  onAddCustomFlashcard,
  searchQuery = '',
  onClearSearch,
}) => {
  const query = searchQuery.trim().toLowerCase();

  // Combine default subject flashcards + custom cards created by student
  const subjectCustomCards = customFlashcards.filter((c) => c.topic.toLowerCase() === subject.name.toLowerCase() || c.topic === subject.id);
  const totalCards = [...subject.flashcards, ...subjectCustomCards];

  const allCards = React.useMemo(() => {
    if (!query) return totalCards;
    return totalCards.filter((card) => {
      const inFront = card.front.toLowerCase().includes(query);
      const inBack = card.back.toLowerCase().includes(query);
      const inTopic = card.topic.toLowerCase().includes(query);
      const inHint = card.hint ? card.hint.toLowerCase().includes(query) : false;
      return inFront || inBack || inTopic || inHint;
    });
  }, [totalCards, query]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for creating custom card
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newTopic, setNewTopic] = useState(subject.recommendedTopics[0] || 'Geral');
  const [newHint, setNewHint] = useState('');

  // Reset index when search query changes
  React.useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [query]);

  const currentCard = allCards[currentIndex] || allCards[0];
  const isCurrentMastered = currentCard ? masteredFlashcards.includes(currentCard.id) : false;

  const handleFlip = () => {
    soundManager.playCardFlip();
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % allCards.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + allCards.length) % allCards.length);
  };

  const handleShuffle = () => {
    soundManager.playClick();
    setIsFlipped(false);
    const randomIdx = Math.floor(Math.random() * allCards.length);
    setCurrentIndex(randomIdx);
  };

  const handleMasterCard = () => {
    if (!currentCard) return;
    soundManager.playSuccess();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 }
    });
    onToggleMastered(currentCard.id, !isCurrentMastered);
  };

  const handleCreateCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    soundManager.playSuccess();
    onAddCustomFlashcard({
      front: newFront.trim(),
      back: newBack.trim(),
      topic: newTopic,
      hint: newHint.trim() || undefined,
      isCustom: true,
    });

    setNewFront('');
    setNewBack('');
    setNewHint('');
    setShowAddModal(false);
  };

  if (allCards.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center mx-auto text-xl font-bold">
          🗂️
        </div>
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-slate-900 dark:text-white">
            Nenhum flashcard encontrado
          </h3>
          <p className="text-xs text-slate-500">
            Nenhum flashcard de {subject.name} corresponde à pesquisa "{searchQuery}".
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 pt-2">
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
            >
              Ver Todos os Cards
            </button>
          )}
          <button
            onClick={() => {
              setNewTopic(searchQuery.trim() || subject.recommendedTopics[0] || 'Geral');
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            + Criar Card com este termo
          </button>
        </div>
      </div>
    );
  }

  const masteredCount = allCards.filter((c) => masteredFlashcards.includes(c.id)).length;
  const progressPercent = Math.round((masteredCount / allCards.length) * 100);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Top Deck Stats & Controls */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
            Card {currentIndex + 1} de {allCards.length}
            {query && <span className="text-purple-600 dark:text-purple-400 font-normal ml-1">(Filtrado)</span>}
          </span>
        </div>

        {/* Progress pill */}
        <div className="flex items-center space-x-2">
          <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
            {masteredCount}/{allCards.length} Dominados
          </span>
        </div>

        {/* Action button to create custom flashcard */}
        <button
          onClick={() => {
            soundManager.playClick();
            setShowAddModal(true);
          }}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-200 text-xs font-bold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Criar Card</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="w-full h-80 sm:h-96 perspective-1000 cursor-pointer select-none"
        onClick={handleFlip}
        id="interactive-flashcard-stage"
      >
        <div
          className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          
          {/* FRONT OF CARD (Question / Concept) */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
            
            <div className="flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full font-bold text-purple-700 bg-purple-100 dark:bg-purple-950 dark:text-purple-300">
                {currentCard.topic}
              </span>
              <span className="text-slate-400 flex items-center space-x-1">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Clique para virar o card</span>
              </span>
            </div>

            <div className="my-auto text-center space-y-3 px-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                Conceito / Pergunta
              </span>
              <h3 className="font-heading text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {currentCard.front}
              </h3>
              {currentCard.hint && (
                <div className="inline-flex items-center space-x-1 text-xs text-amber-700 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full mt-2">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Dica: {currentCard.hint}</span>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-slate-400">
              {currentCard.isCustom ? '⭐ Card criado por você' : `Guardião da matéria: ${subject.animal.name}`}
            </div>
          </div>

          {/* BACK OF CARD (Answer / Summary) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white rounded-3xl p-8 border-2 border-emerald-600/50 shadow-xl flex flex-col justify-between">
            
            <div className="flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full font-bold text-amber-300 bg-emerald-800/80 border border-emerald-700">
                Resposta / Explicação
              </span>
              <span className="text-emerald-200/80 flex items-center space-x-1">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Clique para desvirar</span>
              </span>
            </div>

            <div className="my-auto space-y-3 px-2">
              <p className="text-sm sm:text-base leading-relaxed text-emerald-100 whitespace-pre-line font-normal">
                {currentCard.back}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-300/80 pt-2 border-t border-emerald-800/60">
              <span>{subject.name} • Ensino Médio</span>
              <span className="text-amber-400 font-semibold">Active Recall</span>
            </div>
          </div>

        </div>
      </div>

      {/* Flashcard Bottom Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        
        {/* Navigation & Shuffle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
          >
            &larr; Anterior
          </button>
          <button
            onClick={handleShuffle}
            title="Embaralhar cards"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
          >
            Próximo &rarr;
          </button>
        </div>

        {/* Mastered / Need Review toggle */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            id="mark-flashcard-mastered-btn"
            onClick={handleMasterCard}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isCurrentMastered
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{isCurrentMastered ? 'Dominado! (+XP)' : 'Marcar como Dominado'}</span>
          </button>
        </div>

      </div>

      {/* Modal to Create Custom Flashcard */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-scale-up">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Criar Novo Flashcard ({subject.name})
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomCard} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tópico / Assunto
                </label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Ex: Ecologia, Leis de Newton, Redação..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Frente do Cartão (Pergunta / Conceito)
                </label>
                <textarea
                  rows={2}
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Ex: O que é e para que serve o Quadro de Punnett?"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Verso do Cartão (Resposta / Explicação)
                </label>
                <textarea
                  rows={3}
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Ex: É um diagrama utilizado para determinar as probabilidades de genótipos descendentes..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Dica Opcional
                </label>
                <input
                  type="text"
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Ex: Pense no cruzamento genético em grade..."
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md"
                >
                  Salvar Flashcard
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
