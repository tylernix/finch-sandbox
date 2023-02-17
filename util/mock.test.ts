const mock = require('./mock');
import moment from 'moment'
import { faker } from '@faker-js/faker'
import { Company, Contribution, Deduction, Earning, ISandbox, Payment, PayStatement, Sandbox, SandboxGlobal, Tax } from 'types/finch';
import payStatement from 'pages/api/employer/pay-statement';

const { PROVIDER_COMPATIBILITY } = require('./constants')

// TODO: write a test that checks for no null fields (except for a few line location.line2, etc)

/*************
 * Mock
 *************/
test('Mock-Sandbox, Contains departments', () => {
    const sandbox: ISandbox = mock.createSandbox(1, faker.datatype.uuid())
    expect(sandbox.company.departments).not.toEqual([])
})
test('Mock-Sandbox, Directory size=10', () => {
    const sandbox: ISandbox = mock.createSandbox(10, faker.datatype.uuid())
    expect(sandbox.directory).toHaveLength(10)
})
test('Mock-Company, email=@test.com', () => {
    const sandboxGlobal: SandboxGlobal = {
        companyId: '',
        companyName: '',
        companyEmailDomain: 'test.com',
        companyDepartments: [],
        companyLocations: [],
        employeeSize: 0,

    }
    const company: Company = mock.createCompany(sandboxGlobal)
    expect(company.primary_email).toContain('@test.com')
})
test('Mock-PayPeriod, No negative amounts in Payment', () => {
    const paymentId = faker.datatype.uuid()
    const startDate = moment().year(2022).month(0).day(1)
    const endDate = moment().year(2022).month(0).day(15)
    const employees = [{
        "id": "4fd9064c-c5cb-4bc6-ad07-140c85cbd45c",
        "firstName": "Faye",
        "lastName": "Hyatt",
        "middleName": "Zion",
        "title": "Internal Intranet Consultant",
        "manager": {
            "id": null
        },
        "startDate": "2021-12-05",
        "endDate": null,
        "isActive": true,
        "classCode": "4623",
        "location": {
            "line1": "6659 Jonathon Fields",
            "line2": "Suite 922",
            "city": "South Tyreeland",
            "state": "OK",
            "postal_code": "85955",
            "country": "US"
        },
        "employment": {
            "type": "employee",
            "subtype": null
        },
        "department": {
            "name": "Markets"
        },
        "income": {
            "unit": "yearly",
            "amount": 27742357,
            "currency": "USD",
            "effectiveDate": "2022-10-24"
        },
        "incomeHistory": [
            {
                "unit": "yearly",
                "amount": 24968121,
                "currency": "USD",
                "effectiveDate": "2021-10-24"
            }
        ],
        "customFields": [
            {
                "name": "dolorem",
                "value": "nostrum fuga reiciendis aliquid vitae ut"
            },
            {
                "name": "beatae",
                "value": "magni aut aut et reiciendis totam"
            }
        ]
    }]

    const pay: { payment: Payment; individualPayStatements: PayStatement[] } = mock.paymentUtil.mockPayPeriod(paymentId, startDate, endDate, employees)

    expect(pay.payment.company_debit.amount).toBeGreaterThanOrEqual(0)
    expect(pay.payment.gross_pay.amount).toBeGreaterThanOrEqual(0)
    expect(pay.payment.net_pay.amount).toBeGreaterThanOrEqual(0)
    expect(pay.payment.employee_taxes.amount).toBeGreaterThanOrEqual(0)
    expect(pay.payment.employer_taxes.amount).toBeGreaterThanOrEqual(0)
    expect(pay.payment.gross_pay.amount).toBeGreaterThanOrEqual(0)

})
test('Mock-PayPeriod, No negative amounts in Pay Statement', () => {
    const paymentId = faker.datatype.uuid()
    const startDate = moment().year(2022).month(0).day(1)
    const endDate = moment().year(2022).month(0).day(15)
    const employees = [{
        "id": "4fd9064c-c5cb-4bc6-ad07-140c85cbd45c",
        "firstName": "Faye",
        "lastName": "Hyatt",
        "middleName": "Zion",
        "title": "Internal Intranet Consultant",
        "manager": {
            "id": null
        },
        "startDate": "2021-12-05",
        "endDate": null,
        "isActive": true,
        "classCode": "4623",
        "location": {
            "line1": "6659 Jonathon Fields",
            "line2": "Suite 922",
            "city": "South Tyreeland",
            "state": "OK",
            "postal_code": "85955",
            "country": "US"
        },
        "employment": {
            "type": "employee",
            "subtype": null
        },
        "department": {
            "name": "Markets"
        },
        "income": {
            "unit": "yearly",
            "amount": 18748857,
            "currency": "USD",
            "effectiveDate": "2022-10-24"
        },
        "incomeHistory": [
            {
                "unit": "yearly",
                "amount": 16320900,
                "currency": "USD",
                "effectiveDate": "2021-10-24"
            }
        ],
        "customFields": [
            {
                "name": "dolorem",
                "value": "nostrum fuga reiciendis aliquid vitae ut"
            },
            {
                "name": "beatae",
                "value": "magni aut aut et reiciendis totam"
            }
        ]
    }]

    const pay: { payment: Payment; individualPayStatements: PayStatement[] } = mock.paymentUtil.mockPayPeriod(paymentId, startDate, endDate, employees)

    pay.individualPayStatements.forEach(payStatement => {
        expect(payStatement.gross_pay.amount).toBeGreaterThanOrEqual(0)
        expect(payStatement.net_pay.amount).toBeGreaterThanOrEqual(0)
        payStatement.taxes.forEach(tax => {
            expect(tax.amount).toBeGreaterThanOrEqual(0)
        })
        payStatement.earnings.forEach(earning => {
            expect(earning.amount).toBeGreaterThanOrEqual(0)
        })
        payStatement.employee_deductions.forEach(deduction => {
            expect(deduction.amount).toBeGreaterThanOrEqual(0)
        })
        payStatement.employer_contributions.forEach(contribution => {
            expect(contribution.amount).toBeGreaterThanOrEqual(0)
        })
    })

})

