import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import hrRepSvg from '../assets/hr_rep.svg';

const registerSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters long' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      password: '',
      agreeTerms: true,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // Simulated registration
    console.log('Registration Submitted:', data);
    alert(`Account created successfully for company: ${data.companyName}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      {/* Centered Premium Container */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[580px] transition-all duration-300">

        {/* Left column: SVG Illustration */}
        <div className="w-full md:w-1/2 bg-indigo-50/50 p-8 md:pr-16 flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#faedcd] flex items-center justify-center text-neutral-950 font-bold text-lg">
              S
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">StaffSync</span>
          </div>

          <div className="w-full max-w-sm aspect-square flex items-center justify-center mt-8">
            <img
              src={hrRepSvg}
              alt="HR Representative Illustration"
              className="w-full h-auto object-contain animate-fade-in hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="mt-8 text-center hidden md:block">
            <h3 className="font-semibold text-slate-800 text-lg">Empowering HR Teams</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
              Scale your organizational operations and streamline employee management.
            </p>
          </div>
        </div>

        {/* Right column: Form details */}
        <div className="w-full md:w-1/2 p-8 md:py-12 md:pr-12 md:pl-20 flex flex-col justify-between">
          <div className="my-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Join us,</h2>
            <h1 className="text-4xl font-extrabold text-indigo-950 tracking-tight mb-8">Create account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Name Field */}
              <div className="relative group">
                <input
                  type="text"
                  id="companyName"
                  placeholder=""
                  {...register('companyName')}
                  className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
                    errors.companyName
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-indigo-600'
                  }`}
                />
                <label
                  htmlFor="companyName"
                  className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600"
                >
                  Company Name
                </label>
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.companyName.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  placeholder=""
                  {...register('password')}
                  className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
                    errors.password
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-indigo-600'
                  }`}
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600"
                >
                  Password
                </label>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex flex-col gap-1 text-sm">
                <label className="flex items-center text-slate-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('agreeTerms')}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 mr-2"
                  />
                  I agree to the Terms & Conditions
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-xs font-medium">{errors.agreeTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#faedcd] hover:bg-[#ccd5ae] text-neutral-950 font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline">
                Click here
              </Link>
            </div>
          </div>

          {/* Social download buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-100">
            <a
              href="#appstore"
              className="flex items-center gap-2 px-4 py-2 bg-[#ccd5ae] hover:bg-[#e9edc9] text-neutral-950 rounded-lg transition-colors text-xs font-semibold"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
              </svg>
              App Store
            </a>
            <a
              href="#playstore"
              className="flex items-center gap-2 px-4 py-2 bg-[#ccd5ae] hover:bg-[#e9edc9] text-neutral-950 rounded-lg transition-colors text-xs font-semibold"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.5,12.16L17.87,13L16.55,12L17.87,11.33M3,3C2.83,3 2.68,3.04 2.54,3.12L15.9,11.34L17.87,10.35L3.44,3.12C3.3,3.04 3.15,3 3,3M3,21C3.15,21 3.3,20.96 3.44,20.88L17.87,13.65L15.9,12.66L2.54,20.88C2.68,20.96 2.83,21 3,21Z" />
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
