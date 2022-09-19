import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/util/redis'
import { v4 as uuidv4 } from 'uuid'
import SandboxProviders from '@/util/providers'

export default async function createSandbox(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + "/api/sandbox/create")
  const providers = SandboxProviders()

  if (req.method === 'POST') {
    try {
      const { provider, number_of_employees, manual } = req.body
      if (!provider)
        return res.status(400).json({ msg: "Provider is required" })

      const access_token = 'sandbox:' + uuidv4()
      const company_id = uuidv4()
      const sandbox_name = `sandbox:${company_id}:${provider}`
      await redis.set(access_token, sandbox_name)
      const employee_amount: number = number_of_employees ?? 10

      switch (provider) {
        case 'gusto': {
          console.log("Creating Gusto sandbox")
          providers.createGusto(sandbox_name, employee_amount)
          break;
        }
        case 'bamboohr': {
          console.log("Creating BambooHR sandbox")
          providers.createBambooHR(sandbox_name, employee_amount)
          break;
        }
        case 'paychex_flex': {
          console.log("Creating Paychex Flex sandbox")
          providers.createPaychexFlex(sandbox_name, employee_amount)
          break;
        }
        case 'justworks': {
          console.log("Creating Justworks sandbox")
          providers.createJustworks(sandbox_name, employee_amount)
          break;
        }
        case 'workday': {
          console.log("Creating Workday sandbox")
          providers.createWorkday(sandbox_name, employee_amount)
          break;
        }
        default: {
          //do nothing
        }
      }

      return res.status(200).json({ sandbox_created: provider, company_id, access_token })
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


