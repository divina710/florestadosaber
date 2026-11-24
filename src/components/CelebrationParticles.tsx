import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Trophy, X } from 'lucide-react';

export interface CelebrationEvent {
  id: number;
  type: 'quiz' | 'levelup';
  title: string;
  subtitle: string;
  xp?: number;
  level?: number;
}

interface CelebrationParticlesProps {
  event: CelebrationEvent | null;
  onDismiss: () => void;
}

type ParticleShape = 'ribbon' | 'circle' | 'star' | 'leaf';

interface ParticleSpec {
  id: number;
  shape: ParticleShape;
  color: string;
  size: number;
  mode: 'burst-left' | 'burst-right' | 'shower';
  startXvw: number;
  midXvw: number;
  endXvw: number;
  peakYvh: number;
  endYvh: number;
  rotateZ: number;
  rotateY: number;
  duration: number;
  delay: number;
}

const FOREST_COLORS = [
  '#10b981', // emerald-500
  '#34d399', // emerald-400
  '#f59e0b', // amber-500
  '#fbbf24', // amber-400
  '#fde047', // yellow-300
  '#14b8a6', // teal-500
  '#38bdf8', // sky-400
  '#fb7185', // rose-400
];

const LEVELUP_COLORS = [
  '#fbbf24', // amber-400
  '#fde047', // yellow-300
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#34d399', // emerald-400
  '#f97316', // orange-500
  '#ffffff', // bright highlight
];

