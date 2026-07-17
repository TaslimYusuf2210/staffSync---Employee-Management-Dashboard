import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../../../context/AppContext';
import { Dialog } from '../../../components/ui/dialog';
import { useGetEmployees } from '../../../hooks/useQuery/useGetEmployees';
import {useGetDepartmentPositions} from '../../../hooks/useQuery/useGetDepartmentPositions';
import type { Department, DepartmentPosition } from '../../../types/dashboard/department';
import { useCreateDepartmentPositions } from '../../../hooks/useMutation/useCreateDepartmentPositions';

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
  const { mutateAsync: createPositions } = useCreateDepartmentPositions(department?.id ?? '', {
    onSuccess: () => {
      // Optionally, you can add any additional logic after successfully creating positions
    },
  });
  const { updateDepartment } = useApp();

  const [positions, setPositions] = useState<DepartmentPosition[]>(department?.positions ?? []);
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [newPositionTitle, setNewPositionTitle] = useState('');
  const [newPositionDescription, setNewPositionDescription] = useState('');
  const [headSearch, setHeadSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: employeesData, isLoading: isSearching } = useGetEmployees(
    headSearch.length > 0 ? { search: headSearch, limit: 10 } : undefined
  );
  const { data: positionsData } = useGetDepartmentPositions(department?.id);
  const employeeList = employeesData?.data?.employees ?? [];
  const positionsList = positionsData?.data?.positions ?? [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: { name: '', description: '', head: '' },
  });

  const selectEmployee = (name: string) => {
    setValue('head', name);
    setHeadSearch('');
    setShowDropdown(false);
  };

  useEffect(() => {
    if (department) {
      reset({ name: department.name, description: department.description, head: department.head });
      setPositions(department.positions ?? []);
    }
  }, [department, reset]);

  const handleAddPosition = async () => {
    const payload = { title: newPositionTitle, description: newPositionDescription };
      await createPositions(payload);
      setNewPositionTitle('');
      setNewPositionDescription('');
      setShowAddPosition(false);
    
  };

  const handleRemovePosition = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const onSubmit = (data: EditFormValues) => {
    if (!department) return;
    updateDepartment(department.id, {
      name: data.name,
      description: data.description,
      head: data.head || 'Not assigned',
      positions,
    });
    onClose();
  };

  const handleClose = () => {
    reset();
    setPositions(department?.positions ?? []);
    setShowAddPosition(false);
    setNewPositionTitle('');
    setNewPositionDescription('');
    setHeadSearch('');
    setShowDropdown(false);
    onClose();
  };

  return (
    <Dialog open={!!department} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100 shrink-0">
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
                className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
              />
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

        {/* ─── Positions Section ───────────────────────────────────── */}
        <div className="border-t border-neutral-100 pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Positions</span>
            <button
              type="button"
              onClick={() => setShowAddPosition(true)}
              className="text-[10px] font-bold text-[#ccd5ae] hover:text-[#faedcd] transition-colors cursor-pointer"
            >
              + Add Position
            </button>
          </div>

          { positionsList.length === 0 && !showAddPosition && (
            <p className="text-[11px] text-neutral-400 italic">No positions defined yet.</p>
          )}

          <div className="space-y-1.5">
            {positionsList.map((pos) => (
              <div key={pos.id} className="flex items-center justify-between bg-neutral-50 rounded-xl px-3 py-2">
                <div>
                  <p className="text-xs font-bold text-neutral-900">{pos.title}</p>
                  {pos.description && (
                    <p className="text-[10px] text-neutral-400">{pos.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePosition(pos.id)}
                  className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer shrink-0 ml-2"
                  title="Remove position"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {showAddPosition && (
            <div className="mt-3 bg-neutral-50 rounded-xl p-3 space-y-2 border border-neutral-200">
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Title</label>
                <input
                  type="text"
                  value={newPositionTitle}
                  onChange={(e) => setNewPositionTitle(e.target.value)}
                  placeholder="e.g. Senior Designer"
                  className="w-full py-1.5 px-2.5 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-[#ccd5ae]"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Description (optional)</label>
                <input
                  type="text"
                  value={newPositionDescription}
                  onChange={(e) => setNewPositionDescription(e.target.value)}
                  placeholder="e.g. Leads the design team"
                  className="w-full py-1.5 px-2.5 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-[#ccd5ae]"
                />
              </div>
              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPosition(false);
                    setNewPositionTitle('');
                    setNewPositionDescription('');
                  }}
                  className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddPosition}
                  className="px-2.5 py-1.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-[10px] font-bold rounded-lg cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end pt-2 border-t border-neutral-100">
          <button type="button" onClick={handleClose} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
          <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
        </div>
      </form>
    </Dialog>
  );
}
