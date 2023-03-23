import { NextApiRequest, NextApiResponse } from "next";

export default async function ManageEmployee(req: NextApiRequest, res: NextApiResponse) {
    const { employee_id } = req.query;
    console.log(req.method + ` /api/sandbox/employee/${employee_id}`);

    if (req.method === 'PUT') {

    }

    if (req.method === 'DELETE') {

    }

    return res.status(405).json("Method not implemented.")
}


