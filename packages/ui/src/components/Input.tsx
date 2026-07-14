import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const fieldClass =
  "block w-full rounded-s border border-charcoal-300 bg-white px-3 h-11 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-brand-teal focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-brand-teal disabled:bg-charcoal-100 disabled:opacity-60";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

interface InputProps
  extends FieldWrapperProps,
    InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-charcoal-800">
            {label}
            {required && <span className="text-brand-orange"> *</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(fieldClass, error && "border-red-500 focus:outline-red-500", className)}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-charcoal-500">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

interface TextareaProps
  extends FieldWrapperProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-charcoal-800">
            {label}
            {required && <span className="text-brand-orange"> *</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          className={cn(fieldClass, "h-auto min-h-[7rem] py-2.5", error && "border-red-500", className)}
          {...props}
        />
        {hint && !error && <p className="text-xs text-charcoal-500">{hint}</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

interface SelectProps
  extends FieldWrapperProps,
    SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, required, id, children, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-charcoal-800">
            {label}
            {required && <span className="text-brand-orange"> *</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={!!error}
          className={cn(fieldClass, "pr-8", error && "border-red-500", className)}
          {...props}
        >
          {children}
        </select>
        {hint && !error && <p className="text-xs text-charcoal-500">{hint}</p>}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";