// Start Scenario #1 - Full Time Employee
const employee1 = {
    "id": "4fd9064c-c5cb-4bc6-ad07-140c85cbd45c",
    "firstName": "Faye",
    "lastName": "Hyatt",
    "middleName": "Zion",
    "title": "Internal Intranet Consultant",
    "manager": {
        "id": null
    },
    "startDate": "2021-12-05",
    "endDate": null,
    "isActive": true,
    "classCode": "4623",
    "location": {
        "line1": "6659 Jonathon Fields",
        "line2": "Suite 922",
        "city": "South Tyreeland",
        "state": "OK",
        "postal_code": "85955",
        "country": "US"
    },
    "employment": {
        "type": "employee",
        "subtype": null
    },
    "department": {
        "name": "Markets"
    },
    "income": {
        "unit": "yearly",
        "amount": 27742357,
        "currency": "USD",
        "effectiveDate": "2022-10-24"
    },
    "incomeHistory": [
        {
            "unit": "yearly",
            "amount": 24968121,
            "currency": "USD",
            "effectiveDate": "2021-10-24"
        }
    ],
    "customFields": [
        {
            "name": "dolorem",
            "value": "nostrum fuga reiciendis aliquid vitae ut"
        },
        {
            "name": "beatae",
            "value": "magni aut aut et reiciendis totam"
        }
    ]
}
const totalHoursWorked1 = 81
test('Mock-mockEarnings, Scenario #1 - Full Time Employee', () => {
    // 27742357 yearly income
    // 1155932 bi-weekly income (grossPay)
    // 13338 hourly pay
    // base hours = 80
    // overtime hours = 1
    // 13338 * 1.2 overtime rate = 16006
    // 1155932 + 16006 = 1171938 total employee earnings
    const earnings: { earnings: Earning[], employeeEarningsAmount: number } = mock.paymentUtil.mockEarnings(employee1, totalHoursWorked1)
    expect(earnings.employeeEarningsAmount).toEqual(1171938)
})
test('Mock-mockTaxes, Scenario #1 - Full Time Employee', () => {
    // 27742357 yearly income
    const grossPay = Math.round(employee1.income.amount / 24) // = 1155932 bi-weekly income 
    // 1155932 * 0.35 fed tax rate = 404576 federal taxes
    // 1155932 * 0.2 state tax rate = 231186 state taxes
    // 1155932 * 0.062 social security rate = 71668 social security tax
    // 1155932 * 0.0145 medicare rate = 16761 medicare tax
    // employee taxes = 404576 + 231186 + 71668 + 16761 = 724191
    // employer taxes = 71668 + 16761 = 88429
    const taxes: { taxes: Tax[], employeeTaxesAmount: number, employerTaxesAmount: number } = mock.paymentUtil.mockTaxes(employee1, grossPay)
    expect(taxes.employeeTaxesAmount).toEqual(724191)
    expect(taxes.employerTaxesAmount).toEqual(88429)
})
test('Mock-calcFederalIncomeTax, Scenario #1 - Full Time Employee', () => {
    const taxableIncome = 1155932
    const yearlyIncome = 27742357
    // federal tax rate = 0.35
    const socialTax = mock.paymentUtil.calcFederalIncomeTax(taxableIncome, yearlyIncome)
    expect(socialTax).toEqual(404576)
})
test('Mock-getFederalTaxRate, Scenario #1 - Full Time Employee', () => {
    const yearlyIncome = 27742357
    const taxRate = mock.paymentUtil.getFederalTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.35)
})
test('Mock-getStateTaxRate, Scenario #1 - Full Time Employee', () => {
    const yearlyIncome = 27742357
    const taxRate = mock.paymentUtil.getStateTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.2)
})
test('Mock-mockDeductions, Scenario #1 - Full Time Employee', () => {
    // 27742357 yearly income
    const grossPay = Math.round(employee1.income.amount / 24) // = 1155932 bi-weekly income 
    // 1155932 * 0.06 = 69356 401k 
    // 1155932 * 0.01 = 11559 medical 
    // 1155932 * 0.006 = 6936 dental 
    // 1155932 * 0.002 = 2312 vision 
    // 69356 + 11559 + 6936 + 2312 = 90163 total deduction

    const deductions: { deductions: Deduction[], employeeDeductionsAmount: number } = mock.paymentUtil.mockDeductions(employee1, grossPay)
    expect(deductions.employeeDeductionsAmount).toEqual(90163)
})
test('Mock-mockContributions, Scenario #1 - Full Time Employee', () => {
    // 27742357 yearly income
    const grossPay = Math.round(employee1.income.amount / 24) // = 1155932 bi-weekly income 
    // 1155932 * 0.03 = 34678 401k 
    // 1155932 * 0.012 = 13870 medical 
    // 1155932 * 0.008 = 9248 dental 
    // 1155932 * 0.004 = 4624 vision 
    // 34678 + 13871 + 9248 + 4624 = 62421 total deduction

    const contributions: { contributions: Contribution[], employerContributionsAmount: number } = mock.paymentUtil.mockContributions(employee1, grossPay)
    expect(contributions.employerContributionsAmount).toEqual(62420)
})
// End Scenario #1 - Full Time Employee

