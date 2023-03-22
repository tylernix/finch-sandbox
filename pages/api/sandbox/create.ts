import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/util/redis'
import { v4 as uuidv4 } from 'uuid'
import { FINCH_PROVIDERS } from '@/util/constants'
import MockScenarios from '@/util/scenarios'


export default async function createSandbox(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/sandbox/create")


  if (req.method === 'POST') {
    try {
      const { provider_id, employee_size, products, manual } = req.body
      const dynamic = req.body.dynamic ?? false

      // Input Validation
      if (!provider_id)
        return res.status(400).json("Provider Id is required")
      if (!products || products.length == 0)
        return res.status(400).json("Products is required")
      if (!products.every((product: string) =>
        product === 'company' ||
        product === 'directory' ||
        product === 'individual' ||
        product === 'employment' ||
        product === 'payment' ||
        product === 'pay_statement' ||
        product === 'benefits' ||
        product === 'ssn'
      ))
        return res.status(400).json("Invalid products scope types")

      if (employee_size > 200 || employee_size <= 0)
        return res.status(400).json("Employee size must be between 1 and 200.")

      // Get valid provider information
      const provider = FINCH_PROVIDERS.find(provider => provider.id === provider_id)
      if (!provider)
        return res.status(400).json("Invalid provider id")

      //console.log(provider)

      // Token Validation
      const access_token = 'sandbox-token-' + uuidv4()
      const company_id = uuidv4()
      const sandbox_name = `sandbox:${company_id}:${provider}`
      await redis.set(access_token, sandbox_name)
      products.forEach(async (product: string) => await redis.sadd(`products:${access_token}`, product))
      const employee_amount: number = employee_size ?? 10

      const scenarios = MockScenarios()
      const sandbox = await scenarios.createMockProvider(sandbox_name, employee_amount, company_id, provider)
      if (!sandbox) throw Error('Error creating sandbox environment')

      return res.status(200).json({ payroll_provider_id: provider.id, company_id, access_token })
    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Error creating sandbox environment")
    }
  }

  return res.status(405).json("Method not implemented.")
}

const containsXSS = (text: String) => {
  if (text.includes('<script>')) {
    return true
  }

  return false
}


