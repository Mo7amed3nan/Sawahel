import { cn } from '@/lib/utils';

export function Alert({ className, variant = 'default', ...props }) {
  const variantClass =
    variant === 'destructive'
      ? 'border-red-300 bg-red-50 text-red-700'
      : 'border-border bg-background text-foreground';

  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4 text-sm',
        variantClass,
        className
      )}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }) {
  return <div className={cn('text-sm', className)} {...props} />;
}
