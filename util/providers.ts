import redis from '@/util/redis'
import { createSandbox } from '@/util/mock'
import { PROVIDER_COMPATIBILITY } from './constants'
import {
    GUSTO_COMPANY, GUSTO_DIRECTORY, GUSTO_INDIVIDUAL, GUSTO_EMPLOYMENT, GUSTO_PAYMENTS, GUSTO_PAYSTATEMENTS,
    BAMBOOHR_COMPANY, BAMBOOHR_DIRECTORY, BAMBOOHR_INDIVIDUAL, BAMBOOHR_EMPLOYMENT, BAMBOOHR_PAYMENTS, BAMBOOHR_PAYSTATEMENTS,
    JUSTWORKS_COMPANY, JUSTWORKS_DIRECTORY, JUSTWORKS_INDIVIDUAL, JUSTWORKS_EMPLOYMENT, JUSTWORKS_PAYMENTS, JUSTWORKS_PAYSTATEMENTS,
    WORKDAY_COMPANY, WORKDAY_DIRECTORY, WORKDAY_INDIVIDUAL, WORKDAY_EMPLOYMENT, WORKDAY_PAYMENTS, WORKDAY_PAYSTATEMENTS,
    PAYCHEXFLEX_COMPANY, PAYCHEXFLEX_DIRECTORY, PAYCHEXFLEX_INDIVIDUAL, PAYCHEXFLEX_EMPLOYMENT, PAYCHEXFLEX_PAYMENTS, PAYCHEXFLEX_PAYSTATEMENTS
} from './constants'

