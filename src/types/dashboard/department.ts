// ─── Department Domain Types ─────────────────────────────────────────

export interface DepartmentPosition {
  id: string;
  title: string;
  description?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  dateCreated: string;
  employeeCount: number;
  positions: DepartmentPosition[];
}

export interface DepartmentsResponse {
  departments: Department[];
}

export interface CreateDepartmentPayload {
  name: string;
  description: string;
  head?: string;
}

export interface UpdateDepartmentPayload {
  name?: string;
  description?: string;
  head?: string;
  positions?: DepartmentPosition[];
}
