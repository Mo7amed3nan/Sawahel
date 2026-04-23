import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Reusable error state component.
 *
 * @param {string} title - Error title (defaults to "Something went wrong")
 * @param {string} message - Error description
 * @param {Function} onRetry - Optional retry callback
 * @param {string} retryLabel - Label for retry button
 * @param {string} className - Additional classes
 */
export default function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-[40vh] px-4 text-center',
        className
      )}
    >
      <div className="rounded-full bg-destructive/10 p-4 mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
