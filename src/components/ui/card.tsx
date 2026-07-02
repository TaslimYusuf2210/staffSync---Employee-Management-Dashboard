import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function Card({ className, noPadding, ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 rounded-2xl shadow-sm ${noPadding ? '' : 'p-5'} ${className ?? ''}`}
      {...props}
    />
  );
}

export function SectionCard({ className, children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-neutral-200 rounded-2xl ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
