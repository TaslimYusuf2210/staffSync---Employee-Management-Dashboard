import type { Employee } from '../../../types/dashboard/employee';
import type { Department } from '../../../types/dashboard/department';
import { ReportCard } from './EmployeeMetrics';

interface SalaryMetricsProps {
  employees: Employee[];
  departments: Department[];
}

function computeSalary(e: Employee) {
  const s = e.Salary ?? { baseSalary: 0, bonus: 0, allowances: 0 };
  return s.baseSalary + s.bonus + s.allowances;
}

export function SalaryMetrics({ employees, departments }: SalaryMetricsProps) {
  const total = employees.length;
  const totalPayroll = employees.reduce((sum, e) => sum + computeSalary(e), 0);
  const avgSalary = total > 0 ? Math.round(totalPayroll / total) : 0;
  const highestPaid = employees.length > 0 ? Math.max(...employees.map(computeSalary)) : 0;

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">Salary Reports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ReportCard label="Total Monthly Payroll" value={`$${totalPayroll.toLocaleString()}`} />
        <ReportCard label="Average Compensation" value={`$${avgSalary.toLocaleString()}`} />
        <ReportCard label="Highest Paid" value={`$${highestPaid.toLocaleString()}`} />
      </div>
      <SalaryDistribution departments={departments} employees={employees} />
    </section>
  );
}

function SalaryDistribution({ departments, employees }: SalaryMetricsProps) {
  const maxDeptAvg = Math.max(
    ...departments.map((d) => {
      const de = employees.filter((e) => e.department === d.name);
      const total = de.reduce((sum, e) => sum + computeSalary(e), 0);
      return de.length > 0 ? total / de.length : 0;
    }),
    1,
  );

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-sm text-neutral-900 mb-6">Average Salary Distribution by Department</h3>
      <div className="h-52 flex items-end justify-between gap-3 overflow-x-auto pb-2">
        {departments.map((dep) => {
          const deptEmployees = employees.filter((e) => e.department === dep.name);
          const totalSalary = deptEmployees.reduce((sum, e) => sum + computeSalary(e), 0);
          const avg = deptEmployees.length > 0 ? Math.round(totalSalary / deptEmployees.length) : 0;
          const pct = (avg / maxDeptAvg) * 100;

          return (
            <div key={dep.id} className="flex-1 min-w-[60px] flex flex-col items-center gap-2">
              <span className="text-[9px] font-bold text-neutral-500">${(avg / 1000).toFixed(1)}k</span>
              <div className="w-full bg-neutral-100 rounded-t-md h-40 flex items-end">
                <div className="w-full bg-[#ccd5ae] rounded-t-md transition-all duration-500" style={{ height: `${pct}%` }} />
              </div>
              <span className="text-[8px] font-bold text-neutral-400 truncate w-full text-center" title={dep.name}>{dep.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
