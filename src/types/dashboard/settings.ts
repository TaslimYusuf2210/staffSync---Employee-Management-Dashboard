// ─── Settings Domain Types ───────────────────────────────────────────

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
  description: string;
}

export interface Settings {
  admin: AdminProfile;
  company: CompanyInfo;
}
