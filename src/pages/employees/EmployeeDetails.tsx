import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Employee, Education, Document, Note } from '../../context/AppContext';

type TabType =
  | 'overview'
  | 'personal'
  | 'employment'
  | 'education'
  | 'salary'
  | 'bank'
  | 'documents'
  | 'notes';

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const { employees, departments, updateEmployee } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const employee = employees.find((e) => e.id === id);

  // States for sub-form editing
  const [personalEdit, setPersonalEdit] = useState(false);
  const [employmentEdit, setEmploymentEdit] = useState(false);
  const [salaryEdit, setSalaryEdit] = useState(false);
  const [bankEdit, setBankEdit] = useState(false);

  // Lists additions state
  const [newEdu, setNewEdu] = useState({
    institutionName: '',
    degree: '',
    qualification: '',
    fieldOfStudy: '',
    graduationYear: '',
  });
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newDoc, setNewDoc] = useState({ name: '', type: 'Resume' as Document['type'] });

  if (!employee) {
    return (
      <div className="py-12 text-center">
        <h3 className="font-extrabold text-neutral-800 text-lg">Employee not found</h3>
        <p className="text-sm text-neutral-500 mt-1">
          The requested profile does not exist in the database.
        </p>
        <Link
          to="/dashboard/employees"
          className="mt-4 inline-block px-4 py-2 bg-[#e9edc9] text-neutral-950 rounded-xl font-bold text-xs"
        >
          Return to roster
        </Link>
      </div>
    );
  }

  // Handle Updates
  const handleSavePersonal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    updateEmployee(employee.id, {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      phoneNumber: data.get('phoneNumber') as string,
      gender: data.get('gender') as string,
      dob: data.get('dob') as string,
      address: data.get('address') as string,
      emergencyContact: data.get('emergencyContact') as string,
    });
    setPersonalEdit(false);
  };

  const handleSaveEmployment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    updateEmployee(employee.id, {
      department: data.get('department') as string,
      position: data.get('position') as string,
      employmentType: data.get('employmentType') as Employee['employmentType'],
      hireDate: data.get('hireDate') as string,
      reportingManager: data.get('reportingManager') as string,
      status: data.get('status') as Employee['status'],
    });
    setEmploymentEdit(false);
  };

  const handleSaveSalary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    updateEmployee(employee.id, {
      salary: {
        baseSalary: Number(data.get('baseSalary')),
        bonus: Number(data.get('bonus')),
        allowances: Number(data.get('allowances')),
      },
    });
    setSalaryEdit(false);
  };

  const handleSaveBank = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    updateEmployee(employee.id, {
      bankAccount: {
        bankName: data.get('bankName') as string,
        accountName: data.get('accountName') as string,
        accountNumber: data.get('accountNumber') as string,
      },
    });
    setBankEdit(false);
  };

  // Education CRUD
  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const eduRecord: Education = {
      id: `edu-${Date.now()}`,
      ...newEdu,
    };
    updateEmployee(employee.id, {
      education: [...employee.education, eduRecord],
    });
    setNewEdu({ institutionName: '', degree: '', qualification: '', fieldOfStudy: '', graduationYear: '' });
    setShowAddEdu(false);
  };

  const handleDeleteEdu = (eduId: string) => {
    updateEmployee(employee.id, {
      education: employee.education.filter((ed) => ed.id !== eduId),
    });
  };

  // Documents CRUD
  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name) return;
    const docRecord: Document = {
      id: `doc-${Date.now()}`,
      name: newDoc.name,
      type: newDoc.type,
      uploadDate: new Date().toISOString().split('T')[0],
    };
    updateEmployee(employee.id, {
      documents: [...employee.documents, docRecord],
    });
    setNewDoc({ name: '', type: 'Resume' });
  };

  const handleDeleteDoc = (docId: string) => {
    updateEmployee(employee.id, {
      documents: employee.documents.filter((d) => d.id !== docId),
    });
  };

  // Notes CRUD
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const noteRecord: Note = {
      id: `n-${Date.now()}`,
      text: newNote,
      createdDate: new Date().toISOString().split('T')[0],
    };
    updateEmployee(employee.id, {
      notes: [noteRecord, ...employee.notes],
    });
    setNewNote('');
  };

  const handleDeleteNote = (noteId: string) => {
    updateEmployee(employee.id, {
      notes: employee.notes.filter((n) => n.id !== noteId),
    });
  };

  return (
    <div className="space-y-6">

      {/* Profile summary header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-950 text-2xl overflow-hidden shrink-0">
            {employee.photoUrl ? (
              <img className="w-full h-full object-cover grayscale" src={employee.photoUrl} alt="" />
            ) : (
              `${employee.firstName[0]}${employee.lastName[0]}`
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black text-neutral-900">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-sm font-semibold text-neutral-600 mt-0.5">
              {employee.position} &bull; {employee.department}
            </p>
            <span className="text-[10px] text-neutral-400 font-bold tracking-tight block mt-1 uppercase">
              ID: {employee.id}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
              employee.status === 'Active'
                ? 'bg-[#ccd5ae] text-neutral-950'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {employee.status}
          </span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="border-b border-neutral-200 flex overflow-x-auto gap-2 scrollbar-none">
        {(
          ['overview', 'personal', 'employment', 'education', 'salary', 'bank', 'documents', 'notes'] as TabType[]
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-xs font-bold border-b-2 capitalize whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-400 hover:text-neutral-950'
            }`}
          >
            {tab === 'bank' ? 'Bank Account' : tab}
          </button>
        ))}
      </div>

      {/* TABS CONTAINER */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 border border-neutral-100 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Department</span>
              <p className="font-extrabold text-neutral-950 mt-1.5">{employee.department}</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-100 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Position / Role</span>
              <p className="font-extrabold text-neutral-950 mt-1.5">{employee.position}</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-100 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Employment Type</span>
              <p className="font-extrabold text-neutral-950 mt-1.5">{employee.employmentType}</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-100 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Hire Date</span>
              <p className="font-extrabold text-neutral-950 mt-1.5">{employee.hireDate}</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-100 p-5 rounded-2xl">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Status</span>
              <p className="font-extrabold text-neutral-950 mt-1.5">{employee.status}</p>
            </div>
          </div>
        )}

        {/* PERSONAL INFORMATION TAB */}
        {activeTab === 'personal' && (
          <div>
            {!personalEdit ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Details</h3>
                  <button
                    onClick={() => setPersonalEdit(true)}
                    className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl transition-all"
                  >
                    Edit Info
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">First Name</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.firstName}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Last Name</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.lastName}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Email Address</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.email}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Phone Number</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.phoneNumber}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Gender</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.gender}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Date of Birth</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.dob || 'Not set'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-neutral-400 font-bold block mb-1">Home Address</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.address || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Emergency Contact</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.emergencyContact || 'Not set'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSavePersonal} className="space-y-6">
                <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">
                  Edit Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">First Name</label>
                    <input type="text" name="firstName" defaultValue={employee.firstName} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Last Name</label>
                    <input type="text" name="lastName" defaultValue={employee.lastName} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Email</label>
                    <input type="email" name="email" defaultValue={employee.email} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Phone</label>
                    <input type="text" name="phoneNumber" defaultValue={employee.phoneNumber} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Gender</label>
                    <select name="gender" defaultValue={employee.gender} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Date of Birth</label>
                    <input type="date" name="dob" defaultValue={employee.dob} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Address</label>
                    <input type="text" name="address" defaultValue={employee.address} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Emergency Contact</label>
                    <input type="text" name="emergencyContact" defaultValue={employee.emergencyContact} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setPersonalEdit(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl">Cancel</button>
                  <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* EMPLOYMENT INFORMATION TAB */}
        {activeTab === 'employment' && (
          <div>
            {!employmentEdit ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Employment Information</h3>
                  <button
                    onClick={() => setEmploymentEdit(true)}
                    className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Employee ID</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.id}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Department</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.department}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Position</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.position}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Employment Type</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.employmentType}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Hire Date</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.hireDate}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Reporting Manager</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.reportingManager}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Employment Status</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.status}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveEmployment} className="space-y-6">
                <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Edit Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Department</label>
                    <select name="department" defaultValue={employee.department} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs">
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Position</label>
                    <input type="text" name="position" defaultValue={employee.position} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Employment Type</label>
                    <select name="employmentType" defaultValue={employee.employmentType} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Hire Date</label>
                    <input type="date" name="hireDate" defaultValue={employee.hireDate} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Reporting Manager</label>
                    <input type="text" name="reportingManager" defaultValue={employee.reportingManager} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Employment Status</label>
                    <select name="status" defaultValue={employee.status} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Probation">Probation</option>
                      <option value="Resigned">Resigned</option>
                      <option value="Terminated">Terminated</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setEmploymentEdit(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl">Cancel</button>
                  <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Education History</h3>
              <button
                onClick={() => setShowAddEdu(!showAddEdu)}
                className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl transition-all"
              >
                {showAddEdu ? 'Close Form' : 'Add Education'}
              </button>
            </div>

            {/* ADD EDUCATION FORM */}
            {showAddEdu && (
              <form
                onSubmit={handleAddEducation}
                className="bg-neutral-50 border border-neutral-200 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              >
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Institution Name</label>
                  <input required type="text" value={newEdu.institutionName} onChange={(e) => setNewEdu({ ...newEdu, institutionName: e.target.value })} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Degree</label>
                  <input required type="text" value={newEdu.degree} onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Qualification</label>
                  <input required type="text" value={newEdu.qualification} onChange={(e) => setNewEdu({ ...newEdu, qualification: e.target.value })} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Field of Study</label>
                  <input required type="text" value={newEdu.fieldOfStudy} onChange={(e) => setNewEdu({ ...newEdu, fieldOfStudy: e.target.value })} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Graduation Year</label>
                  <input required type="text" value={newEdu.graduationYear} onChange={(e) => setNewEdu({ ...newEdu, graduationYear: e.target.value })} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                </div>
                <div className="flex items-end justify-end">
                  <button type="submit" className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all w-full cursor-pointer">
                    Save Record
                  </button>
                </div>
              </form>
            )}

            {/* EDUCATION RECORDS LIST */}
            {employee.education.length === 0 ? (
              <div className="text-center text-neutral-400 text-xs py-6">No education records provided.</div>
            ) : (
              <div className="space-y-4">
                {employee.education.map((edu) => (
                  <div key={edu.id} className="p-4 border border-neutral-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-neutral-900 text-sm">
                        {edu.degree} &bull; <span className="font-medium text-xs text-neutral-500">{edu.qualification}</span>
                      </h4>
                      <p className="text-xs text-neutral-600 mt-1">{edu.institutionName}</p>
                      <span className="text-[10px] text-neutral-400 font-bold block mt-1">
                        Field: {edu.fieldOfStudy} | Class of {edu.graduationYear}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteEdu(edu.id)}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SALARY TAB */}
        {activeTab === 'salary' && (
          <div>
            {!salaryEdit ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Salary Information</h3>
                  <button
                    onClick={() => setSalaryEdit(true)}
                    className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl"
                  >
                    Adjust Compensation
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Base Salary</span>
                    <p className="font-bold text-neutral-900 text-base">${employee.salary.baseSalary?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Bonus</span>
                    <p className="font-bold text-neutral-900 text-base">${employee.salary.bonus?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Allowances</span>
                    <p className="font-bold text-neutral-900 text-base">${employee.salary.allowances?.toLocaleString()}</p>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-100 p-3 rounded-xl">
                    <span className="text-neutral-400 font-bold block">Total Compensation</span>
                    <p className="font-black text-neutral-950 text-lg mt-1">
                      ${(employee.salary.baseSalary + employee.salary.bonus + employee.salary.allowances)?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveSalary} className="space-y-6">
                <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Adjust Compensation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Base Salary ($)</label>
                    <input type="number" name="baseSalary" defaultValue={employee.salary.baseSalary} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Bonus ($)</label>
                    <input type="number" name="bonus" defaultValue={employee.salary.bonus} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Allowances ($)</label>
                    <input type="number" name="allowances" defaultValue={employee.salary.allowances} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setSalaryEdit(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl">Cancel</button>
                  <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* BANK ACCOUNT TAB */}
        {activeTab === 'bank' && (
          <div>
            {!bankEdit ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Bank Details</h3>
                  <button
                    onClick={() => setBankEdit(true)}
                    className="px-3 py-1.5 bg-[#ccd5ae] text-neutral-950 text-xs font-bold rounded-xl"
                  >
                    Configure Bank Account
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Bank Name</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.bankAccount.bankName || 'Not configured'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Account Name</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.bankAccount.accountName || 'Not configured'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-bold block mb-1">Account Number</span>
                    <p className="font-bold text-neutral-900 text-sm">{employee.bankAccount.accountNumber || 'Not configured'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveBank} className="space-y-6">
                <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Configure Bank Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Bank Name</label>
                    <input type="text" name="bankName" defaultValue={employee.bankAccount.bankName} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Account Name</label>
                    <input type="text" name="accountName" defaultValue={employee.bankAccount.accountName} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Account Number</label>
                    <input type="text" name="accountNumber" defaultValue={employee.bankAccount.accountNumber} className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs" />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setBankEdit(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl">Cancel</button>
                  <button type="submit" className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer">Save Changes</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">
              Documents Roster
            </h3>

            {/* Upload form */}
            <form
              onSubmit={handleAddDoc}
              className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-end"
            >
              <div className="flex-1 w-full">
                <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Document File Name</label>
                <input
                  required
                  type="text"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                  placeholder="e.g. Contract_Signed.pdf"
                  className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs"
                />
              </div>
              <div className="w-full sm:w-48">
                <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Document Type</label>
                <select
                  value={newDoc.type}
                  onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value as Document['type'] })}
                  className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs"
                >
                  <option value="Resume">Resume</option>
                  <option value="Employment Letter">Employment Letter</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Other Documents">Other Documents</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all shrink-0 w-full sm:w-auto cursor-pointer"
              >
                Upload Mock File
              </button>
            </form>

            {/* List */}
            {employee.documents.length === 0 ? (
              <div className="text-center text-neutral-400 text-xs py-6">No documents uploaded.</div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {employee.documents.map((doc) => (
                  <div key={doc.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-neutral-900">{doc.name}</h5>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        Type: {doc.type} | Uploaded: {doc.uploadDate}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert(`Simulating file download/preview for ${doc.name}`)}
                        className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg text-neutral-700 transition-all"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">
              Internal Memos
            </h3>

            {/* Note form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Write feedback note
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
                placeholder="Add specific administrative updates or notes about Brooklyn..."
                className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </form>

            {/* List */}
            {employee.notes.length === 0 ? (
              <div className="text-center text-neutral-400 text-xs py-6">No administrative notes recorded.</div>
            ) : (
              <div className="space-y-4">
                {employee.notes.map((note) => (
                  <div key={note.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col justify-between gap-3">
                    <p className="text-xs text-neutral-800 font-medium leading-relaxed">{note.text}</p>
                    <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold border-t border-neutral-100 pt-2">
                      <span>Logged: {note.createdDate}</span>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
