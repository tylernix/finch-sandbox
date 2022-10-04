import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken, getTokenFromReqAuthHeader } from '@/util/access-token'
import redis from '@/util/redis'
import { Company, NotImplementedError } from 'types/finch'

export default async function company(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/company")
  const token = getTokenFromReqAuthHeader(req)

  if (!token)
    return res.status(400).json("Access token required")
  if (Array.isArray(token))
    return res.status(400).json("Improper Access token format")

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json('Unauthorized: Invalid access token')
  const isAuthorized = await redis.sismember(`products:${token}`, 'company')
  if (!isAuthorized)
    return res.status(401).json('Unauthorized: Insufficient product scopes')

  if (req.method === 'GET') {
    try {
      const sandbox = await redis.get(token)
      const company = sandbox !== null ? await redis.hget(sandbox, 'company') : ''
      const parsedCompany: Company[] | NotImplementedError = company !== null ? JSON.parse(company) : null

      // If parsedCompany is of type notImplementedError, then return 501
      if ("status" in parsedCompany)
        return res.status(501).json(parsedCompany)

      if (parsedCompany) {
        //console.log(parsedCompany);
        return res.status(200).json(parsedCompany)
      }

      throw Error("Error getting company information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Error getting company information.")
    }
  }

  return res.status(405).json("Method not implemented.")
}