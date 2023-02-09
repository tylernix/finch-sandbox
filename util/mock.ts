import { faker } from '@faker-js/faker'
import company from 'pages/api/employer/company'
import { SandboxGlobal, Sandbox, Company, Department, Provider, Location, Account, Person, Individual, Employment, Payment, PayStatement } from 'types/finch'
import { Provider_Fields, Company_Fields, Directory_Fields, Accounts_Fields, Departments_Fields, Locations_Fields, } from 'types/finch-compatibility'
import moment from 'moment'

// type SandboxGlobal = {
//     companyId: string,
//     companyName: string,
//     companyEmail: string,
//     companyDefaultDepartments: Department[],
//     companyDefaultLocations: Location[]
// }
// type Sandbox = {
//     company: Company,
//     directory: Person[],
//     individuals: Individual[],
//     employments: Employment[],
//     payments: Payment[],
//     payStatements: PayStatement[]
// }

// function filterSandboxByProvider(sandbox: Sandbox, provider: Provider_Fields,): Sandbox {
//     // const _sandbox: SandboxGlobal = {
//     //     companyId,
//     //     companyName,
//     //     companyEmail,
//     //     companyDefaultDepartments: companyDepartments,
//     //     companyDefaultLocations: companyLocations
//     // }

//     // Filter 



//     // Logic for data fields that depend on each other
//     // const entityType = (compatibility.entity.type) ? companyUtil.getEntityType() : null
//     // const entitySubtype = (compatibility.entity.subtype && entityType) ? companyUtil.getEntitySubtype() : null

//     // return {
//     //     id: faker.datatype.uuid(),
//     //     legal_name: (compatibility.legal_name) ? sandbox.companyName : null,
//     //     entity: {
//     //         type: entityType,
//     //         subtype: entitySubtype
//     //     },
//     //     primary_email: (compatibility.primary_email) ? faker.internet.email(undefined, undefined, sandbox.companyEmail) : null,
//     //     primary_phone_number: (compatibility.primary_phone_number) ? faker.phone.number('##########') : null,
//     //     departments: (compatibility.department) ? companyUtil.addDepartments(sandbox.companyDefaultDepartments, compatibility.departments) : null,
//     //     ein: (compatibility.ein) ? faker.phone.number('##-#######') : null,
//     //     locations: (compatibility.location) ? sandbox.companyDefaultLocations : null,
//     //     accounts: (compatibility.account) ? companyUtil.createAccounts(sandbox.companyName, compatibility.accounts) : null,

//     //const _company: Company | null = (provider.compatibility.company) ? createCompany(sandbox, provider.compatibility.company) : null
//     // const _directory: Person[] | null = (provider.compatibility.directory) ? createDirectory(employeeCount, sandbox, provider.compatibility.directory) : null
//     // const _individuals: Individual[] = []
//     // const _employments: Employment[] = []
//     // const _payments: Payment[] = []
//     // const _payStatements: PayStatement[] = []

//     //return { _company, _directory, _individuals, _employments, _payments, _payStatements }

// }

function createSandbox(employeeCount: number, companyId: string): Sandbox {
    const companyName = faker.company.name()

    const _globals: SandboxGlobal = {
        employeeCount: employeeCount,
        companyId: companyId,
        companyName: companyName,
        companyEmailDomain: companyName.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s{1,}/g, '-').toLocaleLowerCase() + ".com",
        companyDepartments: companyUtil.mockDepartments(),
        companyLocations: companyUtil.mockLocations()
    }

    const company = createCompany(_globals)
    var { directory, individuals, employments } = createOrganization(_globals)

    const _sandbox: Sandbox = {
        company: company,
        directory: directory,
        individual: individuals,
        employment: employments,
        payments: [],
        payStatements: []

    }

    return _sandbox
}

function createCompany(_globals: SandboxGlobal): Company {
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
    let directory: Person[] = []
    let individuals: Individual[] = []
    let employments: Employment[] = []

    console.log("employee count: " + _globals.employeeCount)
    const managers = directoryUtil.mockManagers(_globals)

    // add managers to the directory
    directory = managers.persons
    individuals = managers.individuals
    employments = managers.employments


    // subtract managers from total employeeCount 
    _globals.employeeCount -= directory.length
    console.log("employee count: " + _globals.employeeCount)

    for (let i = 0; i < _globals.employeeCount; i++) {
        let manager: Person = getRandomElement(managers.persons)
        const { person, individual, employment } = directoryUtil.mockPerson(manager.departmentName, manager.id, _globals)
        managers.persons.push(person)
        managers.individuals.push(individual)
        managers.employments.push(employment)
    }
    return { directory, individuals, employments }

}

