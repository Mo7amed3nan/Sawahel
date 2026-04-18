import { useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

function InputOTP({
  id,
  value,
  onChange,
  length = 6,
  disabled = false,
  className,
}) {
  const refs = useRef([]);
  const slots = useMemo(
    () => Array.from({ length }, (_, index) => value[index] || ''),
    [length, value]
  );

  const focusIndex = (index) => {
    const element = refs.current[index];
    if (element) {
      element.focus();
      element.select();
    }
  };

  const setAtIndex = (index, char) => {
    const current = value.padEnd(length, ' ').split('');
    current[index] = char;
    const next = current.join('').replace(/\s/g, '');
    onChange(next);
  };

  const handleChange = (index, nextValue) => {
    const clean = nextValue.replace(/\D/g, '');
    if (!clean) {
      setAtIndex(index, '');
      return;
    }

    const [first] = clean;
    setAtIndex(index, first);
    if (index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !slots[index] && index > 0) {
      setAtIndex(index - 1, '');
      focusIndex(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      focusIndex(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handlePaste = (index, event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasted) {
      return;
    }

    const current = value.padEnd(length, ' ').split('');
    let writeIndex = index;
    for (const char of pasted) {
      if (writeIndex >= length) {
        break;
      }
      current[writeIndex] = char;
      writeIndex += 1;
    }

    onChange(current.join('').replace(/\s/g, ''));
    focusIndex(Math.min(writeIndex, length - 1));
  };

  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      {slots.map((digit, index) => (
        <input
          key={index}
          id={index === 0 ? id : undefined}
          ref={(element) => {
            refs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={index === 0 ? 'one-time-code' : undefined}
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          disabled={disabled}
          className="h-10 w-10 rounded-lg border border-input bg-transparent text-center text-base font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50"
          aria-label={`Verification digit ${index + 1}`}
        />
      ))}
    </div>
  );
}

export { InputOTP };
