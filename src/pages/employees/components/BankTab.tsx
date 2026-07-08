import { useState } from 'react';
import type { Employee } from '../../../types/dashboard/employee';

interface BankTabProps {
  employee: Employee;
  onSave: (bank: { bankName: string; accountName: string; accountNumber: string }) => void;
}

export function BankTab({ employee, onSave }: BankTabProps) {
  const [editing, setEditing] = useState(false);
  const b = employee.bankAccount;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSave({
      bankName: data.get('bankName') as string,
      accountName: data.get('accountName') as string,
      accountNumber: data.get('accountNumber') as string,
    });
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Bank Details</h3>
          <button onClick={() => setEditing(true)} className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">
            Configure Bank Account
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-neutral-400 font-bold block mb-1">Bank Name</span>
            <p className="font-bold text-neutral-900 text-sm">{b.bankName || 'Not configured'}</p>
          </div>
          <div>
            <span className="text-neutral-400 font-bold block mb-1">Account Name</span>
            <p className="font-bold text-neutral-900 text-sm">{b.accountName || 'Not configured'}</p>
          </div>
          <div>
            <span className="text-neutral-400 font-bold block mb-1">Account Number</span>
            <p className="font-bold text-neutral-900 text-sm">{b.accountNumber || 'Not configured'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Configure Bank Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['bankName', 'accountName', 'accountNumber'] as const).map((field) => (
          <div key={field}>
            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              {field === 'bankName' ? 'Bank Name' : field === 'accountName' ? 'Account Name' : 'Account Number'}
            </label>
            <input type="text" name={field} defaultValue={b[field]} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={() => setEditing(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
        <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
      </div>
    </form>
  );
}
