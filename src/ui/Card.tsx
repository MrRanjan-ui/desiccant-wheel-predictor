import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
}

export function Card({
  children,
  className = '',
  title,
  subtitle,
  headerActions,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white border border-[#D6D9DE] rounded-[6px] shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {(title || subtitle || headerActions) && (
        <div className="border-b border-[#D6D9DE] px-4 py-3 bg-[#E9ECEF] flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-[16px] font-semibold text-[#2D3748] tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[12px] text-[#6B7280] font-normal mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
