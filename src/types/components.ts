// ─── Shared UI Component Prop Types ──────────────────────────────────

import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export interface SidebarProps {
  onClose?: () => void;
  isDrawer?: boolean;
}

export interface StatCardProps {
  label: string;
  value: string;
  footer?: string;
  footerClassName?: string;
  children?: ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export type BadgeVariant = 'default' | 'active' | 'probation' | 'inactive' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export interface AvatarProps {
  firstName: string;
  lastName: string;
  photoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export type EmployeeStatus = 'Active' | 'Inactive' | 'Probation' | 'Resigned' | 'Terminated';
