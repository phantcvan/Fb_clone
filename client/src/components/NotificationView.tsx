import "../index.css";
import { useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { BsThreeDots, BsFillPersonFill } from 'react-icons/bs';
import { HiUserGroup } from "react-icons/hi2";
import { IoChatbox } from "react-icons/io5";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import {UserType} from "../static/types"

interface NotificationProp {
  setPick: React.Dispatch<React.SetStateAction<number>>;
  userNow: UserType
}
const NotificationView = ({ setPick, userNow }: NotificationProp) => {
  const [pickNotification, setPickNotification] = useState("all");


  const cssPick = "text-fb-blue bg-blue-100 hover:bg-blue-200"
  const cssUnPick = "text-black hover:bg-gray-100"
  return (
    <div className="w-[100%] h-screen absolute top-[70px] right-0 z-50">
      <div className="w-full h-full z-10" onClick={() => setPick(0)}>
      </div>
      <div className="bg-white py-4 pl-2 w-[330px] h-[calc(100vh-70px)] absolute top-[-14px] right-0 login_box rounded-md z-40 ">
        <div className='flex items-center justify-between pr-4 pl-2'>
          <div className="text-2xl font-bold">Notifications</div>
          <div className='w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer'>
            <BsThreeDots size={20} style={{ color: "#606770" }} />
          </div>
        </div>

        <div className='flex gap-1 my-2 pl-2'>
          <div onClick={() => setPickNotification("all")}>
            <button className={`${pickNotification === "all" ? cssPick : cssUnPick} font-semibold px-3 py-1  rounded-2xl`}>
              <span >All</span>
            </button>
          </div>
          <div onClick={() => setPickNotification("unread")}>
            <button className={`${pickNotification === "unread" ? cssPick : cssUnPick} font-semibold px-3 py-1  rounded-2xl`}>
              <span >Unread</span>
            </button>
          </div>
        </div>
        {pickNotification === "all" && <div className='flex items-center justify-between pr-2 pl-2'>
          <span className='font-semibold'>New</span>
          <span className='text-fb-blue py-1 px-2 hover:bg-gray-200 rounded cursor-pointer'>
            See all
          </span>
        </div>}

        <Scrollbars autoHide style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
          <div className="w-[100%] overflow-hidden">
            <div className='flex items-center justify-between p-2 cursor-pointer relative hover:bg-gray-100 rounded-md'>
              <div className="flex gap-3">
                <div className="w-14">
                  <img src="/assets/person/1.jpeg" alt=""
                    className="w-full h-14 rounded-full cursor-pointer object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="icon_noti_blue w-7 h-7 text-xs flex items-center justify-center rounded-full absolute
        top-12 border-2 border-white left-8">
                    <HiUserGroup size={17} style={{ color: "white" }} />
                  </span>
                  <span className='text-[15px] flex-1'>
                    You have a new post to see in
                    <Link to="/user">
                      <strong> Lớp Summer Smiles Montessori</strong>
                    </Link>
                    : "Giờ học cảm thụ âm...</span>
                  <span className="text-fb-blue text-xs font-semibold">3 hours ago</span>
                </div>
              </div>
              <span className='text-fb-blue'><RxDotFilled size={36} /></span>

            </div>
            <div className='flex items-center justify-between p-2 cursor-pointer relative hover:bg-gray-100 rounded-md'>
              <div className="flex gap-3">
                <div className="w-14">
                  <img src="/assets/person/1.jpeg" alt=""
                    className="w-full h-14 rounded-full cursor-pointer object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="icon_noti_green w-7 h-7 text-xs flex items-center justify-center rounded-full absolute
        top-12 border-2 border-white left-8">
                    <IoChatbox size={17} style={{ color: "white" }} />
                  </span>
                  <span className='text-[15px] flex-1'>
                    <Link to="/user">
                      <strong> Nguyễn Khánh Linh </strong>
                    </Link>
                    and <Link to="/user">
                      <strong> Hà My </strong>
                    </Link>
                    replied to a comment that you're tagged in.</span>
                  <span className="text-fb-blue text-xs font-semibold">3 hours ago</span>
                </div>
              </div>
              <span className='text-fb-blue'><RxDotFilled size={36} /></span>
            </div>
            {/* friend request */}
            <div className="flex flex-col">
              <div className='flex items-center justify-between px-2 pt-2'>
                <span className='font-semibold'>Friend requests</span>
                <span className='text-fb-blue py-1 px-2 hover:bg-gray-200 rounded cursor-pointer'>
                  See all
                </span>
              </div>
              <div className='flex items-center justify-between p-2 cursor-pointer relative hover:bg-gray-100 rounded-md'>
                <div className="flex gap-3">
                  <div className="w-14">
                    <img src="/assets/person/1.jpeg" alt=""
                      className="w-full h-14 rounded-full cursor-pointer object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="icon_noti_blue w-7 h-7 text-xs flex items-center justify-center rounded-full absolute
        top-12 border-2 border-white left-8">
                      <BsFillPersonFill size={17} style={{ color: "white" }} />
                    </span>
                    <span className='text-[15px] flex-1'>
                      <Link to="/user">
                        <strong> Nguyễn Khánh Linh </strong>
                      </Link>
                      sent you a friend request.</span>
                    <span className="text-fb-blue text-xs font-semibold">3 hours ago</span>
                    <div className="flex justify-between font-semibold mt-1">
                      <button className="bg-blue-400 text-white px-5 py-2 rounded-md">
                        Confirm
                      </button>
                      <button className="bg-fb-gray hover:bg-fb-gray px-[22px] py-2 rounded-md">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <span className='text-fb-blue'><RxDotFilled size={36} /></span>
              </div>
            </div>
            {/* ealier */}
            <div className="flex flex-col">
              <div className='flex items-center justify-between px-2 pt-2'>
                <span className='font-semibold'>Ealier</span>
              </div>
              <div className='flex items-center justify-between p-2 cursor-pointer relative hover:bg-gray-100 rounded-md'>
                <div className="flex gap-3">
                  <div className="w-14">
                    <img src="/assets/person/1.jpeg" alt=""
                      className="w-full h-14 rounded-full cursor-pointer object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="icon_noti_green w-7 h-7 text-xs flex items-center justify-center rounded-full absolute
        top-12 border-2 border-white left-8">
                      <IoChatbox size={17} style={{ color: "white" }} />
                    </span>
                    <span className='text-[15px] flex-1'>
                      <Link to="/user">
                        <strong> Nguyễn Khánh Linh </strong>
                      </Link>
                      and <Link to="/user">
                        <strong> Hà My </strong>
                      </Link>
                      replied to a comment that you're tagged in.</span>
                    <span className="text-fb-blue text-xs font-semibold">3 hours ago</span>
                  </div>
                </div>
                <span className='text-fb-blue'><RxDotFilled size={36} /></span>
              </div>          </div>
          </div>

        </Scrollbars>

      </div>
    </div>




  );
}
export default NotificationView