import { useState } from "react";
import { FaEarthAmericas } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { IoChatboxOutline, IoArrowRedoOutline } from "react-icons/io5";
import { Icon } from "../static/icon";
import Tippy from '@tippyjs/react/headless';
import Reaction from "./Reaction";
import { setShowCmt, getShowCmt } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import ViewMiniProfile from "./ViewMiniProfile";


export default function Post({ lastCmt }: { lastCmt: boolean }) {
  const [showIcon, setShowIcon] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showIconCmt, setShowIconCmt] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(123);
  const showCmt = useSelector(getShowCmt);
  const dispatch = useDispatch();

  const handleTextareaChange = (event: any) => {
    const { value } = event.target;
    setComment(value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    console.log(event.target.scrollHeight);
    console.log(showProfile)
  };
  return (
    <div className="rounded-xl mt-4 bg-white">
      <div className="px-4 pt-1 mb-3 flex gap-2">

        <Tippy placement="bottom" interactive
          render={attrs => (
            <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
              {...attrs} >
              <ViewMiniProfile userId={userId} />
            </div>)}>
          <div
            className={`w-10 h-10 border-[3px] box-content border-fb-blue rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}
          >
            <div className={`w-9 h-9 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-full"
                src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
              />
            </div>
          </div>
        </Tippy>
        <div className=" relative">
          <Tippy placement="bottom" interactive
            render={attrs => (
              <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                {...attrs} >
                <ViewMiniProfile userId={userId} />
              </div>)}>
            <div className="font-semibold text-[15px] cursor-pointer">
              Username
            </div>
          </Tippy>

          <div className="text-[#65676B] text-[13px] flex items-center gap-3  ">
            {/* <div>Hoàng Hải Nam</div> */}
            <div>3 ngày</div>{" "}
            <div className="w-3 h-3 overflow-hidden">
              <FaEarthAmericas size={12} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-1 pb-4 text-[15px]">dr dr dr</div>
      <div className="w-full overflow-hidden flex items-center object-cover">
        <img
          className="object-cover w-full"
          src="https://i.pinimg.com/564x/d9/e1/39/d9e139e2d9d2b42c926df175e626110e.jpg"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-[10px] ">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center">
            <div className="w-[20px] h-[20px] overflow-hidden z-20 rounded-full border-2 border-white">
              <img src={Icon.Reaction[0].static} />
            </div>
            <div className="w-[18px] h-[18px] overflow-hidden ml-[-2px] z-10 rounded-full border border-white">
              <img src={Icon.Reaction[1].static} />
            </div>
            <div className="w-[18px] h-[18px] overflow-hidden ml-[-3px] rounded-full border border-white">
              <img src={Icon.Reaction[2].static} />
            </div>
          </div>
          <Tippy
            placement="bottom"
            render={attrs => (
              <div className={`box addOn-box mt-[-10px] px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                {...attrs}>
                <div className='bg-fb-dark-3 opacity-80 absolute  p-2 text-white text-xs rounded-md'>
                  <p className='py-[2px]'>ViewReactionUser</p>
                  <p className='py-[2px]'>ViewReactionUser</p>
                  <p className='py-[2px]'>ViewReactionUser</p>
                </div>
              </div>)}>
            <div className="text-sm text-fb-gray-text cursor-pointer relative">
              3,8K
            </div>
          </Tippy>

        </div>
        <div className="flex items-center justify-center gap-4">
          <Tippy
            placement="bottom"
            render={attrs => (
              <div className={`box addOn-box mt-[-10px] px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                {...attrs}>
                <div className='bg-fb-dark-3 opacity-80 absolute  p-2 text-white text-xs rounded-md'>
                  <p className='py-[2px]'>ViewCmtUser</p>
                  <p className='py-[2px]'>ViewCmtUser</p>
                  <p className='py-[2px]'>ViewCmtUser</p>
                </div>
              </div>)}>
            <div className="text-sm text-fb-gray-text mr-2">
              <span className="flex gap-2">457 <IoChatboxOutline size={18} /></span>
            </div>
          </Tippy>

          <Tippy
            placement="bottom"
            render={attrs => (
              <div className={`box addOn-box mt-[-10px] px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                {...attrs}>
                <div className='bg-fb-dark-3 opacity-80 absolute  p-2 text-white text-xs rounded-md'>
                  <p className='py-[2px]'>ViewShareUser</p>
                  <p className='py-[2px]'>ViewShareUser</p>
                  <p className='py-[2px]'>ViewShareUser</p>
                </div>
              </div>)}>
            <div className="text-sm text-fb-gray-text">
              <span className="flex gap-2">45 <IoArrowRedoOutline size={18} /></span>
            </div>
          </Tippy>

        </div>
      </div>
      <div className="grid grid-cols-3 h-11 w-[90%] mx-auto border-y border-fb-dark relative">
        <div onMouseOver={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}
          className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto 
         rounded">
          <div className="flex items-center gap-2">
            <span className="mt-[-2px]"><AiOutlineLike size={18} /></span>
            <span>Like</span>
          </div>
          {showIcon && <Reaction />}
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto rounded">
          <div className="flex items-center gap-2">
            <span className=""><IoChatboxOutline size={18} /></span>
            <span onClick={() => dispatch(setShowCmt(123))}>Comment</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto rounded">
          <div className="flex items-center gap-2">
            <span className="mt-[-2px]"><IoArrowRedoOutline size={18} /></span>
            <span>Share</span>
          </div>
        </div>
      </div>
      {lastCmt &&
        <div className=" mx-auto gap-2 m-2 m flex w-[90%] items-center">
          
          <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
            <img
              className="object-cover w-8 h-8"
              src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
            />
          </div>

          <div className="flex-1 h-fit text-fb-gray-text bg-gray-100 rounded-xl flex items-center">
            <textarea onChange={handleTextareaChange} value={comment}
              // onChange={handleInputKeyword} onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Write a comment... "
              className="border-none outline-none bg-gray-100 text-black px-2 rounded-xl w-[93%]
            resize-none pt-1" />
            <p>
              <IoMdSend size={20}
                style={{
                  color: comment ? '#0571ED' : '#BEC3C9',
                  cursor: comment ? 'pointer' : 'not-allowed',
                }} />
            </p>
          </div>
        </div>}
      {lastCmt ? <div>
        <div className=" mx-auto gap-2 m-2 flex w-[90%] items-center">
          <Tippy placement="bottom"
            render={attrs => (
              <div className={`box py-1 px-2 h-fit rounded-lg cursor-pointer text-xs`}
                {...attrs} >
                <ViewMiniProfile userId={userId} />
              </div>)}>
            <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-8 h-8"
                src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
              />
            </div>
          </Tippy>

          <span className="flex-1 h-fit text-fb-gray-text bg-gray-100 rounded-xl flex items-center p-2">
            adsfdasdfsdafaafdfdfdfdfdfdf dfdfdfdfdfdfdef
          </span>
        </div>
        <div className="flex gap-4 pl-10 mx-auto w-[90%] relative">
          <span className="font-semibold text-xs text-fb-dark-1"
            onMouseOver={() => setShowIconCmt(true)} onMouseLeave={() => setShowIconCmt(false)}>
            Like
          </span>
          <span className="font-semibold text-xs text-fb-dark-1">Reply</span>
          <span className="font-semibold text-xs text-fb-dark-1">2h</span>
          {showIconCmt && <Reaction />}
        </div>
        <div className="flex gap-2 my-1 pl-10 mx-auto w-[90%] relative">
          <span className="font-semibold text-xs text-fb-dark-1">
            <PiArrowBendDownRightBold size={18} style={{ color: "#65676B" }} />
          </span>
          <span className="font-semibold text-[13px] text-fb-dark-1 cursor-pointer hover:underline"
            onClick={() => dispatch(setShowCmt(123))}>
            View more comments
          </span>
        </div>
      </div>
        : ""}
    </div>
  );
}
