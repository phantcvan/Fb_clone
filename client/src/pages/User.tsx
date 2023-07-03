import React from 'react'
import Topbar from '../components/Topbar'
import SmallSidebar from '../components/SmallSidebar';
import { setShowMess, getShowMess, getShowCmt } from "../slices/appSlice";
import { getUser} from "../slices/whitelist";
import { getAllUsers, setAllUsers } from "../slices/userSlice";
import { useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import Comment from '../components/Comment';

const User = () => {
  const showMess = useSelector(getShowMess);
  const showCmt = useSelector(getShowCmt);
  const userNow = useSelector(getUser);
  return (
    <div className=''>
      <Topbar userNow={userNow}/>
      <div className="flex w-[100%]">
        <SmallSidebar />
      </div>
      {showMess > 0 && <Conversation />}
      {showCmt > 0 && <Comment />}
    </div>
  )
}

export default User