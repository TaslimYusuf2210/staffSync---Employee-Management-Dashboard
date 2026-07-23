import type { Employee } from '../../../types/dashboard/employee';
import type { Department } from '../../../types/dashboard/department';

interface ReportCardProps {
  label: string;
  value: string | number;
}

export function ReportCard({ label, value }: ReportCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">{label}</span>
      <p className="text-3xl font-black text-neutral-950 mt-2">{value}</p>
    </div>
  );
}

interface EmployeeMetricsProps {
  employees: Employee[];
  departments: Department[];
}

export function EmployeeMetrics({ employees, departments }: EmployeeMetricsProps) {
  const total = employees.length;
  const active = employees.filter((e) => e.status === 'Active').length;
  const inactive = employees.filter(
    (e) => e.status === 'Inactive' || e.status === 'Resigned' || e.status === 'Terminated'
  ).length;

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">Employee Reports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportCard label="Total Employees" value={total} />
        <ReportCard label="Active" value={active} />
        <ReportCard label="Inactive / Departed" value={inactive} />
        <ReportCard label="Departments" value={departments.length} />
      </div>
      <DepartmentBreakdown employees={employees} departments={departments} />
    </section>
  );
}

function DepartmentBreakdown({ employees, departments }: EmployeeMetricsProps) {
  const total = employees.length;
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-sm text-neutral-900 mb-6">Employees Per Department</h3>
      <div className="space-y-4">
        {departments.map((dep) => {
          const count = employees.filter((e) => e.department === dep.name).length;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={dep.id} className="flex items-center gap-4">
              <span className="text-xs font-bold text-neutral-600 w-28 shrink-0 truncate">{dep.name}</span>
              <div className="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[#ccd5ae] h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(pct, 3)}%` }}
                />
              </div>
              <span className="text-xs font-black text-neutral-950 w-16 text-right">{count} ({pct}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
