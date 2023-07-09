import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Tippy from '@tippyjs/react/headless';
import { useState } from "react";
import MessengerView from "./MessengerView";
import NotificationView from "./NotificationView";
import AccountSetting from "./AccountSetting";
import { UserType } from "../static/types"
import { useSelector, useDispatch } from "react-redux";
import { setGoHome, setSearchQuery } from "../slices/appSlice";
import { getAllUsers, getNotification, setNotification } from "../slices/userSlice";
import axios from "axios";
// import { Tooltip } from "react-tippy";



interface TopProps {
    userNow: UserType;
}

const Topbar = ({ userNow }: TopProps) => {
    const [pick, setPick] = useState(0);
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();
    const notification = useSelector(getNotification);
    const navigate = useNavigate();
    const allUsers = useSelector(getAllUsers);
    const [matchedUsers, setMatchedUsers] = useState<UserType[] | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);


    const handleInputKeyword = (e: any) => {
        const inputSearch = e.target.value.trim().replace(/\s+/g, " ").toLowerCase();
        console.log(inputSearch);
        setKeyword(inputSearch);
        setMatchedUsers(allUsers?.filter(
            (user: UserType) =>
            (user.first_name.toLowerCase().includes(e.target.value.trim().replace(/\s+/g, " ").toLowerCase()) ||
                user.last_name.toLowerCase().includes(e.target.value.trim().replace(/\s+/g, " ").toLowerCase()))
        ));
        if (e.target.value.trim().replace(/\s+/g, " ").length > 0) {
            setShowTooltip(true);
        } else {
            setShowTooltip(false);
        }
    }

    const handleSearch = () => {
        setPick(0);
        if (keyword.replace(/\s/g, '')) {
            dispatch(setSearchQuery(keyword.replace(/\s/g, '')));
            navigate({
                pathname: `/search`,
                search: createSearchParams({
                    q: keyword
                }).toString()
            })
        }
        setShowTooltip(false);

    }

    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            handleSearch();
        }
    };
    const handleClickNotification = () => {
        pick === 2 ? setPick(0) : setPick(2);
        dispatch(setNotification(0));
        axios.post(`http://localhost:8000/api/v1/users/notification`, {
            id: userNow?.id,
            notification: 0
        })
            .then(response => {

            })
            .catch(error => {
                console.error('API call failed:', error);
            });
    }
    const handleClickUser = (id: number) => {
        console.log("123");

        navigate(`/${id}`)
    }

    // console.log("matchedUsers", matchedUsers)
    // console.log("allUsers", allUsers)
    return (
        <div className="h-[50px] w-[100%] flex items-center sticky top-0 shadow-md py-7 z-30 bg-white">
            <div className="flex basis-1/4 ml-4" onClick={() => dispatch(setGoHome((pre: boolean) => !pre))}>
                <Link to="/" >
                    <img src="/assets/facebook-logo.png"
                        className="w-[141px] h-[37px] cursor-pointer object-cover" onClick={() => setPick(0)} />
                </Link>
            </div>
            <div className="flex flex-1 items-center">
                <div className="w-[100%] h-10 py-2 text-fb-gray-text bg-gray-100 hover:bg-fb-gray rounded-l-full rounded-r-full flex items-center">
                    <div className="cursor-pointer mx-1 px-2" onClick={handleSearch}>
                        <HiMagnifyingGlass size={18} />
                    </div>
                    <Tippy interactive
                        render={() => (
                            <div className="box addOn-box py-1 px-2 bg-white rounded-lg w-[608px] flex gap-2 flex-col mt-[-2px] ml-[-43px]">
                                {matchedUsers?.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center gap-3 mx-1 hover:bg-gray-100 cursor-pointer p-2 rounded-md"
                                        onClick={() => handleClickUser(user.id)}
                                    >
                                        <div className="w-8 h-8 rounded-full">
                                            <img
                                                src={user?.avatar}
                                                alt=""
                                                className="w-8 h-8 rounded-full overflow-hidden object-cover"
                                            />
                                        </div>
                                        {`${user.first_name} ${user.last_name}`}
                                    </div>
                                ))}
                                <span className="flex items-center gap-3 mx-1 hover:bg-gray-100 cursor-pointer p-2 rounded-md"
                                onClick={handleSearch}>
                                    <div className="w-8 h-8 rounded-full bg-fb-blue flex items-center justify-center">
                                        <HiMagnifyingGlass size={18} style={{color:"#ffffff"}}/>
                                    </div>
                                    <span className="text-fb-blue">Search for <strong>{keyword}</strong></span>
                                </span>
                            </div>
                        )}
                        visible={showTooltip}
                    >
                        <input
                            type="text"
                            onChange={handleInputKeyword}
                            onKeyDown={(e) => handleKeyDown(e)}
                            placeholder="Search Facebook"
                            className="border-none outline-none bg-gray-100 h-10 ml-2 w-[100%] pl-2 rounded-r-full hover:bg-fb-gray"
                        />
                    </Tippy>



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
                                onClick={() => { pick === 1 ? setPick(0) : setPick(1) }}>
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
                                onClick={handleClickNotification}>
                                <MdNotifications size={24} style={{ position: "relative", color: pick === 2 && "#1A6ED8" }} />
                                {notification > 0
                                    && <span className="w-4 h-4 text-xs text-center bg-red rounded-full text-white absolute top-[-5px] right-[-2px]">
                                        {notification}
                                    </span>}

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
                        <img src={userNow.avatar} alt=""
                            className="w-10 h-10 rounded-full cursor-pointer object-cover relative" />
                        <span className="w-4 h-4 text-xs flex items-center bg-fb-gray rounded-full absolute bottom-[-5px]
                        border-2 border-white right-[-2px]">
                            <FiChevronDown size={14} />
                        </span>
                    </div>
                </Tippy>
                {pick === 1
                    ? <MessengerView setPick={setPick} />
                    : pick === 2
                        ? <NotificationView setPick={setPick} userNow={userNow} />
                        : pick === 3
                        && <AccountSetting setPick={setPick} userNow={userNow} />}
            </div>
        </div>
    )
}

export default Topbar