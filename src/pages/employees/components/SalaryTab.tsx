import { useState } from 'react';
import type { Employee } from '../../../types/dashboard/employee';

interface SalaryTabProps {
  employee: Employee;
  onSave: (salary: { baseSalary: number; bonus: number; allowances: number }) => void;
}

export function SalaryTab({ employee, onSave }: SalaryTabProps) {
  const [editing, setEditing] = useState(false);
  const s = employee.salary;
  const total = s.baseSalary + s.bonus + s.allowances;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSave({
      baseSalary: Number(data.get('baseSalary')),
      bonus: Number(data.get('bonus')),
      allowances: Number(data.get('allowances')),
    });
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Salary Information</h3>
          <button onClick={() => setEditing(true)} className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">
            Adjust Compensation
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-neutral-400 font-bold block mb-1">Base Salary</span>
            <p className="font-bold text-neutral-900 text-base">${s.baseSalary?.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-neutral-400 font-bold block mb-1">Bonus</span>
            <p className="font-bold text-neutral-900 text-base">${s.bonus?.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-neutral-400 font-bold block mb-1">Allowances</span>
            <p className="font-bold text-neutral-900 text-base">${s.allowances?.toLocaleString()}</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-100 p-3 rounded-xl">
            <span className="text-neutral-400 font-bold block">Total Compensation</span>
            <p className="font-black text-neutral-950 text-lg mt-1">${total?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Adjust Compensation</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['baseSalary', 'bonus', 'allowances'] as const).map((field) => (
          <div key={field}>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              {field === 'baseSalary' ? 'Base Salary ($)' : field === 'bonus' ? 'Bonus ($)' : 'Allowances ($)'}
            </label>
            <input type="number" name={field} defaultValue={s[field]} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={() => setEditing(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
        <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
      </div>
    </form>
  );
}
