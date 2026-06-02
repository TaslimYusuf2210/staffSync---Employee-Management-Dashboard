import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { employees, departments } = useApp();

  // Statistics calculation
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const inactiveEmployees = employees.filter((e) => e.status === 'Inactive' || e.status === 'Resigned' || e.status === 'Terminated').length;
  const totalDepartments = departments.length;

  // New Employees This Month (Assume current month is June 2026 or generic June based on hire date '2026-06')
  const newEmployeesThisMonth = employees.filter((e) => {
    const hireDate = new Date(e.hireDate);
    const today = new Date();
    return hireDate.getMonth() === today.getMonth() && hireDate.getFullYear() === today.getFullYear();
  }).length;

  // Sort employees by hireDate descending to show recent ones
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Upper header summary */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Overview</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Here is what is happening across your workspace today.</p>
      </div>

      {/* STATISTICS CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Total Employees</span>
          <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{totalEmployees}</p>
          <span className="text-[10px] text-neutral-400 block mt-1">Total database count</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Active Employees</span>
          <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{activeEmployees}</p>
          <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold block mt-1">● Currently active</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Inactive Employees</span>
          <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{inactiveEmployees}</p>
          <span className="text-[10px] text-neutral-400 block mt-1">Excluding active / probation</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Total Departments</span>
          <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{totalDepartments}</p>
          <span className="text-[10px] text-neutral-400 block mt-1">Registered segments</span>
        </div>

        {/* Card 5 */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">New This Month</span>
          <p className="text-3xl font-black text-neutral-950 dark:text-white mt-2">{newEmployeesThisMonth}</p>
          <span className="text-[10px] text-neutral-400 block mt-1">Hired in current month</span>
        </div>

      </section>

      {/* CHARTS GRAPHICS PANEL */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Employees by Department */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-4">Employees by Department</h3>
            {/* Inline SVG Bar chart */}
            <div className="h-44 flex items-end justify-between gap-4 mt-6">
              {departments.map((dep) => {
                const count = employees.filter((e) => e.department === dep.name).length;
                const percentage = totalEmployees > 0 ? (count / totalEmployees) * 100 : 0;
                return (
                  <div key={dep.id} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-t-md h-32 flex items-end">
                      <div 
                        style={{ height: `${Math.max(percentage, 5)}%` }}
                        className="w-full bg-neutral-950 dark:bg-white rounded-t-md transition-all duration-500" 
                      />
                    </div>
                    <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 truncate w-full text-center">{dep.name}</span>
                    <span className="text-[10px] font-extrabold text-neutral-900 dark:text-white">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart 2: Status Distribution */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-4">Employment Status Distribution</h3>
          {/* Custom donut chart simulation */}
          <div className="flex items-center justify-center h-44 mt-6 relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="50" fill="transparent" stroke="#f3f4f6" strokeWidth="16" />
              {/* Active Segment */}
              <circle 
                cx="64" 
                cy="64" 
                r="50" 
                fill="transparent" 
                stroke="#0a0a0a" 
                strokeWidth="16" 
                strokeDasharray={`${(activeEmployees / (totalEmployees || 1)) * 314} 314`} 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-neutral-950 dark:text-white">
                {totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0}%
              </span>
              <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">Active Status</span>
            </div>
          </div>
          {/* Legend */}
          <div className="flex justify-center gap-4 text-[10px] font-bold text-neutral-500 mt-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-neutral-950 dark:bg-white rounded-sm" /> Active</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-sm" /> Other statuses</span>
          </div>
        </div>

        {/* Chart 3: Employee Growth Trend */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-4">Employee Growth Trend</h3>
          {/* Area Line chart SVG */}
          <div className="h-44 mt-6 relative">
            <svg className="w-full h-32" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path 
                d="M0,30 Q25,24 50,16 T100,5 L100,30 L0,30 Z" 
                fill="#f5f5f5" 
                className="dark:fill-neutral-800/30"
              />
              <path 
                d="M0,30 Q25,24 50,16 T100,5" 
                fill="none" 
                stroke="#171717" 
                strokeWidth="1.5" 
                className="dark:stroke-white"
              />
            </svg>
            <div className="flex justify-between text-[9px] font-bold text-neutral-400 dark:text-neutral-500 px-1 mt-2">
              <span>Q1</span>
              <span>Q2</span>
              <span>Q3</span>
              <span>Q4</span>
            </div>
          </div>
        </div>

      </section>

      {/* RECENT EMPLOYEES LIST TABLE */}
      <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">Recent Employees</h3>
            <p className="text-xs text-neutral-500 mt-1">Newly hired personnel registered in the database.</p>
          </div>
          <Link to="/employees" className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-all">
            Manage All
          </Link>
        </div>

        {recentEmployees.length === 0 ? (
          <div className="py-8 text-center text-neutral-400 text-sm">No employees registered yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">Position</th>
                  <th className="pb-3 font-semibold">Date Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {recentEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-all">
                    <td className="py-3.5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold flex items-center justify-center overflow-hidden shrink-0">
                        {emp.photoUrl ? (
                          <img className="w-full h-full object-cover grayscale" src={emp.photoUrl} alt="" />
                        ) : (
                          `${emp.firstName[0]}${emp.lastName[0]}`
                        )}
                      </div>
                      <div>
                        <Link to={`/employees/${emp.id}`} className="font-bold text-neutral-900 dark:text-white hover:underline">
                          {emp.firstName} {emp.lastName}
                        </Link>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{emp.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[10px] font-bold rounded border border-neutral-200 dark:border-neutral-700">
                        {emp.department}
                      </span>
                    </td>
                    <td className="py-3.5 text-neutral-600 dark:text-neutral-400 font-medium">{emp.position}</td>
                    <td className="py-3.5 text-neutral-500 dark:text-neutral-400 font-bold">{emp.hireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}
