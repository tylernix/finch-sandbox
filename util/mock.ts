import { faker } from '@faker-js/faker'
import { SandboxGlobal, Sandbox, Company, Department, Provider, Location, Account, Person, Individual, Employment, Payment, PayStatement, Deduction, Contribution, Tax, Earning, ISandbox, ICompany, IDepartment, ILocation, IAccount } from 'types/finch'
import moment from 'moment'

// TODO: Set random default Finch fields to use like sample deduction names or employee types so that they apply across the whole employer creation consistently but change with every new company created.

function createSandbox(employeeSize: number, companyId: string): ISandbox {
    const companyName = `${titleCase(faker.word.adjective())} ${titleCase(faker.word.noun())}${getRandomElement([', Inc', ' LLC'])}`

    const _globals: SandboxGlobal = {
        employeeSize: employeeSize,
        companyId: companyId,
        companyName: companyName,
        companyEmailDomain: companyName.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s{1,}/g, '-').toLocaleLowerCase() + ".com",
        companyDepartments: companyUtil.mockDepartments(),
        companyLocations: companyUtil.mockLocations()
    }

    const company = createCompany(_globals)
    var { directory, individuals, employments } = createOrganization(_globals)
    var { payments, payStatements } = createPayments(_globals, employments)

    const _sandbox: ISandbox = {
        company: company,
        directory: directory,
        individual: individuals,
        employment: employments,
        payments: payments,
        payStatements: payStatements

    }

    return _sandbox
}

function createCompany(_globals: SandboxGlobal): ICompany {
    // Logic for data fields that depend on each other
    const entityType = companyUtil.getEntityType()
    const entitySubtype = (entityType) ? companyUtil.getEntitySubtype() : null

    return {
        id: faker.datatype.uuid(),
        legal_name: _globals.companyName,
        entity: {
            type: entityType,
            subtype: entitySubtype
        },
        primary_email: faker.internet.email(undefined, undefined, _globals.companyEmailDomain),
        primary_phone_number: faker.phone.number('##########'),
        departments: _globals.companyDepartments,
        ein: faker.phone.number('##-#######'),
        locations: _globals.companyLocations,
        accounts: companyUtil.mockAccounts(_globals.companyName),
    }
}

function createOrganization(_globals: SandboxGlobal): {
    directory: Person[],
    individuals: Individual[],
    employments: Employment[]
} {
    console.log("Directory: Creating employee directory")

    let directory: Person[] = []
    let individuals: Individual[] = []
    let employments: Employment[] = []

    console.log("Directory: initial company employee size: " + _globals.employeeSize)
    const managers = directoryUtil.mockManagers(_globals)

    // add managers to the directory
    directory = managers.persons
    individuals = managers.individuals
    employments = managers.employments

    console.log("Directory: manager size: " + directory.length)
    console.log("Directory: employee size: " + (_globals.employeeSize - directory.length))

    // subtract managers from total employeeCount 
    _globals.employeeSize -= directory.length

    for (let i = 0; i < _globals.employeeSize; i++) {
        let manager: Person = getRandomElement(managers.persons)
        const { person, individual, employment } = directoryUtil.mockPerson(manager.departmentName, manager.id, _globals)
        managers.persons.push(person)
        managers.individuals.push(individual)
        managers.employments.push(employment)
    }
    return { directory, individuals, employments }

}

