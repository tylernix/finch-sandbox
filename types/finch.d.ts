import { Company_Fields, Directory_Fields, Individual_Fields, Employment_Fields, Payment_Fields, Paystatement_Fields } from './finch-compatibility'

type SandboxGlobal = {
  employeeSize: number,
  companyId: string,
  companyName: string,
  companyEmailDomain: string,
  companyDepartments: IDepartment[],
  companyLocations: ILocation[]
}
type Sandbox = {
  company: Company | NotImplementedError,
  directory: Directory[] | NotImplementedError,
  individual: Individual[] | NotImplementedError,
  employment: Employment[] | NotImplementedError,
  payments: Payment[] | NotImplementedError,
  payStatements: PayStatement[] | NotImplementedError,
}

type ISandbox = {
  company: ICompany,
  directory: IDirectory[],
  individual: IIndividual[],
  employment: Employment[],
  payments: Payment[],
  payStatements: PayStatement[],
}

type Provider = {
  id: string;
  // 'adp_run' |
  // 'bamboo_hr' |
  // 'bamboo_hr_api' |
  // 'bob' |
  // 'gusto' |
  // 'humaans' |
  // 'insperity' |
  // 'justworks' |
  // 'namely' |
  // 'paychex_flex' |
  // 'paychex_flex_api' |
  // 'paycom' |
  // 'paycom_api' |
  // 'paylocity' |
  // 'paylocity_api' |
  // 'personio' |
  // 'quickbooks' |
  // 'rippling' |
  // 'adp_run' |
  // 'sage_hr' |
  // 'sapling' |
  // 'sequoia_one' |
  // 'square_payroll' |
  // 'trinet' |
  // 'trinet_api' |
  // 'ulti_pro' |
  // 'wave' |
  // 'workday' |
  // 'zenefits' |
  // 'zenefits_api'
  // ;
  display_name: string;
  products: string[];
  icon: string;
  logo: string;
  mfa_required: boolean;
  primary_color: string;
  manual: boolean;
  category: string;
  compatibility: {
    company: Company_Fields | null;
    directory: Directory_Fields | null;
    individual: Individual_Fields | null;
    employment: Employment_Fields | null;
    payment: Payment_Fields | null;
    pay_statement: Paystatement_Fields | null;
  }
}

type Department = {
  name: string | null;
  parent: {
    name: string | null;
  }
}

type IDepartment = {
  name: string;
  parent: {
    name: string;
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

type ILocation = {
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

type Account = {
  institution_name: string | null;
  account_name: string | null;
  account_type: string | null;
  account_number: string | null;
  routing_number: string | null;
}

type IAccount = {
  institution_name: string;
  account_name: string;
  account_type: string;
  account_number: string;
  routing_number: string;
}

type Directory = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  department: {
    name: string | null
  },
  manager: {
    id: string | null;
  }
  is_active: boolean;
}

type IDirectory = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  department: {
    name: string
  },
  manager: {
    id: string | null;
  }
  is_active: boolean;
}

type Individual = {
  id: string;
  ssn?: string;
  first_name: string | null;
  last_name: string | null;
  middle_name: string | null;
  preferred_name: string | null;
  gender: string | null;
  ethnicity: string | null;
  dob: string | null;
  residence: Location | null;
  emails: Email[] | null;
  phone_numbers: PhoneNumber[] | null;
}

type IIndividual = {
  id: string;
  ssn?: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  preferred_name: string | null;
  gender: string;
  ethnicity: string;
  dob: string;
  residence: Location;
  emails: IEmail[];
  phone_numbers: IPhoneNumber[];
}

type Email = {
  data: string | null;
  type: string | null;
}

type IEmail = {
  data: string;
  type: string;
}

type PhoneNumber = {
  data: string | null;
  type: string | null;
}

type IPhoneNumber = {
  data: string;
  type: string;
}

type Employment = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  title: string | null;
  manager: {
    id: string | null;
  }
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  class_code: string | null;
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
    effective_date: string | null;
  };
  income_history: {
    unit: 'yearly' | 'quarterly' | 'monthly'
    | 'semi_monthly' | ' bi_weekly' | 'weekly'
    | 'daily' | 'hourly' | 'fixed' | null;
    amount: number | null;
    currency: string | null;
    effective_date: string | null;
  }[];
  custom_fields: {
    name: string | null;
    value: number | string | boolean
  }[];
}

