import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { LuEdit } from 'react-icons/lu';
import Tippy from '@tippyjs/react/headless';
import { FaBookOpen } from "react-icons/fa";
import { SideBarGroup } from "../static/menu";
import { HiUserGroup } from "react-icons/hi2";
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';

const SmallSidebar = () => {
  const [pickMenu, setPickMenu] = useState(2);
  const [uploadPost, setUploadPost] = useState(false);

  return (
    <div className='w-[60px] flex flex-col mt-2 border-r border-fb-dark'>
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
        <div className={`border-l-4 px-5 py-2 ${pickMenu === 2 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(2)}>
          <div className="h-6 w-6 rounded-full overflow-hidden object-cover">
            <img src='/assets/person/1.jpeg' alt="" />
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
        <div className={`border-l-4 px-5 py-2 ${pickMenu === 3 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(3)}>
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
        <div className={`border-l-4 px-3 ${pickMenu === 4 ? "border-fb-blue" : "border-white"}`}
          onClick={() => { setPickMenu(4); setUploadPost(true); }}>
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
        <div className={`border-l-4 px-3 ${pickMenu === 5 ? "border-fb-blue" : "border-white"}`}
          onClick={() => setPickMenu(5)}>
          <div className='h-7 w-7 rounded-lg hover:bg-fb-gray flex items-center justify-center p-5'>
            <span><FaBookOpen size={20} /></span>
          </div>
        </div>
      </Tippy>
      <div className='ml-5 mr-2 text-fb-dark my-2'>
        <hr />
      </div>
      {SideBarGroup.Group.slice(0, 6).map((item, index) => (
        <Tippy placement="right" key={index}
          render={attrs => (
            <div className={`box ml-[-10px] addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
              {...attrs} >
              {item.name}
            </div>)}>
          <div key={index} className={`border-l-4 px-5 py-2 ${pickMenu === (index + 6) ? "border-fb-blue" : "border-white"}`}
            onClick={() => setPickMenu(index + 6)}>
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

      {(pickMenu === 4 && uploadPost === true) && <CreatePost setUploadPost={setUploadPost} />}
    </div>
  )
}

export default SmallSidebar