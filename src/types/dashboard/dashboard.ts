// ─── Dashboard Page Types ────────────────────────────────────────────

export interface DepartmentStats {
  department: string;
  count: number;
  percentage: number;
}

export interface StatusDistribution {
  active: number;
  inactive: number;
  probation: number;
  resigned: number;
  terminated: number;
}

export interface RecentEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  photoUrl: string | null;
}

export interface GrowthTrend {
  labels: string[];
  data: number[];
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  totalDepartments: number;
  newEmployeesThisMonth: number;
  employeesByDepartment: DepartmentStats[];
  statusDistribution: StatusDistribution;
  recentEmployees: RecentEmployee[];
  growthTrend: GrowthTrend;
}
