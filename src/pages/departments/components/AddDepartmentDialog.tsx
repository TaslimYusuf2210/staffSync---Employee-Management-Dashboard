import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../../../context/AppContext';
import { useState } from 'react';
import { Dialog } from '../../../components/ui/dialog';
import { useGetEmployees } from '../../../hooks/useQuery/useGetEmployees';

const addSchema = z.object({
  name: z.string().min(2, { message: 'Department name must be at least 2 characters' }),
  description: z.string().min(1, { message: 'Description is required' }),
  head: z.string().min(1, { message: 'Department head is required' }),
});

type AddFormValues = z.infer<typeof addSchema>;

interface AddDepartmentDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddDepartmentDialog({ open, onClose }: AddDepartmentDialogProps) {
  const { addDepartment } = useApp();
  const [headSearch, setHeadSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: employeesData, isLoading: isSearching } = useGetEmployees(
    headSearch.length > 0 ? { search: headSearch, limit: 10 } : undefined
  );
  const employeeList = employeesData?.data?.employees ?? [];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddFormValues>({
    resolver: zodResolver(addSchema),
    defaultValues: { name: '', description: '', head: '' },
  });

  const selectEmployee = (name: string) => {
    setValue('head', name);
    setHeadSearch('');
    setShowDropdown(false);
  };

  const onSubmit = (data: AddFormValues) => {
    addDepartment({ name: data.name, description: data.description, head: data.head || 'Not assigned', employeeCount: 0 });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    setHeadSearch('');
    setShowDropdown(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
          Create Department
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Department Name</label>
            <input type="text" {...register('name')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Department Head / Manager</label>
            <div className="relative">
              <input
              placeholder="Search employee..."
              type="text"
              {...register('head', {
                onChange: (e) => {
                  setHeadSearch(e.target.value);
                  setShowDropdown(true);
                },
              })}
              onFocus={() => headSearch && setShowDropdown(true)}
              className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
              {errors.head && <p className="text-red-500 text-[10px] mt-1">{errors.head.message}</p>}

              {showDropdown && headSearch.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-3 text-xs text-neutral-400 text-center">Searching...</div>
                  ) : employeeList.length === 0 ? (
                    <div className="p-3 text-xs text-neutral-400 text-center">No employees found</div>
                  ) : (
                    employeeList.map((emp) => (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => selectEmployee(`${emp.firstName} ${emp.lastName}`)}
                        className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-xs transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-neutral-900">{emp.firstName} {emp.lastName}</span>
                        <span className="block text-[10px] text-neutral-400">{emp.department} &middot; {emp.position}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Description</label>
            <input type="text" {...register('description')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description.message}</p>}
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <button type="button" onClick={handleClose} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
          <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Create Department</button>
        </div>
      </form>
    </Dialog>
  );
}
