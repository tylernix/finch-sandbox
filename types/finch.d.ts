type SandboxGlobal = {
  employeeSize: number,
  companyId: string,
  companyName: string,
  companyEmailDomain: string,
  companyDepartments: Department[],
  companyLocations: Location[]
}
type Sandbox = {
  company: Company,
  directory: Person[],
  individual: Individual[],
  employment: Employment[],
  payments: Payment[],
  payStatements: PayStatement[]
}

type Provider = {
  provider_id: string;
  display_name: string;
  logo_src: string;
  company: Company;
  directory: Directory;
}

type Department = {
  name: string;
  parent: {
    name: string | null;
  }
}

type Location = {
  line1: string | null;
  line2?: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}

type Account = {
  institution_name: string | null;
  account_name: string | null;
  account_type: string | null;
  account_number: string | null;
  routing_number: string | null;
}

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  departmentName: string;
  manager: {
    id: string | null;
  }
  isActive: boolean;
}

type Individual = {
  id: string;
  ssn?: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  preferredName: string | null;
  gender: string | null;
  ethnicity: string | null;
  dob: string;
  residence: Location | null;
  emails: {
    data: string | null;
    type: string | null;
  }[];
  phoneNumbers: {
    data: string | null;
    type: string | null;
  }[];
}

type Employment = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  title: string | null;
  manager: {
    id: string | null;
  }
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  classCode: string | null;
  location: Location | null;
  employment: {
    type: 'employee' | 'contractor' | null,
    subtype: 'full_time' | 'intern' | 'part_time' | 'temp' | 'seasonal' | 'individual_contractor' | null
  };
  department: {
    name: string | null;
  };
  income: {
    unit: 'yearly' | 'quarterly' | 'monthly'
    | 'semi_monthly' | ' bi_weekly' | 'weekly'
    | 'daily' | 'hourly' | 'fixed' | null;
    amount: number;
    currency: string | null;
    effectiveDate: string | null;
  };
  incomeHistory: {
    unit: 'yearly' | 'quarterly' | 'monthly'
    | 'semi_monthly' | ' bi_weekly' | 'weekly'
    | 'daily' | 'hourly' | 'fixed' | null;
    amount: number | null;
    currency: string | null;
    effectiveDate: string | null;
  }[];
  customFields: {
    name: string | null;
    value: number | string | boolean
  }[];
}

type Payment = {
  id: string;
  payPeriod: {
    startDate: string;
    endDate: string;
  }
  payDate: string;
  debitDate: string;
  companyDebit: Currency;
  grossPay: Currency;
  netPay: Currency;
  employerTaxes: Currency;
  employeeTaxes: Currency;
  individualIds: string[];
}

type Currency = {
  amount: number;
  currency: string;
}

type PayStatement = {
  paymentId: string;
  individualId: string;
  type: 'regular_payroll' | 'off_cycle_payroll' | 'one_time_payment' | null;
  paymentMethod: 'check' | 'direct_deposit' | null;
  grossPay: Currency,
  netPay: Currency,
  totalHours: number;
  earnings: Earning[];
  taxes: Tax[];
  employeeDeductions: Deduction[];
  employerContributions: Contribution[];
}

type Earning = {
  type: 'salary' | 'wage' | 'reimbursement'
  | 'overtime' | 'severance' | 'double_overtime'
  | 'pto' | 'sick' | 'bonus' | 'commission'
  | 'tips' | '1099' | 'other' | null;
  name: string;
  amount: number;
  hours: number;
  currency: string
}

type Tax = {
  name: string;
  type: 'state' | 'federal' | 'local' | 'fica' | null
  amount: number;
  employer: boolean;
  currency: string
}

type Deduction = {
  name: string;
  amount: number;
  currency: string;
  preTax: boolean;
  type: '401k' | '401k_roth' | '401k_loan'
  | '403b' | '403b_roth' | '457' | '457_roth'
  | 's125_medical' | 's125_dental' | 's125_vision'
  | 'hsa_pre' | 'hsa_post' | 'fsa_medical'
  | 'fsa_dependent_care' | 'simple_ira' | 'simple'
  | 'commuter' | 'custom_post_tax' | 'custom_pre_tax' | null
}

type Contribution = {
  name: string;
  amount: number;
  currency: string;
  type: '401k' | '401k_roth' | '401k_loan'
  | '403b' | '403b_roth' | '457' | '457_roth'
  | 's125_medical' | 's125_dental' | 's125_vision'
  | 'hsa_pre' | 'hsa_post' | 'fsa_medical'
  | 'fsa_dependent_care' | 'simple_ira' | 'simple'
  | 'commuter' | 'custom_post_tax' | 'custom_pre_tax' | null
}

type Company = {
  id: string;
  legal_name: string | null;
  entity: {
    type: string;
    subtype: string | null;
  };
  ein: string | null;
  primary_email: string | null;
  primary_phone_number: string | null;
  departments: Department[] | null;
  locations: Location[] | null;
  accounts: Account[] | null;
}

type NotImplementedError = {
  statusCode: number,
  status: number,
  code: number,
  message: string,
  name: string
}

type SupportedBenefitFeature = {
  type: string;
  companyContribution: string[];
  employeeDeduction: string[];
  catchUp: undefined;
  annualMaximum: boolean;
  frequencies: string[];
}

export type DataOrFactory<T> = T | ((args?: unknown) => T | Promise<T>);

export interface CompanyDataProvider<T> {
  companyV2: DataOrFactory<Company>;
  directoryV2: DataOrFactory<Person<T>[]>;
  individual: DataOrFactory<Individual<T> | undefined>;
  employment: DataOrFactory<Employment<T> | undefined>;
  payments: DataOrFactory<Payment<T>[]>;
  payStatements: DataOrFactory<{
    payStatements: PayStatement<T>[];
  }>;
  shouldReauthenticate: DataOrFactory<boolean>;
  // Benefits
  supportedBenefitFeaturesForCompany: DataOrFactory<SupportedBenefitFeature[]>;
  getAllBenefitsForCompany: DataOrFactory<any>;
  getBenefitForCompany: DataOrFactory<any>;
  createBenefitForCompany: DataOrFactory<any>;
  updateBenefitForCompany: DataOrFactory<any>;
  enrollIndividualBenefit: DataOrFactory<any>;
  unenrollIndividualBenefit: DataOrFactory<any>;
  getEnrolledIndividuals: DataOrFactory<any>;
  getEnrolledIndividualBenefitsPreFlight: DataOrFactory<any>;
  getEnrolledIndividualBenefits: DataOrFactory<any>;
}