type IEmployment = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  title: string;
  manager: {
    id: string;
  }
  start_date: string;
  end_date: string;
  is_active: boolean;
  class_code: string;
  location: Location;
  employment: {
    type: 'employee' | 'contractor',
    subtype: 'full_time' | 'intern' | 'part_time' | 'temp' | 'seasonal' | 'individual_contractor'
  };
  department: {
    name: string;
  };
  income: {
    unit: 'yearly' | 'quarterly' | 'monthly'
    | 'semi_monthly' | ' bi_weekly' | 'weekly'
    | 'daily' | 'hourly' | 'fixed';
    amount: number;
    currency: string;
    effective_date: string;
  };
  income_history: {
    unit: 'yearly' | 'quarterly' | 'monthly'
    | 'semi_monthly' | ' bi_weekly' | 'weekly'
    | 'daily' | 'hourly' | 'fixed';
    amount: number;
    currency: string;
    effective_date: string;
  }[];
  custom_fields: {
    name: string;
    value: number | string | boolean
  }[];
}

type Payment = {
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
  individual_ids: string[];
}

type IPayment = {
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
  individual_ids: string[];
}

type Currency = {
  amount: number;
  currency: string;
}

type PayStatement = {
  payment_id?: string; // payment_id is optional because it is eventually removed in /api/employer/pay-statement.64
  individual_id: string;
  type: 'regular_payroll' | 'off_cycle_payroll' | 'one_time_payment' | null;
  payment_method: 'check' | 'direct_deposit' | null;
  gross_pay: Currency,
  net_pay: Currency,
  total_hours: number;
  earnings: Earning[];
  taxes: Tax[];
  employee_deductions: Deduction[];
  employer_contributions: Contribution[];
}

type IPayStatement = {
  payment_id: string;
  individual_id: string;
  type: 'regular_payroll' | 'off_cycle_payroll' | 'one_time_payment';
  payment_method: 'check' | 'direct_deposit';
  gross_pay: Currency,
  net_pay: Currency,
  total_hours: number;
  earnings: IEarning[];
  taxes: ITax[];
  employee_deductions: IDeduction[];
  employer_contributions: IContribution[];
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

type IEarning = {
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

type ITax = {
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
  pre_tax: boolean;
  type: '401k' | '401k_roth' | '401k_loan'
  | '403b' | '403b_roth' | '457' | '457_roth'
  | 's125_medical' | 's125_dental' | 's125_vision'
  | 'hsa_pre' | 'hsa_post' | 'fsa_medical'
  | 'fsa_dependent_care' | 'simple_ira' | 'simple'
  | 'commuter' | 'custom_post_tax' | 'custom_pre_tax' | null
}

type IDeduction = {
  name: string;
  amount: number;
  currency: string;
  pre_tax: boolean;
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

type IContribution = {
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
    type: string | null;
    subtype: string | null;
  };
  ein: string | null;
  primary_email: string | null;
  primary_phone_number: string | null;
  departments: Department[] | null;
  locations: Location[] | null;
  accounts: Account[] | null;
}

type ICompany = {
  id: string;
  legal_name: string;
  entity: {
    type: string;
    subtype: string;
  };
  ein: string;
  primary_email: string;
  primary_phone_number: string;
  departments: IDepartment[];
  locations: ILocation[];
  accounts: IAccount[];
}

type NotImplementedError = {
  statusCode: number,
  status: number,
  code: number,
  message: string,
  name: string
}