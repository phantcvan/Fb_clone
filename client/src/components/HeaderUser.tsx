import { useSelector } from "react-redux";
import { getUser } from "../slices/whitelist";
import "../index.css";
import { BsChevronDown, BsFillCaretDownFill, BsMessenger, BsThreeDots } from "react-icons/bs";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { BiPlus, BiSolidPencil } from "react-icons/bi";
import { UserType, } from "../static/types";
import Tippy from '@tippyjs/react/headless';
import ViewMiniProfile from "./ViewMiniProfile";


interface HeaderProp {
  pageNow: UserType;
  friends: UserType[];
  isFriend: boolean;
}
const HeaderUser = ({ pageNow, friends, isFriend }: HeaderProp) => {
  console.log("friends", friends);

  const userNow = useSelector(getUser);
  // const { userId } = useParams(); //id của page
  // const pageId = Number(userId)//id của page
  const [pickNav, setPickNav] = useState<string>("Post");


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

  return (
    <div className='w-full ml-[60px]'>
      <div className="w-screen h-fit relative">
        <div className='header_user w-[100%] h-[350px] flex justify-center' style={backgroundStyle}>
        </div>
        <div className="absolute top-0 w-[100%] h-[350px] ">
          <img src={pageNow?.cover} alt="" className='px-[170px] h-[350px] rounded-md mr-12 object-cover w-full' />
        </div>
        <div className="ml-[170px] mx-auto mr-56">
          <div className=" relative flex justify-between items-center mb-5 ">
            <div className=" flex items-center gap-5 min-h-[84px]">
              <div className="absolute bottom-[7px] left-8 border-4 border-white rounded-full bg-white">
                <img src={pageNow?.avatar} alt="" className="w-[168px] h-[168px] rounded-full object-cover" />
              </div>
              <div className="w-[210px]"></div>
              <div>
                <div className="text-[32px] font-bold mt-5">{pageNow?.first_name} {pageNow?.last_name}</div>
                {friends.length > 1
                  ? <span className="text-sm text-fb-gray-text">{friends.length} friends</span>
                  : <span className="text-sm text-fb-gray-text">{friends.length} friend</span>}
                {friends.length > 0
                  ? <div className="mb-3 relative flex">
                    {friends.slice(0, 10).map((item, index) => {
                      return (
                        <Tippy placement="bottom" interactive
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
            <div className="flex gap-2 items-center text-[15px]">
              <div className="flex">
                {pageNow?.id === userNow?.id
                  ? <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white">
                    <BiPlus size={20} /> Add to story
                  </button>
                  : !isFriend
                    ? <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white">
                      <FaUserPlus size={20} style={{ color: "white" }} /> Add friend
                    </button>
                    : <button className="flex items-center gap-2 bg-fb-gray rounded-md px-2 py-1">
                      <FaUserCheck size={20} /> Friends
                    </button>}
              </div>
              <div className="flex">
                {pageNow?.id === userNow?.id
                  ? <button className="flex items-center gap-2 bg-fb-gray rounded-md px-2 py-1">
                    <BiSolidPencil /> Edit profile
                  </button>
                  : !isFriend
                    ? <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white">
                      <BsMessenger /> Message
                    </button>
                    : <button className="flex items-center gap-2 bg-fb-blue rounded-md px-2 py-1 text-white">
                      <BsMessenger /> Message
                    </button>}
              </div>
              <div>
                <button className="flex items-center gap-2 bg-fb-gray rounded-md p-2">
                  <BsChevronDown />
                </button>
              </div>
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