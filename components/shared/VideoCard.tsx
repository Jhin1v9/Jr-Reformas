'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  poster?: string;
  aspect?: 'square' | 'portrait' | 'landscape' | 'video' | 'auto';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  overlay?: React.ReactNode;
  onClick?: () => void;
}

const aspectClasses: Record<string, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  video: 'aspect-video',
  auto: '',
};

export default function VideoCard({
  src,
  poster,
  aspect = 'video',
  autoPlay = false,
  muted: initialMuted = true,
  loop = true,
  controls = false,
  className,
  overlay,
  onClick,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [showPoster, setShowPoster] = useState(!autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPoster(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <figure
      className={cn(
        'group relative overflow-hidden rounded-xl bg-carbon-light',
        aspectClasses[aspect] || aspectClasses.video,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={initialMuted}
        loop={loop}
        playsInline
        controls={controls}
        className="h-full w-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />

      {showPoster && poster && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {!autoPlay && !controls && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-carbon/30 transition-colors group-hover:bg-carbon/50"
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo'}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-offwhite/30 bg-carbon/60 text-offwhite backdrop-blur transition-transform group-hover:scale-110">
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </span>
        </button>
      )}

      {autoPlay && !controls && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/50 text-offwhite backdrop-blur transition-all hover:bg-carbon/70"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      )}

      {overlay}
    </figure>
  );
}
