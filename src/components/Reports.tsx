import { useApp } from '../context/AppContext';

export default function Reports() {
  const { employees, departments } = useApp();

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const inactiveEmployees = employees.filter((e) => e.status === 'Inactive' || e.status === 'Resigned' || e.status === 'Terminated').length;

  const totalPayroll = employees.reduce((sum, e) => sum + e.salary.baseSalary + e.salary.bonus + e.salary.allowances, 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalPayroll / totalEmployees) : 0;

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format}... (simulated)`);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Reports</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Analytical overview of workforce and payroll metrics.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => handleExport('CSV')} className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-all cursor-pointer">Export CSV</button>
          <button onClick={() => handleExport('Excel')} className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-all cursor-pointer">Export Excel</button>
          <button onClick={() => handleExport('PDF')} className="px-3 py-2 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer">Export PDF</button>
        </div>
      </div>

      {/* EMPLOYEE REPORTS */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">Employee Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Total Employees</span>
            <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{totalEmployees}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Active</span>
            <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{activeEmployees}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Inactive / Departed</span>
            <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{inactiveEmployees}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Departments</span>
            <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{departments.length}</p>
          </div>
        </div>

        {/* Employees per Department chart */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-6">Employees Per Department</h3>
          <div className="space-y-4">
            {departments.map((dep) => {
              const count = employees.filter((e) => e.department === dep.name).length;
              const pct = totalEmployees > 0 ? Math.round((count / totalEmployees) * 100) : 0;
              return (
                <div key={dep.id} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 w-28 shrink-0 truncate">{dep.name}</span>
                  <div className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-neutral-950 dark:bg-white h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(pct, 3)}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-neutral-950 dark:text-white w-16 text-right">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SALARY REPORTS */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">Salary Reports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Total Monthly Payroll</span>
            <p className="text-2xl font-black text-neutral-950 dark:text-white mt-2">${totalPayroll.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Average Compensation</span>
            <p className="text-2xl font-black text-neutral-950 dark:text-white mt-2">${avgSalary.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Highest Paid</span>
            <p className="text-2xl font-black text-neutral-950 dark:text-white mt-2">
              ${employees.length > 0 ? Math.max(...employees.map((e) => e.salary.baseSalary + e.salary.bonus + e.salary.allowances)).toLocaleString() : 0}
            </p>
          </div>
        </div>

        {/* Salary Distribution bar chart */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-6">Salary Distribution by Employee</h3>
          <div className="h-52 flex items-end justify-between gap-3 overflow-x-auto pb-2">
            {employees.map((emp) => {
              const total = emp.salary.baseSalary + emp.salary.bonus + emp.salary.allowances;
              const maxSal = Math.max(...employees.map((e) => e.salary.baseSalary + e.salary.bonus + e.salary.allowances), 1);
              const pct = (total / maxSal) * 100;
              return (
                <div key={emp.id} className="flex-1 min-w-[40px] flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-neutral-500">${(total / 1000).toFixed(1)}k</span>
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-t-md h-40 flex items-end">
                    <div
                      className="w-full bg-neutral-950 dark:bg-white rounded-t-md transition-all duration-500"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[8px] font-bold text-neutral-400 truncate w-full text-center">{emp.firstName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HIRING REPORTS */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">Hiring Reports</h2>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-6">Employee Growth Over Time</h3>
          <div className="h-40 relative">
            <svg className="w-full h-32" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#171717" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,28 L15,22 L30,24 L45,18 L60,14 L75,10 L100,5 L100,30 L0,30 Z" fill="url(#growthGrad)" />
              <path d="M0,28 L15,22 L30,24 L45,18 L60,14 L75,10 L100,5" fill="none" stroke="#171717" strokeWidth="1.5" className="dark:stroke-white" />
              {/* Data points */}
              <circle cx="0" cy="28" r="2" fill="#171717" className="dark:fill-white" />
              <circle cx="15" cy="22" r="2" fill="#171717" className="dark:fill-white" />
              <circle cx="30" cy="24" r="2" fill="#171717" className="dark:fill-white" />
              <circle cx="45" cy="18" r="2" fill="#171717" className="dark:fill-white" />
              <circle cx="60" cy="14" r="2" fill="#171717" className="dark:fill-white" />
              <circle cx="75" cy="10" r="2" fill="#171717" className="dark:fill-white" />
              <circle cx="100" cy="5" r="2" fill="#171717" className="dark:fill-white" />
            </svg>
            <div className="flex justify-between text-[9px] font-bold text-neutral-400 px-1 mt-2">
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
