import redis from '@/util/redis'
import { createSandbox } from '@/util/mock'
import { PROVIDER_COMPATIBILITY, PROVIDER_COMPATIBILITY_NEW } from './constants'
import {
    GUSTO_COMPANY, GUSTO_DIRECTORY, GUSTO_INDIVIDUAL, GUSTO_EMPLOYMENT, GUSTO_PAYMENTS, GUSTO_PAYSTATEMENTS,
    BAMBOOHR_COMPANY, BAMBOOHR_DIRECTORY, BAMBOOHR_INDIVIDUAL, BAMBOOHR_EMPLOYMENT, BAMBOOHR_PAYMENTS, BAMBOOHR_PAYSTATEMENTS,
    JUSTWORKS_COMPANY, JUSTWORKS_DIRECTORY, JUSTWORKS_INDIVIDUAL, JUSTWORKS_EMPLOYMENT, JUSTWORKS_PAYMENTS, JUSTWORKS_PAYSTATEMENTS,
    WORKDAY_COMPANY, WORKDAY_DIRECTORY, WORKDAY_INDIVIDUAL, WORKDAY_EMPLOYMENT, WORKDAY_PAYMENTS, WORKDAY_PAYSTATEMENTS,
    PAYCHEXFLEX_COMPANY, PAYCHEXFLEX_DIRECTORY, PAYCHEXFLEX_INDIVIDUAL, PAYCHEXFLEX_EMPLOYMENT, PAYCHEXFLEX_PAYMENTS, PAYCHEXFLEX_PAYSTATEMENTS
} from './constants'

