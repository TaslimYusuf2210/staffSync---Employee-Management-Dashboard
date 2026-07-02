import { Badge } from './ui/badge';

type EmployeeStatus = 'Active' | 'Inactive' | 'Probation' | 'Resigned' | 'Terminated';

const statusVariantMap: Record<EmployeeStatus, 'active' | 'inactive' | 'probation' | 'danger'> = {
  Active: 'active',
  Inactive: 'inactive',
  Probation: 'probation',
  Resigned: 'danger',
  Terminated: 'danger',
};

export function StatusBadge({ status }: { status: string }) {
  const variant = statusVariantMap[status as EmployeeStatus] ?? 'default';
  return <Badge variant={variant}>{status}</Badge>;
}
