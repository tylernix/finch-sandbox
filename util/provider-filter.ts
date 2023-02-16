import { Provider, Sandbox, Company, ISandbox, Account, Location, Department } from "types/finch";

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
    const payStatement = provider.compatibility.pay_statement


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
            }
            : NotImplementedError,
        directory: (provider.compatibility.directory) ? sandbox.directory : NotImplementedError,
        individual: (provider.compatibility.individual) ? sandbox.individual : NotImplementedError,
        employment: (provider.compatibility.employment) ? sandbox.employment : NotImplementedError,
        payments: (provider.compatibility.payment) ? sandbox.payments : NotImplementedError,
        payStatements: (provider.compatibility.pay_statement) ? sandbox.payStatements : NotImplementedError,
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