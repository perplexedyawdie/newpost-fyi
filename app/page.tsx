import ImageUpload from "./components/ImageUpload";


export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content text-center relative px-0 sm:px-4">
          <div className=" justify-center items-center ">
            <div className="w-full flex justify-center items-center flex-col space-y-4">
              <ImageUpload />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
