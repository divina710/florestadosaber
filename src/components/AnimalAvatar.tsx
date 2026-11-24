import React, { useState } from 'react';
import { SubjectId } from '../types';
import { ANIMAL_ILLUSTRATIONS_MAP } from '../data/animalsAndSubjects';

interface AnimalAvatarProps {
  animalId: SubjectId | 'guilherme' | 'floresta';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBadge?: boolean;
  useIllustration?: boolean;
  altText?: string;
}

export const AnimalAvatar: React.FC<AnimalAvatarProps> = ({
  animalId,
  size = 'md',
  className = '',
  showBadge = false,
  useIllustration = true,
  altText,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-3xl',
    xl: 'w-28 h-28 text-5xl',
    '2xl': 'w-36 h-36 text-6xl',
  }[size];

  // Specific visual configuration for each animal
  const getAnimalInfo = () => {
    switch (animalId) {
      case 'artes':
        return {
          emoji: '🎨',
          label: 'Uirapuru',
          bg: 'bg-gradient-to-br from-rose-500 via-amber-500 to-yellow-500',
          border: 'border-rose-400',
          shadow: 'shadow-rose-500/30',
          textColor: 'text-rose-950',
          pattern: '🎵'
        };
      case 'guilherme':
      case 'matematica':
        return {
          emoji: '🐆',
          label: 'Onça-Pintada',
          bg: 'bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600',
          border: 'border-amber-400',
          shadow: 'shadow-amber-500/30',
          textColor: 'text-amber-950',
          pattern: '🐾'
        };
      case 'biologia':
        return {
          emoji: '🐸',
          label: 'Rã-de-vidro',
          bg: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600',
          border: 'border-emerald-400',
          shadow: 'shadow-emerald-500/30',
          textColor: 'text-emerald-950',
          pattern: '🌿'
        };
      case 'espanhol':
        return {
          emoji: '🐒',
          label: 'Macaco-de-cheiro',
          bg: 'bg-gradient-to-br from-amber-500 via-yellow-500 to-lime-600',
          border: 'border-yellow-400',
          shadow: 'shadow-yellow-500/30',
          textColor: 'text-amber-950',
          pattern: '🍌'
        };
      case 'filosofia':
        return {
          emoji: '🦋',
          label: 'Borboleta Morpho',
          bg: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600',
          border: 'border-sky-400',
          shadow: 'shadow-sky-500/30',
          textColor: 'text-sky-950',
          pattern: '✨'
        };
      case 'fisica':
        return {
          emoji: '🐗',
          label: 'Queixada',
          bg: 'bg-gradient-to-br from-amber-700 via-orange-700 to-stone-800',
          border: 'border-orange-500',
          shadow: 'shadow-orange-600/30',
          textColor: 'text-orange-950',
          pattern: '⚡'
        };
      case 'geografia':
        return {
          emoji: '🦦',
          label: 'Ariranha',
          bg: 'bg-gradient-to-br from-cyan-500 via-teal-600 to-blue-700',
          border: 'border-cyan-400',
          shadow: 'shadow-cyan-500/30',
          textColor: 'text-cyan-950',
          pattern: '🌊'
        };
      case 'historia':
        return {
          emoji: '🦅',
          label: 'Harpia',
          bg: 'bg-gradient-to-br from-stone-600 via-amber-800 to-slate-800',
          border: 'border-stone-400',
          shadow: 'shadow-stone-600/30',
          textColor: 'text-stone-900',
          pattern: '📜'
        };
      case 'ingles':
        return {
          emoji: '🦉',
          label: 'Coruja-orelhuda',
          bg: 'bg-gradient-to-br from-purple-500 via-indigo-600 to-violet-700',
          border: 'border-purple-400',
          shadow: 'shadow-purple-500/30',
          textColor: 'text-purple-950',
          pattern: '🌐'
        };
      case 'portugues':
        return {
          emoji: '🦝',
          label: 'Quati',
          bg: 'bg-gradient-to-br from-rose-500 via-red-600 to-amber-600',
          border: 'border-rose-400',
          shadow: 'shadow-rose-500/30',
          textColor: 'text-rose-950',
          pattern: '✍️'
        };
      case 'quimica':
        return {
          emoji: '🐢',
          label: 'Tartaruga-da-Amazônia',
          bg: 'bg-gradient-to-br from-teal-400 via-cyan-600 to-emerald-700',
          border: 'border-cyan-400',
          shadow: 'shadow-cyan-500/30',
          textColor: 'text-teal-950',
          pattern: '🧪'
        };
      case 'sociologia':
        return {
          emoji: '🐠',
          label: 'Acará-disco',
          bg: 'bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600',
          border: 'border-pink-400',
          shadow: 'shadow-pink-500/30',
          textColor: 'text-pink-950',
          pattern: '🤝'
        };
      default:
        return {
          emoji: '🌳',
          label: 'Floresta do Saber',
          bg: 'bg-gradient-to-br from-emerald-500 to-green-700',
          border: 'border-emerald-300',
          shadow: 'shadow-emerald-600/30',
          textColor: 'text-white',
          pattern: '🌟'
        };
    }
  };

  const info = getAnimalInfo();
  const illustrationSrc = animalId !== 'floresta' ? ANIMAL_ILLUSTRATIONS_MAP[animalId] : undefined;
  const hasIllustration = useIllustration && Boolean(illustrationSrc) && !imageError;

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl ${sizeClasses} ${
        hasIllustration ? 'bg-slate-900 border-2 border-emerald-400/80 shadow-lg overflow-hidden' : `${info.bg} ${info.shadow} shadow-md border-2 ${info.border}`
      } text-white select-none transition-transform hover:scale-105 shrink-0 ${className}`}
    >
      {hasIllustration && illustrationSrc ? (
        <img
          src={illustrationSrc}
          alt={altText || info.label}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center rounded-2xl"
          loading="lazy"
        />
      ) : (
        <span className="drop-shadow-sm filter leading-none" role="img" aria-label={info.label}>
          {info.emoji}
        </span>
      )}

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 text-xs shadow-sm border border-slate-200 dark:border-slate-700 leading-none z-10">
          {info.pattern}
        </span>
      )}
    </div>
  );
};
