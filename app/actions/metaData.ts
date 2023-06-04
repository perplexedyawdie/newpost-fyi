'use server';
import { Client, BucketItemStat } from "minio"

interface MetaDataRequest {
    objectId: string;
}

interface MetaDataResponse {
    metadesc: string;
    metatext: string;
    metaurl: string;
}

export async function getData({ objectId }: MetaDataRequest): Promise<MetaDataResponse | null> {
    try {
        const minioClient = new Client({
            endPoint: process.env.MINIO_ENDPOINT!,
            useSSL: true,
            accessKey: process.env.MINIO_ACCESS_KEY!,
            secretKey: process.env.MINIO_SECRET_KEY!
        })
        const resp = await asyncStatObject(minioClient, objectId);
        if (resp) {
            const metaResp: MetaDataResponse = {
                metadesc: decodeURIComponent(resp.metaData.metadesc),
                metatext: decodeURIComponent(resp.metaData.metatext),
                metaurl: decodeURIComponent(resp.metaData.metaurl)
            }
            return metaResp;
        } else {
            return null;
        }
    } catch (error) {
        // console.error(error)
        return null;
    }

}

async function asyncStatObject(minioClient: Client, objectId: string) {
    return new Promise<null | BucketItemStat>((resolve, reject) => { 
        minioClient.statObject(
            process.env.MINIO_BUCKET!, 
            objectId, 
            (error: Error | null, result: BucketItemStat) => {
                if(error) {
                    console.log("stat object error")
                    // console.error(error)
                    reject(null)
                }
                resolve(result)
            })
     })
}