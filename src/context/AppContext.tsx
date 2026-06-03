import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Education {
  id: string;
  institutionName: string;
  degree: string;
  qualification: string;
  fieldOfStudy: string;
  graduationYear: string;
}

export interface Salary {
  baseSalary: number;
  bonus: number;
  allowances: number;
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'Resume' | 'Employment Letter' | 'Certificates' | 'Other Documents';
  uploadDate: string;
}

export interface Note {
  id: string;
  text: string;
  createdDate: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  department: string;
  position: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern' | 'Remote';
  hireDate: string;
  status: 'Active' | 'Inactive' | 'Probation' | 'Resigned' | 'Terminated';
  dob: string;
  address: string;
  emergencyContact: string;
  reportingManager: string;
  photoUrl?: string;
  education: Education[];
  salary: Salary;
  bankAccount: BankAccount;
  documents: Document[];
  notes: Note[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  dateCreated: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  profilePicture: string;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface Settings {
  admin: AdminProfile;
  company: CompanyInfo;
}

interface AppContextType {
  employees: Employee[];
  departments: Department[];
  settings: Settings;
  addEmployee: (
    employee: Omit<
      Employee,
      | 'id'
      | 'education'
      | 'salary'
      | 'bankAccount'
      | 'documents'
      | 'notes'
      | 'dob'
      | 'address'
      | 'emergencyContact'
      | 'reportingManager'
    >
  ) => string;
  updateEmployee: (id: string, updatedData: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addDepartment: (department: Omit<Department, 'id' | 'dateCreated'>) => void;
  updateDepartment: (id: string, updatedData: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  updateSettings: (updatedSettings: Partial<Settings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Mock Departments
const initialDepartments: Department[] = [
  {
    id: 'dep-1',
    name: 'Design',
    description: 'User interface design, experience planning, and product aesthetics research.',
    head: 'Brooklyn Simmons',
    dateCreated: '2024-01-10',
  },
  {
    id: 'dep-2',
    name: 'Development',
    description: 'Engineering, stack architecture, DevOps, and frontend-backend development.',
    head: 'Cody Fisher',
    dateCreated: '2024-01-12',
  },
  {
    id: 'dep-3',
    name: 'Human Resource',
    description: 'Talent acquisitions, company benefits, employee retention, and operations.',
    head: 'Brooklyn Simmons',
    dateCreated: '2024-01-15',
  },
  {
    id: 'dep-4',
    name: 'Marketing',
    description: 'Product marketing campaigns, content strategies, SEO, and public relations.',
    head: 'Lisa Harvey',
    dateCreated: '2024-01-18',
  },
];

// Initial Mock Employees
const initialEmployees: Employee[] = [
  {
    id: 'emp-101',
    firstName: 'Brooklyn',
    lastName: 'Simmons',
    email: 'brok-simms@mail.com',
    phoneNumber: '+1 312 908 1234',
    gender: 'Female',
    department: 'Design',
    position: 'Creative Director',
    employmentType: 'Full-time',
    hireDate: '2024-01-10',
    status: 'Active',
    dob: '1992-05-14',
    address: '123 Avenue block, Chicago, IL',
    emergencyContact: 'Mark Simmons (+1 312 908 4321)',
    reportingManager: 'Self',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    education: [
      {
        id: 'edu-1',
        institutionName: 'Chicago Art Institute',
        degree: 'Bachelor of Fine Arts',
        qualification: 'BFA',
        fieldOfStudy: 'Graphic Design',
        graduationYear: '2014',
      },
    ],
    salary: { baseSalary: 8500, bonus: 1500, allowances: 500 },
    bankAccount: { bankName: 'Chase Bank', accountName: 'Brooklyn Simmons', accountNumber: '1234567890' },
    documents: [
      { id: 'doc-1', name: 'Resume_Brooklyn.pdf', type: 'Resume', uploadDate: '2024-01-09' },
    ],
    notes: [
      {
        id: 'n-1',
        text: 'Brooklyn has outstanding creative inputs and has completed UI sprints perfectly.',
        createdDate: '2024-02-10',
      },
    ],
  },
  {
    id: 'emp-102',
    firstName: 'Cody',
    lastName: 'Fisher',
    email: 'cody_fisher99@mail.com',
    phoneNumber: '+62 928 7273 7262',
    gender: 'Male',
    department: 'Development',
    position: 'Junior Frontend Developer',
    employmentType: 'Full-time',
    hireDate: '2024-01-12',
    status: 'Active',
    dob: '1998-09-22',
    address: 'Jl. Merdeka No. 45, Jakarta, Indonesia',
    emergencyContact: 'Mrs. Fisher (+62 928 7273 1111)',
    reportingManager: 'Brooklyn Simmons',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    education: [
      {
        id: 'edu-2',
        institutionName: 'Binus University',
        degree: 'Bachelor of Computer Science',
        qualification: 'B.CompSc',
        fieldOfStudy: 'Software Engineering',
        graduationYear: '2020',
      },
    ],
    salary: { baseSalary: 4500, bonus: 500, allowances: 200 },
    bankAccount: { bankName: 'Bank Central Asia', accountName: 'Cody Fisher', accountNumber: '9876543210' },
    documents: [],
    notes: [],
  },
  {
    id: 'emp-103',
    firstName: 'Ralph',
    lastName: 'Edwards',
    email: 'ralp_uxdsg@mail.com',
    phoneNumber: '+1 202 555 0192',
    gender: 'Male',
    department: 'Design',
    position: 'UX Designer',
    employmentType: 'Full-time',
    hireDate: '2024-01-14',
    status: 'Active',
    dob: '1990-11-03',
    address: '404 Capitol Hill Rd, Washington, DC',
    emergencyContact: 'Sarah Edwards (+1 202 555 0190)',
    reportingManager: 'Brooklyn Simmons',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    education: [],
    salary: { baseSalary: 6200, bonus: 800, allowances: 300 },
    bankAccount: { bankName: 'Wells Fargo', accountName: 'Ralph Edwards', accountNumber: '2468135790' },
    documents: [],
    notes: [],
  },
  {
    id: 'emp-104',
    firstName: 'Lisa',
    lastName: 'Harvey',
    email: 'helo-lisaa@hotmail.com',
    phoneNumber: '+1 617 555 0143',
    gender: 'Female',
    department: 'Marketing',
    position: 'Marketing Manager',
    employmentType: 'Full-time',
    hireDate: '2024-01-18',
    status: 'Probation',
    dob: '1995-02-28',
    address: '88 Beacon St, Boston, MA',
    emergencyContact: 'John Harvey (+1 617 555 0144)',
    reportingManager: 'Brooklyn Simmons',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    education: [],
    salary: { baseSalary: 5800, bonus: 1000, allowances: 400 },
    bankAccount: { bankName: 'Bank of America', accountName: 'Lisa Harvey', accountNumber: '1357924680' },
    documents: [],
    notes: [],
  },
];

const initialSettings: Settings = {
  admin: {
    name: 'Admin Strator',
    email: 'admin@rockscompany.com',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
  company: {
    name: 'Rocks Company Ltd',
    email: 'contact@rockscompany.com',
    phoneNumber: '+1 312 908 1234',
    address: '123 Avenue block, Chicago, IL',
  },
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('staffsync_employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem('staffsync_departments');
    return saved ? JSON.parse(saved) : initialDepartments;
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('staffsync_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  useEffect(() => {
    localStorage.setItem('staffsync_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('staffsync_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('staffsync_settings', JSON.stringify(settings));
    document.documentElement.classList.remove('dark');
  }, [settings]);

  const addEmployee = (
    empData: Omit<
      Employee,
      | 'id'
      | 'education'
      | 'salary'
      | 'bankAccount'
      | 'documents'
      | 'notes'
      | 'dob'
      | 'address'
      | 'emergencyContact'
      | 'reportingManager'
    >
  ) => {
    const newId = `emp-${Date.now()}`;
    const newEmployee: Employee = {
      ...empData,
      id: newId,
      dob: '',
      address: '',
      emergencyContact: '',
      reportingManager: 'None',
      education: [],
      salary: { baseSalary: 0, bonus: 0, allowances: 0 },
      bankAccount: { bankName: '', accountName: '', accountNumber: '' },
      documents: [],
      notes: [],
    };
    setEmployees((prev) => [...prev, newEmployee]);
    return newId;
  };

  const updateEmployee = (id: string, updatedData: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const addDepartment = (depData: Omit<Department, 'id' | 'dateCreated'>) => {
    const newId = `dep-${Date.now()}`;
    const newDep: Department = {
      ...depData,
      id: newId,
      dateCreated: new Date().toISOString().split('T')[0],
    };
    setDepartments((prev) => [...prev, newDep]);
  };

  const updateDepartment = (id: string, updatedData: Partial<Department>) => {
    setDepartments((prev) =>
      prev.map((dep) => (dep.id === id ? { ...dep, ...updatedData } : dep))
    );
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((dep) => dep.id !== id));
  };

  const updateSettings = (updatedSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updatedSettings }));
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        departments,
        settings,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