function createPayments(_globals: SandboxGlobal, employees: Employment[]): {
    payments: Payment[],
    payStatements: PayStatement[],
} {
    console.log("Payment: Creating payment and pay statements")

    // Reusable fields
    let payments: Payment[] = []
    let payStatements: PayStatement[] = []
    // let totalCompanyDebit = 0;
    // let totalGrossPay = 0;
    // let totalNetPay = 0;
    // let totalEmployerTaxes = 0;
    // let totalEmployeeTaxes = 0;

    // Generate pay data for two years from today
    const today = moment()
    const twoYearsAgo = moment().subtract('2', 'years')

    // unique generate payroll for this month depending on day of month
    //const paymentId = faker.datatype.uuid()
    //console.log("Payment: this month payroll: " + today.toDate())

    // generate payroll the same way for all other months starting with the previous month
    // Example: if today is January 17, start generating regular payroll in February = Feb 1-15 & Feb 16-28, then repeat for two years.
    today.subtract(1, 'month')
    while (today.isAfter(twoYearsAgo)) {
        //console.log("Payment: Generating pay data for month: " + today.year() + "-" + today.month())

        // create first bi-weekly pay period (1)
        const { payment: payment_1, individualPayStatements: payStatements_1 } = paymentUtil.mockPayPeriod(
            faker.datatype.uuid(),                      // payment id
            moment([today.year(), today.month(), 1]),   // start date
            moment([today.year(), today.month(), 15]),  // end date
            employees,                                  // all employees
        )

        payments.push(payment_1)
        payStatements_1.forEach(payStatement => payStatements.push(payStatement))

        // create last bi-weekly pay period (2)
        const { payment: payment_2, individualPayStatements: payStatements_2 } = paymentUtil.mockPayPeriod(
            faker.datatype.uuid(),                                      // payment id
            moment([today.year(), today.month(), 16]),                  // start date
            moment([today.year(), today.month(), today.daysInMonth()]), // end date, daysInMonth() gets how many days in current month to use as month end date 
            employees,                                                  // all employees
        )

        payments.push(payment_2)
        payStatements_1.forEach(payStatement => payStatements.push(payStatement))


        //console.log(today.endOf('month'))
        today.subtract(1, 'month')
    }

    //console.log(payments)
    //console.log(payStatements)

    return { payments, payStatements }
}

var companyUtil = {
    getEntityType: () => {
        // Entity Types as defined by Finch API Reference: https://developer.tryfinch.com/docs/reference/33162be1eed72-company
        const entityTypes = [
            "llc",
            "corporation",
            "sole_proprietor",
            "non_profit",
            "partnership",
            "cooperative",
            null
        ]
        return getRandomElement(entityTypes)
    },
    getEntitySubtype: () => {
        // Entity Subtypes as defined by Finch API Reference: https://developer.tryfinch.com/docs/reference/33162be1eed72-company
        const entitySubtypes = [
            "s_corporation",
            "c_corporation",
            "b_corporation",
            null
        ]
        return getRandomElement(entitySubtypes)
    },
    mockDepartments: () => {
        console.log("Company: Creating Departments")

        // Getting a random integer between two values, inclusive at both max and min
        const min = Math.ceil(1)
        const max = Math.floor(10)
        const numOfDepts = Math.floor(Math.random() * (max - min + 1) + min)

        // Create random fake departments
        let departments: IDepartment[] = []
        for (let i = 0; i < numOfDepts; i++) {
            departments.push({
                name: faker.name.jobArea(),
                parent: {
                    name: (i % 4) ? getRandomElement(departments)?.name : null
                }
            })
        }

        return departments
    },
    mockLocations: () => {
        console.log("Company: Creating Locations")

        // Getting a random integer between two values, inclusive at both max and min
        const min = Math.ceil(1)
        const max = Math.floor(3)
        const numOfLocations = Math.floor(Math.random() * (max - min + 1) + min)

        // Create random fake locations localized to USA for now
        let locations: ILocation[] = []
        for (let i = 0; i < numOfLocations; i++) {
            locations.push({
                line1: faker.address.streetAddress(false),
                line2: Math.random() ? faker.address.secondaryAddress() : null, // sometimes add a second line, sometimes not.
                city: faker.address.city(),
                state: faker.address.stateAbbr(),
                postal_code: faker.address.zipCode(),
                country: 'US',
            })
        }

        return locations
    },
    mockAccounts: (companyName: string) => {
        console.log("Company: Creating Accounts")

        // Getting a random integer between two values, inclusive at both max and min
        const min = Math.ceil(1)
        const max = Math.floor(3)
        const numOfAccounts = Math.floor(Math.random() * (max - min + 1) + min)

        // Create random fake bank accounts
        let accounts: IAccount[] = []
        for (let i = 0; i < numOfAccounts; i++) {
            accounts.push({
                routing_number: faker.finance.routingNumber(),
                account_name: companyName.toUpperCase(),
                institution_name: getRandomElement([
                    "BANK OF AMERICA",
                    "JPMORGAN CHASE",
                    "CAPITAL ONE",
                    "WELLS FARGO",
                    "PNC",
                    "EVOLVE BANK AND TRUST",
                ]),
                account_type: getRandomElement([   // Adding duplicates in order to reduce the number of nulls
                    "checking",
                    "savings",
                    "checking",
                    "savings",
                    "checking",
                    "savings",
                    null
                ]),
                account_number: faker.finance.account(10),
            })
        }

        return accounts
    },
}

