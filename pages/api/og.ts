import { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const url = req.body.url;
    try {
        const { error, result } = await ogs({ url })
        console.log(result)
        res.status(200).send({ graph: true })

    } catch (error) {
        console.log("error in og fetch")
        console.error(JSON.stringify(error))
        res.status(400).send({ message: 'Bad Request' })

    }
    


}