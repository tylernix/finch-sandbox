import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "@/util/redis"

const isValidToken = async (token: string | null): Promise<{ status: number; response: string }> => {
    if (!token)
        return { status: 400, response: 'Access token required' }

    if (Array.isArray(token))
        return { status: 400, response: 'Improper Access token format' }

    const isRedisToken = await validToken(token)
    if (!isRedisToken)
        return { status: 401, response: 'Unauthorized: Invalid access token' }

    return { status: 200, response: token }
}

const getRedisToken = async (token: string) => {
    return redis.get(token).then(value => { return value })
}

const validToken = async (token: string) => {
    return await redis.get(token) ? true : false
}

const getTokenFromReqAuthHeader = (req: NextApiRequest) => {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer '))
        return authHeader.substring(7, authHeader.length);

    return null
}

export { isValidToken, validToken, getTokenFromReqAuthHeader }