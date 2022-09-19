import redis from '@/util/redis'
import { createCompany, createDirectory } from '@/util/mock'

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

export default function Providers() {
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
        redis.hset(sandbox_name, 'company', `{
          "statusCode": 501,
          "status": 501,
          "code": 501,
          "message": "Not Implemented",
          "name": "not_implemented_error"
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

    return { createGusto, createBambooHR, createJustworks, createPaychexFlex, createWorkday }
}