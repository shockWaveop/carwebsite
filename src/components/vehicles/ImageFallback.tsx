import React, { useState } from 'react';
import { Car } from 'lucide-react';

interface ImageFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackTitle?: string;
  className?: string;
}

export function ImageFallback({
  src,
  alt,
  fallbackTitle,
  className = '',
  ...props
}: ImageFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-zinc-900 via-zinc-850 to-zinc-950 flex flex-col items-center justify-center text-zinc-500 border border-zinc-800/80 relative overflow-hidden select-none ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
          <Car className="w-8 h-8 text-zinc-600 mb-2 stroke-[1.5]" />
          <span className="text-xs font-medium text-zinc-400 tracking-wide">
            {fallbackTitle || alt || 'AutoVerse Verified Visual'}
          </span>
          <span className="text-[11px] text-zinc-600 mt-0.5">OEM Homologation Record</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
}
