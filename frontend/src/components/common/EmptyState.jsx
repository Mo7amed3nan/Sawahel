import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Reusable empty state component.
 *
 * @param {React.ElementType} icon - Lucide icon component (defaults to Inbox)
 * @param {string} title - Empty state title
 * @param {string} description - Empty state description
 * @param {string} actionLabel - Optional action button label
 * @param {Function} onAction - Optional action callback
 * @param {string} className - Additional classes
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = '',
  actionLabel,
  onAction,
  className,
}) {
  return (
    <Card className={cn('border-dashed', className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-muted-foreground mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
        )}
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="outline" size="sm" className="mt-4">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
