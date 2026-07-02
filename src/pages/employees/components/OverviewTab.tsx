import type { Employee } from '../../../context/AppContext';

export function OverviewTab({ employee }: { employee: Employee }) {
  const fields = [
    { label: 'Department', value: employee.department },
    { label: 'Position / Role', value: employee.position },
    { label: 'Employment Type', value: employee.employmentType },
    { label: 'Hire Date', value: employee.hireDate },
    { label: 'Status', value: employee.status },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {fields.map((f) => (
        <div key={f.label} className="bg-neutral-50 border border-neutral-100 p-5 rounded-2xl">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">{f.label}</span>
          <p className="font-extrabold text-neutral-950 mt-1.5">{f.value}</p>
        </div>
      ))}
    </div>
  );
}
