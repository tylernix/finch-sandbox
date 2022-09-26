import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken } from '@/util/valid-token'
import redis from '@/util/redis'
import { Individual } from 'types/finch'


type individualIdRequests = {
  requests: {
    individual_id: string
  }[]
}
type individualIdResponse = {
  individual_id: string,
  code: number,
  body: Individual
}
type individualIdErrorResponse = {
  individual_id: string,
  code: number,
  body: {
    error_name: string,
    error_message: string
  }
}

export default async function individual(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/individual")
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
  const isAuthorized = await redis.sismember(`products:${token}`, 'individual')
  if (!isAuthorized)
    return res.status(401).json({ data: 'Unauthorized: Insufficient product scopes' })

  if (req.method === 'POST') {
    try {
      const sandbox = await redis.get(token)
      const individuals = sandbox !== null ? await redis.hget(sandbox, 'individual') : ''

      if (individuals == null)
        throw Error("Error getting individual information.")

      //console.log(requestedIds)

      let response: any = [];
      requestedIds.forEach(id => {
        const parsedIndividuals: individualIdResponse[] = JSON.parse(individuals);
        const match: individualIdResponse | undefined = parsedIndividuals.find(individual => individual.body.id === id)
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

      throw Error("Error getting individual information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error getting individual information." })
    }
  }

  return res.status(405).json({ msg: "Method not implemented." })
}