import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues } from '../../schemas/registerSchema';

export function SuccessStep() {
  const { getValues } = useFormContext<RegisterFormValues>();
  const data = getValues();
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#ccd5ae] flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Welcome, {data.companyName}!</h2>
      <p className="text-slate-500 text-sm max-w-xs">
        Your account has been created. We've sent a verification email to{' '}
        <span className="font-semibold text-slate-700">{data.email}</span>.
      </p>
      <div className="mt-4 bg-slate-50 rounded-xl p-3 text-left text-sm w-full max-w-xs">
        <p className="text-slate-400 text-xs font-medium">COMPANY ADDRESS</p>
        <p className="text-slate-800 font-medium">{data.address}</p>
      </div>
    </div>
  );
}
