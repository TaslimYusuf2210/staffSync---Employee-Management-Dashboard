import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '../../context/AppContext';

const companySchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  companyEmail: z.string().email({ message: 'Please enter a valid email address' }),
  companyPhone: z.string().min(6, { message: 'Phone number must be at least 6 characters' }),
  companyAddress: z.string().min(5, { message: 'Address must be at least 5 characters' }),
});

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(6, { message: 'New password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your new password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type CompanyFormValues = z.infer<typeof companySchema>;
type SecurityFormValues = z.infer<typeof securitySchema>;

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [activeSection, setActiveSection] = useState<'company' | 'security'>('company');

  const {
    register: registerCompany,
    handleSubmit: handleSubmitCompany,
    formState: { errors: companyErrors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: settings.company.name,
      companyEmail: settings.company.email,
      companyPhone: settings.company.phoneNumber,
      companyAddress: settings.company.address,
    },
  });

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: securityErrors },
    reset: resetSecurity,
  } = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSaveCompany = (data: CompanyFormValues) => {
    updateSettings({
      company: {
        name: data.companyName,
        email: data.companyEmail,
        phoneNumber: data.companyPhone,
        address: data.companyAddress,
      },
    });
    alert('Company information updated successfully.');
  };

  const onChangePassword = (_data: SecurityFormValues) => {
    alert('Password changed successfully (simulated).');
    resetSecurity();
  };

  const sections = [
    {
      id: 'company' as const,
      label: 'Company Info',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: 'security' as const,
      label: 'Security',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage your company details and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="md:w-56 shrink-0 bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-1 h-fit">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeSection === s.id
                  ? 'bg-[#ccd5ae] text-neutral-950'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">

          {/* COMPANY INFORMATION */}
          {activeSection === 'company' && (
            <form onSubmit={handleSubmitCompany(onSaveCompany)} className="space-y-6">
              <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">
                Company Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    {...registerCompany('companyName')}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {companyErrors.companyName && (
                    <p className="text-red-500 text-[10px] mt-1">{companyErrors.companyName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Company Email
                  </label>
                  <input
                    type="email"
                    {...registerCompany('companyEmail')}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {companyErrors.companyEmail && (
                    <p className="text-red-500 text-[10px] mt-1">{companyErrors.companyEmail.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    {...registerCompany('companyPhone')}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {companyErrors.companyPhone && (
                    <p className="text-red-500 text-[10px] mt-1">{companyErrors.companyPhone.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    {...registerCompany('companyAddress')}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {companyErrors.companyAddress && (
                    <p className="text-red-500 text-[10px] mt-1">{companyErrors.companyAddress.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  Save Company
                </button>
              </div>
            </form>
          )}

          {/* SECURITY */}
          {activeSection === 'security' && (
            <form onSubmit={handleSubmitSecurity(onChangePassword)} className="space-y-6">
              <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">
                Change Password
              </h3>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...registerSecurity('currentPassword')}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {securityErrors.currentPassword && (
                    <p className="text-red-500 text-[10px] mt-1">{securityErrors.currentPassword.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    {...registerSecurity('newPassword')}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {securityErrors.newPassword && (
                    <p className="text-red-500 text-[10px] mt-1">{securityErrors.newPassword.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    {...registerSecurity('confirmPassword')}
                    className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {securityErrors.confirmPassword && (
                    <p className="text-red-500 text-[10px] mt-1">{securityErrors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
