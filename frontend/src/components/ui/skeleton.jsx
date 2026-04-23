import { cn } from '@/lib/utils';

/**
 * A pulsing placeholder block used to build skeleton loading screens.
 *
 * @param {string} className - Tailwind classes for width/height/shape
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
