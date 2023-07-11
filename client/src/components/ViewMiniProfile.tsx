import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill, BsMessenger } from "react-icons/bs";
import "../index.css";
import { HiHome } from 'react-icons/hi2';
import { Relation, UserType, } from "../static/types";
import { PiBagFill } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../slices/whitelist"
import { Link } from "react-router-dom";
import { getFriendRequest, getMyRequest, getRelation, setMyRequest, setRelation } from "../slices/userSlice";
import { setShowMess } from "../slices/appSlice";



const ViewMiniProfile = ({ userView }: { userView: UserType | null }) => {
  // console.log(userView);

  const [isFriend, setIsFriend] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const userNow = useSelector(getUser);
  const relation = useSelector(getRelation);
  const myRequest = useSelector(getMyRequest);
  const friendRequest = useSelector(getFriendRequest);
  const dispatch = useDispatch();
  // console.log("myRequest", myRequest);
  // console.log("friendRequest", friendRequest);


  useEffect(() => {
    setIsFriend(relation?.some((item: Relation) => item.id === userView?.id));
    setIsCancel(myRequest?.some((item: Relation) => item.accept_id === userView?.id));
    setIsConfirm(friendRequest?.some((item: Relation) => item.request_id === userView?.id));
  }, [userView, relation, myRequest, friendRequest]);
  // console.log("isConfirm", isConfirm);
  // Huỷ yêu cầu kết bạn của bản thân
  const handleCancelRequest = () => {
    if (!isFriend && !isConfirm && isCancel) {
      axios.delete(`http://localhost:8000/api/v1/relation/cancelRequest`, {
        data: {
          request_id: userNow?.id,
          accept_id: userView?.id
        },
      })
        .then(response => {
          console.log('API call successful:', response.data);
          setIsFriend(false);
          setIsCancel(false);
          const newMyRequest = myRequest?.filter((request: Relation) => request.accept_id !== userView?.id)
          dispatch(setMyRequest(newMyRequest));
        })
        .catch(error => {
          console.error('API call failed:', error);
        });
    }
  }
  // Đồng ý yêu cầu kết bạn
  const handleConfirmRequest = () => {
    if (!isFriend && isConfirm && !isCancel) {
      axios.put(`http://localhost:8000/api/v1/relation/accept`, {
        request_id: userView?.id,
        accept_id: userNow?.id,
      })
        .then(response => {
          setIsFriend(true);
          setIsConfirm(false);
          dispatch(setShowMess(friendRequest[0]?.request_id));
          const newRelation = (pre: UserType[]) => [...pre, userView]
          dispatch(setRelation(newRelation(relation)))
          console.log('API call successful:', response.data);
        })
        .catch(error => {
          console.error('API call failed:', error);
        });
    }
  }
  // Gửi yêu cầu kết bạn
  const handleSendRequest = () => {
    const newId = Math.floor(Math.random() * 1000000)

    if (!isFriend && !isConfirm && !isCancel) {
      axios.post(`http://localhost:8000/api/v1/relation/sendRequest`, {
        request_id: userNow?.id,
        accept_id: userView?.id,
        status: 1,
        date_request: new Date().toISOString()
      })
        .then(response => {
          setIsCancel(true);
          console.log('API call successful:', response.data);
          const newRequest = {
            id: newId,
            request_id: userNow?.id,
            accept_id: userView?.id,
            status: 1,
            date_request: new Date().toISOString()
          }
          const newMyRequest = (pre: Relation[]) => [...pre, newRequest]
          dispatch(setMyRequest(newMyRequest((myRequest))));
        })
        .catch(error => {
          console.error('API call failed:', error);
        });
    }
  }

  return (
    <div className='login_box z-40 bg-white w-[400px] mt-[-10px] rounded-md'>
      <div className='flex p-3 gap-3'>
        <Link to={`/user/${userView?.id}`}>
          <div className={`w-20 h-20 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
            <img
              className="object-cover w-20 h-20"
              src={userView?.avatar}
            />
          </div>
        </Link>
        <div className='flex flex-col flex-1'>
          <Link to={`/user/${userView?.id}`}>
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
          {isCancel
            ? <button className="flex items-center justify-center p-2 gap-2  bg-blue-400 w-[45%] rounded-md"
              onClick={handleCancelRequest}>
              <span><BsFillPersonXFill size={20} style={{ color: "#ffffff" }} /> </span>
              <span className="text-white font-semibold text-sm">Cancel Request </span>
            </button>
            : isConfirm
              ? <button className="flex items-center justify-center p-2 gap-2  bg-blue-400 w-[45%] rounded-md"
                onClick={handleConfirmRequest}>
                <span><BsFillPersonPlusFill size={20} style={{ color: "#ffffff" }} /> </span>
                <span className="text-white font-semibold text-sm">Confirm </span>
              </button>
              : <button className="flex items-center justify-center p-2 gap-2  bg-blue-400 w-[45%] rounded-md"
                onClick={handleSendRequest}>
                <span><BsFillPersonPlusFill size={20} style={{ color: "#ffffff" }} /> </span>
                <span className="text-white font-semibold text-sm">Add Friend </span>
              </button>}
          {/* <button className="flex items-center justify-center p-2 gap-2  bg-blue-400 w-[45%] rounded-md">
            <span><BsFillPersonPlusFill size={20} style={{ color: "#ffffff" }} /> </span>
            <span className="text-white font-semibold text-sm">Add Friend </span>
          </button> */}
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