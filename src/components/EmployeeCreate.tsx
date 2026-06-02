import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

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

export default function EmployeeCreate() {
  const { departments, addEmployee } = useApp();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = (data: EmployeeFormValues) => {
    // Add employee to context and navigate to details
    const newId = addEmployee({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      department: data.department,
      position: data.position,
      employmentType: data.employmentType,
      hireDate: data.hireDate,
      status: data.status,
    });
    navigate(`/employees/${newId}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Add New Employee</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Register new team member. Additional details can be completed on profile page later.</p>
      </div>

      {/* FORM WRAPPER */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
        
        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 pb-2">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* First Name */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">First Name</label>
              <input
                type="text"
                {...register('firstName')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Last Name</label>
              <input
                type="text"
                {...register('lastName')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Phone Number</label>
              <input
                type="text"
                {...register('phoneNumber')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Gender</label>
              <select
                {...register('gender')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>

          </div>
        </div>

        {/* Employment details */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 pb-2">Employment Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Department */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Department</label>
              <select
                {...register('department')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
            </div>

            {/* Position */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Position / Job Title</label>
              <input
                type="text"
                {...register('position')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              />
              {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
            </div>

            {/* Employment Type */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Employment Type</label>
              <select
                {...register('employmentType')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType.message}</p>}
            </div>

            {/* Hire Date */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Hire Date</label>
              <input
                type="date"
                {...register('hireDate')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              />
              {errors.hireDate && <p className="text-red-500 text-xs mt-1">{errors.hireDate.message}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 block mb-1">Employment Status</label>
              <select
                {...register('status')}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Probation">Probation</option>
                <option value="Resigned">Resigned</option>
                <option value="Terminated">Terminated</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => navigate('/employees')}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Registering...' : 'Create Employee'}
          </button>
        </div>

      </form>

    </div>
  );
}
