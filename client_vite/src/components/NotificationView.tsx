import "../index.css";
import { useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';

const NotificationView = () => {
  const [pick, setPick] = useState("all")


  const cssPick = "text-blue-500 bg-blue-100 hover:bg-blue-200"
  const cssUnPick = "text-black hover:bg-gray-200"
  return (
    <div className="bg-white p-[16px] absolute top-14 right-0 login_box rounded-md z-40">
      <div className='flex items-center justify-between'>
        <div className="text-2xl font-bold">Thông báo</div>
        <div className='w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer'>
          {/* <img src={threeDot} /> */}
        </div>
      </div>

      <div className='flex gap-1 my-2'>
        <div onClick={() => setPick("all")}>
          <button className={`${pick === "all" ? cssPick : cssUnPick} font-semibold px-3 py-1  rounded-2xl`}><span >Tất cả</span></button>
        </div>
        <div onClick={() => setPick("unread")}>
          <button className={`${pick === "unread" ? cssPick : cssUnPick} font-semibold px-3 py-1  rounded-2xl`}><span >Chưa đọc</span></button>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='font-medium'>Mới</div>
        <div className='text-blue-600 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer'>Xem tất cả</div>
      </div>

      <div className='flex items-center justify-between gap-2 py-2 '>

        {/* <Avatar size={"w-14"}/> */}

        <div className='text-[15px] flex-1'>Bây giờ trong <strong>Phòng Trút Giận</strong>: Sự tiến hóa của iphone trong vài năm tới kiểu:  Nhưng nhớ mu...</div>
        <div className='text-blue-600'><RxDotFilled size={36} /></div>
      </div>
      <div className='flex items-center justify-between gap-2 py-2'>
        {/* <Avatar size={"w-14"}/> */}
        <div className='text-[15px] flex-1'>Bây giờ trong <strong>Phòng Trút Giận</strong>: Sự tiến hóa của iphone trong vài năm tới kiểu:  Nhưng nhớ mu...</div>
        <div className='text-blue-600'><RxDotFilled size={36} /></div>
      </div>
    </div>

    

    
  );
}
export default NotificationView