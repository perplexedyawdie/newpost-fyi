'use server';
import { Client, BucketItemStat } from "minio"

interface MetaDataRequest {
    objectId: string;
}

interface MetaDataResponse {
    metadesc: string;
    metatext: string;
    metaurl: string;
    presignedURL: string
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
        const url = await asyncPresigned(minioClient, objectId);
        if (resp && url) {
            const metaResp: MetaDataResponse = {
                metadesc: decodeURIComponent(resp.metaData.metadesc),
                metatext: decodeURIComponent(resp.metaData.metatext),
                metaurl: decodeURIComponent(resp.metaData.metaurl),
                presignedURL: url
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
                if (error) {
                    console.log("stat object error")
                    // console.error(error)
                    reject(null)
                }
                resolve(result)
            })
    })
}

async function asyncPresigned(minioClient: Client, objectId: string) {
    return new Promise<null | string>((resolve, reject) => {
        minioClient.presignedGetObject(
            process.env.MINIO_BUCKET!,
            objectId,
            60,
            (error: Error | null, result: string) => {
                if (error) {
                    console.log("presignedGetObject error")
                    // console.error(error)
                    reject(null)
                }
                resolve(result)
            })
    })
}