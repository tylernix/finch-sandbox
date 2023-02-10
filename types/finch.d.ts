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

export interface Provider {
  provider_id: string;
  display_name: string;
  logo_src: string;
  company: Company;
  directory: Directory;
}

export interface Department {
  name: string;
  parent: {
    name: string | null;
  }
}

export interface Location {
  line1: string | null;
  line2?: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}

export interface Account {
  institution_name: string | null;
  account_name: string | null;
  account_type: string | null;
  account_number: string | null;
  routing_number: string | null;
}

export interface Person {
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

export interface Individual {
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

export interface Employment {
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
    type: string | null;
    subtype: string | null;
  };
  department: {
    name: string | null;
  };
  income: {
    unit: string | null;
    amount: number;
    currency: string | null;
    effectiveDate: string | null;
  };
  incomeHistory: {
    unit: string | null;
    amount: number | null;
    currency: string | null;
    effectiveDate: string | null;
  }[];
  customFields: {
    name: string | null;
    value: number | string | boolean
  }[];
}

export interface Payment {
  id: string;
  pay_period: {
    start_date: string;
    end_date: string;
  }
  pay_date: string;
  debit_date: string;
  company_debit: Currency;
  gross_pay: Currency;
  net_pay: Currency;
  employer_taxes: Currency;
  employee_taxes: Currency;
  individualIds: string[];
}

export interface Currency {
  amount: number;
  currency: string;
}

export interface PayStatement {
  individualId: string;
  type: string;
  paymentMethod: string;
  grossPay: number;
  netPay: number;
  totalHours: number;
  earnings: {
    type: string;
    name: string;
    amount: number;
    hours: number;
  }[];
  taxes: {
    name: string;
    type: string;
    amount: number;
    employer: boolean;
  }[];
  employeeDeductions: {
    name: string;
    amount: number;
    currency: string;
    preTax: boolean;
    type: string;
  }[];
  employerContributions: {
    name: string;
    amount: number;
    currency: string;
    type: string;
  }[];
}

export interface Company {
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

export interface NotImplementedError {
  statusCode: number,
  status: number,
  code: number,
  message: string,
  name: string
}

export interface SupportedBenefitFeature {
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

