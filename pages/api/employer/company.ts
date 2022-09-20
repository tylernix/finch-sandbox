import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken } from '@/util/valid-token'
import redis from '@/util/redis'

export default async function company(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/company")
  const token = req.headers.access_token

  if (!token)
    return res.status(400).json({ msg: "Access token required" })
  if (Array.isArray(token))
    return res.status(400).json({ msg: "Improper Access token format" })

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json({ data: 'Unauthorized: Invalid access token' })
  const isAuthorized = await redis.sismember(`products:${token}`, 'company')
  if (!isAuthorized)
    return res.status(401).json({ data: 'Unauthorized: Insufficient product scopes' })

  if (req.method === 'GET') {
    try {
      const sandbox = await redis.get(token)
      const company = sandbox !== null ? await redis.hget(sandbox, 'company') : ''
      //console.log(company)
      if (company) {
        //console.log(JSON.parse(company));
        return res.status(200).json(JSON.parse(company))
      }

      throw Error("Error getting company information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error getting company information." })
    }
  }

  return res.status(405).json({ msg: "Method not implemented." })
}