function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const CelebrationParticles: React.FC<CelebrationParticlesProps> = ({
  event,
  onDismiss,
}) => {
  useEffect(() => {
    if (!event) return;
    const durationMs = event.type === 'levelup' ? 4600 : 3800;
    const timer = window.setTimeout(() => {
      onDismiss();
    }, durationMs);
    return () => window.clearTimeout(timer);
  }, [event, onDismiss]);

  const particles = useMemo<ParticleSpec[]>(() => {
    if (!event) return [];
    const rand = seededRandom(Math.floor(event.id));
    const count = event.type === 'levelup' ? 76 : 54;
    const palette = event.type === 'levelup' ? LEVELUP_COLORS : FOREST_COLORS;
    const shapes: ParticleShape[] = ['ribbon', 'ribbon', 'circle', 'star', 'leaf'];

    const list: ParticleSpec[] = [];
    for (let i = 0; i < count; i++) {
      const rMode = rand();
      const mode: ParticleSpec['mode'] =
        rMode < 0.32 ? 'burst-left' : rMode < 0.64 ? 'burst-right' : 'shower';

      let startXvw = 50;
      let midXvw = 50;
      let endXvw = 50;
      let peakYvh = 20;
      let endYvh = 108;

      if (mode === 'burst-left') {
        startXvw = 4 + rand() * 10;
        midXvw = 18 + rand() * 44;
        endXvw = midXvw + (rand() * 20 - 6);
        peakYvh = 10 + rand() * 34;
        endYvh = 106;
      } else if (mode === 'burst-right') {
        startXvw = 86 + rand() * 10;
        midXvw = 38 + rand() * 44;
        endXvw = midXvw - (rand() * 20 - 6);
        peakYvh = 10 + rand() * 34;
        endYvh = 106;
      } else {
        startXvw = 5 + rand() * 90;
        midXvw = startXvw + (rand() * 16 - 8);
        endXvw = midXvw + (rand() * 18 - 9);
        peakYvh = 35 + rand() * 25;
        endYvh = 108;
      }

      list.push({
        id: i,
        shape: shapes[Math.floor(rand() * shapes.length)],
        color: palette[Math.floor(rand() * palette.length)],
        size: 8 + rand() * 10,
        mode,
        startXvw,
        midXvw,
        endXvw,
        peakYvh,
        endYvh,
        rotateZ: (rand() > 0.5 ? 1 : -1) * (240 + rand() * 480),
        rotateY: 180 + rand() * 540,
        duration: 2.1 + rand() * 1.4,
        delay: rand() * 0.45,
      });
    }
    return list;
  }, [event]);

  return (
    <AnimatePresence>
      {event && (
        <div
          key={event.id}
          aria-live="polite"
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
        >
          {/* Radial Shockwave Halo for Level-Up */}
          {event.type === 'levelup' && (
            <motion.div
              initial={{ opacity: 0.85, scale: 0.15 }}
              animate={{ opacity: 0, scale: 2.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.35, ease: 'easeOut' }}
              className="absolute top-28 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full border-4 border-amber-400/70 bg-radial from-amber-300/25 via-emerald-400/10 to-transparent"
            />
          )}

          {/* Framer Motion Particles & Confetti Layer */}
          {particles.map((p) => {
            const isCannon = p.mode === 'burst-left' || p.mode === 'burst-right';
            const initialY = isCannon ? '96vh' : '-6vh';
            const yKeyframes = isCannon
              ? [initialY, `${p.peakYvh}vh`, `${p.endYvh}vh`]
              : [initialY, `${p.peakYvh}vh`, `${p.endYvh}vh`];

            return (
              <motion.div
                key={p.id}
                initial={{
                  left: `${p.startXvw}vw`,
                  top: 0,
                  y: initialY,
                  x: 0,
                  scale: isCannon ? 0.3 : 0.7,
                  opacity: 0,
                  rotate: 0,
                  rotateY: 0,
                }}
                animate={{
                  left: [
                    `${p.startXvw}vw`,
                    `${p.midXvw}vw`,
                    `${p.endXvw}vw`,
                  ],
                  y: yKeyframes,
                  scale: isCannon ? [0.4, 1.15, 0.85] : [0.75, 1.05, 0.8],
                  opacity: [0, 1, 1, 0],
                  rotate: p.rotateZ,
                  rotateY: p.rotateY,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: isCannon ? [0.16, 0.84, 0.44, 1] : 'easeIn',
                  times: [0, 0.42, 0.82, 1],
                }}
                style={{
                  position: 'absolute',
                  willChange: 'transform, opacity',
                }}
              >
                {p.shape === 'ribbon' && (
                  <div
                    style={{
                      width: `${p.size * 0.65}px`,
                      height: `${p.size * 1.4}px`,
                      backgroundColor: p.color,
                      borderRadius: '2px',
                      boxShadow: `0 0 8px ${p.color}55`,
                    }}
                  />
                )}

                {p.shape === 'circle' && (
                  <div
                    style={{
                      width: `${p.size * 0.85}px`,
                      height: `${p.size * 0.85}px`,
                      backgroundColor: p.color,
                      borderRadius: '9999px',
                      boxShadow: `0 0 10px ${p.color}88`,
                    }}
                  />
                )}

                {p.shape === 'star' && (
                  <svg
                    width={p.size * 1.35}
                    height={p.size * 1.35}
                    viewBox="0 0 24 24"
                    fill={p.color}
                    style={{ filter: `drop-shadow(0 0 6px ${p.color}88)` }}
                  >
                    <path d="M12 1L14.9 9.1L23 12L14.9 14.9L12 23L9.1 14.9L1 12L9.1 9.1L12 1Z" />
                  </svg>
                )}

                {p.shape === 'leaf' && (
                  <svg
                    width={p.size * 1.2}
                    height={p.size * 1.2}
                    viewBox="0 0 24 24"
                    fill={p.color}
                    style={{ filter: `drop-shadow(0 0 5px ${p.color}66)` }}
                  >
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" />
                  </svg>
                )}
              </motion.div>
            );
          })}

          {/* Animated Top Celebration Banner */}
          <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.84 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 360, damping: 24 }}
              className={`pointer-events-auto w-full rounded-3xl p-4 shadow-2xl border backdrop-blur-md flex items-center justify-between gap-3 ${
                event.type === 'levelup'
                  ? 'bg-gradient-to-r from-slate-900 via-amber-950/95 to-slate-900 border-amber-400/70 text-white shadow-amber-500/30'
                  : 'bg-gradient-to-r from-slate-900 via-emerald-950/95 to-slate-900 border-emerald-400/60 text-white shadow-emerald-500/25'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -6, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                    event.type === 'levelup'
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950'
                      : 'bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950'
                  }`}
                >
                  {event.type === 'levelup' ? (
                    <Crown className="w-6 h-6" />
                  ) : (
                    <Trophy className="w-6 h-6" />
                  )}
                </motion.div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                      {event.type === 'levelup' ? 'Evolução na Floresta!' : 'Conquista Desbloqueada!'}
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-sm sm:text-base text-white truncate">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {event.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {event.xp !== undefined && (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black text-xs">
                    +{event.xp} XP
                  </span>
                )}
                {event.level !== undefined && (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                    Nv.{event.level}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onDismiss}
                  aria-label="Fechar notificação"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
