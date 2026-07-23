export interface SalaryByDepartment {
  department: string;
  averageSalary: number;
  totalPayroll: number;
  employeeCount: number;
}

export interface SalarySummary {
  totalMonthlyPayroll: number;
  averageCompensation: number;
  highestPaid: number;
  salaryDistributionByDepartment: SalaryByDepartment[];
}