var directoryUtil = {
    mockManagers(_globals: SandboxGlobal): {
        persons: Person[],
        individuals: Individual[],
        employments: Employment[]
    } {
        console.log("Directory: Creating Managers")

        // Get average manager sizes of company (around 10% to 20%)
        const managerCountLow = Math.floor(_globals.employeeCount * 0.1)
        const managerCountHigh = Math.floor(_globals.employeeCount * 0.2)
        // Getting a random integer between two values, inclusive at both max and min
        const min = Math.ceil(managerCountLow)
        const max = Math.floor(managerCountHigh)
        const numOfManagers = Math.floor(Math.random() * (max - min + 1) + min) + 1 // Always create at least one manager

        // for only child-departments (i.e. they have a parent department), create a few managers.
        const childDepartments: Department[] = []
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
            const { person, individual, employment } = directoryUtil.mockPerson(getRandomElement(childDepartments).name, null, _globals)
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
        const currentIncome = Number(faker.finance.amount(5000000, 30000000, 0)) // return yearly income amount in USD cents between $50,000.00 and $300,000.00
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
                unit: 'yearly',
                amount: currentIncome,
                currency: 'USD',
                effectiveDate: moment(effectiveDateOfCurrentIncome).format("YYYY-MM-DD")
            },
            incomeHistory: Array.from({ length: yearsOfService }, (v, i) => i).map(x => {
                // give 1 salary raise every year of service
                // by decreasing income from current income amount for every year of service. 
                // Ex: 30,000 - (30,000 * (11 / 100)) = 26,700
                return {
                    unit: 'yearly',
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
        moment(effectiveDateOfCurrentIncome).subtract
        return { person, individual, employment }
    }
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
        let departments: Department[] = []
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
        let locations: Location[] = []
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
        let accounts: Account[] = []
        for (let i = 0; i < numOfAccounts; i++) {
            accounts.push({
                routing_number: faker.finance.routingNumber(),
                account_name: companyName,
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
    // filterDepartments: (defaultDepartments: Department[], company_departments: Departments_Fields) => {
    //     let final: Department[] = []
    //     defaultDepartments.forEach((dept, i) => {
    //         final.push({
    //             name: (company_departments.name) ? dept.name : null,
    //             parent: {
    //                 name: (company_departments.parent.name && dept.parent.name) ? ((i % 4) ? dept.parent.name : null) : null,
    //             }
    //         })
    //     })
    //     return final
    // },
    // filterLocations: (defaultLocations: Location[], company_locations: Locations_Fields) => {
    //     let final: Location[] = []
    //     defaultLocations.forEach((location, i) => {
    //         final.push({
    //             line1: (company_locations.line1) ? location.line1 : null,
    //             line2: (company_locations.line2) ? location.line2 : null,
    //             city: (company_locations.city) ? location.city : null,
    //             state: (company_locations.state) ? location.state : null,
    //             postal_code: (company_locations.postal_code) ? location.postal_code : null,
    //             country: (company_locations.country) ? location.country : null,
    //         })
    //     })
    //     return final
    // },
    // filterAccounts: (companyName: string, companyAccounts: Accounts_Fields) => {
    // accounts.push({
    //     routing_number: (companyAccounts.routing_number) ? faker.finance.routingNumber() : null,
    //     account_name: (companyAccounts.account_name) ? companyName : null,
    //     institution_name: (companyAccounts.institution_name) ? getRandomElement(bankNames) : null,
    //     account_type: (companyAccounts.account_type) ? getRandomElement(accountTypes) : null,
    //     account_number: (companyAccounts.account_number) ? faker.finance.account(10) : null,
    // })
    // }

}





export { createSandbox, createCompany, createOrganization as createDirectory, companyUtil, }

function getRandomElement(collection: any[]) {
    return (collection) ? collection[Math.floor(Math.random() * collection.length)] : null
}