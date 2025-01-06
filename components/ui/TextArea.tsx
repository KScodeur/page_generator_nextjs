import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  counter?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  helper,
  counter,
  leftIcon,
  rightIcon,
  className,
  maxLength,
  value = '',
  ...props
}, ref) => {
  const charCount = String(value).length;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-medium text-gray-900 text-sm tracking-wide">
          {label}
          {props.required && <span className="text-blue-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative group">
        {leftIcon && (
          <div className="absolute top-3 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            {leftIcon}
          </div>
        )}
        <textarea
          ref={ref}
          className={cn(
            "block w-full px-4 py-3 bg-white dark:bg-gray-900",
            "border-2 border-gray-200 dark:border-gray-800",
            "rounded-xl shadow-sm",
            "placeholder:text-gray-400 dark:placeholder:text-gray-600",
            "transition duration-200",
            "focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500",
            "hover:border-gray-300 dark:hover:border-gray-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "min-h-[120px] resize-y",
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            error && "border-red-300 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        {rightIcon && (
          <div className="absolute top-3 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            {rightIcon}
          </div>
        )}
        {counter && (
          <div className="absolute bottom-3 right-3 px-2 py-1 text-xs font-medium text-gray-400 bg-gray-50 rounded-md transition-opacity opacity-0 group-hover:opacity-100">
            {maxLength ? `${charCount}/${maxLength}` : charCount}
          </div>
        )}
      </div>
      {helper && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helper}</p>
      )}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 animate-slideIn">
          {error}
        </p>
      )}
    </div>
  );
});