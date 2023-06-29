import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react/headless';
import { useState } from "react";
import MessengerView from "./MessengerView";
import NotificationView from "./NotificationView";
import AccountSetting from "./AccountSetting";



const Topbar = () => {
    const [pick, setPick] = useState(0);




    return (
        <div className="h-[50px] w-[100%] flex items-center sticky top-0 shadow-md py-7 z-30 bg-white">
            <div className="flex basis-1/4 ml-4">
                <Link to="/">
                    <img src="http://localhost:5173/assets/facebook-logo.png"
                        className="w-[141px] h-[37px] cursor-pointer object-cover" />
                </Link>
            </div>
            <div className="flex flex-1 items-center">
                <div className="w-[100%] h-10 py-2 text-fb-gray-text bg-gray-100 hover:bg-fb-gray rounded-l-full rounded-r-full flex items-center">
                    <div className="cursor-pointer mx-1 px-2">
                        <HiMagnifyingGlass size={18} />
                    </div>
                    <input type="text"
                        placeholder="Search for friend, post or video... "
                        className="border-none outline-none bg-gray-100 h-10 ml-2 w-[100%] pl-2 rounded-r-full hover:bg-fb-gray" />
                </div>
            </div>
            <div className="flex basis-1/4 text-red-500 flex-row items-center justify-end mr-4">
                {/* <div>
                    <span>Homepage</span>
                    <span>Timeline</span>
                </div> */}
                <div className="flex flex-row">
                    <div className="w-10 h-10 flex flex-row items-center justify-center rounded-full mr-4 cursor-pointer relative ">
                        <Tippy
                            render={attrs => (
                                <div className={`box addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                                    {...attrs} >
                                    Messenger
                                </div>)}>
                            <div className={`w-10 h-10 relative rounded-full flex items-center justify-center
                           ${pick === 1 ? "bg-blue-100 hover:bg-blue-200" : "bg-gray-100 hover:bg-fb-gray"}`}
                                onClick={() => {pick === 1 ? setPick(0) : setPick(1)}}>
                                <BsMessenger size={18} style={{ position: "relative", color: pick === 1 && "#1A6ED8" }} />
                                <span className="w-4 h-4 text-xs text-center bg-red rounded-full text-white absolute top-[-5px] right-[-2px]">
                                    1
                                </span>
                            </div>
                        </Tippy>
                    </div>
                    <div className="w-10 h-10 flex flex-row items-center justify-center rounded-full mr-4 cursor-pointer relative bg-gray-100 hover:bg-fb-gray">
                        <Tippy
                            render={attrs => (
                                <div className={`box addOn-box  py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                                    {...attrs}>
                                    Notifications
                                </div>)}>
                            <div className={`w-10 h-10 relative rounded-full flex items-center justify-center
                           ${pick === 2 ? "bg-blue-100 hover:bg-blue-200" : "bg-gray-100 hover:bg-fb-gray"}`}
                                onClick={() => pick === 2 ? setPick(0) : setPick(2)}>
                                <MdNotifications size={24} style={{ position: "relative", color: pick === 2 && "#1A6ED8" }} />
                                <span className="w-4 h-4 text-xs text-center bg-red rounded-full text-white absolute top-[-5px] right-[-2px]">
                                    1
                                </span>
                            </div>
                        </Tippy>
                    </div>
                </div>
                <Tippy
                    render={attrs => (
                        <div className={`box addOn-box  py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                            {...attrs}>
                            Account
                        </div>)}>
                    <div className={`w-10 h-10 relative rounded-full flex items-center justify-center`}
                        onClick={() => pick === 3 ? setPick(0) : setPick(3)}>
                        <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                            className="w-10 h-10 rounded-full cursor-pointer object-cover relative" />
                        <span className="w-4 h-4 text-xs flex items-center bg-fb-gray rounded-full absolute bottom-[-5px]
                        border-2 border-white right-[-2px]">
                            <FiChevronDown size={14} />
                        </span>
                    </div>
                </Tippy>
                {pick === 1
                    ? <MessengerView />
                    : pick === 2
                        ? <NotificationView />
                        : pick === 3
                        && <AccountSetting />}
            </div>
        </div>
    )
}

export default Topbar