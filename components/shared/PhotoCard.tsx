import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt: string;
  aspect?: 'square' | 'portrait' | 'landscape' | 'video' | 'auto';
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  overlay?: React.ReactNode;
  hoverScale?: boolean;
  onClick?: () => void;
}

const aspectClasses: Record<string, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  video: 'aspect-video',
  auto: '',
};

export default function PhotoCard({
  src,
  alt,
  aspect = 'square',
  width,
  height,
  fill = true,
  priority = false,
  className,
  overlay,
  hoverScale = true,
  onClick,
}: Props) {
  const containerClasses = cn(
    'group relative overflow-hidden rounded-xl bg-carbon-light',
    aspectClasses[aspect] || aspectClasses.square,
    onClick && 'cursor-pointer',
    className
  );

  return (
    <figure className={containerClasses} onClick={onClick}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className={cn('object-cover transition-transform duration-500', hoverScale && 'group-hover:scale-105')}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 600}
          height={height ?? 400}
          priority={priority}
          className={cn('h-auto w-full object-cover transition-transform duration-500', hoverScale && 'group-hover:scale-105')}
        />
      )}
      {overlay}
    </figure>
  );
}
