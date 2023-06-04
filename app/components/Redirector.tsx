'use client';
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    url: string | undefined;
}
function Redirector({ url }: Props) {
    const router = useRouter()
    React.useEffect(() => {
        let p = setTimeout(() => router.push(encodeURI(url || "/")), 5000)
        return () => {
            clearTimeout(p)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <></>
    )
}

export default Redirector