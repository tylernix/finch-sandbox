import { faker } from '@faker-js/faker'
import { Company, Department, Provider, Location, Account, Person } from 'types/finch'
import { Accounts_Fields, Company_Fields, Departments_Fields, Locations_Fields, Provider_Fields } from 'types/finch-compatibility'

function createCompany(company: Company_Fields) {
    // Logic for data fields that depend on each other
    const entity_type = (company.entity.type) ? getEntityType() : null
    const entity_subtype = (company.entity.subtype && entity_type) ? getEntitySubtype() : null

    return JSON.stringify({
        id: (company.id) ? faker.datatype.uuid() : null,
        legal_name: (company.legal_name) ? faker.company.name() : null,
        entity: {
            type: entity_type,
            subtype: entity_subtype
        },
        primary_email: (company.primary_email) ? faker.internet.email() : null,
        primary_phone_number: (company.primary_phone_number) ? faker.phone.number('##########') : null,
        departments: (company.department) ? createDepartments(company.departments) : null,
        ein: (company.ein) ? faker.phone.number('##-#######') : null,
        locations: (company.location) ? createLocations(company.locations) : null,
        accounts: (company.account) ? createAccounts(company.accounts) : null,
    })
}

function createDirectory(amount: number) {
    let directory: Person[] = []
    for (let i = 0; i < amount; i++) {
        directory.push(createPerson())
    }
    return directory

}

function createPerson(): Person {
    return {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        middleName: null,
        departmentName: 'Engineering',
        managerId: faker.datatype.uuid(),
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
    return entityTypes[Math.floor(Math.random() * entityTypes.length)]
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
                name: (company_departments.parent.name) ? ((i % 4) ? departments[Math.floor(Math.random() * departments.length)]?.name : null) : null,
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

    // Create random fake locations
    let locations: Location[] = []
    for (let i = 0; i < numOfLocations; i++) {
        locations.push({
            line1: (company_locations.line1) ? faker.address.streetAddress() : null,
            line2: (company_locations.line2) ? faker.address.secondaryAddress() : null,
            city: (company_locations.city) ? faker.address.city() : null,
            state: (company_locations.state) ? faker.address.stateAbbr() : null,
            postal_code: (company_locations.postal_code) ? faker.address.zipCode() : null,
            country: (company_locations.country) ? faker.address.countryCode() : null,
        })
    }

    return locations
}

function createAccounts(company_accounts: Accounts_Fields) {
    // Account types as defined by Finch API Reference
    // Adding duplicates in order to reduce the number of nulls
    const accountTypes = [
        "checking",
        "savings",
        "checking",
        "savings",
        null
    ]

    // We could also list Bank names here so that it looks more real.
    const bankNames = [
        "BANK OF AMERICA",
        "CHASE",
        "CAPITAL ONE",
        "REGIONS"
    ]

    // Getting a random integer between two values, inclusive at both max and min
    const min = Math.ceil(1)
    const max = Math.floor(3)
    const numOfAccounts = Math.floor(Math.random() * (max - min + 1) + min)

    // Create random fake accounts
    let accounts: Account[] = []
    for (let i = 0; i < numOfAccounts; i++) {
        accounts.push({
            routing_number: (company_accounts.routing_number) ? faker.finance.routingNumber() : null,
            account_name: (company_accounts.account_name) ? faker.company.name() : null,
            institution_name: (company_accounts.institution_name) ? faker.company.name() : null,
            account_type: (company_accounts.account_type) ? accountTypes[Math.floor(Math.random() * accountTypes.length)] : null,
            account_number: (company_accounts.account_number) ? faker.finance.account(10) : null,
        })
    }

    return accounts
}

export { createCompany, createPerson, createAccounts, createDepartments, createDirectory, createLocations }