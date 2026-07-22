/// <reference types="vite/client" />

declare module '@/constants/NigeriaDegreeTypes' {
  export interface Qualification {
    abbreviation: string;
    full_name: string;
    category: string;
  }
  export interface QualificationGroup {
    institution_type: string;
    qualifications: Qualification[];
  }
  export interface DegreeTypes {
    tertiary_qualifications: QualificationGroup[];
  }
  const degreeTypes: DegreeTypes;
  export default degreeTypes;
}

declare module '@/constants/NigeriaInstitutions' {
  export interface Institution {
    name: string;
    value: string;
    abb: string;
  }
  const institutions: Institution[];
  export default institutions;
}

declare module '@/constants/NigeriaCourses' {
  export interface Course {
    code: string;
    name: string;
    degree: string;
  }
  export interface Faculty {
    faculty_id: string;
    faculty_name: string;
    courses: Course[];
  }
  export interface CoursesData {
    country: string;
    regulatory_body: string;
    standard_framework: string;
    total_faculties: number;
    faculties: Faculty[];
  }
  const courses: CoursesData;
  export default courses;
}
