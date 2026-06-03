import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EmployeesList() {
  const { employees, departments, deleteEmployee } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'dept' | 'joined'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search, Filter, Sort processing
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
      if (sortBy === 'name') {
        comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      } else if (sortBy === 'dept') {
        comparison = a.department.localeCompare(b.department);
      } else if (sortBy === 'joined') {
        comparison = new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime();
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination calculation
  const totalPages = Math.ceil(processedEmployees.length / itemsPerPage);
  const paginatedEmployees = processedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: 'name' | 'dept' | 'joined') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete employee ${name}?`)) {
      deleteEmployee(id);
    }
  };

  return (
    <div className="space-y-6">

      {/* Roster Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Employees</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage personnel records, roles, settings, and profile info.
          </p>
        </div>
        <Link
          to="/dashboard/employees/create"
          className="px-4 py-2.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 font-bold rounded-xl text-sm transition-all shadow-sm shrink-0 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </Link>
      </div>

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
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <svg className="w-12 h-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="font-bold text-neutral-800 mt-4 text-base">No employees found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs">
              Try adjusting your search criteria or register a new team member.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider select-none">
                  <th className="p-4 font-semibold">Employee ID</th>
                  <th
                    className="p-4 font-semibold cursor-pointer hover:text-neutral-900"
                    onClick={() => toggleSort('name')}
                  >
                    Full Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th
                    className="p-4 font-semibold cursor-pointer hover:text-neutral-900"
                    onClick={() => toggleSort('dept')}
                  >
                    Department {sortBy === 'dept' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 font-semibold">Position</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th
                    className="p-4 font-semibold cursor-pointer hover:text-neutral-900"
                    onClick={() => toggleSort('joined')}
                  >
                    Date Joined {sortBy === 'joined' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {paginatedEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-neutral-50/50 transition-all">
                    <td className="p-4 font-bold text-neutral-950">{emp.id}</td>
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-950 font-bold flex items-center justify-center overflow-hidden shrink-0">
                        {emp.photoUrl ? (
                          <img className="w-full h-full object-cover grayscale" src={emp.photoUrl} alt="" />
                        ) : (
                          `${emp.firstName[0]}${emp.lastName[0]}`
                        )}
                      </div>
                      <div>
                        <Link to={`/dashboard/employees/${emp.id}`} className="font-bold text-neutral-900 hover:underline">
                          {emp.firstName} {emp.lastName}
                        </Link>
                        <p className="text-[10px] text-neutral-400">{emp.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-bold rounded border border-neutral-200">
                        {emp.department}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-600 font-semibold">{emp.position}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          emp.status === 'Active'
                            ? 'bg-[#ccd5ae] text-neutral-950'
                            : emp.status === 'Probation'
                            ? 'bg-neutral-100 text-neutral-700'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-neutral-500">{emp.hireDate}</td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        to={`/dashboard/employees/${emp.id}`}
                        className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg text-neutral-800 transition-all"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION TOOLBAR */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-neutral-100 text-xs font-bold text-neutral-500">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, processedEmployees.length)} of {processedEmployees.length} employees
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
