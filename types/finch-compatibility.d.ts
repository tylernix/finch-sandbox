

export interface Company_Fields {
    id: boolean;
    legal_name: boolean;
    entity: {
        type: boolean;
        subtype: boolean;
    };
    primary_email: boolean;
    primary_phone_number: boolean;
    ein: boolean;
    department: boolean;
    departments: {
        name: boolean;
        parent: {
            name: boolean;
        }
    }
    location: boolean;
    locations: Location_Fields;
    account: boolean;
    accounts: {
        routing_number: boolean;
        account_name: boolean;
        institution_name: boolean;
        account_type: boolean;
        account_number: boolean;
    }
}

export interface Directory_Fields {
    id: boolean;
    first_name: boolean;
    middle_name: boolean;
    last_name: boolean;
    manager: {
        id: boolean;
    }
    department: {
        name: boolean;
    }
    is_active: boolean;
}

export interface Individual_Fields {
    id: boolean;
    first_name: boolean;
    middle_name: boolean;
    last_name: boolean;
    preferred_name: boolean;
    email: boolean;
    emails: {
        data: boolean;
        type: boolean;
    },
    phone_number: boolean;
    phone_numbers: {
        data: boolean;
        type: boolean;
    },
    dob: boolean;
    residence: Location_Fields;
    gender: boolean;
    ethnicity: boolean;
}

export interface Employment_Fields {
    id: boolean;
    first_name: boolean;
    middle_name: boolean;
    last_name: boolean;
    title: boolean;
    manager: {
        id: boolean;
    },
    department: {
        name: boolean;
    },
    employment: {
        type: boolean;
        subtype: boolean;
    },
    start_date: boolean;
    end_date: boolean;
    is_active: boolean;
    location: Location_Fields;
    income: {
        unit: boolean;
        amount: boolean;
        currency: boolean;
        effective_date: boolean;

    };
    income_history: boolean;
    class_code: boolean;
    custom_fields: boolean;
}

export interface Payment_Fields {
    id: boolean;
    pay_period: {
        start_date: boolean;
        end_date: boolean;
    },
    pay_date: boolean;
    debit_date: boolean;
    company_debit: boolean;
    gross_pay: boolean;
    net_pay: boolean;
    employer_taxes: boolean;
    employee_taxes: boolean;
    individual_ids: boolean;
}

export interface Paystatement_Fields {
    individual_id: boolean;
    type: boolean;
    payment_method: boolean;
    total_hours: boolean;
    gross_pay: boolean;
    net_pay: boolean;
    earning: boolean;
    earnings: {
        type: boolean;
        name: boolean;
        amount: boolean;
        currency: boolean;
        hours: boolean;
    },
    employee_deduction: boolean;
    employee_deductions: {
        type: boolean;
        name: boolean;
        amount: boolean;
        currency: boolean;
        pre_tax: boolean;
    },
    employer_contribution: boolean;
    employer_contributions: {
        type: boolean;
        name: boolean;
        amount: boolean;
        currency: boolean;
    },
    tax: boolean;
    taxes: {
        type: boolean;
        name: boolean;
        amount: boolean;
        currency: boolean;
        employer: boolean;
    },
}

export interface Location_Fields {
    line1: boolean;
    line2: boolean;
    city: boolean;
    state: boolean;
    postal_code: boolean;
    country: boolean;
}