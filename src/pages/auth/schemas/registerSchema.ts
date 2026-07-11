import { z } from 'zod';

export const registerSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  otp: z.string().length(6, { message: 'OTP must be exactly 6 digits' }).regex(/^\d{6}$/, { message: 'OTP must be a 6-digit code' }),
  phoneNumber: z.string()
    .length(11, { message: 'Phone number must be exactly 11 digits' })
    .regex(/^(?:\+234|234|0)(?:70[1-9]|80[2-9]|81[0-8]|90[1-9]|91[1-356]|702[5-9])\d{7}$/, { message: 'Please enter a valid Nigerian phone number' }),
  address: z.string().min(1, { message: 'Please enter your address' }),
  description: z.string().min(1, { message: 'Please select a company description / type' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
  confirmPassword: z.string().min(1, { message: 'Password confirmation is required' }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const STEPS = [
  { label: 'Email', fields: ['email'] as const },
  { label: 'OTP', fields: ['otp'] as const },
  { label: 'Company', fields: ['companyName', 'description', 'phoneNumber', 'address'] as const },
  { label: 'Password', fields: ['password', 'confirmPassword'] as const },
  { label: 'Review', fields: ['agreeTerms'] as const },
  { label: 'Success', fields: [] as const },
];

export const stepMessages = [
  { heading: 'Start your journey', subtext: 'Enter your email to begin creating your StaffSync account.' },
  { heading: 'Verify your email', subtext: 'Enter the 6-digit code sent to your email address.' },
  { heading: 'About your company', subtext: 'Tell us about your organization so we can tailor the experience.' },
  { heading: 'Secure your account', subtext: 'Create a strong password to protect your account.' },
  { heading: 'Almost there!', subtext: 'Review your information and agree to the terms to complete registration.' },
  { heading: 'Welcome aboard!', subtext: 'Your account has been created successfully.' },
];
