
export const FINCH_PROVIDERS = [
    {
        "id": "adp_run",
        "display_name": "Run Powered by ADP",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/adpIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/adpLogo.svg",
        "mfa_required": false,
        "primary_color": "#cf261d",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: false
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: true,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: false
                },
                department: {
                    name: false
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: false
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: true,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: false,
                    end_date: false,
                },
                pay_date: true,
                debit_date: false,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },
            }
        }
    },
    {
        "id": "bamboo_hr",
        "display_name": "BambooHR",
        "products": [
            "company",
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/bambooHrIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/bambooHrLogo.svg",
        "mfa_required": false,
        "primary_color": "#ff5745",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: true,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "bamboo_hr_api",
        "display_name": "BambooHR (API)",
        "products": [
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/bambooHrIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/bambooHrLogo.svg",
        "mfa_required": false,
        "primary_color": "#ff5745",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: null,
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: false,
                    postal_code: false,
                    country: false,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "bob",
        "display_name": "bob",
        "products": [
            "company",
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/bobIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/bobLogo.png",
        "mfa_required": false,
        "primary_color": "#ff962b",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: false,
                entity: {
                    type: false,
                    subtype: false
                },
                primary_email: false,
                primary_phone_number: false,
                ein: false,
                department: false,
                departments: {
                    name: false,
                    parent: {
                        name: false
                    }
                },
                location: false,
                locations: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: false,
                    postal_code: false,
                    country: false
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null,
        }
    },
    // {
    //     "id": "greenhouse",
    //     "display_name": "Greenhouse",
    //     "products": [
    //         "jobs",
    //         "candidates",
    //         "applications",
    //         "offers"
    //     ],
    //     "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/greenhouseIcon.png",
    //     "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/greenhouseLogo.png",
    //     "mfa_required": false,
    //     "primary_color": "#24A47F",
    //     "manual": false,
    //     "category": "ats"
    // },
    {
        "id": "gusto",
        "display_name": "Gusto",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement",
            "deduction",
            "benefits"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/gustoIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/gustoLogo.svg",
        "mfa_required": true,
        "primary_color": "#f45d47",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: false,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: true,
                custom_fields: true
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: true,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "humaans",
        "display_name": "Humaans",
        "products": [
            "company",
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/humaansIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/humaansLogo.svg",
        "mfa_required": false,
        "primary_color": "#EB615C",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: false,
                    subtype: false
                },
                primary_email: true,
                primary_phone_number: true,
                ein: false,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: true,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null,
        }
    },
    {
        "id": "insperity",
        "display_name": "Insperity",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/insperityIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/insperityLogo.svg",
        "mfa_required": true,
        "primary_color": "#439639",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: false,
                locations: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: false,
                    postal_code: false,
                    country: false
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: false,
                gross_pay: true,
                net_pay: true,
                employer_taxes: false,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: false,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "justworks",
        "display_name": "Justworks",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/justworksIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/justworksLogo.svg",
        "mfa_required": true,
        "primary_color": "#39b6e9",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: false,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: false,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: true
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: true,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: false,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    // {
    //     "id": "lever",
    //     "display_name": "Lever",
    //     "products": [
    //         "jobs",
    //         "candidates",
    //         "applications",
    //         "offers"
    //     ],
    //     "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/leverIcon.png",
    //     "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/leverLogo.png",
    //     "mfa_required": false,
    //     "primary_color": "#262933",
    //     "manual": false,
    //     "category": "ats"
    // },
    {
        "id": "namely",
        "display_name": "Namely",
        "products": [
            "company",
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/namelyIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/namelyLogo.svg",
        "mfa_required": false,
        "primary_color": "#276DF6",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: false
                },
                primary_email: false,
                primary_phone_number: false,
                ein: false,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "paychex_flex",
        "display_name": "Paychex Flex",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/paychexFlexIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/paychexFlexLogo.svg",
        "mfa_required": false,
        "primary_color": "#004b8d",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: false,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: false,
                    institution_name: true,
                    account_type: false,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "paychex_flex_api",
        "display_name": "Paychex Flex (API)",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/paychexFlexIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/paychexFlexLogo.svg",
        "mfa_required": false,
        "primary_color": "#004b8d",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: false,
                primary_phone_number: false,
                ein: false,
                department: false,
                departments: {
                    name: false,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: false
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: false
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "paycom",
        "display_name": "Paycom",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/paycomIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/paycomLogo.png",
        "mfa_required": true,
        "primary_color": "#006242",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: false
                },
                primary_email: false,
                primary_phone_number: false,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                title: false,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: false
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: true,
                    postal_code: false,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: true,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: false,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: false,
                payment_method: false,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "paycom_api",
        "display_name": "Paycom (API)",
        "products": [
            "directory",
            "individual",
            "employment",
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/paycomIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/paycomLogo.png",
        "mfa_required": true,
        "primary_color": "#006242",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: null,
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: false,
                phone_numbers: {
                    data: false,
                    type: false
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "paylocity",
        "display_name": "Paylocity",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/paylocityIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/paylocityLogo.svg",
        "mfa_required": true,
        "primary_color": "#ff6611",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: false
                },
                primary_email: false,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: true,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: true,
                custom_fields: true
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: true,
                company_debit: false,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: false,
                employee_deductions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                    pre_tax: false,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "paylocity_api",
        "display_name": "Paylocity (API)",
        "products": [
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/paylocityIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/paylocityLogo.svg",
        "mfa_required": true,
        "primary_color": "#ff6611",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: null,
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: true,
                custom_fields: true
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: false,
                gross_pay: true,
                net_pay: true,
                employer_taxes: false,
                employee_taxes: false,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: false,
                payment_method: false,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: false,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "personio",
        "display_name": "Personio",
        "products": [
            "company",
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/personioIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/personioLogo.svg",
        "mfa_required": false,
        "primary_color": "#010000",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: false,
                    subtype: false
                },
                primary_email: false,
                primary_phone_number: false,
                ein: false,
                department: false,
                departments: {
                    name: false,
                    parent: {
                        name: false
                    }
                },
                location: false,
                locations: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: false,
                    postal_code: false,
                    country: false
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: false,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: false,
                phone_numbers: {
                    data: false,
                    type: false
                },
                dob: false,
                residence: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: false,
                    postal_code: false,
                    country: false
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: false
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: false,
                    postal_code: false,
                    country: false,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "quickbooks",
        "display_name": "Quickbooks",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/quickbooksIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/quickbooksLogo.svg",
        "mfa_required": true,
        "primary_color": "#39b6e9",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: false,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: false,
                    account_name: true,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: false
                },
                department: {
                    name: false
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: false
                },
                department: {
                    name: false
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: false,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: true,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "rippling",
        "display_name": "Rippling",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/ripplingIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/ripplingLogo.png",
        "mfa_required": true,
        "primary_color": "#000000",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: true,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: false,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "sage_hr",
        "display_name": "Sage HR",
        "products": [
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/sageHrIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/sageHrLogo.svg",
        "mfa_required": false,
        "primary_color": "#00d639",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: null,
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: false
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: false,
                    line2: false,
                    city: false,
                    state: false,
                    postal_code: false,
                    country: false,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "sapling",
        "display_name": "Sapling",
        "products": [
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/saplingIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/saplingLogo.svg",
        "mfa_required": false,
        "primary_color": "#4524cd",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: null,
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: false
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "sequoia_one",
        "display_name": "Sequoia One",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/sequoiaIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/sequoiaLogo.png",
        "mfa_required": true,
        "primary_color": "#8BCF24",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: false,
                primary_phone_number: false,
                ein: false,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: false,
                gross_pay: true,
                net_pay: true,
                employer_taxes: false,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: false,
                payment_method: false,
                total_hours: false,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "square_payroll",
        "display_name": "Square Payroll",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/squareIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/squareLogo.svg",
        "mfa_required": true,
        "primary_color": "#000000",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: false,
                departments: {
                    name: false,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: false
                },
                department: {
                    name: false
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: false,
                phone_numbers: {
                    data: false,
                    type: false
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: false
                },
                department: {
                    name: false
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: false,
                employee_deductions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                    pre_tax: false,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "trinet",
        "display_name": "TriNet",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/trinetIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/trinetLogo.svg",
        "mfa_required": true,
        "primary_color": "#f47b29",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: true,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "trinet_api",
        "display_name": "TriNet (API)",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/trinetIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/trinetLogo.svg",
        "mfa_required": true,
        "primary_color": "#f47b29",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: false,
                    subtype: false
                },
                primary_email: false,
                primary_phone_number: false,
                ein: false,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: true,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: true,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: false,
                gross_pay: false,
                net_pay: false,
                employer_taxes: false,
                employee_taxes: false,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: false,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "ulti_pro",
        "display_name": "UltiPro",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/ultiproIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/ultiproLogo.svg",
        "mfa_required": false,
        "primary_color": "#4fa046",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: false,
                primary_phone_number: true,
                ein: true,
                department: false,
                departments: {
                    name: false,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: false
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: false
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: false
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: false,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: false,
                payment_method: false,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: false,
                employee_deductions: {
                    type: false,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: true,
                employer_contributions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "wave",
        "display_name": "Wave",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/waveIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/waveLogo.svg",
        "mfa_required": true,
        "primary_color": "#001B65",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: false,
                primary_phone_number: true,
                ein: true,
                department: false,
                departments: {
                    name: false,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: false,
                accounts: {
                    routing_number: false,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: false
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: false
                },
                department: {
                    name: false
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: false,
                phone_numbers: {
                    data: false,
                    type: false
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: false,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: false,
                manager: {
                    id: false
                },
                department: {
                    name: false
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: false
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: true,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: false,
                employee_deductions: {
                    type: false,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "workday",
        "display_name": "Workday",
        "products": [
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/workdayIcon.svg",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/workdayLogo.svg",
        "mfa_required": false,
        "primary_color": "#0875e1",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: null,
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: false
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: false,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: false
            },
            payment: null,
            pay_statement: null
        }
    },
    {
        "id": "zenefits",
        "display_name": "Zenefits",
        "products": [
            "company",
            "directory",
            "individual",
            "employment",
            "payment",
            "pay_statement"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/zenefitsIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/zenefitsLogo.svg",
        "mfa_required": true,
        "primary_color": "#ff5745",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: true,
                primary_phone_number: true,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: true
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: false,
                    institution_name: false,
                    account_type: false,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: false,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                title: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: true,
                class_code: false,
                custom_fields: true
            },
            payment: {
                id: true,
                pay_period: {
                    start_date: true,
                    end_date: true,
                },
                pay_date: true,
                debit_date: false,
                company_debit: true,
                gross_pay: true,
                net_pay: true,
                employer_taxes: true,
                employee_taxes: true,
                individual_ids: true,

            },
            pay_statement: {
                individual_id: true,
                type: true,
                payment_method: true,
                total_hours: true,
                gross_pay: true,
                net_pay: true,
                earning: true,
                earnings: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    hours: true,
                },
                employee_deduction: true,
                employee_deductions: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    pre_tax: true,
                },
                employer_contribution: false,
                employer_contributions: {
                    type: false,
                    name: false,
                    amount: false,
                    currency: false,
                },
                tax: true,
                taxes: {
                    type: true,
                    name: true,
                    amount: true,
                    currency: true,
                    employer: true
                },

            }
        }
    },
    {
        "id": "zenefits_api",
        "display_name": "Zenefits (API)",
        "products": [
            "company",
            "directory",
            "individual",
            "employment"
        ],
        "icon": "https://finch-logos.s3.us-west-2.amazonaws.com/zenefitsIcon.png",
        "logo": "https://finch-logos.s3.us-west-2.amazonaws.com/zenefitsLogo.svg",
        "mfa_required": true,
        "primary_color": "#ff5745",
        "manual": false,
        "category": "hris",
        compatibility: {
            company: {
                id: true,
                legal_name: true,
                entity: {
                    type: true,
                    subtype: true
                },
                primary_email: false,
                primary_phone_number: false,
                ein: true,
                department: true,
                departments: {
                    name: true,
                    parent: {
                        name: false
                    }
                },
                location: true,
                locations: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                account: true,
                accounts: {
                    routing_number: true,
                    account_name: false,
                    institution_name: true,
                    account_type: true,
                    account_number: true
                }
            },
            directory: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                is_active: true
            },
            individual: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                preferred_name: true,
                email: true,
                emails: {
                    data: true,
                    type: true
                },
                phone_number: true,
                phone_numbers: {
                    data: true,
                    type: true
                },
                dob: true,
                residence: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true
                },
                gender: true,
                ethnicity: false,
                ssn: true
            },
            employment: {
                id: true,
                first_name: true,
                middle_name: false,
                last_name: true,
                title: false,
                manager: {
                    id: true
                },
                department: {
                    name: true
                },
                employment: {
                    type: true,
                    subtype: true
                },
                start_date: true,
                end_date: true,
                is_active: true,
                location: {
                    line1: true,
                    line2: true,
                    city: true,
                    state: true,
                    postal_code: true,
                    country: true,
                },
                income: {
                    unit: true,
                    amount: true,
                    currency: true,
                    effective_date: true,
                },
                income_history: false,
                class_code: false,
                custom_fields: true
            },
            payment: null,
            pay_statement: null
        }
    }
]