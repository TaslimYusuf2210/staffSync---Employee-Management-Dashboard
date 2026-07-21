import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '../../../components/ui/dialog';
import type { Employee } from '../../../types/dashboard/employee';

interface NotesSectionProps {
  notes: Employee['notes'];
}

const noteSchema = z.object({
  noteText: z.string().min(1, { message: 'Note cannot be empty' }),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export function NotesSection({ notes }: NotesSectionProps) {
  const [showDialog, setShowDialog] = useState(false);
  const notesList = notes ?? [];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { noteText: '' },
  });

  const onSubmit = (data: NoteFormValues) => {
    reset();
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Internal Memos</h3>
        <button onClick={() => setShowDialog(true)} className="px-3 py-1.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Note
        </button>
      </div>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Write Feedback Note</h3>
          <div>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Note</label>
            <textarea {...register('noteText')} rows={4} placeholder="Add specific administrative updates or notes..." className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            {errors.noteText && <p className="text-red-500 text-[10px]">{errors.noteText.message}</p>}
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setShowDialog(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer">Add Note</button>
          </div>
        </form>
      </Dialog>

      {notesList.length === 0 ? (
        <div className="text-center text-neutral-400 text-xs py-6">No notes recorded.</div>
      ) : (
        <div className="space-y-4">
          {notesList.map((note) => (
            <div key={note.id} className="p-4 border border-neutral-200 rounded-2xl flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-800">{note.text}</p>
                <span className="text-[10px] text-neutral-400 font-bold block mt-2">{note.createdDate}</span>
              </div>
              <button className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all ml-4 shrink-0 cursor-pointer">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