test('Mock-calcFederalIncomeTax, biweekly=$1000.00, yearly=$100,000.00 = $240.00', () => {
    const taxableIncome = 100000
    const yearlyIncome = 10000000
    // federal tax rate = 0.24
    const socialTax = mock.paymentUtil.calcFederalIncomeTax(taxableIncome, yearlyIncome)
    expect(socialTax).toEqual(24000)
})
test('Mock-calcStateIncomeTax, biweekly=$1000.00, yearly=$100,000.00 = $150.00', () => {
    const taxableIncome = 100000
    const yearlyIncome = 10000000
    // state tax rate = 0.15
    const socialTax = mock.paymentUtil.calcStateIncomeTax(taxableIncome, yearlyIncome)
    expect(socialTax).toEqual(15000)
})
test('Mock-calcSocialSecurityTax, $10.00 = $0.62', () => {
    const taxableIncome = 1000
    const socialTax = mock.paymentUtil.calcSocialSecurityTax(taxableIncome)
    expect(socialTax).toEqual(62)
})
test('Mock-calcSocialSecurityTax, $1.00 = $0.06', () => {
    const taxableIncome = 100
    const socialTax = mock.paymentUtil.calcSocialSecurityTax(taxableIncome)
    expect(socialTax).toEqual(6)
})
test('Mock-calcMedicareTax, $10.00 = $0.15', () => {
    const taxableIncome = 1000
    const socialTax = mock.paymentUtil.calcMedicareTax(taxableIncome)
    expect(socialTax).toEqual(15)
})
test('Mock-calcMedicareTax, $1.00 = $0.01', () => {
    const taxableIncome = 100
    const socialTax = mock.paymentUtil.calcMedicareTax(taxableIncome)
    expect(socialTax).toEqual(1)
})