export default function Providers() {
    async function createGusto(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean): Promise<boolean> {
        if (dynamic) {
            const newGustoSandbox = createSandbox(employee_amount, company_id)
            //const newGustoSandbox = filterSandbox(PROVIDER_COMPATIBILITY.gusto, sandbox)

            // CUSTOM GUSTO LOGIC to mask account numbers to only show the last 4 digits
            newGustoSandbox.company?.accounts?.forEach(account => {
                if (account.account_number != null) {
                    let mask = ''
                    for (let i = 0; i < account.account_number.length - 4; i++) {
                        mask += 'X'
                    }
                    account.account_number = mask + account.account_number.substring(account.account_number.length - 4)
                }
            })

            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(newGustoSandbox.company))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(newGustoSandbox.directory))
            const r3 = await redis.hset(sandbox_name, 'individual', JSON.stringify(newGustoSandbox.individual))
            const r4 = await redis.hset(sandbox_name, 'employment', JSON.stringify(newGustoSandbox.employment))
            const r5 = await redis.hset(sandbox_name, 'payment', JSON.stringify(newGustoSandbox.payments))
            const r6 = await redis.hset(sandbox_name, 'pay_statements', JSON.stringify(newGustoSandbox.payStatements))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2 && r3 && r4 && r5 && r6) return true
            else return false

        } else {
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(GUSTO_COMPANY))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(GUSTO_DIRECTORY))
            const r3 = await redis.hset(sandbox_name, 'individual', JSON.stringify(GUSTO_INDIVIDUAL))
            const r4 = await redis.hset(sandbox_name, 'employment', JSON.stringify(GUSTO_EMPLOYMENT))
            const r5 = await redis.hset(sandbox_name, 'payment', JSON.stringify(GUSTO_PAYMENTS))
            const r6 = await redis.hset(sandbox_name, 'pay_statement', JSON.stringify(GUSTO_PAYSTATEMENTS))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2 && r3 && r4 && r5 && r6) return true
            else return false
        }


    }

    async function createBambooHR(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean): Promise<boolean> {
        if (dynamic) {
            const newBambooSandbox = createSandbox(PROVIDER_COMPATIBILITY.bamboohr, employee_amount, company_id)
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(newBambooSandbox._company))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(newBambooSandbox._directory))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2) return true
            else return false
        }
        else {
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(BAMBOOHR_COMPANY))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(BAMBOOHR_DIRECTORY))
            const r3 = await redis.hset(sandbox_name, 'individual', JSON.stringify(BAMBOOHR_INDIVIDUAL))
            const r4 = await redis.hset(sandbox_name, 'employment', JSON.stringify(BAMBOOHR_EMPLOYMENT))
            const r5 = await redis.hset(sandbox_name, 'payment', JSON.stringify(BAMBOOHR_PAYMENTS))
            const r6 = await redis.hset(sandbox_name, 'pay_statement', JSON.stringify(BAMBOOHR_PAYSTATEMENTS))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2 && r3 && r4 && r5 && r6) return true
            else return false
        }

    }

    async function createJustworks(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean): Promise<boolean> {
        if (dynamic) {
            const newJustworksSandbox = createSandbox(PROVIDER_COMPATIBILITY.justworks, employee_amount, company_id)
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(newJustworksSandbox._company))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(newJustworksSandbox._directory))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2) return true
            else return false
        } else {
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(JUSTWORKS_COMPANY))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(JUSTWORKS_DIRECTORY))
            const r3 = await redis.hset(sandbox_name, 'individual', JSON.stringify(JUSTWORKS_INDIVIDUAL))
            const r4 = await redis.hset(sandbox_name, 'employment', JSON.stringify(JUSTWORKS_EMPLOYMENT))
            const r5 = await redis.hset(sandbox_name, 'payment', JSON.stringify(JUSTWORKS_PAYMENTS))
            const r6 = await redis.hset(sandbox_name, 'pay_statement', JSON.stringify(JUSTWORKS_PAYSTATEMENTS))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2 && r3 && r4 && r5 && r6) return true
            else return false
        }

    }

    async function createWorkday(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean): Promise<boolean> {
        if (dynamic) {
            const newWorkdaySandbox = createSandbox(PROVIDER_COMPATIBILITY.workday, employee_amount, company_id)
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(`{
                "statusCode": 501,
                "status": 501,
                "code": 501,
                "message": "Not Implemented",
                "name": "not_implemented_error"
              }`))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(newWorkdaySandbox._directory))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2) return true
            else return false
        } else {
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(WORKDAY_COMPANY))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(WORKDAY_DIRECTORY))
            const r3 = await redis.hset(sandbox_name, 'individual', JSON.stringify(WORKDAY_INDIVIDUAL))
            const r4 = await redis.hset(sandbox_name, 'employment', JSON.stringify(WORKDAY_EMPLOYMENT))
            const r5 = await redis.hset(sandbox_name, 'payment', JSON.stringify(WORKDAY_PAYMENTS))
            const r6 = await redis.hset(sandbox_name, 'pay_statement', JSON.stringify(WORKDAY_PAYSTATEMENTS))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2 && r3 && r4 && r5 && r6) return true
            else return false
        }
    }

    async function createPaychexFlex(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean): Promise<boolean> {
        if (dynamic) {
            const newPaychexSandbox = createSandbox(PROVIDER_COMPATIBILITY.paychex_flex, employee_amount, company_id)
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(newPaychexSandbox._company))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(newPaychexSandbox._directory))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2) return true
            else return false
        } else {
            // Redis will return 1 is hash field is set, 0 if hash field not set
            const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(PAYCHEXFLEX_COMPANY))
            const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(PAYCHEXFLEX_DIRECTORY))
            const r3 = await redis.hset(sandbox_name, 'individual', JSON.stringify(PAYCHEXFLEX_INDIVIDUAL))
            const r4 = await redis.hset(sandbox_name, 'employment', JSON.stringify(PAYCHEXFLEX_EMPLOYMENT))
            const r5 = await redis.hset(sandbox_name, 'payment', JSON.stringify(PAYCHEXFLEX_PAYMENTS))
            const r6 = await redis.hset(sandbox_name, 'pay_statement', JSON.stringify(PAYCHEXFLEX_PAYSTATEMENTS))

            // Returns a Promise<boolean> containing if they sandbox was created properly or not
            if (r1 && r2 && r3 && r4 && r5 && r6) return true
            else return false
        }
    }

    return { createGusto, createBambooHR, createJustworks, createPaychexFlex, createWorkday }
}