import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../../../context/AppContext';
import { Dialog } from '../../../components/ui/dialog';
import type { Department } from '../../../types/dashboard/department';

const editSchema = z.object({
  name: z.string().min(2, { message: 'Department name must be at least 2 characters' }),
  description: z.string().min(1, { message: 'Description is required' }),
  head: z.string().min(1, { message: 'Department head is required' }),
});

type EditFormValues = z.infer<typeof editSchema>;

interface EditDepartmentDialogProps {
  department: Department | null;
  onClose: () => void;
}

export function EditDepartmentDialog({ department, onClose }: EditDepartmentDialogProps) {
  const { updateDepartment } = useApp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: { name: '', description: '', head: '' },
  });

  useEffect(() => {
    if (department) {
      reset({ name: department.name, description: department.description, head: department.head });
    }
  }, [department, reset]);

  const onSubmit = (data: EditFormValues) => {
    if (!department) return;
    updateDepartment(department.id, { name: data.name, description: data.description, head: data.head || 'Not assigned' });
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={!!department} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
          Edit Department: {department?.name}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Department Name</label>
            <input type="text" {...register('name')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Department Head / Manager</label>
            <input type="text" {...register('head')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            {errors.head && <p className="text-red-500 text-[10px] mt-1">{errors.head.message}</p>}
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Description</label>
            <input type="text" {...register('description')} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description.message}</p>}
          </div>
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <button type="button" onClick={handleClose} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
          <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
        </div>
      </form>
    </Dialog>
  );
}
