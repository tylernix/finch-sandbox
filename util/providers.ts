import redis from '@/util/redis'
import { createSandbox } from '@/util/mock'
import { PROVIDER_COMPATIBILITY } from './constants'

export default function Providers() {
    function createGusto(sandbox_name: string, employee_amount: number) {
        const newGustoSandbox = createSandbox(PROVIDER_COMPATIBILITY.gusto, employee_amount)

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
        redis.hset(sandbox_name, 'directory', `{
          "paging": {
            "count": ${employee_amount},
            "offset": 0
          },
            "individuals": ${JSON.stringify(newGustoSandbox._directory)}
          }`
        )
    }

    function createBambooHR(sandbox_name: string, employee_amount: number) {
        const newBambooSandbox = createSandbox(PROVIDER_COMPATIBILITY.bamboohr, employee_amount)
        redis.hset(sandbox_name, 'company', JSON.stringify(newBambooSandbox._company))
        redis.hset(sandbox_name, 'directory', `{
          "paging": {
            "count": ${employee_amount},
            "offset": 0
          },
            "individuals": ${JSON.stringify(newBambooSandbox._directory)}
          }`
        )
    }

    function createJustworks(sandbox_name: string, employee_amount: number) {
        const newJustworksSandbox = createSandbox(PROVIDER_COMPATIBILITY.justworks, employee_amount)
        redis.hset(sandbox_name, 'company', JSON.stringify(newJustworksSandbox._company))
        redis.hset(sandbox_name, 'directory', `{
          "paging": {
            "count": ${employee_amount},
            "offset": 0
          },
            "individuals": ${JSON.stringify(newJustworksSandbox._directory)}
          }`
        )
    }

    function createWorkday(sandbox_name: string, employee_amount: number) {
        const newWorkdaySandbox = createSandbox(PROVIDER_COMPATIBILITY.workday, employee_amount)
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
            "individuals": ${JSON.stringify(newWorkdaySandbox._directory)}
          }`
        )
    }

    function createPaychexFlex(sandbox_name: string, employee_amount: number) {
        const newPaychexSandbox = createSandbox(PROVIDER_COMPATIBILITY.paychex_flex, employee_amount)
        redis.hset(sandbox_name, 'company', JSON.stringify(newPaychexSandbox._company))
        redis.hset(sandbox_name, 'directory', `{
          "paging": {
            "count": ${employee_amount},
            "offset": 0
          },
            "individuals": ${JSON.stringify(newPaychexSandbox._directory)}
          }`
        )
    }

    return { createGusto, createBambooHR, createJustworks, createPaychexFlex, createWorkday, PROVIDER_COMPATIBILITY }
}