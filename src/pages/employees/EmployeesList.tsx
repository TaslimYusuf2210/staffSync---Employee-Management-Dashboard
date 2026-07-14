import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/PageHeader';
import { Avatar } from '../../components/ui/avatar';
import { StatusBadge } from '../../components/StatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/table';
import { Pagination } from '../../components/Pagination';
import { EmptyState } from '../../components/EmptyState';
import { AddEmployeeDialog } from './components/AddEmployeeDialog';

export default function EmployeesList() {
  const { employees, departments, deleteEmployee } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'dept' | 'joined'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const processedEmployees = [...employees]
    .filter((emp) => {
      const matchesSearch =
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      else if (sortBy === 'dept') comparison = a.department.localeCompare(b.department);
      else if (sortBy === 'joined') comparison = new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime();
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalPages = Math.ceil(processedEmployees.length / itemsPerPage);
  const paginatedEmployees = processedEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSort = (field: 'name' | 'dept' | 'joined') => {
    if (sortBy === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortOrder('asc'); }
    setCurrentPage(1);
  };

  const sortIndicator = (field: 'name' | 'dept' | 'joined') =>
    sortBy === field ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : '';

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete employee ${name}?`)) deleteEmployee(id);
  };

  const peopleIcon = (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  return (
    <>
      <AddEmployeeDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} />
      <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Manage personnel records, roles, settings, and profile info."
        action={
          <button onClick={() => setShowAddDialog(true)} className="px-4 py-2.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Employee
          </button>
        }
      />

      {/* FILTER & SEARCH PANEL */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name, ID or position..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900"
          />
          <svg
            className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Dept Selector */}
        <div className="w-full md:w-56">
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full py-2.5 px-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-neutral-900"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ROSTER TABLE CONTAINER */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        {paginatedEmployees.length === 0 ? (
          <EmptyState icon={peopleIcon} title="No employees found" description="Try adjusting your search criteria or register a new team member." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">S/N</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead className="cursor-pointer hover:text-neutral-900 select-none" onClick={() => toggleSort('name')}>Full Name{sortIndicator('name')}</TableHead>
                <TableHead className="cursor-pointer hover:text-neutral-900 select-none" onClick={() => toggleSort('dept')}>Department{sortIndicator('dept')}</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="cursor-pointer hover:text-neutral-900 select-none" onClick={() => toggleSort('joined')}>Date Joined{sortIndicator('joined')}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell className="text-neutral-500 font-bold">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell className="font-bold text-neutral-950">{emp.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar firstName={emp.firstName} lastName={emp.lastName} photoUrl={emp.photoUrl} />
                      <div>
                        <Link to={`/dashboard/employees/${emp.id}`} className="font-bold text-neutral-900 hover:underline">
                          {emp.firstName} {emp.lastName}
                        </Link>
                        <p className="text-[10px] text-neutral-400">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded border border-neutral-200">{emp.department}</span>
                  </TableCell>
                  <TableCell className="text-neutral-600 font-semibold">{emp.position}</TableCell>
                  <TableCell><StatusBadge status={emp.status} /></TableCell>
                  <TableCell className="font-bold text-neutral-500">{emp.hireDate}</TableCell>
                  <TableCell className="text-right space-x-2">
                      <Link to={`/dashboard/employees/${emp.id}`} className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg text-neutral-800 transition-all">View</Link>
                      <button onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)} className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer">Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={processedEmployees.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
      </div>
    </div>
    </>
  );
}
