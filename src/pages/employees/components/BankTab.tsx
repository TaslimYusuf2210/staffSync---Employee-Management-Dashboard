import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '../../../components/ui/dialog';
import type { Employee } from '../../../types/dashboard/employee';

interface BankTabProps {
  employee: Employee;
  onSave: (bank: { bankName: string; accountName: string; accountNumber: string }) => void;
}

const bankSchema = z.object({
  bankName: z.string().min(1, { message: 'Bank name is required' }),
  accountName: z.string().min(1, { message: 'Account name is required' }),
  accountNumber: z.string().min(1, { message: 'Account number is required' }),
});

type BankFormValues = z.infer<typeof bankSchema>;

export function BankTab({ employee, onSave }: BankTabProps) {
  const [showDialog, setShowDialog] = useState(false);
  const b = employee.bankAccount ?? { bankName: '', accountName: '', accountNumber: '' };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankFormValues>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      bankName: b.bankName,
      accountName: b.accountName,
      accountNumber: b.accountNumber,
    },
  });

  const onSubmit = (data: BankFormValues) => {
    onSave(data);
    setShowDialog(false);
  };

  return (
    <>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Configure Bank Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['bankName', 'accountName', 'accountNumber'] as const).map((field) => (
              <div key={field}>
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  {field === 'bankName' ? 'Bank Name' : field === 'accountName' ? 'Account Name' : 'Account Number'}
                </label>
                <input type="text" {...register(field)} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
                {errors[field] && <p className="text-red-500 text-[10px] mt-1">{errors[field]?.message}</p>}
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setShowDialog(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
          </div>
        </form>
      </Dialog>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Bank Details</h3>
          <button onClick={() => { reset(); setShowDialog(true); }} className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">
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
    </>
  );
}