export default function Providers() {
    function createGusto(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean) {
        if (dynamic) {
            const newGustoSandbox = createSandbox(PROVIDER_COMPATIBILITY.gusto, employee_amount, company_id)

            // CUSTOM GUSTO LOGIC to mask account numbers to only show the last 4 digits
            newGustoSandbox._company?.accounts?.forEach(account => {
                if (account.account_number != null) {
                    let mask = ''
                    for (let i = 0; i < account.account_number.length - 4; i++) {
                        mask += 'X'
                    }
                    account.account_number = mask + account.account_number.substring(account.account_number.length - 4)
                }
            })

            redis.hset(sandbox_name, 'company', JSON.stringify(newGustoSandbox._company))
            redis.hset(sandbox_name, 'directory', JSON.stringify(newGustoSandbox._directory))
        } else {
            redis.hset(sandbox_name, 'company', JSON.stringify(GUSTO_COMPANY))
            redis.hset(sandbox_name, 'directory', JSON.stringify(GUSTO_DIRECTORY))
            redis.hset(sandbox_name, 'individual', JSON.stringify(GUSTO_INDIVIDUAL))
            redis.hset(sandbox_name, 'employment', JSON.stringify(GUSTO_EMPLOYMENT))
            redis.hset(sandbox_name, 'payment', JSON.stringify(GUSTO_PAYMENTS))
            redis.hset(sandbox_name, 'pay_statement', JSON.stringify(GUSTO_PAYSTATEMENTS))
        }


    }

    function createBambooHR(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean) {
        if (dynamic) {
            const newBambooSandbox = createSandbox(PROVIDER_COMPATIBILITY.bamboohr, employee_amount, company_id)
            redis.hset(sandbox_name, 'company', JSON.stringify(newBambooSandbox._company))
            redis.hset(sandbox_name, 'directory', JSON.stringify(newBambooSandbox._directory))
        }
        else {
            redis.hset(sandbox_name, 'company', JSON.stringify(BAMBOOHR_COMPANY))
            redis.hset(sandbox_name, 'directory', JSON.stringify(BAMBOOHR_DIRECTORY))
            redis.hset(sandbox_name, 'individual', JSON.stringify(BAMBOOHR_INDIVIDUAL))
            redis.hset(sandbox_name, 'employment', JSON.stringify(BAMBOOHR_EMPLOYMENT))
            redis.hset(sandbox_name, 'payment', JSON.stringify(BAMBOOHR_PAYMENTS))
            redis.hset(sandbox_name, 'pay_statement', JSON.stringify(BAMBOOHR_PAYSTATEMENTS))
        }

    }

    function createJustworks(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean) {
        if (dynamic) {
            const newJustworksSandbox = createSandbox(PROVIDER_COMPATIBILITY.justworks, employee_amount, company_id)
            redis.hset(sandbox_name, 'company', JSON.stringify(newJustworksSandbox._company))
            redis.hset(sandbox_name, 'directory', JSON.stringify(newJustworksSandbox._directory))
        } else {
            redis.hset(sandbox_name, 'company', JSON.stringify(JUSTWORKS_COMPANY))
            redis.hset(sandbox_name, 'directory', JSON.stringify(JUSTWORKS_DIRECTORY))
            redis.hset(sandbox_name, 'individual', JSON.stringify(JUSTWORKS_INDIVIDUAL))
            redis.hset(sandbox_name, 'employment', JSON.stringify(JUSTWORKS_EMPLOYMENT))
            redis.hset(sandbox_name, 'payment', JSON.stringify(JUSTWORKS_PAYMENTS))
            redis.hset(sandbox_name, 'pay_statement', JSON.stringify(JUSTWORKS_PAYSTATEMENTS))
        }

    }

    function createWorkday(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean) {
        if (dynamic) {
            const newWorkdaySandbox = createSandbox(PROVIDER_COMPATIBILITY.workday, employee_amount, company_id)
            redis.hset(sandbox_name, 'company', `{
                "statusCode": 501,
                "status": 501,
                "code": 501,
                "message": "Not Implemented",
                "name": "not_implemented_error"
              }`)
            redis.hset(sandbox_name, 'directory', JSON.stringify(newWorkdaySandbox._directory))
        } else {
            redis.hset(sandbox_name, 'company', JSON.stringify(WORKDAY_COMPANY))
            redis.hset(sandbox_name, 'directory', JSON.stringify(WORKDAY_DIRECTORY))
            redis.hset(sandbox_name, 'individual', JSON.stringify(WORKDAY_INDIVIDUAL))
            redis.hset(sandbox_name, 'employment', JSON.stringify(WORKDAY_EMPLOYMENT))
            redis.hset(sandbox_name, 'payment', JSON.stringify(WORKDAY_PAYMENTS))
            redis.hset(sandbox_name, 'pay_statement', JSON.stringify(WORKDAY_PAYSTATEMENTS))
        }
    }

    function createPaychexFlex(sandbox_name: string, employee_amount: number, company_id: string, dynamic: boolean) {
        if (dynamic) {
            const newPaychexSandbox = createSandbox(PROVIDER_COMPATIBILITY.paychex_flex, employee_amount, company_id)
            redis.hset(sandbox_name, 'company', JSON.stringify(newPaychexSandbox._company))
            redis.hset(sandbox_name, 'directory', JSON.stringify(newPaychexSandbox._directory))
        } else {
            redis.hset(sandbox_name, 'company', JSON.stringify(PAYCHEXFLEX_COMPANY))
            redis.hset(sandbox_name, 'directory', JSON.stringify(PAYCHEXFLEX_DIRECTORY))
            redis.hset(sandbox_name, 'individual', JSON.stringify(PAYCHEXFLEX_INDIVIDUAL))
            redis.hset(sandbox_name, 'employment', JSON.stringify(PAYCHEXFLEX_EMPLOYMENT))
            redis.hset(sandbox_name, 'payment', JSON.stringify(PAYCHEXFLEX_PAYMENTS))
            redis.hset(sandbox_name, 'pay_statement', JSON.stringify(PAYCHEXFLEX_PAYSTATEMENTS))
        }
    }

    return { createGusto, createBambooHR, createJustworks, createPaychexFlex, createWorkday }
}