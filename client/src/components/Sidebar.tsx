import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import { SideBarGroup, CategoryItems } from "../static/menu";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserType } from "../static/types";
import { getUser, setUser } from "../slices/whitelist";
import { useDispatch, useSelector } from "react-redux";
import { getGoHome, setGoHome } from "../slices/appSlice";
import { BsLink45Deg } from "react-icons/bs";


// import { Link } from "react-router-dom";

const Sidebar = ({ userNow }: { userNow: UserType }) => {
    const [pick, setPick] = useState(1);
    const n1 = SideBarGroup.Group.length;
    const n2 = SideBarGroup.Page.length;
    // const goHome = useSelector(getGoHome);
    const dispatch = useDispatch();
    // console.log("pick", pick);
    

    return (
        <div className="flex basis-1/4 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D] sticky top-[60px] ">
            {/* <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}> */}
                <div className={`w-[100%] my-2 overflow-y-auto min-h-[552px] `}>
                    <div className={`w-[100%] font-semibold `}>
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 ${pick === 1 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(1)}>
                            <Link to="/">
                                <div className="flex px-5 gap-4 cursor-pointer items-center "
                                    onClick={() => dispatch(setGoHome((pre: boolean) => !pre))}>
                                    <AiFillHome size={24} style={{ color: "#1A6ED8" }} />
                                    <span>Home</span>
                                </div>
                            </Link>
                        </div>
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 ${pick === 2 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(2)}>
                            <Link to={`/user/${userNow.id}`}>
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <img src={userNow.avatar} alt="avatar"
                                        className="w-6 h-6 rounded-full object-cover overflow-hidden " />
                                    <span>{userNow.first_name} {userNow.last_name}</span>
                                </div>
                            </Link>
                        </div>

                        <hr className="text-fb-gray" />

                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 
                        ${pick === 3 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(3)}>
                            <Link to={`/friends`}>
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <img src="/assets/friend.png" alt="" className='h-6 w-6 overflow-hidden object-cover' />
                                    <span>Friends</span>
                                </div>
                            </Link>
                        </div>
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4
                         ${pick === 4 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(4)}>
                            <Link to={`/`}>
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <img src="/assets/watch.png" alt="" className='h-6 w-6 overflow-hidden object-cover' />
                                    <span>Watch</span>
                                </div>
                            </Link>
                        </div>
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 
                        ${pick === 5 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(5)}>
                            <Link to={`/messages/t`}>
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <img src="/assets/messenger.png" alt="" className='h-6 w-6 overflow-hidden object-cover' />
                                    <span>Message</span>
                                </div>
                            </Link>
                        </div>

                        <hr className="text-fb-gray" />
                        {SideBarGroup.Group.map((item, index) => (
                            // <Link to={item.path} key={index}>
                            <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 
                            ${pick === (index + 6) ? "border-fb-blue" : "border-white"}`}
                                onClick={() => setPick(index + 6)} key={index}>
                                <Link to="/">
                                    <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                        <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                                            <img src={item.logoUrl} alt="" />
                                        </div>
                                        <span className="">{item.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 
                        ${pick === (n1 + 6) ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(n1 + 6)}>
                            <Link to="/">
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                        <HiUserGroup size={18} />
                                    </div>
                                    <span>See all groups</span>
                                </div>
                            </Link>
                        </div>
                        <hr className="text-fb-gray" />
                        {SideBarGroup.Page.map((item, index) => (
                            // <Link to={item.path} key={index}>
                            <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 
                            ${pick === (index + n1 + 7) ? "border-fb-blue" : "border-white"}`}
                                onClick={() => setPick(index + n1 + 7)} key={index}>
                                <Link to="/">
                                    <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                        <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                                            <img src={item.logoUrl} alt="" />
                                        </div>
                                        <span className="">{item.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 
                        ${pick === (n1 + n2+ 7) ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(n1 + n2+ 7)}>
                            <Link to="/">
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                        <BsLink45Deg size={18} />
                                    </div>
                                    <span>See all groups</span>
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className="flex flex-wrap gap-1 px-5 mt-2">
                        {CategoryItems.map((item, index) => (
                            <div key={index}
                                className={`text-xs items-center text-fb-gray-text cursor-pointer`}
                            >
                                {index === CategoryItems.length - 1
                                    ? <span className="">{item}</span>
                                    : <span className="">{item} · </span>}

                            </div>
                        ))}
                    </div>
                </div >
            {/* </Scrollbars > */}

        </div >
    )
}

export default Sidebar