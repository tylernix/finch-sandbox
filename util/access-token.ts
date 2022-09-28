import type { NextApiRequest } from 'next'
import redis from "@/util/redis"

const validToken = async (token: string) => {
    return await redis.get(token) ? true : false
}

const getTokenFromReqAuthHeader = (req: NextApiRequest) => {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.startsWith('Bearer '))
        return authHeader.substring(7, authHeader.length);

    return null
}

export { validToken, getTokenFromReqAuthHeader }