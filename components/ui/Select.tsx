import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helper,
  options,
  className,
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
        <select
          ref={ref}
          className={cn(
            "block w-full px-4 py-2.5 bg-white dark:bg-gray-900",
            "border-2 border-gray-200 dark:border-gray-800",
            "rounded-xl shadow-sm",
            "appearance-none cursor-pointer",
            "transition duration-200",
            "focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500",
            "hover:border-gray-300 dark:hover:border-gray-700",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "pr-11",
            error && "border-red-300 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
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