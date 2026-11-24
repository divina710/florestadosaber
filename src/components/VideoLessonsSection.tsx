import React, { useState } from 'react';
import { VideoLesson, SubjectData } from '../types';
import { Play, CheckCircle2, Clock, BookOpen, Sparkles, Award, ExternalLink, Bookmark } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface VideoLessonsSectionProps {
  subject: SubjectData;
  completedVideos: string[];
  onCompleteVideo: (videoId: string, xpReward: number) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const VideoLessonsSection: React.FC<VideoLessonsSectionProps> = ({
  subject,
  completedVideos,
  onCompleteVideo,
  searchQuery = '',
  onClearSearch,
}) => {
  const query = searchQuery.trim().toLowerCase();

  const filteredVideos = React.useMemo(() => {
    if (!query) return subject.videoLessons;
    return subject.videoLessons.filter((vid) => {
      const inTitle = vid.title.toLowerCase().includes(query);
      const inTopic = vid.topic.toLowerCase().includes(query);
      const inSummary = vid.summary.some((s) => s.toLowerCase().includes(query));
      const inTerms = vid.keyTerms.some(
        (t) => t.term.toLowerCase().includes(query) || t.definition.toLowerCase().includes(query)
      );
      return inTitle || inTopic || inSummary || inTerms;
    });
  }, [subject.videoLessons, query]);

  const [selectedVideo, setSelectedVideo] = useState<VideoLesson>(
    filteredVideos[0] || subject.videoLessons[0] || null
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync selected video if filtered list changes
  React.useEffect(() => {
    if (filteredVideos.length > 0) {
      const exists = filteredVideos.some((v) => v.id === selectedVideo?.id);
      if (!exists) {
        setSelectedVideo(filteredVideos[0]);
        setIsPlaying(false);
      }
    }
  }, [filteredVideos]);

  if (!selectedVideo || filteredVideos.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto text-xl font-bold">
          🔍
        </div>
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-slate-900 dark:text-white">
            Nenhuma videoaula encontrada
          </h3>
          <p className="text-xs text-slate-500">
            Nenhuma videoaula de {subject.name} corresponde à pesquisa "{searchQuery}".
          </p>
        </div>
        {onClearSearch && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Limpar Pesquisa
          </button>
        )}
      </div>
    );
  }

  const isCompleted = completedVideos.includes(selectedVideo.id);

  const handleMarkComplete = () => {
    if (!isCompleted) {
      soundManager.playSuccess();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
      onCompleteVideo(selectedVideo.id, selectedVideo.xpReward);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Video Header & Selected Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <span>Videoaula Recomendada</span>
            <span>•</span>
            <span>{selectedVideo.topic}</span>
            {selectedVideo.channel && (
              <>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-medium normal-case bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                  {selectedVideo.channel}
                </span>
              </>
            )}
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
            {selectedVideo.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center space-x-1.5 bg-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{selectedVideo.duration}</span>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir aula diretamente no YouTube"
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-200 hover:text-white font-medium transition-colors border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            <span>Ver no YouTube</span>
          </a>

          <button
            id="mark-video-complete-btn"
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Concluída (+XP Ganho)' : `Concluir Aula (+${selectedVideo.xpReward} XP)`}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Video Player & Lesson Notes */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Video Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-xl border border-slate-800 flex items-center justify-center group">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                
                <button
                  id="play-video-trigger-btn"
                  onClick={() => {
                    soundManager.playClick();
                    setIsPlaying(true);
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/20 transform transition-all group-hover:scale-110 active:scale-95"
                >
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </button>

                <h3 className="font-heading font-bold text-white text-base sm:text-lg mt-4 max-w-md">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-emerald-200/80 mt-1">
                  Clique no play para assistir a aula temática com anotações guiadas
                </p>

                <div className="mt-4 flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Duração: {selectedVideo.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Recompensa: +{selectedVideo.xpReward} XP</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Video Sub-bar with source indicator & direct link */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Vídeo educativo verificado para o ENEM</span>
              {selectedVideo.channel && (
                <span className="text-slate-400 font-medium">• {selectedVideo.channel}</span>
              )}
            </span>
            <a
              href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center space-x-1 font-semibold transition-colors"
            >
              <span>Abrir no YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Structured Lesson Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                Resumo Didático da Aula
              </h3>
            </div>

            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {selectedVideo.summary.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Key Terms Glossary */}
            {selectedVideo.keyTerms.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                  <span>Glossário & Conceitos-Chave</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedVideo.keyTerms.map((term, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
                      <strong className="text-emerald-700 dark:text-emerald-400 block font-bold mb-0.5">
                        {term.term}:
                      </strong>
                      <span className="text-slate-600 dark:text-slate-300">{term.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Video Playlist Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-3 flex items-center justify-between">
              <span>Trilha de Videoaulas</span>
              <span className="text-xs font-normal text-slate-500">
                {query ? `${filteredVideos.length} de ${subject.videoLessons.length}` : `${subject.videoLessons.length} aulas`}
              </span>
            </h4>

            {query && (
              <div className="mb-2 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium flex items-center justify-between">
                <span>Filtrando por: "{searchQuery}"</span>
                {onClearSearch && (
                  <button onClick={onClearSearch} className="text-slate-400 hover:text-slate-600 font-bold underline">
                    Limpar
                  </button>
                )}
              </div>
            )}

            <div className="space-y-2.5">
              {filteredVideos.map((vid, idx) => {
                const isSelected = vid.id === selectedVideo.id;
                const isVidCompleted = completedVideos.includes(vid.id);

                return (
                  <div
                    key={vid.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedVideo(vid);
                      setIsPlaying(false);
                    }}
                    className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                            {vid.topic}
                          </span>
                          {isVidCompleted && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                          {vid.title}
                        </h5>
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-400 mt-1">
                          {vid.channel && (
                            <>
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-[130px]">
                                {vid.channel}
                              </span>
                              <span>•</span>
                            </>
                          )}
                          <span>{vid.duration}</span>
                          <span>•</span>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">+{vid.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animal Guardian Pro-Tip */}
          <div className="bg-gradient-to-br from-amber-500/10 via-emerald-900/10 to-slate-900/10 rounded-2xl p-4 border border-amber-300/40 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Dica de Estudo do {subject.animal.name}</span>
            </div>
            <p className="italic text-slate-700 dark:text-slate-300">
              "{subject.animal.tipQuote}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
