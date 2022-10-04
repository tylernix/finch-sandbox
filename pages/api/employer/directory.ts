import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken, getTokenFromReqAuthHeader } from '@/util/access-token'
import redis from '@/util/redis'
import { Person } from 'types/finch'


export default async function directory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/directory")
  const token = getTokenFromReqAuthHeader(req)

  if (!token)
    return res.status(400).json("Access token required")
  if (Array.isArray(token))
    return res.status(400).json("Improper Access token format")

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json('Unauthorized: Invalid access token')
  const isAuthorized = await redis.sismember(`products:${token}`, 'directory')
  if (!isAuthorized)
    return res.status(401).json('Unauthorized: Insufficient product scopes')

  if (req.method === 'GET') {
    try {
      const sandbox = await redis.get(token)
      const directory = sandbox !== null ? await redis.hget(sandbox, 'directory') : ''
      const parsedDirectory: Person[] = directory !== null ? JSON.parse(directory) : null

      if (directory) {
        //console.log(parsedDirectory);
        return res.status(200).json(
          {
            "paging": {
              "count": parsedDirectory.length,
              "offset": 0
            },
            "individuals": parsedDirectory
          }
        )
      }

      throw Error("Error getting company directory information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json("Error getting company directory information.")
    }
  }

  return res.status(405).json("Method not implemented.")
}