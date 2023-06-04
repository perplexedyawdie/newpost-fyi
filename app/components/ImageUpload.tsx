"use client"
import React, { useState } from 'react';
import { BsImage } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast'
import classNames from 'classnames';
import Image from 'next/image';

interface Props {
  setPostURL: React.Dispatch<React.SetStateAction<string>>
}
const ImageUpload = ({ setPostURL }: Props) => {
  const [uploadedImg, setUploadedImg] = useState<File | null>(null)
  const [siteURL, setSiteURL] = useState<string>("")
  const [metaTitle, setMetaTitle] = useState<string>("")
  const [metaDesc, setMetaDesc] = useState<string>("")

  const gradientBg = classNames("absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200", {
    "hidden": uploadedImg
  })
  const imgIcon = classNames("opacity-30", {
    "hidden": uploadedImg
  })
  function handleImgUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target?.files && event.target?.files?.length > 0 && event.target.files[0].type.toLowerCase().includes("image")) {
      setUploadedImg(event.target.files[0])
    }
    if (event.target.files && !event.target.files[0].type.toLowerCase().includes("image")) {
      toast.error("Only images are allowed")
    }
  }

  async function processRequest(img: File) {
    try {
      const metaDataForm = new FormData();
      metaDataForm.append("file", img);
      metaDataForm.append("metaText", metaTitle);
      metaDataForm.append("metaDesc", metaDesc);
      metaDataForm.append("metaURL", siteURL);

      const resp = await fetch("/api/upload", {
        method: "POST",
        body: metaDataForm
      })
      const res = await resp.json();
      console.log(res.shareURL);
      setPostURL(`${process.env.NEXT_PUBLIC_BASE_URL}${res.shareURL}`);
      (window as any)["shareModal"].showModal()

    } catch (error) {
      console.error("fetch process request error")
      console.error(error)
    }
  }


  function handleGenerate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (uploadedImg && siteURL !== "" && metaTitle !== "" && metaDesc !== "") {
      console.log(siteURL)
      console.log(metaTitle)
      console.log(metaDesc)
      console.log(uploadedImg)
      toast.promise(
        processRequest(uploadedImg),
        {
          loading: 'Saving...',
          success: <b>Post saved!</b>,
          error: <b>Could not save.</b>,
        }
      );
    } else {
      toast.error("Please add all details!")
    }
  }

  return (
    <>
      <div className="card max-w-md w-full glass">
        <div className={gradientBg}></div>
        <div className="card-body justify-center items-center h-40 overflow-hidden">
          <BsImage size={32} className={imgIcon} />
          {
            uploadedImg ? <Image src={URL.createObjectURL(uploadedImg)} alt="Uploaded meta tag image" fill={true} className="object-cover" /> : null
          }
        </div>
      </div>
      <input
        onChange={handleImgUpload}
        multiple={false}
        accept='image/*'
        type="file"
        className="file-input file-input-bordered file-input-primary file:text-white w-full max-w-md" />
      <div className="form-control w-full max-w-md">
        <label className="label">
          <span className="label-text">URL</span>
        </label>
        <input required onChange={(ev) => setSiteURL(ev.target.value)} value={siteURL} type="url" placeholder="https://my-portfolio.com" className="input input-bordered w-full max-w-md file:btn-accent" />
      </div>
      <div className="form-control w-full max-w-md">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input required onChange={(ev) => setMetaTitle(ev.target.value)} value={metaTitle} type="text" placeholder="My Super Duper Portfolio" className="input input-bordered w-full max-w-md" />
      </div>
      <div className="form-control w-full max-w-md">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea required onChange={(ev) => setMetaDesc(ev.target.value)} value={metaDesc} className="textarea textarea-bordered h-24" placeholder="Best Portfolio Ever!"></textarea>
      </div>
      <button onClick={handleGenerate} className="btn btn-active btn-primary btn-block font-bold text-white">Generate</button>
      <Toaster />
    </>
  );
};

export default ImageUpload;
