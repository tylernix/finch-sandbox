import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/util/redis'
import { validToken } from '@/util/valid-token'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'
import { Company, Department, Provider, Location, Account } from 'types/finch'
import { Accounts_Fields, Company_Fields, Departments_Fields, Locations_Fields, Provider_Fields } from 'types/finch-compatibility'

const PROVIDER_COMPATIBILITY = {
  "bamboohr": {
    provider_id: 'bamboohr',
    display_name: "Bamboo HR",
    logo_src: "https://finch-logos.s3.us-west-2.amazonaws.com/bambooHrLogo.svg",
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
      paging: {
        count: true,
        offset: true
      },
      individuals: {
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
      }
    }
  },
  "gusto": {
    provider_id: 'gusto',
    display_name: "Gusto",
    logo_src: "https://finch-logos.s3.us-west-2.amazonaws.com/gustoLogo.svg",
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
      paging: {
        count: true,
        offset: true
      },
      individuals: {
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
      }
    }
  },
  "justworks": {
    provider_id: 'justworks',
    display_name: "Justworks",
    logo_src: "https://finch-logos.s3.us-west-2.amazonaws.com/justworksLogo.svg",
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
      paging: {
        count: true,
        offset: true
      },
      individuals: {
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
      }
    }
  },
  "workday": {
    provider_id: 'workday',
    display_name: "Workday",
    logo_src: "https://finch-logos.s3.us-west-2.amazonaws.com/workdayLogo.svg",
    company: {
      id: false,
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
      paging: {
        count: true,
        offset: true
      },
      individuals: {
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
      }
    }
  },
  "paychex_flex": {
    provider_id: 'paychex_flex',
    display_name: "Paychex Flex",
    logo_src: "https://finch-logos.s3.us-west-2.amazonaws.com/paychexFlexLogo.svg",
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
      paging: {
        count: true,
        offset: true
      },
      individuals: {
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
      }
    }
  }
}

export default async function createSandbox(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + "/api/sandbox/create")
  //console.log(PROVIDER_COMPATIBILITY.bamboohr)
  //console.log(JSON.stringify(createCompany(PROVIDER_COMPATIBILITY.gusto.company)))

  if (req.method === 'POST') {
    try {
      const { provider, number_of_employees, manual } = req.body
      if (!provider)
        return res.status(400).json({ msg: "Provider is required" })

      const access_token = 'sandbox:' + uuidv4()
      const company_id = uuidv4()
      const sandbox_name = `sandbox:${company_id}:${provider}`
      await redis.set(access_token, sandbox_name)
      const employee_amount: number = number_of_employees ?? 10

      switch (provider) {
        case 'gusto': {
          console.log("Creating Gusto sandbox")
          createGusto(sandbox_name, employee_amount)
          break;
        }
        case 'bamboohr': {
          console.log("Creating BambooHR sandbox")
          createBambooHR(sandbox_name, employee_amount)
          break;
        }
        case 'paychex_flex': {
          console.log("Creating Paychex Flex sandbox")
          createPaychexFlex(sandbox_name, employee_amount)
          break;
        }
        case 'justworks': {
          console.log("Creating Justworks sandbox")
          createJustworks(sandbox_name, employee_amount)
          break;
        }
        case 'workday': {
          console.log("Creating Workday sandbox")
          createWorkday(sandbox_name, employee_amount)
          break;
        }
        default: {
          //do nothing
        }
      }

      return res.status(200).json({ sandbox_created: provider, company_id, access_token })
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error creating sandbox environment" })
    }
  }

  return res.status(405).json({ msg: "Method not implemented." })
}

function createGusto(sandbox_name: string, employee_amount: number) {
  redis.hset(sandbox_name, 'company', createCompany(PROVIDER_COMPATIBILITY.gusto.company))
  redis.hset(sandbox_name, 'directory', `{
    "paging": {
      "count": ${employee_amount},
      "offset": 0
    },
      "individuals": ${JSON.stringify(createDirectory(employee_amount))}
    }`
  )
}

function createPaychexFlex(sandbox_name: string, employee_amount: number) {
  redis.hset(sandbox_name, 'company', createCompany(PROVIDER_COMPATIBILITY.paychex_flex.company))
  redis.hset(sandbox_name, 'directory', `{
    "paging": {
      "count": ${employee_amount},
      "offset": 0
    },
      "individuals": ${JSON.stringify(createDirectory(employee_amount))}
    }`
  )
}

function createWorkday(sandbox_name: string, employee_amount: number) {
  redis.hset(sandbox_name, 'company', createCompany(PROVIDER_COMPATIBILITY.workday.company))
  redis.hset(sandbox_name, 'directory', `{
    "paging": {
      "count": ${employee_amount},
      "offset": 0
    },
      "individuals": ${JSON.stringify(createDirectory(employee_amount))}
    }`
  )
}

function createBambooHR(sandbox_name: string, employee_amount: number) {
  redis.hset(sandbox_name, 'company', createCompany(PROVIDER_COMPATIBILITY.bamboohr.company))
  redis.hset(sandbox_name, 'directory', `{
    "paging": {
      "count": ${employee_amount},
      "offset": 0
    },
      "individuals": ${JSON.stringify(createDirectory(employee_amount))}
    }`
  )
}

function createJustworks(sandbox_name: string, employee_amount: number) {
  redis.hset(sandbox_name, 'company', createCompany(PROVIDER_COMPATIBILITY.justworks.company))
  redis.hset(sandbox_name, 'directory', `{
    "paging": {
      "count": ${employee_amount},
      "offset": 0
    },
      "individuals": ${JSON.stringify(createDirectory(employee_amount))}
    }`
  )
}

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
  const accountTypes = [
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

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  departmentName: string;
  managerId: string | null;
  isActive: boolean;
}

type Individual = {
  id: string;
  ssn: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: string | null;
  dob: string;
  personalPhoneNumber: string;
  personalEmail?: string;
  workEmail: string;
  isActive: boolean;
  homeLine1: string;
  homeLine2: string | null;
  homeCity: string;
  homeState: string;
  homeCountry: string;
  homePostalCode: string;
}


