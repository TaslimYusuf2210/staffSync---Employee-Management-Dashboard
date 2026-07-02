import { type ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center">
      <div className="w-12 h-12 text-neutral-300">{icon}</div>
      <h3 className="font-bold text-neutral-800 mt-4 text-base">{title}</h3>
      <p className="text-xs text-neutral-400 mt-1 max-w-xs">{description}</p>
    </div>
  );
}
