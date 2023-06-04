'use server';
import ogs from 'open-graph-scraper'

export default async function ogFetch() {
    try {
        const { error, result } = await ogs({ url: "https://www.twitter.com" })
        console.log(result)
    } catch (error) {
        console.log("error in og fetch")
        console.error(JSON.stringify(error))
    }
}