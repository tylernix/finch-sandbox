import redis from '@/util/redis'
import { createSandbox } from '@/util/mock'
import filterSandboxByProvider from '@/util/provider-filter'
import { Provider } from 'types/finch'

export default function Providers() {
    async function createMockProvider(sandbox_name: string, employee_amount: number, company_id: string, provider: Provider): Promise<boolean> {
        const newSandbox = createSandbox(employee_amount, company_id)
        const filteredSandbox = filterSandboxByProvider(newSandbox, provider)

        // Redis will return 1 is hash field is set, 0 if hash field not set
        const r1 = await redis.hset(sandbox_name, 'company', JSON.stringify(filteredSandbox.company))
        const r2 = await redis.hset(sandbox_name, 'directory', JSON.stringify(filteredSandbox.directory))
        const r3 = await redis.hset(sandbox_name, 'individual', JSON.stringify(filteredSandbox.individual))
        const r4 = await redis.hset(sandbox_name, 'employment', JSON.stringify(filteredSandbox.employment))
        const r5 = await redis.hset(sandbox_name, 'payment', JSON.stringify(filteredSandbox.payments))
        const r6 = await redis.hset(sandbox_name, 'pay_statement', JSON.stringify(filteredSandbox.payStatements))

        // Returns a Promise<boolean> containing if they sandbox was created properly or not
        if (r1 && r2 && r3 && r4 && r5 && r6) return true
        else return false
    }


    return { createMockProvider }
}