'use client';
import React from 'react'
import ImageUpload from './ImageUpload'
import ShareUrlModal from './ShareUrlModal'

function NewPost() {
  const [postURL, setPostURL] = React.useState<string>("")

    return (
        <>
            <ImageUpload setPostURL={setPostURL} />

            <ShareUrlModal url={postURL} />
        </>
    )
}

export default NewPost