import { useState } from 'react';
import type { Employee } from '../../../types/dashboard/employee';
import type { Department } from '../../../types/dashboard/department';

interface EmploymentTabProps {
  employee: Employee;
  departments: Department[];
  onSave: (data: Record<string, string>) => void;
}

export function EmploymentTab({ employee, departments, onSave }: EmploymentTabProps) {
  const [editing, setEditing] = useState(false);

  const fields = [
    { label: 'Employee ID', value: employee.id, name: 'id', readOnly: true },
    { label: 'Department', value: employee.department, name: 'department', type: 'select', options: departments.map((d) => d.name) },
    { label: 'Position', value: employee.position, name: 'position' },
    { label: 'Employment Type', value: employee.employmentType, name: 'employmentType', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Intern', 'Remote'] },
    { label: 'Hire Date', value: employee.hireDate, name: 'hireDate', type: 'date' },
    { label: 'Reporting Manager', value: employee.reportingManager, name: 'reportingManager' },
    { label: 'Employment Status', value: employee.status, name: 'status', type: 'select', options: ['Active', 'Inactive', 'Probation', 'Resigned', 'Terminated'] },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result: Record<string, string> = {};
    fields.forEach((f) => { if (!f.readOnly) result[f.name] = (data.get(f.name) as string) ?? ''; });
    onSave(result);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Employment Information</h3>
          <button onClick={() => setEditing(true)} className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
          {fields.map((f) => (
            <div key={f.name}>
              <span className="text-neutral-400 font-bold block mb-1">{f.label}</span>
              <p className="font-bold text-neutral-900 text-sm">{f.value || 'Not set'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Edit Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fields.map((f) => (
          !f.readOnly && (
            <div key={f.name}>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">{f.label}</label>
              {f.type === 'select' ? (
                <select name={f.name} defaultValue={f.value} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs">
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.type ?? 'text'} name={f.name} defaultValue={f.value} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
              )}
            </div>
          )
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={() => setEditing(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
        <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
      </div>
    </form>
  );
}
