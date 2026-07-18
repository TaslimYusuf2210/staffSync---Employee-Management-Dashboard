import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useGetDepartmentPositions } from "../../hooks/useQuery/useGetDepartmentPositions";

const baseSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name is required (min 2 characters)" }),
  lastName: z
    .string()
    .min(2, { message: "Last name is required (min 2 characters)" }),
  email: z.string().email({ message: "A valid email address is required" }),
  phoneNumber: z.string().min(6, { message: "Phone number is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  departmentId: z.string().optional(),
  position: z.string().optional(),
  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Intern",
    "Remote",
  ]),
  hireDate: z.string().min(10, { message: "Hire date is required" }),
  status: z.enum(["Active", "Inactive", "Probation", "Resigned", "Terminated"]),
});

const createEmployeeSchema = (positionCount: number) =>
  baseSchema.superRefine((data, ctx) => {
    if (data.departmentId && positionCount > 0 && (!data.position || data.position.length < 2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["position"],
        message: "Position is required when a department is selected",
      });
    }
  });

type EmployeeFormValues = z.infer<ReturnType<typeof createEmployeeSchema>>;

export default function EmployeeCreate() {
  const { departments, addEmployee } = useApp();
  const navigate = useNavigate();

  const [schema, setSchema] = useState(() => createEmployeeSchema(0));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "Male",
      departmentId: "",
      position: "",
      employmentType: "Full-time",
      hireDate: new Date().toISOString().split("T")[0],
      status: "Active",
    },
  });

  const selectedDepartmentId = watch("departmentId");
  const { data: positionsData } = useGetDepartmentPositions(selectedDepartmentId);
  const positionsList = positionsData?.data?.positions ?? [];
  const prevPositionCount = useRef(0);

  useEffect(() => {
    if (positionsList.length !== prevPositionCount.current) {
      prevPositionCount.current = positionsList.length;
      setSchema(createEmployeeSchema(positionsList.length));
    }
  }, [positionsList.length]);

  const onSubmit = (data: EmployeeFormValues) => {
    const departmentName = departments.find((d) => d.id === data.departmentId)?.name ?? "";
    const newId = addEmployee({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      department: departmentName,
      position: data.position ?? "",
      employmentType: data.employmentType,
      hireDate: data.hireDate,
      status: data.status,
    });

    navigate(`/employees/${newId}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Add New Employee
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Register new team member. Additional details can be completed on
          profile page later.
        </p>
      </div>

      {/* FORM WRAPPER */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white -[#e9edc9] border border-neutral-200 -[#ccd5ae] rounded-2xl p-6 md:p-8 shadow-sm space-y-8"
      >
        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 -[#ccd5ae] pb-2">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phoneNumber")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Gender
              </label>
              <select
                {...register("gender")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Employment details */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 -[#ccd5ae] pb-2">
            Employment Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Department
              </label>
              <select
                {...register("departmentId", {
                  onChange: () => setValue("position", ""),
                })}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              >
                <option value="">Choose a department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.departmentId.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Position / Job Title
              </label>
              <select
                {...register("position")}
                disabled={!selectedDepartmentId}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!selectedDepartmentId ? (
                  <option value="">Select a department first</option>
                ) : positionsList.length === 0 ? (
                  <option value="">No positions available</option>
                ) : (
                  <>
                    <option value="">Select position</option>
                    {positionsList.map((pos) => (
                      <option key={pos.id} value={pos.id}>
                        {pos.title}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Employment Type
              </label>
              <select
                {...register("employmentType")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.employmentType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.employmentType.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Hire Date
              </label>
              <input
                type="date"
                {...register("hireDate")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              />
              {errors.hireDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.hireDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1">
                Employment Status
              </label>
              <select
                {...register("status")}
                className="w-full py-2.5 px-3.5 rounded-xl border border-neutral-200 -[#ccd5ae] -[#ccd5ae] text-sm focus:outline-none focus:border-[#ccd5ae]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Probation">Probation</option>
                <option value="Resigned">Resigned</option>
                <option value="Terminated">Terminated</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-neutral-100 -[#ccd5ae]">
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 -[#faedcd] text-neutral-700 text-sm font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-sm font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Registering..." : "Create Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
