import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/util/redis'
import { v4 as uuidv4 } from 'uuid'
import SandboxProviders from '@/util/providers'

export default async function createSandbox(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/sandbox/create")
  const providers = SandboxProviders()

  if (req.method === 'POST') {
    try {
      const { provider, number_of_employees, products, manual } = req.body
      console.log("testing")
      const dynamic = req.body.dynamic ?? false

      // Validation
      if (!provider)
        return res.status(400).json("Provider is required")
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
        return res.status(400).json("Invalid product scope type")

      if (number_of_employees > 1000 || number_of_employees <= 0)
        return res.status(400).json("The number of employees must be between 1 and 1000.")

      const access_token = 'sandbox-token-' + uuidv4()
      const company_id = uuidv4()
      const sandbox_name = `sandbox:${company_id}:${provider}`
      await redis.set(access_token, sandbox_name)
      products.forEach(async (product: string) => await redis.sadd(`products:${access_token}`, product))
      const employee_amount: number = number_of_employees ?? 10

      switch (provider) {
        case 'gusto': {
          console.log("Creating Gusto sandbox");
          const sandbox = await providers.createGusto(sandbox_name, employee_amount, company_id, dynamic);
          if (!sandbox) throw Error('Error creating sandbox environment')
          break;
        }
        case 'bamboohr': {
          console.log("Creating BambooHR sandbox")
          const sandbox = await providers.createBambooHR(sandbox_name, employee_amount, company_id, dynamic);
          if (!sandbox) throw Error('Error creating sandbox environment')
          break;
        }
        case 'paychex_flex': {
          console.log("Creating Paychex Flex sandbox")
          const sandbox = await providers.createPaychexFlex(sandbox_name, employee_amount, company_id, dynamic);
          if (!sandbox) throw Error('Error creating sandbox environment')
          break;
        }
        case 'justworks': {
          console.log("Creating Justworks sandbox")
          const sandbox = await providers.createJustworks(sandbox_name, employee_amount, company_id, dynamic);
          if (!sandbox) throw Error('Error creating sandbox environment')
          break;
        }
        case 'workday': {
          console.log("Creating Workday sandbox")
          const sandbox = await providers.createWorkday(sandbox_name, employee_amount, company_id, dynamic);
          if (!sandbox) throw Error('Error creating sandbox environment')
          break;
        }
        default: {
          return res.status(400).json("Invalid provider name")
        }
      }

      return res.status(200).json({ payroll_provider_id: provider, company_id, access_token })
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


