import { type ReactNode } from 'react';
import { Card } from './ui/card';

interface StatCardProps {
  label: string;
  value: string | number;
  footer?: string;
  footerClassName?: string;
  children?: ReactNode;
}

export function StatCard({ label, value, footer, footerClassName, children }: StatCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
        {label}
      </span>
      <p className="text-3xl font-black text-neutral-950 mt-2">{value}</p>
      {footer && (
        <span className={`text-[10px] block mt-1 ${footerClassName ?? 'text-neutral-400'}`}>
          {footer}
        </span>
      )}
      {children}
    </Card>
  );
}

export function StatCardGrid({ children }: { children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {children}
    </section>
  );
}
