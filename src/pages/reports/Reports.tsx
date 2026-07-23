import { useApp } from '../../context/AppContext';
import { EmployeeMetrics } from './components/EmployeeMetrics';
import { SalaryMetrics } from './components/SalaryMetrics';
import { HiringTrend } from './components/HiringTrend';

export default function Reports() {
  const { employees, departments } = useApp();

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format}... (simulated)`);
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-extrabold text-neutral-900 tracking-tight'>Reports</h1>
          <p className='text-sm text-neutral-500 mt-1'>Analytical overview of workforce and payroll metrics.</p>
        </div>
        <div className='flex gap-2 shrink-0'>
          <button onClick={() => handleExport('CSV')} className='px-3 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 transition-all cursor-pointer'>Export CSV</button>
          <button onClick={() => handleExport('Excel')} className='px-3 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 transition-all cursor-pointer'>Export Excel</button>
          <button onClick={() => handleExport('PDF')} className='px-3 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer'>Export PDF</button>
        </div>
      </div>

      <EmployeeMetrics employees={employees} departments={departments} />
      <SalaryMetrics />
      <HiringTrend />
    </div>
  );
}
