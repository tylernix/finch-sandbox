import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken, getTokenFromReqAuthHeader } from '@/util/access-token'
import redis from '@/util/redis'
import { FINCH_PROVIDERS } from '@/util/constants'


export default async function providers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.method + " /api/providers")
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
            return res.status(200).json(FINCH_PROVIDERS)
        }
        catch (error) {
            console.error(error);
            return res.status(500).json("Error getting provider information.")
        }
    }

    return res.status(405).json("Method not implemented.")
}