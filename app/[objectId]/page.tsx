import { getData } from "../actions/metaData"
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { objectId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const data = await getData({ objectId: params.objectId })
    if (!data) {
        // TODO return metadata for NewPost site
        return {
            title: "NewPost.fyi"
        }
    } else {
        return {
            title: data.metatext,
            openGraph: {
                title: data.metatext,
                description: data.metadesc,
                url: data.metaurl,
                siteName: data.metatext,
                images: [
                    {
                        url: "https://objectstorage.ca-toronto-1.oraclecloud.com/p/ojOKJ0J1wcI5Rw7ioFY5nwIZialA43XcKAMhwoLij9Kgp7oPbV5sTPw3JTdx2-ts/n/yzpjtx1indjl/b/clip-craft-studio-assets/o/icon-512x512.png"
                    }
                ]
            },
            twitter: {
                card: "summary_large_image",
                title: data.metatext,
                description: data.metadesc,
                images: ["https://objectstorage.ca-toronto-1.oraclecloud.com/p/ojOKJ0J1wcI5Rw7ioFY5nwIZialA43XcKAMhwoLij9Kgp7oPbV5sTPw3JTdx2-ts/n/yzpjtx1indjl/b/clip-craft-studio-assets/o/icon-512x512.png"]
            }
        };
    }
}

export default async function YourPost({ params }: { params: { objectId: string } }) {

    return (
        <div>
            {params.objectId}
        </div>
    )
}
