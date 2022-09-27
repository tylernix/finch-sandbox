import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken } from '@/util/valid-token'
import redis from '@/util/redis'
import { Employment, NotImplementedError } from 'types/finch'


type individualIdRequests = {
  requests: {
    individual_id: string
  }[]
}
type employeeResponse = {
  individual_id: string,
  code: number,
  body: Employment
}

export default async function employment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/employment")
  const token = req.headers.access_token
  const body: individualIdRequests = req.body

  if (!body.requests || body.requests.length === 0)
    return res.status(400).json({ data: 'Individual Id requests required' })

  const requestedIds = body.requests.map(individual => {
    return individual.individual_id
  })

  if (!token)
    return res.status(400).json({ msg: "Access token required" })
  if (Array.isArray(token))
    return res.status(400).json({ msg: "Improper Access token format" })

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json({ data: 'Unauthorized' })
  const isAuthorized = await redis.sismember(`products:${token}`, 'employment')
  if (!isAuthorized)
    return res.status(401).json({ data: 'Unauthorized: Insufficient product scopes' })

  if (req.method === 'POST') {
    try {
      const sandbox = await redis.get(token)
      const employees = sandbox !== null ? await redis.hget(sandbox, 'employment') : ''

      if (employees == null)
        throw Error("Error getting employee information.")

      //console.log(requestedIds)

      let response: any = [];
      const parsedEmployees: employeeResponse[] | NotImplementedError = JSON.parse(employees);

      // If parsedEmployees is of type notImplementedError, then return 501
      if ("status" in parsedEmployees)
        return res.status(501).json(parsedEmployees);

      requestedIds.forEach(id => {
        const match: employeeResponse | undefined = parsedEmployees.find(employee => employee.individual_id === id)
        if (match)
          response.push(match)
        else
          response.push(
            {
              "individual_id": id,
              "code": 400,
              "body": {
                "error_name": "invalid_request_error",
                "error_message": "No individual with id " + id
              }
            },
          )
      })
      if (response) {
        return res.status(200).json(
          {
            "responses": [
              response
            ]
          }
        )
      }

      throw Error("Error getting employee information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error getting employee information." })
    }
  }

  return res.status(405).json({ msg: "Method not implemented." })
}