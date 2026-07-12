// ─── Settings Domain Types ───────────────────────────────────────────

export interface Address {
  state: string;
  lga: string;
  settlement: string;
  street: string;
}

export interface Settings {
  companyName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  description: string;
}

export type SettingsResponse = Settings;
