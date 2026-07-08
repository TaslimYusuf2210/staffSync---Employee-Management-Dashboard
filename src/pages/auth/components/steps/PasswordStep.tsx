import { useFormContext } from 'react-hook-form';
import type { RegisterFormValues } from '../../schemas/registerSchema';
import { PasswordStrength } from '../PasswordStrength';

export function PasswordStep() {
  const { register, formState: { errors }, watch } = useFormContext<RegisterFormValues>();
  const passwordValue = watch('password') ?? '';
  return (
    <div className="space-y-6">
      <div className="relative group">
        <input type="password" id="password" placeholder="" {...register('password')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
            errors.password ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="password" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Password
        </label>
        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
        <PasswordStrength value={passwordValue} />
      </div>
      <div className="relative group">
        <input type="password" id="confirmPassword" placeholder="" {...register('confirmPassword')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
            errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="confirmPassword" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Confirm Password
        </label>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>}
      </div>
    </div>
  );
}
