import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyle =
    'px-4 py-2 text-[14px] font-medium rounded-[4px] border transition-colors outline-none focus:ring-2 focus:ring-offset-1 select-none';
  
  const variantStyles = {
    primary:
      'bg-[#1E4E79] hover:bg-[#153756] text-white border-[#1E4E79] focus:ring-[#1E4E79]',
    secondary:
      'bg-[#E9ECEF] hover:bg-[#D6D9DE] text-[#2D3748] border-[#D6D9DE] focus:ring-[#6B7280]',
    danger:
      'bg-[#C62828] hover:bg-[#A82222] text-white border-[#C62828] focus:ring-[#C62828]'
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
