import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import hrRepSvg from '../../assets/hr_rep.svg';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../services/auth';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';

const registerSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(1, { message: 'Please enter your address' }),
  description: z.string().min(1, { message: 'Please select a company description / type' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string().min(6, { message: 'Password confirmation must be at least 6 characters long' }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      email: '',
      phoneNumber: '',
      address: '',
      description: '',
      password: '',
      confirmPassword: '',
      agreeTerms: true,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError('');

    const payload = {
      companyName: data.companyName,
      email: data.email,
      phone: data.phoneNumber,
      address: data.address,
      description: data.description,
      password: data.password,
      agreeTerms: data.agreeTerms,
    };

    console.log(payload);
  };

  return (
    <div className="flex h-screen">

      {/* Left column: SVG Illustration */}
      <div className="w-1/2 bg-indigo-50/50 p-8 md:pr-16 flex flex-col items-center justify-center relative overflow-hidden border-r border-slate-100">
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
        <div className="w-1/2 p-8 md:py-16 md:pr-12 md:pl-20 flex flex-col overflow-y-auto">
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Join us,</h2>
            <h1 className="text-4xl font-extrabold text-indigo-950 tracking-tight mb-8">Create account</h1>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl mb-4">
                {apiError}
              </div>
            )}

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

              {/* Email Field */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  placeholder=""
                  {...register('email')}
                  className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
                    errors.email
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-indigo-600'
                  }`}
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600"
                >
                  Email Address
                </label>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="relative group">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="e.g. 08012345678"
                  {...register('phoneNumber')}
                  className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                    errors.phoneNumber
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-indigo-600'
                  }`}
                />
                <label
                  htmlFor="phoneNumber"
                  className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600"
                >
                  Phone Number
                </label>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Address Field */}
              <div className="relative group">
                <input
                  type="text"
                  id="address"
                  placeholder="e.g. 123 Main Street, City, Country"
                  {...register('address')}
                  className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200 ${
                    errors.address
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-indigo-600'
                  }`}
                />
                <label
                  htmlFor="address"
                  className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600"
                >
                  Address
                </label>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.address.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="relative group">
                <select
                  id="description"
                  {...register('description')}
                  className={`w-full py-3 px-4 border-b-2 text-slate-800 focus:outline-none transition-all duration-200 bg-transparent cursor-pointer ${
                    errors.description
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-indigo-600'
                  }`}
                >
                  <option value="" disabled hidden>Select Company Description</option>
                  <option value="Corporate Headquarters">Corporate Headquarters</option>
                  <option value="Branch Office">Branch Office</option>
                  <option value="Regional Office">Regional Office</option>
                  <option value="Startup">Startup</option>
                  <option value="Small & Medium Enterprise (SME)">Small & Medium Enterprise (SME)</option>
                  <option value="Large Enterprise">Large Enterprise</option>
                  <option value="Multinational Company">Multinational Company</option>
                  <option value="Government Agency">Government Agency</option>
                  <option value="Non-Profit Organization">Non-Profit Organization</option>
                  <option value="Educational Institution">Educational Institution</option>
                  <option value="Healthcare Facility">Healthcare Facility</option>
                  <option value="Remote / Distributed Team">Remote / Distributed Team</option>
                  <option value="Agency / Consulting Firm">Agency / Consulting Firm</option>
                  <option value="Manufacturing Plant">Manufacturing Plant</option>
                  <option value="Retail Chain">Retail Chain</option>
                  <option value="Other">Other</option>
                </select>
                <label
                  htmlFor="description"
                  className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200"
                >
                  Description / Organization Type
                </label>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>
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

              {/* Confirm Password Field */}
              <div className="relative group">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder=""
                  {...register('confirmPassword')}
                  className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
                    errors.confirmPassword
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-slate-200 focus:border-indigo-600'
                  }`}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600"
                >
                  Confirm Password
                </label>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>
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

        </div>
    </div>
  );
}
