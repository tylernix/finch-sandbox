import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/util/redis'
import { v4 as uuidv4 } from 'uuid'
import { FINCH_PROVIDERS } from '@/util/constants'
//import MockProvider from '@/util/providers'
import { getTokenFromReqAuthHeader, isValidToken } from '@/util/access-token'
import MockScenarios from '@/util/scenarios'


export default async function CreateEmployee(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/sandbox/employee")

  // CREATE new employee
  if (req.method === 'GET') {
    try {
      // Input Validation

      // Token Validation
      const headerToken = getTokenFromReqAuthHeader(req)
      const isValid = await isValidToken(headerToken)
      if (isValid.status != 200)
        return res.status(isValid.status).json(isValid.response)

      const token = isValid.response


      // const access_token = 'sandbox-token-' + uuidv4()
      // const company_id = uuidv4()
      // const sandbox_name = `sandbox:${company_id}:${provider}`
      // await redis.set(access_token, sandbox_name)
      // products.forEach(async (product: string) => await redis.sadd(`products:${access_token}`, product))
      // const employee_amount: number = employee_size ?? 10

      const scenarios = MockScenarios()
      const sandbox = scenarios.addMockEmployee()
      if (!sandbox) throw Error('Error adding new employee')

      return res.status(200).json({})
    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Error adding new employee")
    }
  }


  return res.status(405).json("Method not implemented.")
}


