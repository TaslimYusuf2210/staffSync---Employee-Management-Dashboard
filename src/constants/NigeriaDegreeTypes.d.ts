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

declare const degreeTypes: DegreeTypes;

export default degreeTypes;
