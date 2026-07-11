import { useState } from 'react';
import CompanySection from './components/CompanySection';
import SecuritySection from './components/SecuritySection';

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

export default function Settings() {
  const [activeSection, setActiveSection] = useState<'company' | 'security'>('company');

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
          {activeSection === 'company' && <CompanySection />}
          {activeSection === 'security' && <SecuritySection />}
        </div>
      </div>
    </div>
  );
}
