import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsMessenger } from "react-icons/bs";
import "../index.css";
import { HiHome } from 'react-icons/hi2';
import { Relation, UserType, } from "../static/types";
import { PiBagFill } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUser } from "../slices/whitelist"
import { Link } from "react-router-dom";
import { getRelation } from "../slices/userSlice";



const ViewMiniProfile = ({ userView }: { userView: UserType | null }) => {
  // console.log(userView);

  const [isFriend, setIsFriend] = useState(false);
  const userNow = useSelector(getUser);
  const relation = useSelector(getRelation);
  // const fetchDataUser = async () => {
  //   try {
  //     const [checkFriendResponse] = await Promise.all([
  //       axios.post(`http://localhost:8000/api/v1/relation/isFriend`, {
  //         userId1: userView?.id,
  //         userId2: userNow?.id,
  //       }),
  //     ]);
  //     if (checkFriendResponse?.data?.checkFriend?.length > 0) setIsFriend(true)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  useEffect(() => {
    // const friend = 
    // if ()
    setIsFriend(relation.some((item:Relation)=>item.id===userView?.id));
  }, [userView]);
  // useEffect(() => {
  //   fetchDataUser()
  // }, []);
  // console.log("isFriend", isFriend);
  
  return (
    <div className='login_box z-40 bg-white w-[400px] mt-[-10px] rounded-md'>
      <div className='flex p-3 gap-3'>
        <Link to={`/${userView?.id}`}>
          <div className={`w-20 h-20 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
            <img
              className="object-cover w-20 h-20"
              src={userView?.avatar}
            />
          </div>
        </Link>
        <div className='flex flex-col flex-1'>
          <Link to={`/${userView?.id}`}>
            <span className='cursor-pointer text-lg font-semibold'>
              {userView?.first_name} {userView?.last_name}
            </span>
          </Link>
          {/* <div className='flex gap-2 mt-3'>
            <span className='flex'><FaUserFriends size={20} style={{ color: "#616771" }} /> </span>
            <span>50 mutual friends including
              <span className="cursor-pointer "><strong> NgọcLan Tăng</strong> and
                <strong> Văn Định</strong> </span></span>
          </div> */}
          {userView?.currentCity && <div className='flex gap-2 mt-3'>
            <span><HiHome size={20} style={{ color: "#616771" }} /> </span>
            <span>Live in <strong>{userView?.currentCity}</strong> </span>
          </div>}
          {userView?.job
            && <div className='flex gap-2 mt-3'>
              <span><PiBagFill size={20} style={{ color: "#616771" }} /> </span>
              <span>Work at <strong>{userView?.job}</strong> </span>
            </div>}
          {userView?.hometown
            && <div className='flex gap-2 mt-3'>
              <span><IoLocationSharp size={20} style={{ color: "#616771" }} /> </span>
              <span>From <strong>{userView?.hometown}</strong> </span>
            </div>}

        </div>
        <div>

        </div>
      </div>
      {!isFriend
        ? <div className='flex p-3 gap-3 ml-5'>
          <button className="flex items-center justify-center p-2 gap-2 bg-fb-gray w-[45%] rounded-md">
            <span><BsMessenger size={20} /> </span>
            <span className="text-black font-semibold text-sm">Message </span>
          </button>
          <button className="flex items-center justify-center p-2 gap-2  bg-blue-400 w-[45%] rounded-md">
            <span><BsFillPersonPlusFill size={20} style={{ color: "#ffffff" }} /> </span>
            <span className="text-white font-semibold text-sm">Add Friend </span>
          </button>
        </div>
        : <div className='flex p-3 gap-3 ml-5'>
          <button className="flex items-center justify-center p-2 gap-2 bg-fb-gray w-[45%] rounded-md">
            <span><BsFillPersonCheckFill size={20} /> </span>
            <span className="text-black font-semibold text-sm">Friends </span>
          </button>
          <button className="flex items-center justify-center p-2 gap-2 bg-blue-400 w-[45%] rounded-md">
            <span><BsMessenger size={20} style={{ color: "#ffffff" }} /> </span>
            <span className="text-white font-semibold text-sm">Message </span>
          </button>
        </div>}

    </div>
  )
}

export default ViewMiniProfile