var directoryUtil = {
    mockManagers(_globals: SandboxGlobal): {
        persons: Person[],
        individuals: Individual[],
        employments: Employment[]
    } {
        console.log("Directory: Creating Managers")

        // Get average manager sizes of company (around 10% to 20%)
        const managerCountLow = Math.floor(_globals.employeeSize * 0.1)
        const managerCountHigh = Math.floor(_globals.employeeSize * 0.2)
        // Getting a random integer between two values, inclusive at both max and min
        const min = Math.ceil(managerCountLow)
        const max = Math.floor(managerCountHigh)
        const numOfManagers = Math.floor(Math.random() * (max - min + 1) + min) + 1 // +1 ensures we always create at least one manager

        // for only child-departments (i.e. they have a parent department), create a few managers.
        const childDepartments: IDepartment[] = []
        _globals.companyDepartments.forEach(dept => {
            if (dept.parent.name) childDepartments.push(dept)
        })

        // Create random fake managers
        // Right now, this manager-to-employee structure is dependent on createDepartments tree levels.
        let managers: {
            persons: Person[],
            individuals: Individual[],
            employments: Employment[]
        } = {
            persons: [],
            individuals: [],
            employments: []
        }
        for (let i = 0; i < numOfManagers; i++) {
            const { person, individual, employment } = directoryUtil.mockPerson(getRandomElement(childDepartments)?.name, null, _globals)
            managers.persons.push(person)
            managers.individuals.push(individual)
            managers.employments.push(employment)
        }

        return managers
    },
    mockPerson(departmentName: string, managerId: string | null, _globals: SandboxGlobal): {
        person: Person;
        individual: Individual;
        employment: Employment;
    } {
        //console.log("Directory: Creating Person")

        // Resuable fields
        const individualId = faker.datatype.uuid()
        const gender = faker.name.sexType()
        const firstName = faker.name.firstName(gender)
        const middleName = faker.name.middleName(gender)
        const lastName = faker.name.lastName()
        const isActive = (managerId) ? faker.datatype.boolean() : true // if manager, always set to active
        const startDate = faker.date.past(10) // create a random start_date within the last 10 years
        const endDate = (isActive) ? null : faker.date.between(startDate, moment().toDate()) // if not active, create an end_date between start_date and now
        const yearsOfService = (isActive) ? moment(moment()).diff(startDate, 'years') : moment(endDate).diff(startDate, 'years')
        const dob = faker.date.birthdate({ min: 20, max: 70, mode: 'age' })
        const employmentType: 'employee' | 'contractor' = (managerId) ? getRandomElement(['employee', 'contractor']) : 'employee'
        const incomeType: 'yearly' | 'hourly' = (employmentType === 'contractor') ? 'hourly' : 'yearly'
        const currentIncome = (incomeType === 'yearly')
            ? Number(faker.finance.amount(5000000, 30000000, 0)) // return yearly income amount in USD cents between $50,000.00 and $300,000.00
            : Number(faker.finance.amount(2000, 4000, 0)) // return hourly income amount in USD cents between $200.00 and $400.00
        const effectiveDateOfCurrentIncome = (isActive && yearsOfService >= 1) ? faker.date.recent(365) : faker.date.recent(365, endDate?.toDateString())

        // Create Person stub
        const person: Person = {
            id: individualId,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            departmentName: departmentName,
            manager: {
                id: (managerId) ? managerId : null,
            },
            isActive: isActive,
        }

        // Create Individual
        const individual: Individual = {
            id: individualId,
            ssn: faker.phone.number('#########'),
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            preferredName: null, // sometimes, generate preferred name examples, not sure how to do this with Faker
            gender: gender,
            ethnicity: getRandomElement([
                "asian",
                "white",
                "black_or_african_american",
                "native_hawaiian_or_pacific_islander",
                "american_indian_or_alaska_native",
                "hispanic_or_latino",
                "two_or_more_races",
                "decline_to_specify",
                null,
            ]),
            dob: moment(dob).format("YYYY-MM-DD"),
            residence: {
                line1: faker.address.streetAddress(false),
                line2: Math.random() ? faker.address.secondaryAddress() : null, // sometimes add a second line, sometimes not.
                city: faker.address.city(),
                state: faker.address.stateAbbr(),
                postal_code: faker.address.zipCode(),
                country: 'US',
            },
            // create an random size array between 1 and 4, then .map the array to return that many email objects
            emails: Array.from({ length: Math.floor(Math.random() * 3) }, (v, i) => i).map(x => {
                const type: 'work' | 'personal' = getRandomElement(['work', 'personal'])
                if (type === 'work') return { data: faker.internet.email(firstName, lastName, _globals.companyEmailDomain), type: type }
                else return { data: faker.internet.email(firstName, lastName), type: type }
            }),
            // create an random size array between 1 and 4, then .map the array to return that many phone number objects
            phoneNumbers: Array.from({ length: Math.floor(Math.random() * 3) }, (v, i) => i).map(x => {
                return {
                    data: faker.phone.number('###-###-####'),
                    type: getRandomElement(['work', 'personal', 'work', 'personal', 'work', 'personal', null]) // add 'work' and 'personal more times to decrease the likelihood of null, but could still happen.
                }
            })
        }
        // create Employment
        const employment: Employment = {
            id: individualId,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            title: faker.name.jobTitle(),
            manager: {
                id: (managerId) ? managerId : null,
            },
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: (endDate) ? moment(endDate).format("YYYY-MM-DD") : null,
            isActive: isActive,
            classCode: faker.phone.number('####'),
            location: getRandomElement(_globals.companyLocations),
            employment: {
                type: employmentType,
                subtype: (employmentType === 'employee') ? getRandomElement(['full_time', 'part_time', null]) : getRandomElement(['full_time', 'part_time', 'intern', 'temp', 'seasonal', 'individual_contractor', null])
            },
            department: {
                name: departmentName
            },
            income: {
                unit: incomeType,
                amount: currentIncome,
                currency: 'USD',
                effectiveDate: moment(effectiveDateOfCurrentIncome).format("YYYY-MM-DD")
            },
            incomeHistory: Array.from({ length: yearsOfService }, (v, i) => i).map(x => {
                // give 1 salary raise every year of service
                // by decreasing income from current income amount for every year of service. 
                // Ex: 30,000 - (30,000 * (11 / 100)) = 26,700
                // This works for hourly income as well
                return {
                    unit: incomeType,
                    amount: Math.round(currentIncome - (currentIncome * ((10 + x) / 100))),
                    currency: 'USD',
                    effectiveDate: moment(effectiveDateOfCurrentIncome).subtract(x + 1, 'years').format("YYYY-MM-DD")
                }
            }),
            customFields: Array.from({ length: Math.floor(Math.random() * 3) }, (v, i) => i).map(x => {
                return {
                    name: faker.lorem.word(),
                    value: faker.lorem.words(6)
                }
            }),
        }
        return { person, individual, employment }
    }
}

