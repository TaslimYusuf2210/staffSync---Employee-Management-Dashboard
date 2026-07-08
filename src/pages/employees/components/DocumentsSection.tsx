import { useState } from 'react';
import type { Employee, Document } from '../../../types/dashboard/employee';

interface DocumentsSectionProps {
  documents: Employee['documents'];
  onAdd: (doc: { name: string; type: Document['type'] }) => void;
  onDelete: (id: string) => void;
}

export function DocumentsSection({ documents, onAdd, onDelete }: DocumentsSectionProps) {
  const [form, setForm] = useState({ name: '', type: 'Resume' as Document['type'] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    onAdd(form);
    setForm({ name: '', type: 'Resume' });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Documents Roster</h3>

      <form onSubmit={handleSubmit} className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Document File Name</label>
          <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Contract_Signed.pdf" className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
        </div>
        <div className="w-full sm:w-48">
          <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Document Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Document['type'] })} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs">
            <option value="Resume">Resume</option>
            <option value="Employment Letter">Employment Letter</option>
            <option value="Certificates">Certificates</option>
            <option value="Other Documents">Other Documents</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all shrink-0 w-full sm:w-auto cursor-pointer">Upload Mock File</button>
      </form>

      {documents.length === 0 ? (
        <div className="text-center text-neutral-400 text-xs py-6">No documents uploaded.</div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {documents.map((doc) => (
            <div key={doc.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-neutral-900">{doc.name}</h5>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Type: {doc.type} | Uploaded: {doc.uploadDate}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => alert(`Simulating file download/preview for ${doc.name}`)} className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg text-neutral-700 transition-all cursor-pointer">Preview</button>
                <button onClick={() => onDelete(doc.id)} className="px-2 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
