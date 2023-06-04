'use server';
import { redirect } from "next/navigation";
import { getData } from "../actions/metaData"
import { Metadata, ResolvingMetadata } from 'next';
import Redirector from "../components/Redirector";

type Props = {
    params: { objectId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    if (params.objectId == "" || !params.objectId || params.objectId.includes(".js")) {
        console.log("fathhhhhhhaa")
        return {
            title: "NewPost.fyi"
        }
    } else {
        console.log("executing in generate metadata: ", params.objectId)
        const data = await getData({ objectId: params.objectId })
        if (!data) {
            // TODO return metadata for NewPost site
            return {
                title: "NewPost.fyi",
                description: "Generate promo links on demand",
                openGraph: {
                    title: "NewPost.fyi",
                    description: "Generate promo links on demand",
                    url:"https://newpost.fyi",
                    siteName: "NewPost,fyi",
                    images: [
                        {
                            url: "https://objectstorage.ca-toronto-1.oraclecloud.com/p/kC-VGDdnePCybJEb78Q8FpJDlsnOM02nkLPabRBKx49UNAv5yQoB7UWkIzWHotC8/n/yzpjtx1indjl/b/newpost-fyi/o/NewP.jpg"
                        }
                    ]
                },
                twitter: {
                    card: "summary_large_image",
                    title: "NewPost.fyi",
                    description: "Generate promo links on demand",
                    images: ["https://objectstorage.ca-toronto-1.oraclecloud.com/p/kC-VGDdnePCybJEb78Q8FpJDlsnOM02nkLPabRBKx49UNAv5yQoB7UWkIzWHotC8/n/yzpjtx1indjl/b/newpost-fyi/o/NewP.jpg"]
                }
            }
        } else {
            return {
                title: data.metatext,
                description: data.metadesc,
                openGraph: {
                    title: data.metatext,
                    description: data.metadesc,
                    url: data.metaurl,
                    siteName: data.metatext,
                    images: [
                        {
                            url: data.presignedURL
                        }
                    ]
                },
                twitter: {
                    card: "summary_large_image",
                    title: data.metatext,
                    description: data.metadesc,
                    images: [data.presignedURL]
                }
            };
        }
    }

}

export default async function YourPost({ params }: { params: { objectId: string } }) {
    if (params.objectId == "" || !params.objectId || params.objectId.includes(".js")) {
        console.log("fathhhhhhhaa ", params.objectId)

        return (
            <div>
                {redirect(encodeURI("/"))}
            </div>
        )
    } else {
        console.log("exec in your post ", params.objectId)
        const data = await getData({ objectId: params.objectId })

        return (
            <div>
                <Redirector url={data?.metaurl} />
            </div>
        )
    }

}