var paymentUtil = {
    mockPayPeriod(paymentId: string, startDate: moment.Moment, endDate: moment.Moment, employees: Employment[]): { payment: Payment; individualPayStatements: PayStatement[] } {
        //console.log("Payment: Generating payroll for paymentId: " + paymentId)

        // Reusable fields
        let totalCompanyDebit = 0;
        let totalGrossPay = 0;
        let totalNetPay = 0;
        let totalEmployerTaxes = 0;
        let totalEmployeeTaxes = 0;
        let individualIds: string[] = []
        let individualPayStatements: PayStatement[] = []

        const isEmployedDuringPayPeriod = (employee: Employment) => {
            if (!employee.endDate) return true // they are currently employed at the company
            return endDate.isAfter(moment(employee.startDate)) && endDate.isBefore(moment(employee.endDate))
        }

        // check which employees were employed during this pay period
        const employeesOnPayPeriod = employees.filter(isEmployedDuringPayPeriod)
        //console.log("Payment: Employees on pay period: " + employeesOnPayPeriod.length)
        employeesOnPayPeriod.forEach(employee => {
            // Create individual pay statement for each employed employee

            let totalHoursWorked = 0
            if (employee.income.unit === 'yearly') {
                totalHoursWorked = 80 // 80hrs = assumes 40 hrs/week * 2 weeks per pay period + 
                totalHoursWorked += (Math.floor(Math.random() * 30) % 100) ? 0 : faker.datatype.number({ min: 1, max: 10 }) // rarely add 'overtime' (as an Earning)
            } else if (employee.income.unit === 'hourly') {
                totalHoursWorked = faker.datatype.number({ min: 60, max: 90 })
            } else {
                console.error("Payment: Employee income unit is not properly defined: " + employee.income.unit)
                totalHoursWorked = -1
            }

            // Calculate earnings
            const { earnings, employeeEarningsAmount } = paymentUtil.mockEarnings(employee, totalHoursWorked)

            // Calculate taxes
            const { taxes, employeeTaxesAmount, employerTaxesAmount } = paymentUtil.mockTaxes(employee, employeeEarningsAmount)

            // Calculate employee deductions
            const { deductions, employeeDeductionsAmount } = paymentUtil.mockDeductions(employee, employeeEarningsAmount)

            // Calculate employer contributions
            const { contributions, employerContributionsAmount } = paymentUtil.mockContributions(employee, employeeEarningsAmount)

            //console.log('earnings: ' + employeeEarningsAmount)
            //console.log('taxes: ' + employeeTaxesAmount)
            //console.log('deductions: ' + employeeDeductionsAmount)
            // Calculate net pay
            const netPay = employeeEarningsAmount - employeeTaxesAmount - employeeDeductionsAmount;

            // Increase the pay period totals
            totalGrossPay += employeeEarningsAmount;
            totalNetPay += netPay;
            totalEmployeeTaxes += employeeTaxesAmount;
            totalEmployerTaxes += employerTaxesAmount;
            totalCompanyDebit += employeeEarningsAmount + employerTaxesAmount + employerContributionsAmount;

            // Build the pay statement for the individual
            const statement: PayStatement = {
                paymentId: paymentId,
                individualId: employee.id,
                type: 'regular_payroll',
                paymentMethod: 'direct_deposit',
                grossPay: {
                    amount: employeeEarningsAmount,
                    currency: 'usd'
                },
                netPay: {
                    amount: netPay,
                    currency: 'usd'
                },
                totalHours: totalHoursWorked,
                earnings: earnings,
                taxes: taxes,
                employeeDeductions: deductions,
                employerContributions: contributions,
            };

            individualIds.push(employee.id) // record employee ids to add to current pay period
            individualPayStatements.push(statement);

        })

        // TODO: when is payDate and debitDate normally?
        const payDate = endDate.clone().add(1, 'day')
        const debitDate = endDate.clone().add(1, 'day')

        // Build the payment
        const payment: Payment = {
            id: paymentId,
            payPeriod: {
                startDate: startDate.format("YYYY-MM-DD"),
                endDate: endDate.format("YYYY-MM-DD"),
            },
            payDate: payDate.format('YYYY-MM-DD'),
            debitDate: debitDate.format('YYYY-MM-DD'),
            companyDebit: {
                amount: totalCompanyDebit,
                currency: 'usd'
            },
            grossPay: {
                amount: totalGrossPay,
                currency: 'usd'
            },
            netPay: {
                amount: totalNetPay,
                currency: 'usd'
            },
            employerTaxes: {
                amount: totalEmployerTaxes,
                currency: 'usd'
            },
            employeeTaxes: {
                amount: totalEmployeeTaxes,
                currency: 'usd'
            },
            individualIds,
        }

        return { payment, individualPayStatements }
    },
    mockEarnings(employee: Employment, totalHoursWorked: number): { earnings: Earning[], employeeEarningsAmount: number } {
        let overtimeHours = 0
        let baseHours = totalHoursWorked
        let earnings: Earning[] = []
        let totalEarningsAmount = 0;

        if (totalHoursWorked > 80) {
            baseHours = 80
            overtimeHours = totalHoursWorked - baseHours
        }

        // If Employee...
        if (employee.employment.type === 'employee') {
            const grossPay = Math.round(employee.income.amount / 24) // Divide 12 month yearly income by 0.5 to split months into 2 paycheck = 24

            if (overtimeHours) {
                const hourlyPay = Math.round(employee.income.amount / 2080); // Divide salary by 2080 working hours in a year. 
                const overtimeEarning: Earning = {
                    type: 'overtime',
                    name: 'Overtime',
                    amount: Math.round(hourlyPay * overtimeHours * 1.2),
                    hours: overtimeHours,
                    currency: 'usd'
                }
                earnings.push(overtimeEarning)
                totalEarningsAmount += overtimeEarning.amount
            }

            const baseEarning: Earning = {
                type: 'salary',
                name: 'Regular',
                amount: grossPay,
                hours: baseHours,
                currency: 'usd'
            }
            earnings.push(baseEarning)
            totalEarningsAmount += baseEarning.amount

            return { earnings, employeeEarningsAmount: totalEarningsAmount }
        }
        // If Contractor...
        else if (employee.employment.type === 'contractor') {
            const hourlyPay = employee.income.amount

            if (overtimeHours) {
                const overtimeEarning: Earning = {
                    type: 'overtime',
                    name: 'Overtime',
                    amount: hourlyPay * overtimeHours * 1.2,
                    hours: overtimeHours,
                    currency: 'usd'
                }
                earnings.push(overtimeEarning)
                totalEarningsAmount += overtimeEarning.amount

            }

            const baseEarning: Earning = {
                type: '1099',
                name: 'Regular',
                amount: hourlyPay * baseHours,
                hours: baseHours,
                currency: 'usd'
            }
            earnings.push(baseEarning)
            totalEarningsAmount += baseEarning.amount

            return { earnings, employeeEarningsAmount: totalEarningsAmount }

        }
        // If employment type is something else not defined (shouldn't happen, but still)...
        else {
            const baseEarning: Earning = {
                type: 'salary',
                name: 'Regular',
                amount: employee.income.amount,
                hours: baseHours,
                currency: 'usd'
            }
            earnings.push(baseEarning)
            totalEarningsAmount += baseEarning.amount

            return { earnings, employeeEarningsAmount: totalEarningsAmount }

        }
    },
    mockTaxes(employee: Employment, grossPay: number): { taxes: Tax[], employeeTaxesAmount: number, employerTaxesAmount: number } {
        // Calculate taxes + get rid of decimal places
        // Remember, amounts are in USD cents.

        const yearlyIncome = (employee.income.unit === 'yearly') ? employee.income.amount : employee.income.amount * 2080 // calculate yearly contractor (assuming employee.income.unit === 'hourly') income based on 2080 working hours in a year
        const federalIncomeTax = paymentUtil.calcFederalIncomeTax(grossPay, yearlyIncome)
        const stateIncomeTax = paymentUtil.calcStateIncomeTax(grossPay, yearlyIncome);

        const socialSecurity = paymentUtil.calcSocialSecurityTax(grossPay);
        const medicare = paymentUtil.calcMedicareTax(grossPay);

        const employeeTaxesAmount = federalIncomeTax + stateIncomeTax + medicare + socialSecurity;
        const employerTaxesAmount = medicare + socialSecurity; // employer pays the same tax rate as employee for medicare and social security

        const taxes: Tax[] = [
            {
                name: 'Federal Income Tax',
                type: 'federal',
                amount: federalIncomeTax,
                employer: false,
                currency: 'usd'
            },
            {
                name: 'State Income Tax',
                type: 'state',
                amount: stateIncomeTax,
                employer: false,
                currency: 'usd'
            },
            {
                name: 'Social Security (OASDI)',
                type: 'fica',
                amount: socialSecurity,
                employer: false,
                currency: 'usd'
            },
            {
                name: 'Medicare',
                type: 'fica',
                amount: medicare,
                employer: false,
                currency: 'usd'
            },
            {
                name: 'Social Security (OASDI) - Employer',
                type: 'fica',
                amount: socialSecurity,
                employer: true,
                currency: 'usd'
            },
            {
                name: 'Medicare - Employer',
                type: 'fica',
                amount: medicare,
                employer: true,
                currency: 'usd'
            },
        ]

        return { taxes, employeeTaxesAmount, employerTaxesAmount }
    },
    calcFederalIncomeTax(taxableIncome: number, yearlyIncome: number): number {
        return Math.round(taxableIncome * paymentUtil.getFederalTaxRate(yearlyIncome))
    },
    calcStateIncomeTax(taxableIncome: number, yearlyIncome: number): number {
        return Math.round(taxableIncome * paymentUtil.getStateTaxRate(yearlyIncome))
    },
    calcSocialSecurityTax(taxableIncome: number): number {
        return Math.round(taxableIncome * 0.062)

        // below is yearly calculation, we need every paycheck calculation
        // if (taxableIncome >= 25000100) {
        //     return (13770000 * 0.062) + ((taxableIncome - 25000000) * 0.009)
        // } else if (taxableIncome <= 25000000 && taxableIncome >= 13770100) {
        //     return (taxableIncome * 0.062)
        // } else {
        //     return (taxableIncome * 0.062)
        // }
    },
    calcMedicareTax(taxableIncome: number): number {
        return Math.round(taxableIncome * 0.0145)
    },
    getFederalTaxRate(yearlyIncome: number): number {
        // Returns the current federal tax based on taxable income brackets

        if (yearlyIncome === null || yearlyIncome < 0) {
            console.error("Invalid inputs. Taxable income is required")
            return 0
        }

        // These tax brackets are pulled from 2022 year. They may change over time. Since we are going for accurate-ish calculations, this is okay.
        // Uses a progressive tax rate system, with the tax rate increasing as the taxable income increases.
        // Remember, amounts are in USD cents.

        let taxRate = 0;
        if (yearlyIncome <= 952500) {
            taxRate = 0.1;
        } else if (yearlyIncome > 952500 && yearlyIncome <= 3870000) {
            taxRate = 0.12;
        } else if (yearlyIncome > 3870000 && yearlyIncome <= 8255000) {
            taxRate = 0.22;
        } else if (yearlyIncome > 8255000 && yearlyIncome <= 17105000) {
            taxRate = 0.24;
        } else if (yearlyIncome > 17105000 && yearlyIncome <= 20885000) {
            taxRate = 0.32;
        } else if (yearlyIncome > 20885000 && yearlyIncome <= 37295000) {
            taxRate = 0.35;
        } else if (yearlyIncome > 37295000) {
            taxRate = 0.37;
        }

        //console.log(`Payment: Federal income tax rate: ${taxRate} for yearly income $${yearlyIncome / 100}`)
        return taxRate;
    },
    getStateTaxRate(yearlyIncome: number): number {
        // Tax bracket calculations
        // Uses a progressive tax rate system, with the tax rate increasing as the taxable income increases.
        // The tax brackets and rates used in this example are fictional and do not represent any real-world tax system.
        // Remember, amounts are in USD cents.

        if (yearlyIncome === null || yearlyIncome < 0) {
            console.error("Invalid inputs. Taxable income is required")
            return 0
        }

        let taxRate = 0;
        if (yearlyIncome <= 5000000) {
            taxRate = 0.05;
        } else if (yearlyIncome > 5000000 && yearlyIncome <= 7500000) {
            taxRate = 0.10;
        } else if (yearlyIncome > 7500000 && yearlyIncome <= 10000000) {
            taxRate = 0.15;
        } else if (yearlyIncome > 10000000) {
            taxRate = 0.20;
        }

        //console.log(`Payment: State income tax: ${taxRate} for yearly income $${yearlyIncome / 100}`)
        return taxRate;
    },
    mockDeductions(employee: Employment, grossPay: number): { deductions: Deduction[], employeeDeductionsAmount: number } {
        let finalDeductions: Deduction[] = []
        let employeeDeductionsAmount: number = 0
        const defaultDeductions: Deduction[] = [
            {
                name: '401(k) plan %',
                type: '401k',
                preTax: true,
                amount: Math.round(grossPay * 0.06),
                currency: 'usd'
            },
            {
                name: 'MED PRE TAX',
                type: 's125_medical',
                preTax: true,
                amount: Math.round(grossPay * 0.01),
                currency: 'usd'
            },
            {
                name: 'DEN PRE TAX',
                type: 's125_dental',
                preTax: true,
                amount: Math.round(grossPay * 0.006),
                currency: 'usd'
            },
            {
                name: 'VIS PRE TAX',
                type: 's125_vision',
                preTax: true,
                amount: Math.round(grossPay * 0.002),
                currency: 'usd'
            },
        ]
        const additionalDeductions: Deduction[] = [
            {
                name: 'Child support 1',
                type: null,
                preTax: false,
                amount: 0,
                currency: 'usd'
            },
            {
                name: 'Group Life Term',
                type: null,
                preTax: true,
                amount: 0,
                currency: 'usd'
            },
        ]

        if (employee.employment.type === 'employee') {
            defaultDeductions.forEach(deduction => {
                finalDeductions.push(deduction)
                employeeDeductionsAmount += deduction.amount
            })
        }

        return { deductions: finalDeductions, employeeDeductionsAmount }
    },
    mockContributions(employee: Employment, grossPay: number): { contributions: Contribution[], employerContributionsAmount: number } {
        let finalContributions: Contribution[] = []
        let employerContributionsAmount: number = 0
        const defaultContributions: Contribution[] = [
            {
                name: '401(k) Employer',
                type: '401k',
                amount: Math.round(grossPay * 0.03),
                currency: 'usd'
            },
            {
                name: 'MED Employer',
                type: 's125_medical',
                amount: Math.round(grossPay * 0.012),
                currency: 'usd'
            },
            {
                name: 'DEN Employer',
                type: 's125_dental',
                amount: Math.round(grossPay * 0.008),
                currency: 'usd'
            },
            {
                name: 'VIS Employer',
                type: 's125_vision',
                amount: Math.round(grossPay * 0.004),
                currency: 'usd'
            },
        ]
        const additionalContributions: Contribution[] = [
            {
                name: 'Disability',
                type: null,
                amount: 0,
                currency: 'usd'
            },
            {
                name: 'Group Term Life',
                type: null,
                amount: 0,
                currency: 'usd'
            },
            {
                name: 'Restricted Stock Gra',
                type: null,
                amount: 0,
                currency: 'usd'
            },
            {
                name: 'Restricted Stock Tax',
                type: null,
                amount: 0,
                currency: 'usd'
            },
        ]

        if (employee.employment.type === 'employee') {
            defaultContributions.forEach(contribution => {
                finalContributions.push(contribution)
                employerContributionsAmount += contribution.amount
            })
        }

        return { contributions: finalContributions, employerContributionsAmount }
    }
}







export { createSandbox, createCompany, createOrganization as createDirectory, companyUtil, directoryUtil, paymentUtil, }

function getRandomElement(collection: any[]) {
    return (collection) ? collection[Math.floor(Math.random() * collection.length)] : null
}

function titleCase(str: string) {
    return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}