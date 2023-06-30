import { BsFillPersonCheckFill, BsMessenger } from "react-icons/bs";
import "../index.css";
import { FaUserFriends } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi2'

const ViewMiniProfile = ({ userId }: { userId: number }) => {
  return (
    <div className='login_box z-40 bg-white w-[400px] mt-[-10px] rounded-md'>
      <div className='flex p-3 gap-3'>
        <div className={`w-20 h-20 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
          <img
            className="object-cover w-20 h-20"
            src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
          />
        </div>
        <div className='flex flex-col flex-1'>
          <span className='cursor-pointer text-lg font-semibold'>USERNAME</span>
          <div className='flex gap-2 mt-3'>
            <span className='flex'><FaUserFriends size={20} style={{ color: "#616771" }} /> </span>
            <span>50 mutual friends including 
              <span className="cursor-pointer "><strong> NgọcLan Tăng</strong> and
                <strong> Văn Định</strong> </span></span>
          </div>
          <div className='flex gap-2 mt-3'>
            <span><HiHome size={20} style={{ color: "#616771" }} /> </span>
            <span>Live in <strong>HaNoi, VietNam</strong> </span>
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className='flex p-3 gap-3 ml-5'>
        <button className="flex items-center justify-center p-2 gap-2 bg-fb-gray w-[45%] rounded-md">
          <span><BsFillPersonCheckFill size={20} /> </span>
          <span className="text-black font-semibold text-sm">Friends </span>
        </button>
        <button className="flex items-center justify-center p-2 gap-2 bg-blue-400 w-[45%] rounded-md">
          <span><BsMessenger size={20} style={{ color: "#ffffff" }} /> </span>
          <span className="text-white font-semibold text-sm">Message </span>
        </button>

      </div>
    </div>
  )
}

export default ViewMiniProfile