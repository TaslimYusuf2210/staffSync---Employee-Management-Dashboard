// ─── Department Domain Types ─────────────────────────────────────────

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  dateCreated: string;
  employeeCount: number;
}

export interface DepartmentsResponse {
  departments: Department[];
}

export interface CreateDepartmentPayload {
  name: string;
  description: string;
  head?: string;
}
