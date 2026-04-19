import { Input } from '@/components/ui/input';

export function InputOTP({ value, onChange, length = 6, ...props }) {
  return (
    <Input
      value={value}
      onChange={(e) =>
        onChange?.(e.target.value.replace(/\D/g, '').slice(0, length))
      }
      maxLength={length}
      inputMode="numeric"
      autoComplete="one-time-code"
      {...props}
    />
  );
}
