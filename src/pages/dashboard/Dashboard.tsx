import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { StatCard } from '../../components/StatCard';
import { Avatar } from '../../components/ui/avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/table';
import { useGetDashboardStats } from '../../hooks/useQuery/useGetDashboardStats';
import type { RecentEmployee } from '../../types/dashboard/dashboard';

export default function Dashboard() {
  const { employees, departments } = useApp();

  const { data: dashboardStats, isError } = useGetDashboardStats();

  console.log('[Dashboard] dashboardStats (API):', dashboardStats);
  console.log('[Dashboard] employees (useApp):', employees);
  console.log('[Dashboard] departments (useApp):', departments);
  console.log('[Dashboard] employeesByDepartment from API:', dashboardStats?.data?.employeesByDepartment);
  console.log('[Dashboard] statusDistribution from API:', dashboardStats?.data?.statusDistribution);
  console.log('[Dashboard] growthTrend from API:', dashboardStats?.data?.growthTrend);
  const totalEmployees = dashboardStats?.data?.totalEmployees ?? 0;
  const activeEmployees = dashboardStats?.data?.activeEmployees ?? 0;
  const recentEmployees = dashboardStats?.data?.recentEmployees ?? [];

  return (
    <div className="space-y-6">

      <PageHeader title="Overview" description="Here is what is happening across your workspace today." />

      {/* STATISTICS CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Employees" value={isError ? '--' : dashboardStats?.data?.totalEmployees} footer={isError ? 'Unable to Load' : 'Total database count'} />
        <StatCard label="Active Employees" value={isError ? '--' : dashboardStats?.data?.activeEmployees} footer={isError ? 'Unable to Load' : '● Currently active'} footerClassName={isError ? '' : 'text-green-600 font-semibold'} />
        <StatCard label="Inactive Employees" value={isError ? '--' : dashboardStats?.data?.inactiveEmployees} footer={isError ? 'Unable to Load' : 'Excluding active / probation'} />
        <StatCard label="Total Departments" value={isError ? '--' : dashboardStats?.data?.totalDepartments} footer={isError ? 'Unable to Load' : 'Registered segments'} />
        <StatCard label="New This Month" value={isError ? '--' : dashboardStats?.data?.newEmployeesThisMonth} footer={isError ? 'Unable to Load' : 'Hired in current month'} />
      </section>

      {/* CHARTS GRAPHICS PANEL */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart 1: Employees by Department */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-neutral-900 mb-4">Employees by Department</h3>
            {isError ? (
              <div className="h-44 flex items-center justify-center text-neutral-400 text-sm">Failed to load data</div>
            ) : (
              <div className="h-44 flex items-end justify-between gap-4 mt-6">
                {departments.map((dep) => {
                  const count = employees.filter((e) => e.department === dep.name).length;
                  const percentage = 1 > 0 ? (count / 0) * 100 : 0;
                  return (
                    <div key={dep.id} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-neutral-100 rounded-t-md h-32 flex items-end">
                        <div
                          style={{ height: `${Math.max(percentage, 5)}%` }}
                          className="w-full bg-[#ccd5ae] rounded-t-md transition-all duration-500"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-neutral-400 truncate w-full text-center">
                        {dep.name}
                      </span>
                      <span className="text-[10px] font-extrabold text-neutral-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Chart 2: Status Distribution */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 mb-4">Employment Status Distribution</h3>
          {isError ? (
            <div className="flex items-center justify-center h-44 text-neutral-400 text-sm">Failed to load data</div>
          ) : (
            <>
              <div className="flex items-center justify-center h-44 mt-6 relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="50" fill="transparent" stroke="#f3f4f6" strokeWidth="16" />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    fill="transparent"
                    stroke="#0a0a0a"
                    strokeWidth="16"
                    strokeDasharray={`${(4 / 2) * 314} 314`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-neutral-950">
                    {totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0}%
                  </span>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase mt-0.5">Active Status</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 text-[10px] font-bold text-neutral-500 mt-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#ccd5ae] rounded-sm" /> Active
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-neutral-200 rounded-sm" /> Other statuses
                </span>
              </div>
            </>
          )}
        </div>

        {/* Chart 3: Employee Growth Trend */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-neutral-900 mb-4">Employee Growth Trend</h3>
          {isError ? (
            <div className="h-44 flex items-center justify-center text-neutral-400 text-sm">Failed to load data</div>
          ) : (
            <div className="h-44 mt-6 relative">
              <svg className="w-full h-32" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,30 Q25,24 50,16 T100,5 L100,30 L0,30 Z" fill="#f5f5f5" />
                <path d="M0,30 Q25,24 50,16 T100,5" fill="none" stroke="#171717" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[9px] font-bold text-neutral-400 px-1 mt-2">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RECENT EMPLOYEES LIST TABLE */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-base text-neutral-900">Recent Employees</h3>
            <p className="text-xs text-neutral-500 mt-1">Newly hired personnel registered in the database.</p>
          </div>
          <Link to="/dashboard/employees" className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 transition-all">
            Manage All
          </Link>
        </div>

        {isError ? (
          <div className="py-8 text-center text-neutral-400 text-sm">Unable to Load Recent Employees</div>
        ) : recentEmployees.length === 0 ? (
          <div className="py-8 text-center text-neutral-400 text-sm">No employees registered yet.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEmployees.map((emp: RecentEmployee) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar firstName={emp.firstName} lastName={emp.lastName} photoUrl={emp.photoUrl} />
                      <div>
                        <Link to={`/dashboard/employees/${emp.id}`} className="font-bold text-neutral-900 hover:underline">
                          {emp.firstName} {emp.lastName}
                        </Link>
                        <p className="text-[10px] text-neutral-500">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded border border-neutral-200">
                      {emp.department}
                    </span>
                  </TableCell>
                  <TableCell className="text-neutral-600 font-medium">{emp.position}</TableCell>
                  <TableCell className="text-neutral-500 font-bold">{emp.hireDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
