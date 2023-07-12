import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../slices/whitelist";
import "../index.css";
import { BsFillCaretDownFill, BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill, BsMessenger, BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BiPlus, BiSolidPencil } from "react-icons/bi";
import { Relation, UserType } from "../static/types";
import Tippy from '@tippyjs/react/headless';
import Tippy1 from '@tippyjs/react';
import ViewMiniProfile from "./ViewMiniProfile";
import { getFriendRequest, getMyRequest, getRelation, setMyRequest, setRelation } from "../slices/userSlice";
import axios from "axios";



interface HeaderProp {
  pageNow: UserType | null;
  friends: UserType[];
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  totalStyle: string;
  coverStyle: string;
  avatarStyle: string;
  divAdd: string;
  subTotalStyle: string;
  setFriends: React.Dispatch<React.SetStateAction<UserType[] | []>>
}
const HeaderUser = ({ pageNow, friends, setIsEditProfile, totalStyle, coverStyle, avatarStyle, divAdd,
  subTotalStyle, setFriends }: HeaderProp) => {
    const dispatch = useDispatch();
    const userNow = useSelector(getUser);
  const relation = useSelector(getRelation);
  const myRequest = useSelector(getMyRequest);
  const friendRequest = useSelector(getFriendRequest);
  const [isFriend, setIsFriend] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [viewDeleteRequest, setViewDeleteRequest] = useState(false);
  const [pickNav, setPickNav] = useState<string>("Post");

  console.log("relation", relation);
  
  useEffect(() => {
    setIsFriend(relation?.some((item: Relation) => item.id === pageNow?.id));
    setIsCancel(myRequest?.some((item: Relation) => item.accept_id === pageNow?.id));
    setIsConfirm(friendRequest?.some((item: Relation) => item.request_id === pageNow?.id));
  }, [myRequest, friendRequest, relation, isFriend]);
  // console.log("isConfirm", isConfirm);
  console.log("isFriend", isFriend);
  // console.log("relation", relation);
  // console.log("isCancel", isCancel);
  // console.log("myRequest", myRequest);


  const navUser: { id: number, name: string, icon?: JSX.Element }[] = [
    { id: 1, name: "Post" },
    { id: 2, name: "About" },
    { id: 3, name: "Friends" },
    { id: 4, name: "Photos" },
    { id: 5, name: "Videos" },
    { id: 6, name: "Check-ins" },
    { id: 7, icon: <BsFillCaretDownFill />, name: "More" },
  ];
  const navUserCss = 'text-[#65676B] rounded hover:bg-gray-200'
  const navUserCssPick = 'text-[hsl(214,89%,52%)] border-b-4 border-[hsl(214,89%,52%)]'
  // console.log("pageNow", pageNow);
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 30%, rgba(255, 255, 255, 1)), url(${pageNow?.cover})`,
    backgroundSize: 'cover',
  };
  // console.log("userNow?.id", userNow?.id, pageNow?.id);

  // Huỷ yêu cầu kết bạn của bản thân
  const handleCancelRequest = () => {
    if (!isFriend && !isConfirm && isCancel) {
      axios.delete(`http://localhost:8000/api/v1/relation/cancelRequest`, {
        data: {
          request_id: userNow?.id,
          accept_id: pageNow?.id
        },
      })
        .then(response => {
          console.log('API call successful:', response.data);
          setIsFriend(false);
          setIsCancel(false);
          const newMyRequest = myRequest.filter((request: Relation) => request.accept_id !== pageNow?.id)
          dispatch(setMyRequest(newMyRequest));
        })
        .catch(error => {
          console.error('API call failed:', error);
        });
    }
  }
  // Gửi lời mời kết bạn
  const handleSendRequest = () => {
    const newId = Math.floor(Math.random() * 1000000)
    if (!isFriend && !isConfirm && !isCancel) {
      axios.post(`http://localhost:8000/api/v1/relation/sendRequest`, {
        request_id: userNow?.id,
        accept_id: pageNow?.id,
        status: 1,
        date_request: new Date().toISOString()
      })
        .then(response => {
          setIsCancel(true);
          console.log('API call successful:', response.data);
          const newRequest = {
            id: newId,
            request_id: userNow?.id,
            accept_id: pageNow?.id,
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
  // Đồng ý yêu cầu kết bạn
  const handleConfirmRequest = () => {
    if (!isFriend && isConfirm && !isCancel) {
      axios.put(`http://localhost:8000/api/v1/relation/accept`, {
        request_id: pageNow?.id,
        accept_id: userNow?.id,
      })
        .then(response => {
          setIsFriend(true);
          setIsConfirm(false);
          // dispatch(setShowMess(friendRequest[0]?.request_id));
          const newRelation = (pre: UserType[]) => [...pre, pageNow];
          dispatch(setRelation(newRelation(relation)));
          const myNewRelation = (pre: UserType[]) => [...pre, userNow];
          setFriends(myNewRelation(friends));
          console.log('API call successful:', response.data);
        })
        .catch(error => {
          console.error('API call failed:', error);
        });
    }
  }
  // Xoá bạn bè
  const handleDeleteFriend = () => {
    if (isFriend && !isConfirm && !isCancel) {

      axios.delete(`http://localhost:8000/api/v1/relation/deleteFriend`, {
        data: {
          user1: userNow?.id,
          user2: pageNow?.id
        },
      })
        .then(response => {
          console.log('API call successful:', response.data);
          setIsFriend(false);
          setViewDeleteRequest(false);
          const newRelation = relation.filter((re: Relation) => re.id !== pageNow?.id)
          dispatch(setRelation(newRelation));
        })
        .catch(error => {
          console.error('API call failed:', error);
        });
    }
  }

  return (
    <div className={totalStyle}>
      <div className="w-full h-fit relative">
        <div className='header_user w-[100%] h-[350px] flex justify-center' style={backgroundStyle}>
        </div>
        <div className="absolute top-0 w-full h-[350px]">
          <img src={pageNow?.cover} alt="" className={coverStyle} />
        </div>
        <div className={subTotalStyle}>
          <div className=" relative flex justify-between items-center mb-5 ">
            <div className=" flex items-center gap-5 min-h-[84px]">
              <div className={avatarStyle}>
                <img src={pageNow?.avatar} alt="" className="w-[168px] h-[168px] rounded-full object-cover" />
              </div>
              <div className={divAdd}></div>
              <div>
                <div className="text-[32px] font-bold mt-5">{pageNow?.first_name} {pageNow?.last_name}</div>
                {friends.length > 1
                  ? <span className="text-sm text-fb-gray-text">{friends.length} friends</span>
                  : <span className="text-sm text-fb-gray-text">{friends.length} friend</span>}
                {friends.length > 0
                  ? <div className="mb-3 relative flex">
                    {friends.filter(item => item.id === userNow.id).map((item, index) => {
                      return (
                        <img src={item.avatar} alt="" key={index}
                          className={`w-[34px] h-[34px] object-cover rounded-full border-2 border-white`} />
                      )
                    })}
                    {friends.slice(0, 10).filter(item => item.id !== userNow.id).map((item, index) => {
                      return (
                        <Tippy placement="bottom" interactive key={index}
                          render={attrs => (
                            <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                              {...attrs} >
                              <ViewMiniProfile userView={item} />
                            </div>)}>
                          <img src={item.avatar} alt="" key={index}
                            className={`w-[34px] h-[34px] object-cover rounded-full border-2 border-white`} />
                        </Tippy>
                      )
                    })}

                    {/* <img src="/assets/person/1.jpeg" alt=""
                      className={`w-[34px] h-[34px] object-cover rounded-full border-2 border-white absolute left-7 z-9`} /> */}
                  </div>
                  : <div className="mb-4 flex relative">
                  </div>}
              </div>
            </div>
            <div className="flex gap-3 items-center text-[15px]">
              <div className="flex">

                {pageNow?.id === userNow?.id
                  ? <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white">
                    <BiPlus size={20} /> Add to story
                  </button>
                  : isFriend
                    ? <Tippy interactive visible={viewDeleteRequest} placement="bottom"
                      render={attrs => (
                        <div className={`box py-1 px-2 h-fit rounded-lg`}
                          {...attrs} >
                          <button className="border border-fb-gray flex gap-2 p-2 rounded-md hover:bg-gray-100"
                            onClick={handleDeleteFriend}>
                            <BsFillPersonXFill size={20} /> Unfriend
                          </button>

                        </div>)}
                    >
                      <button className="flex items-center gap-2 bg-fb-gray rounded-md px-2 py-1"
                        onClick={() => setViewDeleteRequest(pre => !pre)}>
                        <BsFillPersonCheckFill size={20} /> Friends
                      </button>
                    </Tippy >

                    : isConfirm
                      ? <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white"
                        onClick={handleConfirmRequest}>
                        <BsFillPersonPlusFill size={20} style={{ color: "white" }} /> Confirm
                      </button>
                      : isCancel
                        ? <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white"
                          onClick={handleCancelRequest}>
                          <BsFillPersonXFill size={20} style={{ color: "white" }} /> Cancel request
                        </button>
                        : <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white"
                          onClick={handleSendRequest}>
                          <BsFillPersonPlusFill size={20} style={{ color: "white" }} /> Add friend
                        </button>}

              </div>
              <div className="flex flex-1">
                {pageNow?.id === userNow?.id
                  ? <button className="flex items-center gap-2 bg-fb-gray rounded-md px-2 py-1"
                    onClick={() => setIsEditProfile(true)}>
                    <BiSolidPencil /> Edit profile
                  </button>
                  : relation?.find((item: Relation) => item.id === pageNow?.id)
                    ? <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white">
                      <BsMessenger /> Message
                    </button>
                    : <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white">
                      <BsMessenger /> Message
                    </button>}
              </div>
              {/* <div className="relative">
                {pageNow?.id !== userNow?.id
                  &&
                  <button className="flex items-center gap-2 bg-fb-gray rounded-md p-2"
                    >
                    <BsChevronDown />
                  </button>}
                {viewDeleteRequest &&
                  <button className="absolute top-10 bg-fb-gray flex gap-2 p-2 rounded-md">
<BsFillPersonXFill size={20}/> Unfriend
                  </button>}
              </div> */}
            </div>
          </div>

          <div className="border-t border-fb-dark pt-1 flex justify-between items-center">
            <div className="w-[583px] h-full grid grid-flow-col gap-2">
              {navUser.map((item, index) => (
                <div key={index} onClick={() => setPickNav(item.name)}>
                  <button className={`${pickNav === item.name ? navUserCssPick : navUserCss} 
                  text-[13px] font-semibold p-3 flex items-center gap-1 whitespace-nowrap`}>
                    {item.name} {item.icon}
                  </button>
                </div>
              ))}
            </div>
            <div><button className="btn-second"><BsThreeDots /></button></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeaderUser