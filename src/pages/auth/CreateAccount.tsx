import { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import hrRepSvg from '../../assets/hr_rep.svg';
import { useMutation } from '@tanstack/react-query';
import { registerAccount } from '../../services/auth';
import { toast } from 'sonner';

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

const STEPS = [
  { label: 'Email', fields: ['email'] as const },
  { label: 'Company', fields: ['companyName', 'description', 'phoneNumber', 'address'] as const },
  { label: 'Password', fields: ['password', 'confirmPassword'] as const },
  { label: 'Review', fields: ['agreeTerms'] as const },
  { label: 'Success', fields: [] as const },
];

const stepMessages = [
  { heading: 'Start your journey', subtext: 'Enter your email to begin creating your StaffSync account.' },
  { heading: 'About your company', subtext: 'Tell us about your organization so we can tailor the experience.' },
  { heading: 'Secure your account', subtext: 'Create a strong password to protect your account.' },
  { heading: 'Almost there!', subtext: 'Review your information and agree to the terms to complete registration.' },
  { heading: 'Welcome aboard!', subtext: 'Your account has been created successfully.' },
];

// ─── Stepper ─────────────────────────────────────────────────────────

function Stepper({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: {
  steps: typeof STEPS;
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => {
        const isCompleted = completedSteps.has(i) || i < currentStep;
        const isCurrent = i === currentStep;
        const isClickable = i <= currentStep || completedSteps.has(i - 1);
        if (i === steps.length - 1) return null; // hide success from stepper

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-[#ccd5ae] text-neutral-950 cursor-pointer hover:bg-[#faedcd]'
                    : isCurrent
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isCompleted && i < currentStep ? '✓' : i + 1}
              </button>
              <span
                className={`text-[10px] mt-1 font-medium ${
                  isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 2 && (
              <div
                className={`w-8 md:w-12 h-0.5 mx-1 md:mx-2 ${
                  i < currentStep ? 'bg-[#ccd5ae]' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Email ───────────────────────────────────────────────────

function EmailStep() {
  const { register, formState: { errors } } = useFormContext<RegisterFormValues>();
  return (
    <div className="relative group">
      <input
        type="email"
        id="email"
        placeholder=""
        {...register('email')}
        className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
          errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
        }`}
      />
      <label htmlFor="email" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
        Email Address
      </label>
      {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
    </div>
  );
}

// ─── Step 2: Company Information ─────────────────────────────────────

function CompanyInfoStep() {
  const { register, formState: { errors } } = useFormContext<RegisterFormValues>();
  return (
    <div className="space-y-6">
      <div className="relative group">
        <input type="text" id="companyName" placeholder="" {...register('companyName')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-transparent focus:outline-none transition-all duration-200 ${
            errors.companyName ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="companyName" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Company Name
        </label>
        {errors.companyName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.companyName.message}</p>}
      </div>
      <div className="relative group">
        <select id="description" {...register('description')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 focus:outline-none transition-all duration-200 bg-transparent cursor-pointer ${
            errors.description ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
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
        <label htmlFor="description" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200">
          Description / Organization Type
        </label>
        {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>}
      </div>
      <div className="relative group">
        <input type="tel" id="phoneNumber" placeholder="e.g. 08012345678" {...register('phoneNumber')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200 ${
            errors.phoneNumber ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="phoneNumber" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Phone Number
        </label>
        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phoneNumber.message}</p>}
      </div>
      <div className="relative group">
        <input type="text" id="address" placeholder="e.g. 123 Main Street, City, Country" {...register('address')}
          className={`w-full py-3 px-4 border-b-2 text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200 ${
            errors.address ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600'
          }`}
        />
        <label htmlFor="address" className="absolute left-4 -top-2.5 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600">
          Address
        </label>
        {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address.message}</p>}
      </div>
    </div>
  );
}

// ─── Step 3: Password ────────────────────────────────────────────────

function PasswordStep() {
  const { register, formState: { errors } } = useFormContext<RegisterFormValues>();
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

// ─── Step 4: Review & Agreement ──────────────────────────────────────

function ReviewStep() {
  const { getValues, register, formState: { errors } } = useFormContext<RegisterFormValues>();
  const data = getValues();
  return (
    <div className="space-y-5">
      <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
        <div>
          <span className="text-slate-400 text-xs font-medium">EMAIL</span>
          <p className="text-slate-800 font-medium">{data.email}</p>
        </div>
        <div className="border-t border-slate-200 pt-3">
          <span className="text-slate-400 text-xs font-medium">COMPANY</span>
          <p className="text-slate-800 font-medium">{data.companyName}</p>
          <p className="text-slate-500 text-xs">{data.description}</p>
          <p className="text-slate-500 text-xs mt-1">{data.phoneNumber}</p>
          <p className="text-slate-500 text-xs">{data.address}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label className="flex items-center text-slate-600 font-medium cursor-pointer">
          <input type="checkbox" {...register('agreeTerms')}
            className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 mr-2"
          />
          I agree to the Terms & Conditions
        </label>
        {errors.agreeTerms && <p className="text-red-500 text-xs font-medium">{errors.agreeTerms.message}</p>}
      </div>
    </div>
  );
}

// ─── Step 5: Success ─────────────────────────────────────────────────

function SuccessStep() {
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

// ─── Main Component ──────────────────────────────────────────────────

export default function CreateAccount() {
  const [apiError, setApiError] = useState('');
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: registerAccount,
    onSuccess: () => {
      toast.success('Account created successfully! Please check your email for verification.');
      setStep(4);
      setCompletedSteps((prev) => new Set(prev).add(3));
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
      setApiError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const methods = useForm<RegisterFormValues>({
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

  const isLastStep = step === 3;
  const isSuccessStep = step === 4;

  const handleStepClick = (targetStep: number) => {
    if (targetStep <= step || completedSteps.has(targetStep - 1)) {
      setStep(targetStep);
    }
  };

  const handleNext = async () => {
    const fields = STEPS[step].fields as string[];
    const isValid = await methods.trigger(fields as any);
    if (!isValid) return;

    const newCompleted = new Set(completedSteps).add(step);
    setCompletedSteps(newCompleted);

    if (step === 3) {
      const data = methods.getValues();
      const payload = {
        companyName: data.companyName,
        email: data.email,
        phone: data.phoneNumber,
        address: data.address,
        description: data.description,
        password: data.password,
        agreeTerms: data.agreeTerms,
      };
      try {
        await registerUser(payload);
      } catch {
        // handled by mutation onError
      }
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  return (
    <div className="flex h-screen">
      {/* Left column: SVG Illustration */}
      <div className="w-1/2 bg-indigo-50/50 p-8 md:pr-16 flex flex-col items-center justify-center relative overflow-hidden border-r border-slate-100">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#faedcd] flex items-center justify-center text-neutral-950 font-bold text-lg">S</div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">StaffSync</span>
        </div>
        <div className="w-full max-w-sm aspect-square flex items-center justify-center mt-8">
          <img src={hrRepSvg} alt="HR Representative Illustration"
            className="w-full h-auto object-contain animate-fade-in hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="mt-8 text-center hidden md:block">
          <h3 className="font-semibold text-slate-800 text-lg">{stepMessages[step].heading}</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">{stepMessages[step].subtext}</p>
        </div>
      </div>

      {/* Right column: Form */}
      <div className="w-1/2 p-8 md:py-16 md:pr-12 md:pl-20 flex flex-col overflow-y-auto">
        <div className="flex-1">
          {!isSuccessStep && (
            <>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Join us,</h2>
              <h1 className="text-4xl font-extrabold text-indigo-950 tracking-tight mb-8">Create account</h1>
            </>
          )}

          {!isSuccessStep && (
            <Stepper steps={STEPS} currentStep={step} completedSteps={completedSteps} onStepClick={handleStepClick} />
          )}

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl mb-4">{apiError}</div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {step === 0 && <EmailStep />}
              {step === 1 && <CompanyInfoStep />}
              {step === 2 && <PasswordStep />}
              {step === 3 && <ReviewStep />}
              {step === 4 && <SuccessStep />}

              {!isSuccessStep && (
                <div className="flex items-center justify-between pt-2">
                  <button type="button" onClick={handleBack} disabled={step === 0}
                    className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Back
                  </button>
                  <button type="button" onClick={handleNext}
                    className="px-6 py-2.5 bg-[#faedcd] hover:bg-[#ccd5ae] text-neutral-950 font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50"
                  >
                    {isLastStep ? 'Create Account' : 'Next →'}
                  </button>
                </div>
              )}
            </form>
          </FormProvider>

          {!isSuccessStep && (
            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline">Click here</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
