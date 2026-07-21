import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '../../../components/ui/dialog';
import type { Employee, Education } from '../../../types/dashboard/employee';

interface EducationSectionProps {
  education: Employee['education'];
}

const educationSchema = z.object({
  institutionName: z.string().min(1, { message: 'Institution name is required' }),
  degree: z.string().min(1, { message: 'Degree is required' }),
  qualification: z.string().min(1, { message: 'Qualification is required' }),
  fieldOfStudy: z.string().min(1, { message: 'Field of study is required' }),
  graduationYear: z.string().min(1, { message: 'Graduation year is required' }),
});

type EducationFormValues = z.infer<typeof educationSchema>;

export function EducationSection({ education }: EducationSectionProps) {
  const [showDialog, setShowDialog] = useState(false);
  const educationList = education ?? [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institutionName: '', degree: '', qualification: '', fieldOfStudy: '', graduationYear: '',
    },
  });

  const onSubmit = (data: EducationFormValues) => {
    reset();
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Education History</h3>
        <button onClick={() => setShowDialog(true)} className="px-3 py-1.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Education
        </button>
      </div>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Add Education Record</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {(['institutionName', 'degree', 'qualification', 'fieldOfStudy', 'graduationYear'] as const).map((f) => (
              <div key={f}>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  {f === 'institutionName' ? 'Institution Name' : f === 'graduationYear' ? 'Graduation Year' : f.charAt(0).toUpperCase() + f.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input type="text" {...register(f)} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors[f] && <p className="text-red-500 text-[10px] mt-1">{errors[f]?.message}</p>}
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setShowDialog(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer">Save Record</button>
          </div>
        </form>
      </Dialog>

      {educationList.length === 0 ? renderEmptyState() : renderRecords()}
    </div>
  );

  function renderEmptyState() {
    const fields = [
      { label: 'Institution Name' },
      { label: 'Degree' },
      { label: 'Qualification' },
      { label: 'Field of Study' },
      { label: 'Graduation Year' },
    ];

    return (
      <div className="border border-dashed border-neutral-200 rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {fields.map((f) => (
            <div key={f.label}>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">{f.label}</span>
              <p className="text-sm text-neutral-300 italic">Not assigned yet</p>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-dashed border-neutral-200 text-center">
          <p className="text-xs text-neutral-400">No education records yet.</p>
          <button
            onClick={() => setShowDialog(true)}
            className="mt-2 px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Education Record
          </button>
        </div>
      </div>
    );
  }

  function renderRecords() {
    return (
      <div className="space-y-4">
        {educationList.map((edu) => (
          <div key={edu.id} className="p-4 border border-neutral-200 rounded-2xl flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-neutral-900 text-sm">
                {edu.degree} &bull; <span className="font-medium text-xs text-neutral-500">{edu.qualification}</span>
              </h4>
              <p className="text-xs text-neutral-600 mt-1">{edu.institutionName}</p>
              <span className="text-[10px] text-neutral-400 font-bold block mt-1">
                Field: {edu.fieldOfStudy} | Class of {edu.graduationYear}
              </span>
            </div>
            <button className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer">Delete</button>
          </div>
        ))}
      </div>
    );
  }
}
