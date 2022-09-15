import redis from "@/util/redis"

const validToken = async (token: string) => {
    return await redis.get(token) ? true : false
}

export { validToken }