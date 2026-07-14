import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../../../context/AppContext';
import { Dialog } from '../../../components/ui/dialog';

const employeeSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required (min 2 characters)' }),
  lastName: z.string().min(2, { message: 'Last name is required (min 2 characters)' }),
  email: z.string().email({ message: 'A valid email address is required' }),
  phoneNumber: z.string().min(6, { message: 'Phone number is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  department: z.string().min(1, { message: 'Department is required' }),
  position: z.string().min(2, { message: 'Position is required' }),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Intern', 'Remote']),
  hireDate: z.string().min(10, { message: 'Hire date is required' }),
  status: z.enum(['Active', 'Inactive', 'Probation', 'Resigned', 'Terminated']),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const STEPS = ['Personal Info', 'Employment', 'Review', 'Done'];

interface AddEmployeeDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddEmployeeDialog({ open, onClose }: AddEmployeeDialogProps) {
  const [step, setStep] = useState(0);
  const { departments } = useApp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: 'Male',
      department: departments[0]?.name || '',
      position: '',
      employmentType: 'Full-time',
      hireDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    },
  });

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  const onSubmit = (data: EmployeeFormValues) => {
    if (step < 2) return;
    console.log('Employee Data:', data);
    setStep(3);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                i <= step ? 'bg-[#ccd5ae] text-neutral-950' : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] font-bold hidden sm:block ${i <= step ? 'text-neutral-900' : 'text-neutral-400'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-[#ccd5ae]' : 'bg-neutral-200'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Info */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">First Name</label>
                <input type="text" {...register('firstName')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Last Name</label>
                <input type="text" {...register('lastName')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Email Address</label>
                <input type="email" {...register('email')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Phone Number</label>
                <input type="text" {...register('phoneNumber')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Gender</label>
                <select {...register('gender')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae] bg-white cursor-pointer">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-[10px] mt-1">{errors.gender.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Employment Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
              Employment Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Department</label>
                <select {...register('department')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae] bg-white cursor-pointer">
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-[10px] mt-1">{errors.department.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Position / Job Title</label>
                <input type="text" {...register('position')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors.position && <p className="text-red-500 text-[10px] mt-1">{errors.position.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Employment Type</label>
                <select {...register('employmentType')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae] bg-white cursor-pointer">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                  <option value="Remote">Remote</option>
                </select>
                {errors.employmentType && <p className="text-red-500 text-[10px] mt-1">{errors.employmentType.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Hire Date</label>
                <input type="date" {...register('hireDate')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors.hireDate && <p className="text-red-500 text-[10px] mt-1">{errors.hireDate.message}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Employment Status</label>
                <select {...register('status')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae] bg-white cursor-pointer">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Probation">Probation</option>
                  <option value="Resigned">Resigned</option>
                  <option value="Terminated">Terminated</option>
                </select>
                {errors.status && <p className="text-red-500 text-[10px] mt-1">{errors.status.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
              Review Information
            </h3>
            <div className="bg-neutral-50 rounded-xl p-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-400 font-bold block">First Name</span>
                  <span className="text-neutral-900 font-bold">{watch('firstName')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Last Name</span>
                  <span className="text-neutral-900 font-bold">{watch('lastName')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Email</span>
                  <span className="text-neutral-900">{watch('email')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Phone</span>
                  <span className="text-neutral-900">{watch('phoneNumber')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Gender</span>
                  <span className="text-neutral-900">{watch('gender')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Department</span>
                  <span className="text-neutral-900">{watch('department')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Position</span>
                  <span className="text-neutral-900">{watch('position')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Type</span>
                  <span className="text-neutral-900">{watch('employmentType')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Hire Date</span>
                  <span className="text-neutral-900">{watch('hireDate')}</span>
                </div>
                <div>
                  <span className="text-neutral-400 font-bold block">Status</span>
                  <span className="text-neutral-900">{watch('status')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 3 && (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-[#ccd5ae] rounded-full flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">Employee Added!</h3>
            <p className="text-xs text-neutral-500">The employee has been registered successfully.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-2 justify-end pt-4 border-t border-neutral-100 mt-6">
          {step < 2 && (
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer"
            >
              Back
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer"
            >
              Next
            </button>
          )}
          {step === 2 && (
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer"
            >
              Create Employee
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </form>
    </Dialog>
  );
}
