import type { NextApiRequest, NextApiResponse } from 'next'
import { validToken } from '@/util/valid-token'
import redis from '@/util/redis'
import { Payment, NotImplementedError } from 'types/finch'
import { PROVIDER_COMPATIBILITY } from '@/util/constants'

// yyyy-mm-dd
const dateRegex = /^(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])$/

export default async function payment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method + " /api/employer/payment")
  const token = req.headers.access_token
  const { start_date, end_date } = req.query

  if (!start_date || !end_date)
    return res.status(400).json({ msg: "Parameters start_date and end_date required" })
  if (Array.isArray(start_date) || Array.isArray(end_date))
    return res.status(400).json({ msg: "Improper start_date or end_date format" })
  if (!start_date.match(dateRegex) || !end_date.match(dateRegex))
    return res.status(400).json({ msg: "Improper start_date or end_date format" })

  if (!token)
    return res.status(400).json({ msg: "Access token required" })
  if (Array.isArray(token))
    return res.status(400).json({ msg: "Improper Access token format" })

  const isValidToken = await validToken(token)
  if (!isValidToken)
    return res.status(401).json({ data: 'Unauthorized' })
  const isAuthorized = await redis.sismember(`products:${token}`, 'payment')
  if (!isAuthorized)
    return res.status(401).json({ data: 'Unauthorized: Insufficient product scopes' })

  if (req.method === 'GET') {
    try {
      const sandbox = await redis.get(token)
      const payments = sandbox !== null ? await redis.hget(sandbox, 'payment') : ''

      if (payments == null)
        throw Error("Error getting payment information.")

      const parsedPayments: Payment[] | NotImplementedError = JSON.parse(payments);

      // If parsedPayment is of type notImplementedError, then return 501
      if ("status" in parsedPayments)
        return res.status(501).json(parsedPayments)

      const response: Payment[] = parsedPayments.filter(payment => {
        const requestedStartDate = new Date(start_date)
        const requestedEndDate = new Date(end_date)
        const paymentStartDate = new Date(payment.pay_period.start_date)
        const paymentEndDate = new Date(payment.pay_period.end_date)
        return paymentStartDate >= requestedStartDate && paymentEndDate <= requestedEndDate
      })

      if (response) {
        return res.status(200).json(response)
      }

      throw Error("Error getting payment information.")

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error getting payment information." })
    }
  }

  return res.status(405).json({ msg: "Method not implemented." })
}