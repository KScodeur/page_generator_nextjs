import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helper,
  className,
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
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
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "block w-full px-4 py-2.5 bg-white dark:bg-gray-900",
            "border-2 border-gray-200 dark:border-gray-800",
            "rounded-xl shadow-sm",
            "placeholder:text-gray-400 dark:placeholder:text-gray-600",
            "transition duration-200",
            "focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500",
            "hover:border-gray-300 dark:hover:border-gray-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            error && "border-red-300 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            {rightIcon}
          </div>
        )}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
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