import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken, getTokenFromReqAuthHeader } from '@/util/access-token'
import redis from '@/util/redis'

export default async function disconnect(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.method + " /api/disconnect")
    const token = getTokenFromReqAuthHeader(req)

    if (!token)
        return res.status(400).json("Access token required")
    if (Array.isArray(token))
        return res.status(400).json("Improper Access token format")

    const isValidToken = await validToken(token)
    if (!isValidToken)
        return res.status(401).json('Unauthorized: Invalid access token')

    if (req.method === 'GET') {
        try {
            const sandbox = await redis.getdel(token)

            if (sandbox) {
                return res.status(200).json({
                    status: "success"
                })
            }

            throw Error("Error disconnecting token.")

        }
        catch (error) {
            console.error(error);
            return res.status(500).json("Error disconnecting token.")
        }
    }

    return res.status(405).json("Method not implemented.")
}