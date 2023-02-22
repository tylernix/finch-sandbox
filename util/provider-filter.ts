import { Provider, Sandbox, ISandbox, Company, Account, Location, Department, Individual, Email, PhoneNumber, Income, Employment, Payment, PayStatement, Earning, Tax, Deduction, Contribution } from "types/finch";

const NotImplementedError = {
    "statusCode": 501,
    "status": 501,
    "code": 501,
    "message": "Not Implemented",
    "name": "not_implemented_error"
}

export default function filterSandboxByProvider(sandbox: ISandbox, provider: Provider): Sandbox {
    const company = provider.compatibility.company
    const directory = provider.compatibility.directory
    const individual = provider.compatibility.individual
    const employment = provider.compatibility.employment
    const payment = provider.compatibility.payment
    const pay_statement = provider.compatibility.pay_statement


    const _sandbox: Sandbox = {
        company: (company)
            ? {
                id: sandbox.company.id,
                legal_name: (company.legal_name) ? sandbox.company.legal_name : null,
                entity: {
                    type: (company.entity.type) ? sandbox.company.entity.type : null,
                    subtype: (company.entity.subtype) ? sandbox.company.entity.subtype : null,
                },
                ein: (company.ein) ? sandbox.company.ein : null,
                primary_email: (company.primary_email) ? sandbox.company.primary_email : null,
                primary_phone_number: (company.primary_phone_number) ? sandbox.company.primary_phone_number : null,
                departments: (company.department)
                    ? sandbox.company.departments.map(dept => {
                        return {
                            name: (company.departments.name) ? dept.name : null,
                            parent: {
                                name: (company.departments.parent.name) ? dept.parent.name : null,
                            }
                        } as Department
                    })
                    : null,
                locations: (company.location)
                    ? sandbox.company.locations.map(location => {
                        return {
                            line1: (company.locations.line1) ? location.line1 : null,
                            line2: (company.locations.line2) ? location.line2 : null,
                            city: (company.locations.city) ? location.city : null,
                            state: (company.locations.state) ? location.state : null,
                            postal_code: (company.locations.postal_code) ? location.postal_code : null,
                        } as Location
                    })
                    : null,
                accounts: (company.account)
                    ? sandbox.company.accounts.map(account => {
                        return {
                            institution_name: (company.accounts.institution_name) ? account.institution_name : null,
                            account_name: (company.accounts.account_name) ? account.account_name : null,
                            account_number: (company.accounts.account_number) ? account.account_number : null,
                            account_type: (company.accounts.account_type) ? account.account_type : null,
                            routing_number: (company.accounts.routing_number) ? account.routing_number : null,
                        } as Account
                    })
                    : null,
            } as Company
            : NotImplementedError,
        directory: (directory)
            ? sandbox.directory.map(person => {
                return {
                    id: person.id,
                    first_name: (directory.first_name) ? person.first_name : null,
                    middle_name: (directory.middle_name) ? person.middle_name : null,
                    last_name: (directory.last_name) ? person.last_name : null,
                    manager: {
                        id: (directory.manager.id) ? person.manager.id : null,
                    },
                    department: {
                        name: (directory.department.name) ? person.department.name : null,
                    },
                    is_active: person.is_active,
                }
            })
            : NotImplementedError,
        individual: (individual)
            ? sandbox.individual.map(ind => {
                return {
                    id: ind.id,
                    ssn: ind.ssn,
                    first_name: (individual.first_name) ? ind.first_name : null,
                    middle_name: (individual.middle_name) ? ind.middle_name : null,
                    last_name: (individual.last_name) ? ind.last_name : null,
                    preferred_name: (individual.preferred_name) ? ind.preferred_name : null,
                    dob: (individual.dob) ? ind.dob : null,
                    emails: (individual.email)
                        ? ind.emails.map(email => {
                            return {
                                data: (individual.emails.data) ? email.data : null,
                                type: (individual.emails.type) ? email.type : null,
                            } as Email
                        })
                        : null,
                    phone_numbers: (individual.phone_number)
                        ? ind.phone_numbers.map(phone => {
                            return {
                                data: (individual.phone_numbers.data) ? phone.data : null,
                                type: (individual.phone_numbers.data) ? phone.type : null,
                            } as PhoneNumber
                        })
                        : null,
                    gender: (individual.gender) ? ind.gender : null,
                    ethnicity: (individual.ethnicity) ? ind.ethnicity : null,
                    residence: (individual.residence)
                        ? {
                            line1: (individual.residence.line1) ? ind.residence.line1 : null,
                            line2: (individual.residence.line2) ? ind.residence.line2 : null,
                            city: (individual.residence.city) ? ind.residence.city : null,
                            state: (individual.residence.state) ? ind.residence.state : null,
                            postal_code: (individual.residence.postal_code) ? ind.residence.postal_code : null,
                            country: (individual.residence.country) ? ind.residence.country : null,
                        } as Location
                        : null,
                } as Individual
            })
            : NotImplementedError,
        employment: (employment)
            ? sandbox.employment.map(employee => {
                return {
                    id: employee.id,
                    first_name: (employment.first_name) ? employee.first_name : null,
                    middle_name: (employment.middle_name) ? employee.middle_name : null,
                    last_name: (employment.last_name) ? employee.last_name : null,
                    title: (employment.title) ? employee.title : null,
                    manager: {
                        id: (employment.manager.id) ? employee.manager.id : null,
                    },
                    employment: {
                        type: (employment.employment.type) ? employee.employment.type : null,
                        subtype: (employment.employment.subtype) ? employee.employment.subtype : null,
                    },
                    department: {
                        name: (employment.department.name) ? employee.department.name : null,
                    },
                    start_date: (employment.start_date) ? employee.start_date : null,
                    end_date: (employment.end_date) ? employee.end_date : null,
                    is_active: (employment.is_active) ? employee.is_active : null,
                    class_code: (employment.class_code) ? employee.class_code : null,
                    location: (employment.location)
                        ? {
                            line1: (employment.location.line1) ? employee.location.line1 : null,
                            line2: (employment.location.line2) ? employee.location.line2 : null,
                            city: (employment.location.city) ? employee.location.city : null,
                            state: (employment.location.state) ? employee.location.state : null,
                            postal_code: (employment.location.postal_code) ? employee.location.postal_code : null,
                            country: (employment.location.country) ? employee.location.country : null,
                        } as Location
                        : null,
                    income: (employment.income)
                        ? {
                            unit: (employment.income.unit) ? employee.income.unit : null,
                            amount: (employment.income.amount) ? employee.income.amount : null,
                            currency: (employment.income.currency) ? employee.income.currency : null,
                            effective_date: (employment.income.effective_date) ? employee.income.effective_date : null
                        } as Income
                        : null,
                    income_history: (employment.income_history)
                        ? employee.income_history.map(income => {
                            return {
                                unit: income.unit,
                                amount: income.amount,
                                currency: income.currency,
                                effective_date: income.effective_date
                            } as Income
                        })
                        : null,
                    custom_fields: (employment.custom_fields) ? employee.custom_fields : null,
                } as Employment
            })
            : NotImplementedError,
        payments: (payment)
            ? sandbox.payments.map(pay => {
                return {
                    id: pay.id,
                    pay_period: {
                        start_date: (payment.pay_period.start_date) ? pay.pay_period.start_date : null,
                        end_date: (payment.pay_period.end_date) ? pay.pay_period.end_date : null,
                    },
                    pay_date: (payment.pay_date) ? pay.pay_date : null,
                    debit_date: (payment.debit_date) ? pay.debit_date : null,
                    company_debit: (payment.company_debit)
                        ? {
                            amount: pay.company_debit.amount,
                            currency: pay.company_debit.currency,
                        }
                        : null,
                    gross_pay: (payment.gross_pay)
                        ? {
                            amount: pay.gross_pay.amount,
                            currency: pay.gross_pay.currency,
                        }
                        : null,
                    net_pay: (payment.net_pay)
                        ? {
                            amount: pay.net_pay.amount,
                            currency: pay.net_pay.currency,
                        }
                        : null,
                    employee_taxes: (payment.employee_taxes)
                        ? {
                            amount: pay.employee_taxes.amount,
                            currency: pay.employee_taxes.currency,
                        }
                        : null,
                    employer_taxes: (payment.employer_taxes)
                        ? {
                            amount: pay.employer_taxes.amount,
                            currency: pay.employer_taxes.currency,
                        }
                        : null,
                    individual_ids: (payment.individual_ids) ? pay.individual_ids : null
                } as Payment
            })
            : NotImplementedError,
        payStatements: (pay_statement)
            ? sandbox.payStatements.map(statement => {
                return {
                    individual_id: (pay_statement.individual_id) ? statement.individual_id : null,
                    type: (pay_statement.type) ? statement.type : null,
                    payment_method: (pay_statement.payment_method) ? statement.payment_method : null,
                    total_hours: (pay_statement.total_hours) ? statement.total_hours : null,
                    gross_pay: (pay_statement.gross_pay)
                        ? {
                            amount: statement.gross_pay.amount,
                            currency: statement.gross_pay.currency,
                        }
                        : null,
                    net_pay: (pay_statement.net_pay)
                        ? {
                            amount: statement.net_pay.amount,
                            currency: statement.net_pay.currency,
                        }
                        : null,
                    earnings: (pay_statement.earning)
                        ? statement.earnings.map(earning => {
                            return {
                                type: (pay_statement.earnings.type) ? earning.type : null,
                                name: (pay_statement.earnings.name) ? earning.name : null,
                                amount: (pay_statement.earnings.amount) ? earning.amount : null,
                                currency: (pay_statement.earnings.currency) ? earning.currency : null,
                            } as Earning
                        })
                        : null,
                    taxes: (pay_statement.tax)
                        ? statement.taxes.map(tax => {
                            return {
                                type: (pay_statement.taxes.type) ? tax.type : null,
                                name: (pay_statement.taxes.name) ? tax.name : null,
                                employer: (pay_statement.taxes.employer) ? tax.employer : null,
                                amount: (pay_statement.taxes.amount) ? tax.amount : null,
                                currency: (pay_statement.taxes.currency) ? tax.currency : null,
                            } as Tax
                        })
                        : null,
                    employee_deductions: (pay_statement.employee_deduction)
                        ? statement.employee_deductions.map(deduction => {
                            return {
                                type: (pay_statement.employee_deductions.type) ? deduction.type : null,
                                name: (pay_statement.employee_deductions.name) ? deduction.name : null,
                                amount: (pay_statement.employee_deductions.amount) ? deduction.amount : null,
                                currency: (pay_statement.employee_deductions.currency) ? deduction.currency : null,
                                pre_tax: (pay_statement.employee_deductions.pre_tax) ? deduction.pre_tax : null,
                            } as Deduction
                        })
                        : null,
                    employer_contributions: (pay_statement.employer_contribution)
                        ? statement.employer_contributions.map(contribution => {
                            return {
                                type: (pay_statement.employer_contributions.type) ? contribution.type : null,
                                name: (pay_statement.employee_deductions.name) ? contribution.name : null,
                                amount: (pay_statement.employee_deductions.amount) ? contribution.amount : null,
                                currency: (pay_statement.employee_deductions.currency) ? contribution.currency : null,
                            } as Contribution
                        })
                        : null,
                } as PayStatement
            })
            : NotImplementedError,
    }

    return _sandbox
}

/*
newGustoSandbox.company?.accounts?.forEach(account => {
    if (account.account_number != null) {
        let mask = ''
        for (let i = 0; i < account.account_number.length - 4; i++) {
            mask += 'X'
        }
        account.account_number = mask + account.account_number.substring(account.account_number.length - 4)
    }
})
*/