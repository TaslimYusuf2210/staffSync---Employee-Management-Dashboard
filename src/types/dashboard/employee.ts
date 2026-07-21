// ─── Employee Domain Types ───────────────────────────────────────────

export interface Education {
  id: string;
  institutionName: string;
  degree: string;
  qualification: string;
  fieldOfStudy: string;
  graduationYear: string;
}

export interface Salary {
  baseSalary: number;
  bonus: number;
  allowances: number;
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'Resume' | 'Employment Letter' | 'Certificates' | 'Other Documents';
  uploadDate: string;
  fileUrl?: string;
}

export interface Note {
  id: string;
  text: string;
  createdDate: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  department: string;
  position: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern' | 'Remote';
  hireDate: string;
  status: 'Active' | 'Inactive' | 'Probation' | 'Resigned' | 'Terminated' | 'OnLeave';
  dob: string;
  address: string;
  emergencyContact: string;
  reportingManager: string;
  photoUrl?: string;
  education: Education[];
  salary: Salary;
  bankAccount: BankAccount;
  documents: Document[];
  notes: Note[];
}

import type { Department } from './department';

// ─── Employee Component Prop Types ───────────────────────────────────

export interface BankTabProps {
  employee: Employee;
  onSave: (bank: { bankName: string; accountName: string; accountNumber: string }) => void;
}

export interface DocumentsSectionProps {
  documents: Employee['documents'];
  onAdd: (doc: { name: string; type: Document['type'] }) => void;
  onDelete: (id: string) => void;
}

export interface EducationSectionProps {
  education: Employee['education'];
  onAdd: (edu: Omit<Education, 'id'>) => void;
  onDelete: (id: string) => void;
}

export interface EmploymentTabProps {
  employee: Employee;
  departments: Department[];
  onSave: (data: Record<string, string>) => void;
}

export interface NotesSectionProps {
  notes: Employee['notes'];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
}

export interface PersonalTabProps {
  employee: Employee;
  onSave: (data: Record<string, string>) => void;
}

export interface SalaryTabProps {
  employee: Employee;
  onSave: (salary: { baseSalary: number; bonus: number; allowances: number }) => void;
}

export type TabType =
  | 'personal'
  | 'employment'
  | 'education'
  | 'salary'
  | 'bank'
  | 'documents'
  | 'notes';

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface EmployeesResponse {
  employees: Employee[];
  pagination: Pagination;
}

export interface UpdateEmployeePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  dob?: string;
  address?: string;
  emergencyContact?: string;
  department?: string;
  position?: string;
  employmentType?: string;
  hireDate?: string;
  reportingManager?: string;
  status?: string;
  photoUrl?: string;
}

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  department: string;
  position: string;
  employmentType: string;
  hireDate?: string;
  status?: string;
}

export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: 'Active' | 'Inactive' | 'Probation' | 'Resigned' | 'Terminated' | 'OnLeave';
  sortBy?: 'name' | 'dept' | 'joined';
  sortOrder?: 'asc' | 'desc';
}

/** Response shape for GET /employees/:id */
export interface SingleEmployeeResponse {
  employee: Employee;
}

