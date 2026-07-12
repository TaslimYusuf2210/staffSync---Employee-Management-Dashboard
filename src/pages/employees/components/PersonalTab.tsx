import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Employee } from '../../../types/dashboard/employee';

interface PersonalTabProps {
  employee: Employee;
  onSave: (data: Record<string, string>) => void;
}

const personalSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  dob: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
});

type PersonalFormValues = z.infer<typeof personalSchema>;

export function PersonalTab({ employee, onSave }: PersonalTabProps) {
  const [editing, setEditing] = useState(false);

  const fields = [
    { label: 'First Name', name: 'firstName' as const },
    { label: 'Last Name', name: 'lastName' as const },
    { label: 'Email Address', name: 'email' as const, type: 'email' },
    { label: 'Phone Number', name: 'phoneNumber' as const },
    { label: 'Gender', name: 'gender' as const, type: 'select' as const, options: ['Male', 'Female', 'Other'] },
    { label: 'Date of Birth', name: 'dob' as const, type: 'date' },
    { label: 'Home Address', name: 'address' as const, colSpan: true },
    { label: 'Emergency Contact', name: 'emergencyContact' as const },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      gender: employee.gender,
      dob: employee.dob || '',
      address: employee.address || '',
      emergencyContact: employee.emergencyContact || '',
    },
  });

  const onSubmit = (data: PersonalFormValues) => {
    onSave(data);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Details</h3>
          <button onClick={() => setEditing(true)} className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer">
            Edit Info
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
          {fields.map((f) => (
            <div key={f.name} className={f.colSpan ? 'sm:col-span-2' : ''}>
              <span className="text-neutral-400 font-bold block mb-1">{f.label}</span>
              <p className="font-bold text-neutral-900 text-sm">{employee[f.name] || 'Not set'}</p>
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
        {fields.map((f) => (
          <div key={f.name} className={f.colSpan ? 'sm:col-span-2' : ''}>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              {f.label}
            </label>
            {f.type === 'select' ? (
              <select {...register(f.name)} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]">
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={f.type ?? 'text'}
                {...register(f.name)}
                className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
              />
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
