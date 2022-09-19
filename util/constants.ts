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
        company: null,
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

export { PROVIDER_COMPATIBILITY }