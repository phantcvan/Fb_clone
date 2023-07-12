import { Scrollbars } from 'react-custom-scrollbars-2';
import { UserType, Relation } from "../static/types"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getShowMess, setShowMess } from "../slices/appSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import moment from "moment";
import "../index.css"



interface SideBarProps {
    userNow: UserType;
    contact: UserType[];
    lastRequestUser: UserType | null;
    lastRequest: Relation | null;
    mutualCount: number
}
const SidebarRight = ({ userNow, contact, lastRequestUser, lastRequest, mutualCount }: SideBarProps) => {
    const showMess = useSelector(getShowMess);
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState(false);
    const navigate = useNavigate()
    // console.log("lastRequestUser", lastRequestUser);
    const handleAddFriend = () => {
        axios.put(`http://localhost:8000/api/v1/relation/accept`, {
            request_id: lastRequestUser?.id,
            accept_id: userNow?.id
        })
            .then(response => {
                dispatch(setShowMess(lastRequest?.id))
                console.log('API call successful:', response.data);
                setAnswer(true);
            })
            .catch(error => {
                console.error('API call failed:', error);
            });
    };
    const handleRejectFriend = () => {
        axios.delete(`http://localhost:8000/api/v1/relation/cancelRequest`, {
            data: {
                accept_id: userNow?.id,
                request_id: lastRequestUser?.id
            },
        })
            .then(response => {
                console.log('API call successful:', response.data);
                setAnswer(true);
            })
            .catch(error => {
                console.error('API call failed:', error);
            });
    }
    // console.log(lastRequestUser);
    const timeRequest = (moment(lastRequest?.date_request).diff(moment(), 'days')) * -1


    return (
        <div className="flex flex-col flex-1 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D] pl-20 sticky top-[60px] ">
            <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                <div>
                    {(!answer && lastRequestUser) &&
                        <div className="px-5 w-[100%] my-2">
                            <div className="w-[100%] flex justify-between mt-3 mb-2 p-2">
                                <span className="text-base font-semibold">Friend requests</span>
                                <span className="text-fb-blue cursor-pointer"
                                    onClick={() => navigate("/friends")}>See all</span>
                            </div>
                            <div className="flex items-start rounded-md px-2">
                                <Link to={`/user/${lastRequestUser.id}`}>
                                    <img src={lastRequestUser.avatar} alt=""
                                        className="w-14 h-14 rounded-full object-cover overflow-hidden cursor-pointer" />
                                </Link>
                                <div className="flex flex-col gap-2 w-[calc(100%-68px)] ml-3">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-col">
                                            <Link to={`/user/${lastRequestUser.id}`}>
                                                <span className="font-semibold mb-1 cursor-pointer">
                                                    {lastRequestUser.first_name} {lastRequestUser.last_name}
                                                </span>
                                            </Link>
                                            {mutualCount > 0 && <span className="text-xs text-fb-gray-text">
                                                {mutualCount} mutual friends
                                            </span>}

                                        </div>
                                        {timeRequest > 0
                                            ? <span className="text-fb-gray-text text-xs">
                                                {timeRequest}d ago
                                            </span>
                                            : <span className="text-fb-gray-text text-xs">
                                                {moment(lastRequest?.date_request).fromNow()}
                                            </span>}

                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <button className="btn-primary"
                                            onClick={handleAddFriend}>
                                            Confirm
                                        </button>
                                        <button className="btn-reject"
                                            onClick={handleRejectFriend}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    <div className="px-5 w-[100%] mt-5 mb-3 ">

                        <span className="text-base pb-3 font-semibold px-2 mb-2">Contacts</span>
                        {contact?.map((item, index) => {
                            return (
                                <div className="flex gap-4 pb-2 pt-3 cursor-pointer items-center px-2 hover:bg-fb-gray rounded-md"
                                    key={index} onClick={() => dispatch(setShowMess(item.id))}>
                                    <img src={item.avatar} alt="avatar"
                                        className="w-6 h-6 rounded-full object-cover overflow-hidden " />
                                    <span className='font-semibold'>{item.first_name} {item.last_name}</span>
                                </div>)
                        })}

                    </div>
                </div>

            </Scrollbars>
        </div>

    )
}

export default SidebarRight