test('Mock-getFederalTaxRate, $187,488.57 = 0.32', () => {
    const yearlyIncome = 18748857
    const taxRate = mock.paymentUtil.getFederalTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.32)
})
test('Mock-getFederalTaxRate, < $9,525.00 = 0.10', () => {
    const yearlyIncome = 1
    const taxRate = mock.paymentUtil.getFederalTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.10)
})
test('Mock-getFederalTaxRate, > $372,950.00 = 0.37', () => {
    const yearlyIncome = 99999999
    const taxRate = mock.paymentUtil.getFederalTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.37)
})
test('Mock-getStateTaxRate, $62,345.94 = 0.1', () => {
    const yearlyIncome = 6234594
    const taxRate = mock.paymentUtil.getStateTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.1)
})
test('Mock-getStateTaxRate, < $50,000.00 = 0.05', () => {
    const yearlyIncome = 1
    const taxRate = mock.paymentUtil.getStateTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.05)
})
test('Mock-getStateTaxRate, > $100,000.00 = 0.2', () => {
    const yearlyIncome = 99999999
    const taxRate = mock.paymentUtil.getStateTaxRate(yearlyIncome)
    expect(taxRate).toEqual(0.2)
})




/*************
 * BambooHR
 *************/

// test('Compatibility-Company-BambooHR, Contain account name', () => {
//     const sandbox: ISandbox[] = mock.createSandbox(PROVIDER_COMPATIBILITY.bamboohr, 1)
//     expect(sandbox.company.accounts[0].account_name).not.toBe(null)
// })
test('Compatibility-Company-BambooHR, Contains departments', () => {
    const sandbox: ISandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.bamboohr, 1)
    expect(sandbox.company.departments).not.toEqual([])
})

/*************
 * Justworks
 *************/

// test('Compatibility-Company-Justworks, No account name', () => {
//     const sandbox: ISandbox[] = mock.createSandbox(PROVIDER_COMPATIBILITY.justworks, 1)
//     expect(sandbox.company.accounts[0].account_name).toBe(null)
// })

/*************
 * Workday
 *************/

// test('Compatibility-Company-Workday, Company endpoint not implemented', () => {
//     const sandbox: ISandbox[] = mock.createSandbox(PROVIDER_COMPATIBILITY.workday, 10)
//     expect(sandbox.company).toBe(null)
// })

export { }