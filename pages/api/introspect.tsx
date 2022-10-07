import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken, getTokenFromReqAuthHeader } from '@/util/access-token'
import redis from '@/util/redis'

export default async function introspect(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.method + " /api/introspect")
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
            const sandbox = await redis.get(token)
            const products = await redis.smembers(`products:${token}`)

            if (sandbox) {
                var details = sandbox.split(':')
                return res.status(200).json({
                    client_id: 'sandbox',
                    company_id: details[1],
                    products: products,
                    username: 'sandbox',
                    payroll_provider_id: details[2],
                    manual: false

                })

            }

            throw Error("Error getting token information.")

        }
        catch (error) {
            console.error(error);
            return res.status(500).json("Error getting token information.")
        }
    }

    return res.status(405).json("Method not implemented.")
}