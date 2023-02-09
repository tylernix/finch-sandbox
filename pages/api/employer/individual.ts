import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken, getTokenFromReqAuthHeader } from '@/util/access-token'
import redis from '@/util/redis'
import { Individual, NotImplementedError } from 'types/finch'

type individualIdRequests = {
  individual_id: string
}[]
type optionsRequests = {
  include: string[]
}

export default async function individual(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/individual")
  const token = getTokenFromReqAuthHeader(req)
  const individualIdRequests: individualIdRequests = req.body.requests
  const optionsRequests: optionsRequests = req.body.options

  // Validate token first
  if (!token)
    return res.status(400).json("Access token required")
  if (Array.isArray(token))
    return res.status(400).json("Improper Access token format")

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json('Unauthorized: Invalid access token')
  const isAuthorized = await redis.sismember(`products:${token}`, 'individual')
  if (!isAuthorized)
    return res.status(401).json('Unauthorized: Insufficient product scopes')

  // Validate individual Id requests
  if (!individualIdRequests || individualIdRequests.length === 0)
    return res.status(400).json({ data: 'Individual Id requests required' })

  const requestedIds = individualIdRequests.map(individual => {
    return individual.individual_id
  })

  // Validate options in request
  let includeSSN = false
  if (optionsRequests && optionsRequests.include.length > 0)
    includeSSN = true


  if (req.method === 'POST') {
    try {
      const sandbox = await redis.get(token)
      const individuals = sandbox !== null ? await redis.hget(sandbox, 'individual') : ''

      if (individuals == null)
        throw Error("Error getting individual information.")

      //console.log(requestedIds)

      let response: any = [];
      const parsedIndividuals: Individual[] | NotImplementedError = JSON.parse(individuals);

      //console.log(parsedIndividuals)

      // If parsedIndividuals is of type notImplementedError, then return 501
      if ("status" in parsedIndividuals)
        return res.status(501).json(parsedIndividuals);

      requestedIds.forEach(id => {
        const match: Individual | undefined = parsedIndividuals.find(individual => individual.id === id)
        if (match) {
          if (!includeSSN) delete match.ssn

          response.push({
            individual_id: id,
            code: 200,
            body: match
          })
        }
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
            "responses": response
          }
        )
      }

      throw Error("Error getting individual information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Error getting individual information.")
    }
  }

  return res.status(405).json("Method not implemented.")
}