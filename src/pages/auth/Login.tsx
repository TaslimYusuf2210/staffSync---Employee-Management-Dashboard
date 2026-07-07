import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { authApi, ApiError } from '../../services/api';
import workTimeSvg from '../../assets/work_time.svg';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError('');

    try {
      const res = await authApi.login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe ?? false,
      });

      // ✅ Store token + redirect on success
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        // Surface server validation errors to specific fields
        if (err.errors?.email) {
          setError('email', { message: err.errors.email[0] });
        }
        if (err.errors?.password) {
          setError('password', { message: err.errors.password[0] });
        }
        setApiError(err.message || 'Login failed. Please try again.');
      } else {
        setApiError('Network error. Please check your connection and try again.');
      }
    }
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
              src={workTimeSvg}
              alt="Work Time Illustration"
              className="w-full h-auto object-contain animate-fade-in hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="mt-8 text-center hidden md:block">
            <h3 className="font-semibold text-slate-800 text-lg">Optimizing Workspace Dynamics</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
              Manage personnel schedules, tracks, and team metrics effortlessly.
            </p>
          </div>
        </div>

        {/* Right column: Form details */}
        <div className="w-1/2 p-8 md:py-12 md:pr-12 md:pl-20 flex flex-col justify-center">
          <div className="my-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Hello,</h2>
            <h1 className="text-4xl font-extrabold text-indigo-950 tracking-tight mb-8">Welcome back</h1>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl mb-4">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 mr-2"
                  />
                  Remember me
                </label>
                <a href="#forgot" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#faedcd] hover:bg-[#ccd5ae] text-neutral-950 font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Signing in...' : 'Login'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/create-account" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline">
                Click here
              </Link>
            </div>
          </div>

        </div>
    </div>
  );
}
