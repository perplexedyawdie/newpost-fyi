import NewPost from "./components/NewPost";

export default async function Page() {
  return (
    <>
      <div className="hero min-h-screen bg-base">
        <div className="hero-content text-center relative px-0 sm:px-4">
          <div className=" justify-center items-center ">
            <div className="w-full flex justify-center items-center flex-col space-y-4">
              <NewPost />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
