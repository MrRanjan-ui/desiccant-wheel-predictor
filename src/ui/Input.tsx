import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, helperText, error, className = '', id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className="flex flex-col gap-1 w-full text-left">
        <label
          htmlFor={inputId}
          className="text-[14px] font-medium text-[#2D3748] flex items-center justify-between"
        >
          <span>{label}</span>
          {unit && <span className="text-[12px] font-semibold text-[#6B7280]">{unit}</span>}
        </label>

        <div className="relative flex items-center">
          <input
            id={inputId}
            ref={ref}
            className={`w-full px-3 py-2 text-[15px] bg-[#FFFFFF] border rounded-[4px] outline-none transition-colors 
              ${error 
                ? 'border-[#C62828] focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828]' 
                : 'border-[#D6D9DE] focus:border-[#1E4E79] focus:ring-1 focus:ring-[#1E4E79]'
              } 
              disabled:bg-[#F2F4F7] disabled:text-[#6B7280] ${className}`}
            {...props}
          />
        </div>

        {error ? (
          <span className="text-[12px] text-[#C62828] font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-[11px] text-[#6B7280] leading-tight">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
