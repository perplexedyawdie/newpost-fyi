import { useRouter } from 'next/router'
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
    }, [])

    return (
        <></>
    )
}

export default Redirector