import { useState } from 'react';
import { Dialog } from '../../../components/ui/dialog';
import type { Employee, Document } from '../../../types/dashboard/employee';

interface DocumentsSectionProps {
  documents: Employee['documents'];
  
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Resume' as Document['type'] });
  const documentsList = documents ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    setForm({ name: '', type: 'Resume' });
    setShowDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Documents Roster</h3>
        <button onClick={() => setShowDialog(true)} className="px-3 py-1.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Document
        </button>
      </div>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Upload Document</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Document File Name</label>
              <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Contract_Signed.pdf" className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Document Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Document['type'] })} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]">
                <option value="Resume">Resume</option>
                <option value="Employment Letter">Employment Letter</option>
                <option value="Certificates">Certificates</option>
                <option value="Other Documents">Other Documents</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setShowDialog(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer">Upload</button>
          </div>
        </form>
      </Dialog>

      {documentsList.length === 0 ? (
        <div className="text-center text-neutral-400 text-xs py-6">No documents uploaded.</div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {documentsList.map((doc) => (
            <div key={doc.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-neutral-900">{doc.name}</h5>
                <span className="text-[10px] text-neutral-400 block mt-0.5">Type: {doc.type} | Uploaded: {doc.uploadDate}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => alert(`Simulating file download/preview for ${doc.name}`)} className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg text-neutral-700 transition-all cursor-pointer">Preview</button>
                <button className="px-2 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
