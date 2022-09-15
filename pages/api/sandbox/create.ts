import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/util/redis'
import { validToken } from '@/util/valid-token'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'


export default async function createSandbox(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + "/api/sandbox/create")

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
  redis.hset(sandbox_name, 'company', `{
    "id": "514aa2b7-898f-4ce7-bc05-c2fe993713e8",
    "legal_name": "Acme, Inc.",
    "entity": {
      "type": "corporation",
      "subtype": "s_corporation"
    },
    "ein": "12-3456789",
    "primary_email": "founders@acme.com",
    "primary_phone_number": "1234567890",
    "departments": [
      {
        "name": "Engineering",
        "parent": null
      },
      {
        "name": "Platform",
        "parent": {
          "name": "Engineering"
        }
      }
    ],
    "locations": [
      {
        "line1": "628 Bear Ave",
        "line2": "Apt A",
        "city": "Schenectady",
        "state": "NY",
        "postal_code": "94301",
        "country": "US"
      }
    ],
    "accounts": [
      {
        "routing_number": "123456789",
        "account_name": "CHECKING ACCOUNT",
        "institution_name": "BANK OF AMERICA, N.A.",
        "account_type": "checking",
        "account_number": "98765432"
      }
    ]
  }`)
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
  redis.hset(sandbox_name, 'company', `{
    "id": "d7c061bc-a897-47e7-b1c5-2ad0473564aa",
    "legal_name": "Kookaburra LLC",
    "ein": "35-2695949",
    "entity": {
      "type": "llc",
      "subtype": null
    },
    "primary_email": null,
    "primary_phone_number": "4085503228",
    "departments": [],
    "locations": [
      {
        "line1": "2412 Harrison Street Apt 105",
        "line2": null,
        "city": "San Francisco",
        "state": "CA",
        "country": "US",
        "postal_code": "94110"
      }
    ],
    "accounts": []
  }`)
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
  redis.hset(sandbox_name, 'company', `{
    "id": "38e344b4-7e78-4996-a6b3-bde16a7e79af",
    "legal_name": "Wigeon LLC",
    "ein": null,
    "entity": {
      "type": "llc"
    },
    "primary_email": "ansel@joinprofound.com",
    "primary_phone_number": "6109699226",
    "departments": [
      {
        "name": "Engineering",
        "parent": null
      },
      {
        "name": "Operations",
        "parent": null
      }
    ],
    "locations": [
      {
        "line1": "India",
        "line2": null,
        "city": null,
        "state": null,
        "country": null,
        "postal_code": null
      },
      {
        "line1": "1390 Market St",
        "line2": "Suite 200",
        "city": "San Francisco",
        "state": "CA",
        "country": "US",
        "postal_code": "94102"
      },
      {
        "line1": "Office 2",
        "line2": null,
        "city": null,
        "state": null,
        "country": null,
        "postal_code": null
      },
      {
        "line1": "123 Rainbow Rd",
        "line2": "Apt 3",
        "city": "Toronto",
        "state": "ON",
        "country": "CA",
        "postal_code": "L7J 3P0"
      },
      {
        "line1": "772-12 Front Ave",
        "line2": null,
        "city": "Warsaw",
        "state": "South Prussia",
        "country": "PL",
        "postal_code": "90-1234567"
      }
    ],
    "accounts": []
  }`)
  redis.hset(sandbox_name, 'directory', `{
    "paging": {
      "count": ${employee_amount},
      "offset": 0
    },
      "individuals": ${JSON.stringify(createDirectory(employee_amount))}
    }`
  )
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

type Company = {
  id: string;
  legalName: string;
  entity: {
    type: string;
    subtype: string | null;
  };
  ein: string;
  primaryEmail: string;
  primaryPhoneNumber: string;
  //departments: Department[];
  //locations: Location[];
  //accounts: Account[];
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

const PROVIDERS = [
  {
    id: 1,
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
      departments: {
        name: true,
        parent: {
          name: true
        }
      },
      locations: {
        line1: true,
        line2: true,
        city: true,
        state: true,
        postal_code: true,
        country: true
      },
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
  {
    id: 2,
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
      departments: {
        name: true,
        parent: {
          name: true
        }
      },
      locations: {
        line1: true,
        line2: true,
        city: true,
        state: true,
        postal_code: true,
        country: true
      },
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
  {
    id: 3,
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
      departments: {
        name: true,
        parent: {
          name: true
        }
      },
      locations: {
        line1: true,
        line2: true,
        city: true,
        state: true,
        postal_code: true,
        country: true
      },
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
  {
    id: 4,
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
      departments: {
        name: false,
        parent: {
          name: false
        }
      },
      locations: {
        line1: false,
        line2: false,
        city: false,
        state: false,
        postal_code: false,
        country: false
      },
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
  }
]