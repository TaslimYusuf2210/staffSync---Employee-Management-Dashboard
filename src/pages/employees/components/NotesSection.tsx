import { useState } from 'react';
import type { Employee } from '../../../context/AppContext';

interface NotesSectionProps {
  notes: Employee['notes'];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
}

export function NotesSection({ notes, onAdd, onDelete }: NotesSectionProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Internal Memos</h3>

      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Write feedback note</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Add specific administrative updates or notes..." className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer">Add Note</button>
        </div>
      </form>

      {notes.length === 0 ? (
        <div className="text-center text-neutral-400 text-xs py-6">No notes recorded.</div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="p-4 border border-neutral-200 rounded-2xl flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-800">{note.text}</p>
                <span className="text-[10px] text-neutral-400 font-bold block mt-2">{note.createdDate}</span>
              </div>
              <button onClick={() => onDelete(note.id)} className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all ml-4 shrink-0 cursor-pointer">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
