import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable'
import fs from 'fs'
import { Client, ItemBucketMetadata, ResultCallback, UploadedObjectInfo } from "minio"
import ShortUniqueId from 'short-unique-id';

const form = formidable({ multiples: false, keepExtensions: true })
const uid = new ShortUniqueId({ length: 10 });
uid.setDictionary('alphanum_lower');

interface ImgMetaData {
    metaText: string;
    metaDesc: string;
    metaURL: string;
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {

        const result: { fileContentBuffer: Buffer, data: formidable.FileJSON, meta: ImgMetaData } = await (new Promise((resolve, reject) => {
            form.parse(req, (err, _fields, files) => {
                if (err || !files.file) return reject(err);
                console.log(files)
                console.log(_fields)
                let meta: ImgMetaData = {
                    metaText: encodeURIComponent(_fields.metaText as string),
                    metaDesc: encodeURIComponent(_fields.metaDesc as string),
                    metaURL: encodeURIComponent(_fields.metaURL as string)
                }
                const fileContentBuffer = fs.readFileSync((files.file as File).filepath)
                const data = (files.file as File).toJSON()
                resolve({ fileContentBuffer, data, meta });
            })
        }))
        const minioClient = new Client({
            endPoint: process.env.MINIO_ENDPOINT!,
            useSSL: true,
            accessKey: process.env.MINIO_ACCESS_KEY!,
            secretKey: process.env.MINIO_SECRET_KEY!
        })
        let imgId = uid()
        const savedImg = await putObjectAsync(
            minioClient, 
            process.env.MINIO_BUCKET!, 
            `${imgId}.${result.data.newFilename.split(".")[1]}`, 
            result.fileContentBuffer, 
            result.data.size, 
            result.data.mimetype!,
            result.meta)
        console.log(savedImg)
        if (savedImg) {
            res.status(200).send({ shareURL: `${imgId}.${result.data.newFilename.split(".")[1]}` })
        } else {
            throw "Image not saved"
        }

    } catch (err) {
        console.error(err)
        res.status(400).send({ message: 'Bad Request' })
    }
}

async function putObjectAsync(
    minioClient: Client,
    bucketName: string,
    objectName: string,
    data: Buffer,
    size: number,
    mimeType: string,
    meta: ImgMetaData
) {
    let opt: ItemBucketMetadata = {
        "Content-Type": mimeType,
        ...meta
    }
    return new Promise<null | UploadedObjectInfo>((resolve, reject) => {
        minioClient.putObject(
            bucketName,
            objectName,
            data,
            size,
            opt,
            (error: Error | null, result: UploadedObjectInfo) => {
                if (error) {
                    console.error(error);
                    reject(null);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

export const config = {
    api: {
        bodyParser: false
    },
}
