import React, { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import Tippy from '@tippyjs/react/headless';
import { FaBookOpen } from "react-icons/fa";
import { SideBarGroup } from "../static/menu";
import { HiUserGroup } from "react-icons/hi2";
import CreatePost from './CreatePost';
import { Link, useParams } from 'react-router-dom';
import { PostType, UserType } from "../static/types";

interface SidebarProp {
  userNow: UserType;
}

const SmallSidebar = ({ userNow }: SidebarProp) => {
  const [pickMenu, setPickMenu] = useState(2);
  const [uploadPost, setUploadPost] = useState(false);
  const { userId } = useParams();
  const left = 0;
  const [newPost, setNewPost] = useState<PostType | null>(null);
  let pageId = 0;//id của page
  if (userId) {
    pageId = Number(userId);
  }
  // console.log(pageId);
  useEffect(() => {
    if (pageId !== userNow.id) {
      setPickMenu(3);
    }
  }, [userId])



  return (
    <div className='w-[60px] flex flex-col border-r border-fb-dark fixed bg-white'>
      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            Home
          </div>)}>
        <div className={`border-l-4 px-3 ${pickMenu === 1 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(1)}>
          <Link to="/">
            <div className='h-7 w-7 rounded-lg hover:bg-fb-gray flex items-center justify-center p-5'>
              <span><AiFillHome size={20} /></span>
            </div>
          </Link>
        </div>
      </Tippy>
      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            Your profile
          </div>)}>
          <Link to={`/${userNow?.id}`}>
        <div className={`border-l-4 px-5 py-2 ${pickMenu === 2 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(2)}>
          <div className="h-6 w-6 rounded-full overflow-hidden object-cover">
            <img src={userNow?.avatar} alt="" className='h-6 w-6 overflow-hidden object-cover' />
          </div>
        </div>
        </Link>
      </Tippy>
      <div className='ml-5 mr-2 text-fb-dark my-2'>
        <hr />
      </div>
      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            Friends
          </div>)}>
        <div className={`border-l-4 px-5 py-2 ${pickMenu === 3 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(3)}>
          <div className="h-6 w-6 rounded-full overflow-hidden object-cover">
            <img src="/assets/friend.png" alt="" className='h-6 w-6 overflow-hidden object-cover' />
          </div>
        </div>
      </Tippy>
      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            Watch
          </div>)}>
        <div className={`border-l-4 px-5 py-2 ${pickMenu === 4 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(4)}>
          <div className="h-6 w-6 rounded-full overflow-hidden object-cover">
            <img src="/assets/watch.png" alt="" className='h-6 w-6 overflow-hidden object-cover' />
          </div>
        </div>
      </Tippy>
      <div className='ml-5 mr-2 text-fb-dark my-2'>
        <hr />
      </div>
      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            Messenger
          </div>)}>
        <div className={`border-l-4 px-5 py-2 ${pickMenu === 5 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(5)}>
          <div className="h-[22px] w-[22px] rounded-full overflow-hidden object-cover">
            <img src='/assets/messenger.png' alt="" />
          </div>
        </div>
      </Tippy>
      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            Create post
          </div>)}>
        <div className={`border-l-4 px-3 ${pickMenu === 6 ? "border-fb-blue" : "border-white"}`}
          onClick={() => { setPickMenu(6); setUploadPost(true); }}>
          <div className='h-7 w-7 rounded-lg hover:bg-fb-gray flex items-center justify-center p-5'>
            <span><LuEdit size={20} /></span>
          </div>
        </div>
      </Tippy>
      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            Create Story
          </div>)}>
        <div className={`border-l-4 px-3 ${pickMenu === 7 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(7)}>
          <div className='h-7 w-7 rounded-lg hover:bg-fb-gray flex items-center justify-center p-5'>
            <span><FaBookOpen size={20} /></span>
          </div>
        </div>
      </Tippy>
      <div className='ml-5 mr-2 text-fb-dark my-2'>
        <hr />
      </div>
      {SideBarGroup.Group.slice(0, 3).map((item, index) => (
        <Tippy placement="right" key={index}
          render={attrs => (
            <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
              {...attrs} >
              {item.name}
            </div>)}>
          <div key={index} className={`border-l-4 px-5 py-2 ${pickMenu === (index + 8) ? "border-fb-blue" : "border-white"}`}
            onClick={() => setPickMenu(index + 8)}>
            <div className="h-6 w-6 rounded-lg overflow-hidden object-cover">
              <img src={item.logoUrl} alt="" />
            </div>
          </div>
        </Tippy>
      ))}

      <Tippy placement="right"
        render={attrs => (
          <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
            {...attrs} >
            See all groups
          </div>)}>
        <div className={`border-l-4 px-3 ${pickMenu === 12 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(12)}>
          <div className='h-7 w-7 rounded-lg hover:bg-fb-gray flex items-center justify-center p-5'>
            <span><HiUserGroup size={20} /></span>
          </div>
        </div>
      </Tippy>

      {(pickMenu === 4 && uploadPost === true) && 
      <CreatePost userNow={userNow} setUploadPost={setUploadPost} left={left} setNewPost={setNewPost}/>}
    </div>
  )
}

export default SmallSidebar