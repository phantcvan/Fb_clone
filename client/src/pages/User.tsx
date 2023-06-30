import React from 'react'
import Topbar from '../components/Topbar'
import SmallSidebar from '../components/SmallSidebar';
import { setShowMess, getShowMess, getShowCmt } from "../slices/appSlice";
import { useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import Comment from '../components/Comment';

const User = () => {
  const showMess = useSelector(getShowMess);
  const showCmt = useSelector(getShowCmt);
  return (
    <div className=' '>
      <Topbar />
      <div className="flex w-[100%]">
        <SmallSidebar />
      </div>
      {showMess > 0 && <Conversation />}
      {showCmt > 0 && <Comment />}
    </div>
  )
}

export default User