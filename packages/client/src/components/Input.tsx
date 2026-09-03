import * as React from 'react';
import { fieldControl } from './Field';
import { cn } from '~/utils';
import './Field.css';

/** `title` edits a heading in place, so the field takes the heading's type scale. `inline` shares
 *  a row with icon Buttons, so it takes their height role and the row stays one height when a
 *  theme sizes fields and buttons apart. */
const INPUT_VARIANTS = {
  default: '',
  inline: 'h-theme-button',
  title: 'h-theme-field-lg text-2xl font-semibold tracking-tight',
  'title-sm': 'text-base font-semibold tracking-tight',
} as const;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  colorTransition?: boolean;
  variant?: keyof typeof INPUT_VARIANTS;
};

/** Types whose native picker otherwise only opens from the small calendar/clock icon. */
const PICKER_TYPES = new Set(['date', 'datetime-local', 'month', 'time', 'week']);

const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> =
  React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, colorTransition, variant = 'default', onClick, type, ...props }, ref) => {
      const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        onClick?.(event);
        const target = event.currentTarget;
        if (
          typeof type === 'string' &&
          PICKER_TYPES.has(type) &&
          !target.disabled &&
          !target.readOnly
        ) {
          try {
            (target as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
          } catch {
            // Browsers without transient activation (e.g. a click that lost focus
            // mid-handler) throw here; the native icon click still works as a fallback.
          }
        }
      };

      return (
        <input
          type={type}
          className={cn(
            fieldControl,
            'ring-offset-surface-primary',
            INPUT_VARIANTS[variant],
            colorTransition && 'transition-colors',
            className ?? '',
          )}
          onClick={handleClick}
          ref={ref}
          {...props}
        />
      );
    },
  );

Input.displayName = 'Input';

export { Input };
