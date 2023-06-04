import ImageUpload from "./components/ImageUpload";
import ShareUrlModal from "./components/ShareUrlModal";
// import { useContext } from 'react'
export default async function Page() {
  return (
    <>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content text-center relative px-0 sm:px-4">
          <div className=" justify-center items-center ">
            <div className="w-full flex justify-center items-center flex-col space-y-4">
              <ImageUpload />
              {/* <Suspense fallback={<div>Loading...</div>}> */}

                <ShareUrlModal />
              {/* </Suspense> */}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
