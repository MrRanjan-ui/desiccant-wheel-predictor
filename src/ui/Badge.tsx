import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'gray' | 'red' | 'yellow';
}

export function Badge({ children, variant = 'blue' }: BadgeProps) {
  const styles = {
    blue: 'bg-[#F2F4F7] text-[#1E4E79] border-[#D6D9DE]',
    green: 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]',
    gray: 'bg-[#F2F4F7] text-[#6B7280] border-[#D6D9DE]',
    red: 'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]',
    yellow: 'bg-[#FFF3E0] text-[#D97706] border-[#FFE0B2]'
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[12px] font-semibold border ${styles[variant]} select-none`}
    >
      {children}
    </span>
  );
}
