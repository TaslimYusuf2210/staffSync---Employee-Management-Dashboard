import { type HTMLAttributes } from 'react';

type BadgeVariant = 'default' | 'active' | 'probation' | 'inactive' | 'danger';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
  active: 'bg-[#ccd5ae] text-neutral-950',
  probation: 'bg-neutral-100 text-neutral-700',
  inactive: 'bg-neutral-100 text-neutral-500',
  danger: 'bg-red-50 text-red-600',
};

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase inline-block ${variantClasses[variant]} ${className ?? ''}`}
      {...props}
    />
  );
}
