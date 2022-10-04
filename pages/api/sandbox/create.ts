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
      const dynamic = req.body.dynamic ?? false
      if (!provider)
        return res.status(400).json({ msg: "Provider is required" })
      if (!products || products.length == 0)
        return res.status(400).json({ msg: "Products is required" })
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
        return res.status(400).json({ msg: "Invalid product scope type" })

      const access_token = 'sandbox-token-' + uuidv4()
      const company_id = uuidv4()
      const sandbox_name = `sandbox:${company_id}:${provider}`
      await redis.set(access_token, sandbox_name)
      products.forEach(async (product: string) => await redis.sadd(`products:${access_token}`, product))
      const employee_amount: number = number_of_employees ?? 10

      switch (provider) {
        case 'gusto': {
          console.log("Creating Gusto sandbox")
          providers.createGusto(sandbox_name, employee_amount, company_id, dynamic)
          break;
        }
        case 'bamboohr': {
          console.log("Creating BambooHR sandbox")
          providers.createBambooHR(sandbox_name, employee_amount, company_id, dynamic)
          break;
        }
        case 'paychex_flex': {
          console.log("Creating Paychex Flex sandbox")
          providers.createPaychexFlex(sandbox_name, employee_amount, company_id, dynamic)
          break;
        }
        case 'justworks': {
          console.log("Creating Justworks sandbox")
          providers.createJustworks(sandbox_name, employee_amount, company_id, dynamic)
          break;
        }
        case 'workday': {
          console.log("Creating Workday sandbox")
          providers.createWorkday(sandbox_name, employee_amount, company_id, dynamic)
          break;
        }
        default: {
          return res.status(400).json({ msg: "Invalid provider name" })
        }
      }

      return res.status(200).json({ payroll_provider_id: provider, company_id, access_token })
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error creating sandbox environment" })
    }
  }

  return res.status(405).json({ msg: "Method not implemented." })
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


