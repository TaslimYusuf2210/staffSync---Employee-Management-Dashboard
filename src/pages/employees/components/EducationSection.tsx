import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';
import { Dialog } from '../../../components/ui/dialog';
import type { Employee } from '../../../types/dashboard/employee';
import { useAddEducation } from '@/hooks/useMutation/useAddEducation';
import { useDeleteEducation } from '@/hooks/useMutation/useDeleteEducation';
import institutions from '@/constants/NigeriaInstitutions';
import degreeTypes from '@/constants/NigeriaDegreeTypes';
import courses from '@/constants/NigeriaCourses';

interface EducationSectionProps {
  education: Employee['Education'];
  employeeId: string;
}

const educationSchema = z.object({
  institutionName: z.string().min(1, { message: 'Institution is required' }),
  qualification: z.string().min(1, { message: 'Qualification is required' }),
  fieldOfStudy: z.string().min(1, { message: 'Field of study is required' }),
  graduationYear: z.string().min(1, { message: 'Graduation year is required' }),
});

type EducationFormValues = z.infer<typeof educationSchema>;

/** Flatten all qualifications into a single list with their institution type */
const allQualifications = degreeTypes.tertiary_qualifications.flatMap((group) =>
  group.qualifications.map((q) => ({
    abbreviation: q.abbreviation,
    fullName: q.full_name,
    category: q.category,
    institutionType: group.institution_type,
  }))
);

/** Flatten all courses from all faculties into a single list */
const allCourses = courses.faculties.flatMap((faculty) =>
  faculty.courses.map((c) => ({
    code: c.code,
    name: c.name,
    degree: c.degree,
    facultyName: faculty.faculty_name,
  }))
);

