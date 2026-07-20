import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Employee, Education, Document, Note, TabType } from '../../types/dashboard/employee';
import { Avatar } from '../../components/ui/avatar';
import { StatusBadge } from '../../components/StatusBadge';
import { DeleteEmployeeDialog } from './components/DeleteEmployeeDialog';
import { OverviewTab } from './components/OverviewTab';
import { PersonalTab } from './components/PersonalTab';
import { EmploymentTab } from './components/EmploymentTab';
import { SalaryTab } from './components/SalaryTab';
import { BankTab } from './components/BankTab';
import { EducationSection } from './components/EducationSection';
import { DocumentsSection } from './components/DocumentsSection';
import { NotesSection } from './components/NotesSection';
import { useGetEmployeeById } from '../../hooks/useQuery/useGetEmployeeById';

const TABS: { key: TabType; label: string }[] = [
  { key: 'overview', label: 'overview' },
  { key: 'personal', label: 'personal' },
  { key: 'employment', label: 'employment' },
  { key: 'education', label: 'education' },
  { key: 'salary', label: 'salary' },
  { key: 'bank', label: 'Bank Account' },
  { key: 'documents', label: 'documents' },
  { key: 'notes', label: 'notes' },
];

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { departments, updateEmployee } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: employee } = useGetEmployeeById(id);
  console.log('[EmployeeDetails] employee:', employee);
  console.log('[EmployeeDetails] id from params:', id);

  if (!employee) {
    return (
      <div className="py-12 text-center">
        <h3 className="font-extrabold text-neutral-800 text-lg">Employee not found</h3>
        <p className="text-sm text-neutral-500 mt-1">The requested profile does not exist in the database.</p>
        <Link to="/dashboard/employees" className="mt-4 inline-block px-4 py-2 bg-surface-muted text-neutral-950 rounded-xl font-bold text-xs">
          Return to roster
        </Link>
      </div>
    );
  }

  const handleSavePersonal = (data: Record<string, string>) => {
    updateEmployee(employee.id, {
      firstName: data.firstName, lastName: data.lastName, email: data.email,
      phoneNumber: data.phoneNumber, gender: data.gender, dob: data.dob,
      address: data.address, emergencyContact: data.emergencyContact,
    });
  };

  const handleSaveEmployment = (data: Record<string, string>) => {
    updateEmployee(employee.id, {
      department: data.department, position: data.position,
      employmentType: data.employmentType as Employee['employmentType'],
      hireDate: data.hireDate, reportingManager: data.reportingManager,
      status: data.status as Employee['status'],
    });
  };

  const handleSaveSalary = (salary: { baseSalary: number; bonus: number; allowances: number }) => {
    updateEmployee(employee.id, { salary });
  };

  const handleSaveBank = (bank: { bankName: string; accountName: string; accountNumber: string }) => {
    updateEmployee(employee.id, { bankAccount: bank });
  };

  const handleAddEducation = (edu: Omit<Education, 'id'>) => {
    updateEmployee(employee.id, {
      education: [...employee.education, { id: `edu-${Date.now()}`, ...edu }],
    });
  };

  const handleDeleteEdu = (eduId: string) => {
    updateEmployee(employee.id, { education: employee.education.filter((e) => e.id !== eduId) });
  };

  const handleAddDoc = (doc: { name: string; type: Document['type'] }) => {
    updateEmployee(employee.id, {
      documents: [...employee.documents, { id: `doc-${Date.now()}`, ...doc, uploadDate: new Date().toISOString().split('T')[0] }],
    });
  };

  const handleDeleteDoc = (docId: string) => {
    updateEmployee(employee.id, { documents: employee.documents.filter((d) => d.id !== docId) });
  };

  const handleAddNote = (text: string) => {
    const note: Note = { id: `n-${Date.now()}`, text, createdDate: new Date().toISOString().split('T')[0] };
    updateEmployee(employee.id, { notes: [note, ...employee.notes] });
  };

  const handleDeleteNote = (noteId: string) => {
    updateEmployee(employee.id, { notes: employee.notes.filter((n) => n.id !== noteId) });
  };

  return (
    <div className="space-y-6">

      {/* Back link */}
      <Link
        to="/dashboard/employees"
        className="text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Employees
      </Link>

      {/* Profile summary header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar firstName={employee.firstName} lastName={employee.lastName} photoUrl={employee.photoUrl} size="lg" />
          <div>
            <h1 className="text-2xl font-black text-neutral-900">{employee.firstName} {employee.lastName}</h1>
            <p className="text-sm font-semibold text-neutral-600 mt-0.5">{employee.position} &bull; {employee.department}</p>
            <span className="text-[10px] text-neutral-400 font-bold tracking-tight block mt-1 uppercase">ID: {employee.id}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <StatusBadge status={employee.status} />
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer"
            title="Delete employee"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="border-b border-neutral-200 flex overflow-x-auto gap-2 scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-3 px-4 text-xs font-bold border-b-2 capitalize whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.key ? 'border-neutral-950 text-neutral-950' : 'border-transparent text-neutral-400 hover:text-neutral-950'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {activeTab === 'overview' && <OverviewTab employee={employee} />}
        {activeTab === 'personal' && <PersonalTab employee={employee} onSave={handleSavePersonal} />}
        {activeTab === 'employment' && <EmploymentTab employee={employee} departments={departments} onSave={handleSaveEmployment} />}
        {activeTab === 'education' && <EducationSection education={employee.education} onAdd={handleAddEducation} onDelete={handleDeleteEdu} />}
        {activeTab === 'salary' && <SalaryTab employee={employee} onSave={handleSaveSalary} />}
        {activeTab === 'bank' && <BankTab employee={employee} onSave={handleSaveBank} />}
        {activeTab === 'documents' && <DocumentsSection documents={employee.documents} onAdd={handleAddDoc} onDelete={handleDeleteDoc} />}
        {activeTab === 'notes' && <NotesSection notes={employee.notes} onAdd={handleAddNote} onDelete={handleDeleteNote} />}
      </div>

      {showDeleteDialog && (
        <DeleteEmployeeDialog
          employeeId={employee.id}
          employeeName={`${employee.firstName} ${employee.lastName}`}
          onSuccess={() => navigate('/dashboard/employees')}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}

