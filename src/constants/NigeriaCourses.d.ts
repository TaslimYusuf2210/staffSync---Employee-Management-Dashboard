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

declare const courses: CoursesData;

export default courses;
