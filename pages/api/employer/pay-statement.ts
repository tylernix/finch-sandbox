import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken, getTokenFromReqAuthHeader } from '@/util/access-token'
import redis from '@/util/redis'
import { NotImplementedError, PayStatement } from 'types/finch'


type paymentIdRequests = {
  requests: {
    payment_id: string
  }[]
}
type paymentIdResponse = {
  payment_id: string,
  code: number,
  body: PayStatement
}

export default async function payStatement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/pay-statement")
  const token = getTokenFromReqAuthHeader(req)
  const body: paymentIdRequests = req.body

  if (!body.requests || body.requests.length === 0)
    return res.status(400).json('Payment Id requests required')

  const requestedIds = body.requests.map(payment => {
    return payment.payment_id
  })

  if (!token)
    return res.status(400).json("Access token required")
  if (Array.isArray(token))
    return res.status(400).json("Improper Access token format")

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json('Unauthorized: Invalid access token')
  const isAuthorized = await redis.sismember(`products:${token}`, 'pay_statement')
  if (!isAuthorized)
    return res.status(401).json('Unauthorized: Insufficient product scopes')

  if (req.method === 'POST') {
    try {
      const sandbox = await redis.get(token)
      const payments = sandbox !== null ? await redis.hget(sandbox, 'pay_statement') : ''

      if (payments == null)
        throw Error("Error getting pay-statement information.")

      //console.log(requestedIds)

      let response: any = [];
      const parsedPayStatements: PayStatement[] | NotImplementedError = JSON.parse(payments);

      // If parsedPayStatements is of type NotImplementedError, then return 501
      if ("status" in parsedPayStatements)
        return res.status(501).json(parsedPayStatements);

      // For each payment_id sent in the request...
      requestedIds.forEach(id => {
        const matches: PayStatement[] = parsedPayStatements.filter(payment => payment.payment_id === id)

        // remove payment_id because it is not included in our data model for pay_statement, but necessary to correlating pay statements to payment_ids (above)
        matches.forEach(match => delete match.payment_id)

        console.log(matches)
        if (matches.length != 0)
          response.push({
            payment_id: id,
            code: 200,
            body: {
              "paging": {
                "count": matches.length,
                "offset": 0
              },
              "pay_statements": matches
            }
          })
        else
          response.push({
            "payment_id": id,
            "code": 400,
            "body": {
              "error_name": "invalid_request_error",
              "error_message": "No payment with id " + id
            }
          })
      })

      if (response) {
        return res.status(200).json(
          {
            "responses": response
          }
        )
      }

      throw Error("Error getting pay-statement information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Error getting pay-statement information.")
    }
  }

  return res.status(405).json("Method not implemented.")
}