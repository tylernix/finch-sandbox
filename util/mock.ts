import { faker } from '@faker-js/faker'
import { Company, Department, Provider, Location, Account, Person, Individual, Employment, Payment, PayStatement } from 'types/finch'
import { Accounts_Fields, Company_Fields, Departments_Fields, Directory_Fields, Locations_Fields, Provider_Fields } from 'types/finch-compatibility'

type SandboxGlobal = {
    companyId: string,
    companyName: string,
    companyEmail: string,
    companyDepartments: Department[] | null,
    companyLocations: Location[] | null
}
type Sandbox = {
    _company: Company | null,
    _directory: Person[] | null,
    _individuals: Individual[],
    _employments: Employment[],
    _payments: Payment[] | null,
    _payStatements: PayStatement[] | null
}

function createSandbox(provider: Provider_Fields, employeeCount: number, companyId: string): Sandbox {
    const companyName = faker.company.name()
    const companyEmail = companyName.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s{1,}/g, '-').toLocaleLowerCase() + ".com"
    const companyDepartments = (provider.company) ? createDepartments(provider.company.departments) : null
    const companyLocations = (provider.company) ? createLocations(provider.company.locations) : null

    const _sandbox: SandboxGlobal = {
        companyId,
        companyName,
        companyEmail,
        companyDepartments,
        companyLocations
    }

    const _company: Company | null = (provider.company) ? createCompany(_sandbox, provider.company) : null
    const _directory: Person[] | null = (provider.directory) ? createDirectory(employeeCount, _sandbox, provider.directory) : null
    const _individuals: Individual[] = []
    const _employments: Employment[] = []
    const _payments: Payment[] = []
    const _payStatements: PayStatement[] = []

    return { _company, _directory, _individuals, _employments, _payments, _payStatements }
}

function createCompany(sandbox: SandboxGlobal, company: Company_Fields): Company {
    // Logic for data fields that depend on each other
    const entityType = (company.entity.type) ? getEntityType() : null
    const entitySubtype = (company.entity.subtype && entityType) ? getEntitySubtype() : null

    return {
        id: faker.datatype.uuid(),
        legal_name: (company.legal_name) ? sandbox.companyName : null,
        entity: {
            type: entityType,
            subtype: entitySubtype
        },
        primary_email: (company.primary_email) ? faker.internet.email(undefined, undefined, sandbox.companyEmail) : null,
        primary_phone_number: (company.primary_phone_number) ? faker.phone.number('##########') : null,
        departments: (company.department) ? sandbox.companyDepartments : null,
        ein: (company.ein) ? faker.phone.number('##-#######') : null,
        locations: (company.location) ? sandbox.companyLocations : null,
        accounts: (company.account) ? createAccounts(sandbox.companyName, company.accounts) : null,
    }
}

function createDirectory(amount: number, sandbox: SandboxGlobal, directory_wait: Directory_Fields) {
    // for each child-department, create a few managers

    // Generate some employees for this manager

    let directory: Person[] = []
    for (let i = 0; i < amount; i++) {
        directory.push(createPerson())
    }
    return directory

}

function createPerson(): Person {
    // Create stub + add to directory
    // Create individual + add to _individual
    // create employment + add to _employment
    return {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: null,
        departmentName: 'Engineering',
        manager: {
            id: faker.datatype.uuid(),
        },
        isActive: faker.datatype.boolean(),
    }
}

function getEntityType() {
    // Entity types as defined by Finch API Reference
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
}

function getEntitySubtype() {
    // Entity Subtypes as defined by Finch API Reference
    const entityTypes = [
        "s_corporation",
        "c_corporation",
        "b_corporation",
        null
    ]
    return entityTypes[Math.floor(Math.random() * entityTypes.length)]
}

function createDepartments(company_departments: Departments_Fields) {
    // Getting a random integer between two values, inclusive at both max and min
    const min = Math.ceil(1)
    const max = Math.floor(10)
    const numOfDepts = Math.floor(Math.random() * (max - min + 1) + min)

    // Create random fake departments
    let departments: Department[] = []
    for (let i = 0; i < numOfDepts; i++) {
        departments.push({
            name: (company_departments.name) ? faker.name.jobArea() : null,
            parent: {
                name: (company_departments.parent.name) ? ((i % 4) ? getRandomElement(departments)?.name : null) : null,
            }
        })
    }

    return departments
}

function createLocations(company_locations: Locations_Fields) {
    // Getting a random integer between two values, inclusive at both max and min
    const min = Math.ceil(1)
    const max = Math.floor(3)
    const numOfLocations = Math.floor(Math.random() * (max - min + 1) + min)

    // Create random fake locations localized to USA for now
    let locations: Location[] = []
    for (let i = 0; i < numOfLocations; i++) {
        locations.push({
            line1: (company_locations.line1) ? faker.address.streetAddress(false) : null,
            line2: (company_locations.line2) ? (Math.random() ? faker.address.secondaryAddress() : null) : null,
            city: (company_locations.city) ? faker.address.city() : null,
            state: (company_locations.state) ? faker.address.stateAbbr() : null,
            postal_code: (company_locations.postal_code) ? faker.address.zipCode() : null,
            country: (company_locations.country) ? 'US' : null,
        })
    }

    return locations
}

function createAccounts(companyName: string, companyAccounts: Accounts_Fields) {
    // Account types as defined by Finch API Reference
    // Adding duplicates in order to reduce the number of nulls
    const accountTypes = [
        "checking",
        "savings",
        "checking",
        "savings",
        null
    ]

    const bankNames = [
        "BANK OF AMERICA",
        "JPMORGAN CHASE",
        "CAPITAL ONE",
        "WELLS FARGO",
        "PNC",
        "EVOLVE BANK AND TRUST",
    ]

    // Getting a random integer between two values, inclusive at both max and min
    const min = Math.ceil(1)
    const max = Math.floor(3)
    const numOfAccounts = Math.floor(Math.random() * (max - min + 1) + min)

    // Create random fake bank accounts
    let accounts: Account[] = []
    for (let i = 0; i < numOfAccounts; i++) {
        accounts.push({
            routing_number: (companyAccounts.routing_number) ? faker.finance.routingNumber() : null,
            account_name: (companyAccounts.account_name) ? companyName : null,
            institution_name: (companyAccounts.institution_name) ? getRandomElement(bankNames) : null,
            account_type: (companyAccounts.account_type) ? getRandomElement(accountTypes) : null,
            account_number: (companyAccounts.account_number) ? faker.finance.account(10) : null,
        })
    }

    return accounts
}

export { createSandbox, createCompany, createPerson, createAccounts, createDepartments, createDirectory, createLocations }

function getRandomElement(collection: any[]) {
    return (collection) ? collection[Math.floor(Math.random() * collection.length)] : null
}