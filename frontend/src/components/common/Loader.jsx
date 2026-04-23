import { Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Unified loading component for the entire app.
 *
 * @param {'page' | 'section' | 'inline'} variant
 *   - page: full-screen centered (auth check, page transitions)
 *   - section: 40vh centered (data fetching within a page)
 *   - inline: compact inline (buttons, small areas)
 * @param {string} message - Optional loading message
 * @param {string} className - Additional classes
 */
export default function Loader({
  variant = 'section',
  message,
  className,
}) {
  const variants = {
    page: 'min-h-screen',
    section: 'min-h-[40vh]',
    inline: 'min-h-[120px]',
  };

  const iconSizes = {
    page: 'h-10 w-10',
    section: 'h-8 w-8',
    inline: 'h-6 w-6',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        variants[variant],
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring behind the icon */}
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
        <div className="relative rounded-full bg-primary/10 p-3">
          <Waves
            className={cn(
              iconSizes[variant],
              'text-primary animate-pulse'
            )}
          />
        </div>
      </div>
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
