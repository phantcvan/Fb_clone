import { Link } from "react-router-dom"
import Topbar from "../components/Topbar"

const NotFound = () => {
  return (
    <div className="flex flex-col ">
      <Topbar />
      <div className='bg-gray-100 min-h-[calc(100vh-50px)] flex flex-col justify-center items-center z-0'>
        <div className="flex flex-col justify-center items-center mx-72">
          <div className='mb-3'>
            <img src={"http://localhost:5173/assets/not-found.png"} className="w-[112px] h-[112px]" />
          </div>
          <span className='text-2xl font-semibold text-fb-gray-text'>This content isn't available right now</span>
          <span className='text-md mb-1 text-center text-fb-gray-text'>When this happens, it's usually because the owner only shared it with a small group of people, changed who can see it or it's been deleted.</span>
          <div className='flex flex-row items-center gap-4 mt-4'>
            <Link to="/">
              <button className="bg-fb-blue text-white py-2 px-6 rounded-md">
                Go to News Feed
              </button>

            </Link>
          </div>

        </div>

      </div>
    </div>

  )
}

export default NotFound