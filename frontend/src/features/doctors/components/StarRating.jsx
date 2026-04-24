import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Reusable star rating component.
 *
 * @param {number} value - Current rating value (e.g. 3.5)
 * @param {number} max - Maximum stars (default 5)
 * @param {boolean} interactive - Whether the user can click to rate
 * @param {function} onChange - Callback when user clicks a star (receives rating number)
 * @param {boolean} disabled - Disable interaction
 * @param {'sm' | 'md' | 'lg'} size - Star size
 * @param {boolean} showValue - Show the numeric value next to stars
 * @param {number} count - Total number of ratings to display
 */
export default function StarRating({
  value = 0,
  max = 5,
  interactive = false,
  onChange,
  disabled = false,
  size = 'md',
  showValue = false,
  count,
}) {
  const [hoveredStar, setHoveredStar] = useState(0)

  const sizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
  }

  const gaps = {
    sm: 'gap-0.5',
    md: 'gap-1',
    lg: 'gap-1.5',
  }

  const handleClick = (starIndex) => {
    if (!interactive || disabled) return
    onChange?.(starIndex)
  }

  const displayValue = hoveredStar > 0 ? hoveredStar : value

  return (
    <div className={cn('flex items-center', gaps[size])}>
      <div className={cn('flex items-center', gaps[size])}>
        {Array.from({ length: max }, (_, i) => {
          const starIndex = i + 1
          const fillPercentage = Math.min(
            1,
            Math.max(0, displayValue - i)
          )

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive || disabled}
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() =>
                interactive && !disabled && setHoveredStar(starIndex)
              }
              onMouseLeave={() => interactive && setHoveredStar(0)}
              className={cn(
                'relative p-0 border-0 bg-transparent transition-transform duration-150',
                interactive && !disabled
                  ? 'cursor-pointer hover:scale-125 active:scale-95'
                  : 'cursor-default',
                disabled && 'opacity-50'
              )}
              aria-label={`Rate ${starIndex} out of ${max}`}
            >
              {/* Empty star background */}
              <Star
                className={cn(
                  sizes[size],
                  'text-muted-foreground/30 transition-colors'
                )}
              />
              {/* Filled overlay clipped to percentage */}
              {fillPercentage > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage * 100}%` }}
                >
                  <Star
                    className={cn(
                      sizes[size],
                      'fill-amber-400 text-amber-400 transition-colors',
                      hoveredStar > 0 &&
                        interactive &&
                        'fill-amber-500 text-amber-500'
                    )}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {showValue && value > 0 && (
        <span className="text-sm font-semibold text-foreground ml-1">
          {value.toFixed(1)}
        </span>
      )}

      {count !== undefined && count > 0 && (
        <span className="text-sm text-muted-foreground ml-0.5">
          ({count})
        </span>
      )}

      {count !== undefined && count === 0 && (
        <span className="text-xs text-muted-foreground ml-1">
          No ratings yet
        </span>
      )}
    </div>
  )
}
