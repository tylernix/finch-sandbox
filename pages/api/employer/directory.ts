import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken } from '@/util/valid-token'
import redis from '@/util/redis'
import { Person } from 'types/finch'


export default async function directory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/directory")
  const token = req.headers.access_token

  if (!token)
    return res.status(400).json({ msg: "Access token required" })
  if (Array.isArray(token))
    return res.status(400).json({ msg: "Improper Access token format" })

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json({ data: 'Unauthorized' })
  const isAuthorized = await redis.sismember(`products:${token}`, 'directory')
  if (!isAuthorized)
    return res.status(401).json({ data: 'Unauthorized: Insufficient product scopes' })

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
      return res.status(500).json({ msg: "Error getting company directory information." })
    }
  }

  return res.status(405).json({ msg: "Method not implemented." })
}