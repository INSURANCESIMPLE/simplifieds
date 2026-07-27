export type Page =
  | 'home'
  | 'term'
  | 'whole-life'
  | 'iul'
  | 'annuities'
  | 'calculator'
  | 'medicare'
  | 'resources'
  | 'faq'
  | 'consultation'
  | 'confirmation'
  | 'privacy'
  | 'terms';

export interface BookingDetails {
  date: string;
  time: string;
  advisor: string;
  reason: string;
  name: string;
  email: string;
  phone: string;
}

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: number;
  coverageAmount?: string;
  interest: string;
}