export function EducationSection({ education, employeeId }: EducationSectionProps) {
  const { mutateAsync: addEducation, isPending: isAdding } = useAddEducation(employeeId);
  const { mutateAsync: deleteEducation } = useDeleteEducation(employeeId);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  // Institution search
  const [institutionSearch, setInstitutionSearch] = useState('');
  const [showInstitutionDropdown, setShowInstitutionDropdown] = useState(false);

  // Qualification search
  const [qualificationSearch, setQualificationSearch] = useState('');
  const [showQualificationDropdown, setShowQualificationDropdown] = useState(false);
  const [isQualSelected, setIsQualSelected] = useState(false);

  // Field of study search
  const [fieldOfStudySearch, setFieldOfStudySearch] = useState('');
  const [showFieldOfStudyDropdown, setShowFieldOfStudyDropdown] = useState(false);
  const [isFieldSelected, setIsFieldSelected] = useState(false);

  const educationList = education ?? [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institutionName: '',
      qualification: '',
      fieldOfStudy: '',
      graduationYear: '',
    },
  });

  const selectedQualAbbr = watch('qualification');
  const selectedQual = useMemo(
    () => allQualifications.find((q) => q.abbreviation === selectedQualAbbr),
    [selectedQualAbbr]
  );

  const searchTerm = institutionSearch.toLowerCase();
  const filteredInstitutions = institutions
    .filter((inst) =>
      inst.name.toLowerCase().includes(searchTerm) ||
      inst.abb.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      const aAbbrMatch = a.abb.toLowerCase().startsWith(searchTerm) ? 0 : 1;
      const bAbbrMatch = b.abb.toLowerCase().startsWith(searchTerm) ? 0 : 1;
      return aAbbrMatch - bAbbrMatch;
    });

  const filteredQualifications = allQualifications.filter(
    (q) =>
      q.abbreviation.toLowerCase().includes(qualificationSearch.toLowerCase()) ||
      q.fullName.toLowerCase().includes(qualificationSearch.toLowerCase())
  );

  const filteredCourses = allCourses.filter(
    (c) =>
      c.name.toLowerCase().includes(fieldOfStudySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(fieldOfStudySearch.toLowerCase())
  );

  const selectInstitution = (name: string) => {
    setValue('institutionName', name);
    setInstitutionSearch('');
    setShowInstitutionDropdown(false);
  };

  const selectQualification = (abbr: string) => {
    setValue('qualification', abbr);
    setQualificationSearch('');
    setShowQualificationDropdown(false);
    setIsQualSelected(true);
  };

  const selectFieldOfStudy = (name: string) => {
    setValue('fieldOfStudy', name);
    setFieldOfStudySearch(name);
    setShowFieldOfStudyDropdown(false);
    setIsFieldSelected(true);
  };

  const onSubmit = async (data: EducationFormValues) => {
    await addEducation(data);
    reset();
    setShowDialog(false);
  };

  const handleDelete = async (eduId: string) => {
    setDeleteLoadingId(eduId);
    try {
      await deleteEducation(eduId);
    } finally {
      setDeleteLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">Education History</h3>
        <button
          onClick={() => {
            reset();
            setInstitutionSearch('');
            setQualificationSearch('');
            setFieldOfStudySearch('');
            setIsQualSelected(false);
            setIsFieldSelected(false);
            setShowDialog(true);
          }}
          className="px-3 py-1.5 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Education
        </button>
      </div>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-3">Add Education Record</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[40rem] overflow-y-auto pr-6">
            {/* Institution - searchable dropdown */}
            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Institution</label>
              <div
                className="relative"
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setShowInstitutionDropdown(false);
                  }
                }}
              >
                <input
                  placeholder="Search institution..."
                  type="text"
                  {...register('institutionName', {
                    onChange: (e) => {
                      setInstitutionSearch(e.target.value);
                      if (e.target.value) setShowInstitutionDropdown(true);
                    },
                  })}
                  onFocus={() => institutionSearch && setShowInstitutionDropdown(true)}
                  className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
                />
                {errors.institutionName && <p className="text-red-500 text-[10px] mt-1">{errors.institutionName.message}</p>}

                {showInstitutionDropdown && institutionSearch.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredInstitutions.length === 0 ? (
                      <div className="p-3 text-xs text-neutral-400 text-center">No institutions found</div>
                    ) : (
                      filteredInstitutions.map((inst) => (
                        <button
                          key={inst.value}
                          type="button"
                          onMouseDown={() => selectInstitution(inst.name)}
                          className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-xs transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-neutral-900">{inst.name}</span>
                          {inst.abb && <span className="ml-2 text-[10px] text-neutral-400">({inst.abb})</span>}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Qualification - searchable dropdown */}
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Qualification</label>

              {isQualSelected && selectedQual ? (
                <div className="flex items-center gap-2 py-2 px-3 border border-[#ccd5ae] bg-[#ccd5ae]/10 rounded-xl text-xs">
                  <span className="font-bold text-neutral-900">{selectedQual.abbreviation}</span>
                  <span className="text-neutral-500">— {selectedQual.fullName}</span>
                  <button
                    type="button"
                    onClick={() => { setValue('qualification', ''); setIsQualSelected(false); setQualificationSearch(''); }}
                    className="ml-auto text-neutral-400 hover:text-red-500 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  className="relative"
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setShowQualificationDropdown(false);
                    }
                  }}
                >
                  <input
                    placeholder="Search qualification..."
                    type="text"
                    {...register('qualification', {
                      onChange: (e) => {
                        setQualificationSearch(e.target.value);
                        if (e.target.value) setShowQualificationDropdown(true);
                      },
                    })}
                    onFocus={() => qualificationSearch && setShowQualificationDropdown(true)}
                    className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {errors.qualification && <p className="text-red-500 text-[10px] mt-1">{errors.qualification.message}</p>}

                  {showQualificationDropdown && qualificationSearch.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                      {filteredQualifications.length === 0 ? (
                        <div className="p-3 text-xs text-neutral-400 text-center">No qualifications found</div>
                      ) : (
                        filteredQualifications.map((q) => (
                          <button
                            key={q.abbreviation}
                            type="button"
                            onMouseDown={() => selectQualification(q.abbreviation)}
                            className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-xs transition-colors cursor-pointer"
                          >
                            <span className="font-bold text-neutral-900">{q.abbreviation}</span>
                            <span className="ml-1.5 text-neutral-500">{q.fullName}</span>
                            <span className="block text-[10px] text-neutral-400 mt-0.5">{q.category} &middot; {q.institutionType}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected qualification info */}
            {selectedQual && (
              <div className="self-end">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Category</label>
                <p className="text-xs text-neutral-600 py-2 px-3 border border-neutral-100 bg-neutral-50 rounded-xl">
                  {selectedQual.category}
                </p>
              </div>
            )}

            {/* Field of Study - searchable dropdown */}
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Field of Study</label>

              {isFieldSelected ? (
                <div className="flex items-center gap-2 py-2 px-3 border border-[#ccd5ae] bg-[#ccd5ae]/10 rounded-xl text-xs">
                  <span className="font-bold text-neutral-900">{fieldOfStudySearch}</span>
                  <button
                    type="button"
                    onClick={() => { setValue('fieldOfStudy', ''); setIsFieldSelected(false); setFieldOfStudySearch(''); }}
                    className="ml-auto text-neutral-400 hover:text-red-500 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  className="relative"
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setShowFieldOfStudyDropdown(false);
                    }
                  }}
                >
                  <input
                    placeholder="Search course..."
                    type="text"
                    value={fieldOfStudySearch}
                    onChange={(e) => {
                      setFieldOfStudySearch(e.target.value);
                      setValue('fieldOfStudy', e.target.value);
                      if (e.target.value) setShowFieldOfStudyDropdown(true);
                    }}
                    onFocus={() => fieldOfStudySearch && setShowFieldOfStudyDropdown(true)}
                    className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]"
                  />
                  {errors.fieldOfStudy && <p className="text-red-500 text-[10px] mt-1">{errors.fieldOfStudy.message}</p>}

                  {showFieldOfStudyDropdown && fieldOfStudySearch.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                      {filteredCourses.length === 0 ? (
                        <div className="p-3 text-xs text-neutral-400 text-center">No courses found</div>
                      ) : (
                        filteredCourses.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onMouseDown={() => selectFieldOfStudy(c.name)}
                            className="w-full text-left px-3 py-2 hover:bg-neutral-50 text-xs transition-colors cursor-pointer"
                          >
                            <span className="font-bold text-neutral-900">{c.name}</span>
                            <span className="ml-2 text-[10px] text-neutral-400 uppercase">{c.code}</span>
                            <span className="block text-[10px] text-neutral-400 mt-0.5">{c.facultyName} &middot; {c.degree}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Graduation Year */}
            <div>
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Graduation Year</label>
              <input type="text" {...register('graduationYear')} placeholder="e.g. 2020" className="w-full py-2 px-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-[#ccd5ae]" />
              {errors.graduationYear && <p className="text-red-500 text-[10px] mt-1">{errors.graduationYear.message}</p>}
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setShowDialog(false)} className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" disabled={isAdding} className="px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5">
              {isAdding ? <><Hourglass size={14} /> Saving...</> : 'Save Record'}
            </button>
          </div>
        </form>
      </Dialog>

      {educationList.length === 0 ? renderEmptyState() : renderRecords()}
    </div>
  );

  function renderEmptyState() {
    const fields = [
      { label: 'Institution' },
      { label: 'Qualification' },
      { label: 'Field of Study' },
      { label: 'Graduation Year' },
    ];

    return (
      <div className="border border-dashed border-neutral-200 rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {fields.map((f) => (
            <div key={f.label}>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">{f.label}</span>
              <p className="text-sm text-neutral-300 italic">Not assigned yet</p>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-dashed border-neutral-200 text-center">
          <p className="text-xs text-neutral-400">No education records yet.</p>
          <button
            onClick={() => {
              reset();
              setInstitutionSearch('');
              setQualificationSearch('');
              setFieldOfStudySearch('');
              setIsQualSelected(false);
              setIsFieldSelected(false);
              setShowDialog(true);
            }}
            className="mt-2 px-4 py-2 bg-[#ccd5ae] hover:bg-[#faedcd] text-neutral-950 text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Education Record
          </button>
        </div>
      </div>
    );
  }

  function renderRecords() {
    return (
      <div className="space-y-4">
        {educationList.map((edu) => {
          const qualInfo = allQualifications.find((q) => q.abbreviation === edu.qualification);
          return (
            <div key={edu.id} className="p-4 border border-neutral-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-neutral-900 text-sm">
                  {edu.qualification}
                  {qualInfo && <span className="font-medium text-xs text-neutral-500 ml-2">&bull; {qualInfo.fullName}</span>}
                </h4>
                <p className="text-xs text-neutral-600 mt-1">{edu.institutionName}</p>
                <span className="text-[10px] text-neutral-400 font-bold block mt-1">
                  Field: {edu.fieldOfStudy} | Class of {edu.graduationYear}
                </span>
              </div>
              <button
                onClick={() => handleDelete(edu.id)}
                disabled={deleteLoadingId === edu.id}
                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[10px] font-bold rounded-lg text-red-600 transition-all cursor-pointer disabled:opacity-50"
              >
                {deleteLoadingId === edu.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
