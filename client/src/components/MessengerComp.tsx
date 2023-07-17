import axios from "axios";
import { UserType } from "../static/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowCmt, setShowCmt, setShowMess } from "../slices/appSlice";


interface MessProp {
  friendId: number;
}

const MessengerComp = ({ friendId }: MessProp) => {
  const [friendChat, setFriendChat] = useState<UserType | null>(null);
  const dispatch = useDispatch();
  const fetchDataUser = async () => {
    try {
      const [userResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/users/${friendId}`),
      ]);
      setFriendChat(userResponse?.data?.user[0]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchDataUser()
  }, [friendId])
  console.log("friendId", friendId);
  


  return (
    <div className="flex flex-row gap-3 items-center hover:bg-gray-100 rounded-md p-2 cursor-pointer"
      onClick={() => dispatch(setShowMess(friendId))}>
      <div className="w-14 h-14 rounded-full">
        <img src={friendChat?.avatar} alt=""
          className="w-full h-14 rounded-full cursor-pointer object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">{friendChat?.first_name} {friendChat?.last_name}</span>
        <span className="text-xs">Chị ơi · 5m</span>
      </div>
    </div>
  )
}

export default MessengerComp