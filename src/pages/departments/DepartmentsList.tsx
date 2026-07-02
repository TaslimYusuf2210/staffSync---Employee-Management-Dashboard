import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import type { Department } from "../../context/AppContext";
export default function DepartmentsList() {
  const {
    departments,
    employees,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDep, setEditingDep] = useState<Department | null>(null);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formHead, setFormHead] = useState("");
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;
    addDepartment({
      name: formName,
      description: formDescription,
      head: formHead || "Not assigned",
    });
    setFormName("");
    setFormDescription("");
    setFormHead("");
    setShowAddForm(false);
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDep) return;
    updateDepartment(editingDep.id, {
      name: formName,
      description: formDescription,
      head: formHead || "Not assigned",
    });
    setEditingDep(null);
    setFormName("");
    setFormDescription("");
    setFormHead("");
  };
  const startEdit = (dep: Department) => {
    setEditingDep(dep);
    setFormName(dep.name);
    setFormDescription(dep.description);
    setFormHead(dep.head);
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
            onClick={() => setShowAddForm(true)}
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
      {/* CREATE OR EDIT FORM CONTAINER */}{" "}
      {(showAddForm || editingDep) && (
        <form
          onSubmit={showAddForm ? handleAddSubmit : handleEditSubmit}
          className="bg-white -[#e9edc9] border border-neutral-200 -[#ccd5ae] p-6 rounded-2xl shadow-sm space-y-4"
        >
          {" "}
          <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100 -[#ccd5ae]">
            {" "}
            {showAddForm
              ? "Create Department"
              : `Edit Department: ${editingDep?.name}`}{" "}
          </h3>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {" "}
            <div>
              {" "}
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Department Name
              </label>{" "}
              <input
                required
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full py-2 px-3 border border-neutral-250 -[#ccd5ae] -[#ccd5ae] rounded-xl text-xs"
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Department Head / Manager
              </label>{" "}
              <input
                type="text"
                value={formHead}
                onChange={(e) => setFormHead(e.target.value)}
                className="w-full py-2 px-3 border border-neutral-250 -[#ccd5ae] -[#ccd5ae] rounded-xl text-xs font-semibold"
              />{" "}
            </div>{" "}
            <div className="sm:col-span-2 md:col-span-1">
              {" "}
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Description
              </label>{" "}
              <input
                type="text"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full py-2 px-3 border border-neutral-250 -[#ccd5ae] -[#ccd5ae] rounded-xl text-xs"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex gap-2 justify-end pt-2">
            {" "}
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingDep(null);
                setFormName("");
                setFormDescription("");
                setFormHead("");
              }}
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 -[#faedcd] text-xs font-bold rounded-xl"
            >
              {" "}
              Cancel{" "}
            </button>{" "}
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl cursor-pointer"
            >
              {" "}
              {showAddForm ? "Save Department" : "Save Changes"}{" "}
            </button>{" "}
          </div>{" "}
        </form>
      )}{" "}
      {/* DEPARTMENTS TABLE */}{" "}
      <div className="bg-white -[#e9edc9] border border-neutral-200 -[#ccd5ae] rounded-2xl shadow-sm overflow-hidden">
        {" "}
        {departments.length === 0 ? (
          <div className="p-8 text-center text-neutral-400 text-sm">
            No departments registered. Click 'Create Department' to add one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full text-left text-xs border-collapse">
              {" "}
              <thead>
                {" "}
                <tr className="border-b border-neutral-100 -[#ccd5ae] text-neutral-400 font-bold uppercase tracking-wider">
                  {" "}
                  <th className="p-4 font-semibold">Department Name</th>{" "}
                  <th className="p-4 font-semibold">Department Head</th>{" "}
                  <th className="p-4 font-semibold">Employee Count</th>{" "}
                  <th className="p-4 font-semibold">Date Created</th>{" "}
                  <th className="p-4 font-semibold text-right">Actions</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody className="divide-y divide-neutral-100">
                {" "}
                {departments.map((dep) => {
                  const empCount = employees.filter(
                    (e) => e.department === dep.name,
                  ).length;
                  return (
                    <tr
                      key={dep.id}
                      className="hover:bg-neutral-50/50 :bg-[#faedcd]/30 transition-all"
                    >
                      {" "}
                      <td className="p-4 font-bold text-neutral-900">
                        {" "}
                        <Link
                          to={`/dashboard/departments/${dep.id}`}
                          className="hover:underline"
                        >
                          {" "}
                          {dep.name}{" "}
                        </Link>{" "}
                        <p className="text-[10px] text-neutral-400 font-medium normal-case mt-0.5">
                          {dep.description}
                        </p>{" "}
                      </td>{" "}
                      <td className="p-4 text-neutral-700 font-bold">
                        {dep.head}
                      </td>{" "}
                      <td className="p-4 font-black text-neutral-900">
                        {empCount} members
                      </td>{" "}
                      <td className="p-4 font-bold text-neutral-500">
                        {dep.dateCreated}
                      </td>{" "}
                      <td className="p-4 text-right space-x-2">
                        {" "}
                        <Link
                          to={`/dashboard/departments/${dep.id}`}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 -[#faedcd] text-[10px] font-bold rounded-lg text-neutral-800 transition-all"
                        >
                          {" "}
                          Details{" "}
                        </Link>{" "}
                        <button
                          onClick={() => startEdit(dep)}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 -[#faedcd] text-[10px] font-bold rounded-lg text-neutral-800 transition-all cursor-pointer"
                        >
                          {" "}
                          Edit{" "}
                        </button>{" "}
                        <button
                          onClick={() => handleDelete(dep.id, dep.name)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer"
                        >
                          {" "}
                          Delete{" "}
                        </button>{" "}
                      </td>{" "}
                    </tr>
                  );
                })}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
