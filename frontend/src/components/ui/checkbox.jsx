import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = forwardRef(function Checkbox(
  { className, checked, onCheckedChange, onChange, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={!!checked}
      onChange={(e) => {
        onCheckedChange?.(e.target.checked);
        onChange?.(e);
      }}
      className={cn('h-4 w-4 rounded border border-input', className)}
      {...props}
    />
  );
});
