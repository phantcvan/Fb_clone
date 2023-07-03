import { Scrollbars } from 'react-custom-scrollbars-2';
import { UserType, Relation } from "../static/types"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getShowMess, setShowMess } from "../slices/appSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";



interface SideBarProps {
    userNow: UserType;
    contact: UserType[];
    lastRequest: UserType;
    lastRequestId: number;
}
const SidebarRight = ({ userNow, contact, lastRequest, lastRequestId }: SideBarProps) => {
    const showMess = useSelector(getShowMess);
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState(false);
    const [mutualCount, setMutualCount] = useState(0);
    // console.log("contact", lastRequestId);
    const handleAddFriend = () => {
        axios.put(`http://localhost:8000/api/v1/relation/accept/${lastRequestId}`)
            .then(response => {
                dispatch(setShowMess(lastRequestId))
                console.log('API call successful:', response.data);
                setAnswer(true);
            })
            .catch(error => {
                console.error('API call failed:', error);
            });
    };

    const fetchMutual = async () => {
        try {
            const [mutualResponse] = await Promise.all([
                axios.post(`http://localhost:8000/api/v1/relation/mutual-relations`, {
                    user1: userNow.id,
                    user2: lastRequestId
                })
            ])
            console.log("mutual",mutualResponse);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchMutual()
      }, [])
    return (
        <div className="flex flex-col flex-1 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D] pl-20">
            <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                <div>
                    {!answer &&
                        <div className="px-5 w-[100%] my-2">
                            <div className="w-[100%] flex justify-between mt-3 mb-2 p-2">
                                <span className="text-base font-semibold">Friend requests</span>
                                <span className="text-fb-blue cursor-pointer">See all</span>
                            </div>
                            <div className="flex items-start rounded-md px-2">
                                <img src={lastRequest.avatar} alt=""
                                    className="w-14 h-14 rounded-full object-cover overflow-hidden " />
                                <div className="flex flex-col gap-2 w-[calc(100%-68px)] ml-3">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-semibold mb-1">
                                                {lastRequest.first_name} {lastRequest.last_name}
                                            </span>
                                            <span className="text-xs text-fb-gray-text">3 mutual friends</span>
                                        </div>
                                        <span className="text-fb-gray-text">4d</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <button className="bg-blue-400 text-white px-4 py-2 rounded-md"
                                            onClick={handleAddFriend}>
                                            Confirm
                                        </button>
                                        <button className="bg-gray-100 hover:bg-fb-gray px-5 py-2 rounded-md">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    <div className="px-5 w-[100%] mt-5 mb-3 ">

                        <span className="text-base pb-3 font-semibold px-2 mb-2">Contacts</span>
                        {contact.map((item, index) => {
                            return (
                                <div className="flex gap-4 pb-2 pt-3 cursor-pointer items-center px-2 hover:bg-fb-gray rounded-md"
                                    key={index} onClick={() => dispatch(setShowMess(lastRequestId))}>
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