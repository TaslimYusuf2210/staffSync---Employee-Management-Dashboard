import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Employee } from '../../../types/dashboard/employee';
import type { Department } from '../../../types/dashboard/department';

interface EmploymentTabProps {
  employee: Employee;
  departments: Department[];
  onSave: (data: Record<string, string>) => void;
}

const employmentSchema = z.object({
  department: z.string().min(1, { message: 'Department is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
  employmentType: z.string().min(1, { message: 'Employment type is required' }),
  hireDate: z.string().min(1, { message: 'Hire date is required' }),
  reportingManager: z.string().optional(),
  status: z.string().min(1, { message: 'Status is required' }),
});

type EmploymentFormValues = z.infer<typeof employmentSchema>;

export function EmploymentTab({ employee, departments, onSave }: EmploymentTabProps) {
  const [editing, setEditing] = useState(false);

  const fields = [
    { label: 'Employee ID', value: employee.id, name: 'id', readOnly: true },
    { label: 'Department', name: 'department' as const, type: 'select' as const, options: departments.map((d) => d.name) },
    { label: 'Position', name: 'position' as const },
    { label: 'Employment Type', name: 'employmentType' as const, type: 'select' as const, options: ['Full-time', 'Part-time', 'Contract', 'Intern', 'Remote'] },
    { label: 'Hire Date', name: 'hireDate' as const, type: 'date' },
    { label: 'Reporting Manager', name: 'reportingManager' as const },
    { label: 'Employment Status', name: 'status' as const, type: 'select' as const, options: ['Active', 'Inactive', 'Probation', 'Resigned', 'Terminated'] },
  ];

  const editableFields = fields.filter((f) => !f.readOnly);
  const fieldNames = editableFields.map((f) => f.name) as [string, ...string[]];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmploymentFormValues>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      department: employee.department,
      position: employee.position,
      employmentType: employee.employmentType,
      hireDate: employee.hireDate,
      reportingManager: employee.reportingManager || '',
      status: employee.status,
    },
  });

  const onSubmit = (data: EmploymentFormValues) => {
    onSave(data);
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
              <p className="font-bold text-neutral-900 text-sm">{'value' in f ? f.value : (employee[f.name as keyof Employee] as string) || 'Not set'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Edit Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {editableFields.map((f) => (
          <div key={f.name}>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">{f.label}</label>
            {f.type === 'select' ? (
              <select {...register(f.name)} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]">
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type ?? 'text'} {...register(f.name)} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            )}
            {errors[f.name] && <p className="text-red-500 text-[10px] mt-1">{errors[f.name]?.message}</p>}
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
