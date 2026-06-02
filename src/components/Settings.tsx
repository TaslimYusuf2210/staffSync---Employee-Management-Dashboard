import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Settings as SettingsType } from '../context/AppContext';

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [activeSection, setActiveSection] = useState<'admin' | 'company' | 'appearance' | 'security'>('admin');

  // Admin Profile form state
  const [adminName, setAdminName] = useState(settings.admin.name);
  const [adminEmail, setAdminEmail] = useState(settings.admin.email);

  // Company Info form state
  const [companyName, setCompanyName] = useState(settings.company.name);
  const [companyEmail, setCompanyEmail] = useState(settings.company.email);
  const [companyPhone, setCompanyPhone] = useState(settings.company.phoneNumber);
  const [companyAddress, setCompanyAddress] = useState(settings.company.address);

  // Security form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      admin: { ...settings.admin, name: adminName, email: adminEmail },
    });
    alert('Admin profile updated successfully.');
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      company: { name: companyName, email: companyEmail, phoneNumber: companyPhone, address: companyAddress },
    });
    alert('Company information updated successfully.');
  };

  const handleToggleAppearance = (mode: SettingsType['appearance']) => {
    updateSettings({ appearance: mode });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters.');
      return;
    }
    alert('Password changed successfully (simulated).');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const sections = [
    { id: 'admin' as const, label: 'Admin Profile', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    )},
    { id: 'company' as const, label: 'Company Info', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    )},
    { id: 'appearance' as const, label: 'Appearance', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
    )},
    { id: 'security' as const, label: 'Security', icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    )},
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Manage your profile, company details, and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Settings Sidebar */}
        <div className="md:w-56 shrink-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-sm space-y-1 h-fit">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeSection === s.id
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white'
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">

          {/* ADMIN PROFILE */}
          {activeSection === 'admin' && (
            <form onSubmit={handleSaveAdmin} className="space-y-6">
              <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 pb-3">Admin Profile</h3>

              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <img className="w-full h-full object-cover grayscale" src={settings.admin.profilePicture} alt="admin avatar" />
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900 dark:text-white">{settings.admin.name}</p>
                  <p className="text-xs text-neutral-400">{settings.admin.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Name</label>
                  <input type="text" value={adminName} onChange={(e) => setAdminName(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Email</label>
                  <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button type="submit" className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-bold rounded-xl transition-all cursor-pointer">Save Profile</button>
              </div>
            </form>
          )}

          {/* COMPANY INFORMATION */}
          {activeSection === 'company' && (
            <form onSubmit={handleSaveCompany} className="space-y-6">
              <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 pb-3">Company Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Company Name</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Company Email</label>
                  <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Phone Number</label>
                  <input type="text" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Address</label>
                  <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button type="submit" className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-bold rounded-xl transition-all cursor-pointer">Save Company</button>
              </div>
            </form>
          )}

          {/* APPEARANCE */}
          {activeSection === 'appearance' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 pb-3">Appearance</h3>
              <p className="text-xs text-neutral-500">Select your preferred visual theme for the application.</p>
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <button
                  onClick={() => handleToggleAppearance('light')}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                    settings.appearance === 'light'
                      ? 'border-neutral-950 bg-white shadow-md'
                      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-neutral-200 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">Light Mode</span>
                </button>
                <button
                  onClick={() => handleToggleAppearance('dark')}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all cursor-pointer ${
                    settings.appearance === 'dark'
                      ? 'border-white bg-neutral-900 shadow-md'
                      : 'border-neutral-700 bg-neutral-800 hover:border-neutral-500'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  </div>
                  <span className="text-xs font-bold text-white">Dark Mode</span>
                </button>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeSection === 'security' && (
            <form onSubmit={handleChangePassword} className="space-y-6">
              <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 pb-3">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Confirm New Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950" required />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button type="submit" className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-bold rounded-xl transition-all cursor-pointer">Update Password</button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
