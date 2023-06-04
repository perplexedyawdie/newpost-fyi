'use server';
import { Collection, Db, ObjectId } from 'mongodb';
import dbObj from '../libs/mongo';
import { Client, ItemBucketMetadata, ResultCallback, UploadedObjectInfo } from "minio"

interface MetaDataRequest {
    objectId: string;
}
export async function getData({ objectId }: MetaDataRequest) {
    try {

    } catch (error) {
        console.error(error)
    }

}