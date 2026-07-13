import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import type { Department } from "../../types/dashboard/department";
import { useGetDepartments } from "../../hooks/useQuery/useGetDepartments";
import { useCreateDepartment } from "../../hooks/useMutation/useCreateDepartment";

const departmentSchema = z.object({
  name: z.string().min(2, { message: "Department name must be at least 2 characters" }),
  description: z.string().min(1, { message: "Description is required" }),
  head: z.string().min(1, { message: "Department head is required" }),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

export default function DepartmentsList() {
  const { data: departmentsData, isLoading: isDepartmentsLoading, isError: isDepartmentsError } = useGetDepartments();
  const departments = departmentsData?.data?.departments ?? [];
  console.log("departmentsData:", departmentsData);
  console.log("departments:", departments);
  const {
    employees,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDep, setEditingDep] = useState<Department | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: "", description: "", head: "" },
  });

  const onSubmit = (data: DepartmentFormValues) => {
    if (editingDep) {
      updateDepartment(editingDep.id, {
        name: data.name,
        description: data.description,
        head: data.head || "Not assigned",
      });
    } else {
      addDepartment({
        name: data.name,
        description: data.description,
        head: data.head || "Not assigned",
        employeeCount: 0,
      });
    }
    reset();
    setEditingDep(null);
    setShowAddForm(false);
  };

  const startAdd = () => {
    setEditingDep(null);
    reset({ name: "", description: "", head: "" });
    setShowAddForm(true);
  };

  const startEdit = (dep: Department) => {
    setEditingDep(dep);
    setValue("name", dep.name);
    setValue("description", dep.description);
    setValue("head", dep.head);
    setShowAddForm(false);
  };

  const cancelForm = () => {
    reset();
    setEditingDep(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (
      window.confirm(`Are you sure you want to delete the ${name} department?`)
    ) {
      deleteDepartment(id);
    }
  };
  return (
    <div className="space-y-6">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {" "}
        <div>
          {" "}
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Departments
          </h1>{" "}
          <p className="text-sm text-neutral-500 mt-1">
            Manage departmental divisions, heads, and employee placements.
          </p>{" "}
        </div>{" "}
        {!showAddForm && !editingDep && (
          <button
            onClick={startAdd}
            className="px-4 py-2.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 font-bold rounded-xl text-sm transition-all shadow-sm shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            {" "}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />{" "}
            </svg>{" "}
            Create Department{" "}
          </button>
        )}{" "}
      </div>{" "}
      {/* CREATE / EDIT DIALOG */}{" "}
      {(showAddForm || editingDep) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) cancelForm(); }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
                {showAddForm
                  ? "Create Department"
                  : `Edit Department: ${editingDep?.name}`}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Department Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Department Head / Manager
                  </label>
                  <input
                    type="text"
                    {...register("head")}
                    className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {errors.head && <p className="text-red-500 text-[10px] mt-1">{errors.head.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    {...register("description")}
                    className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description.message}</p>}
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {showAddForm ? "Save Department" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}{" "}
      {/* DEPARTMENTS TABLE */}{" "}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        {" "}
        {isDepartmentsLoading ? (
          <div className="p-6 space-y-4 animate-pulse">
            <div className="h-4 bg-neutral-200 rounded w-1/4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 bg-neutral-100 rounded flex-1" />
                  <div className="h-10 bg-neutral-100 rounded flex-1" />
                  <div className="h-10 bg-neutral-100 rounded w-24" />
                  <div className="h-10 bg-neutral-100 rounded w-28" />
                  <div className="h-10 bg-neutral-100 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
        ) : isDepartmentsError ? (
          <div className="p-8 text-center">
            <p className="text-neutral-400 text-sm">Failed to load department data</p>
          </div>
        ) : departments.length === 0 ? (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider">
                    <th className="p-4 font-semibold">S/N</th>
                    <th className="p-4 font-semibold">ID</th>
                    <th className="p-4 font-semibold">Department Name</th>
                    <th className="p-4 font-semibold">Department Head</th>
                    <th className="p-4 font-semibold">Employee Count</th>
                    <th className="p-4 font-semibold">Date Created</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="p-16 text-center text-neutral-400 text-sm">
                      No departments registered. Click 'Create Department' to add one.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider">
                  <th className="p-4 font-semibold">S/N</th>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Department Name</th>
                  <th className="p-4 font-semibold">Department Head</th>
                  <th className="p-4 font-semibold">Employee Count</th>
                  <th className="p-4 font-semibold">Date Created</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {departments.map((dep, index) => {
                  const empCount = employees.filter(
                    (e) => e.department === dep.name,
                  ).length;
                  return (
                    <tr
                      key={dep.id}
                      className="hover:bg-neutral-50/50 transition-all"
                    >
                      <td className="p-4 text-neutral-500 font-bold text-center">{index + 1}</td>
                      <td className="p-4 text-neutral-400 text-[10px] font-mono">{dep.id}</td>
                      <td className="p-4 font-bold text-neutral-900">
                        <Link
                          to={`/dashboard/departments/${dep.id}`}
                          className="hover:underline"
                        >
                          {dep.name}
                        </Link>
                        <p className="text-[10px] text-neutral-400 font-medium normal-case mt-0.5">
                          {dep.description}
                        </p>
                      </td>
                      <td className="p-4 text-neutral-700 font-bold">
                        {dep.head}
                      </td>
                      <td className="p-4 font-black text-neutral-900">
                        {empCount} members
                      </td>
                      <td className="p-4 font-bold text-neutral-500">
                        {dep.dateCreated}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link
                          to={`/dashboard/departments/${dep.id}`}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg text-neutral-800 transition-all"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => startEdit(dep)}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold rounded-lg text-neutral-800 transition-all cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dep.id, dep.name)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
