import { setShowCmt, getShowCmt } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Post from "./Post";
import { useState } from "react";
import Reaction from "./Reaction";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import ViewMiniProfile from "./ViewMiniProfile";
import Tippy from '@tippyjs/react/headless';



const Comment = () => {
  const showCmt = useSelector(getShowCmt);
  const dispatch = useDispatch();
  const [lastCmt, setLastCmt] = useState(false);
  const [showIconCmt, setShowIconCmt] = useState(0);
  const [userId, setUserId] = useState(123);
  const [comment, setComment] = useState("");

  const handleTextareaChange = (event: any) => {
    const { value } = event.target;
    setComment(value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    console.log(event.target.scrollHeight);
  };

  return (
    <div className='w-[100%] h-[100%] absolute top-10 left-0 bg-overlay-40 flex items-center 
    justify-center z-20'>
      <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
    justify-center z-21' onClick={() => dispatch(setShowCmt(0))}>
      </div>
      <div className='login_box w-[700px] top-16 bottom-3 bg-white py-2 flex flex-col
      fixed rounded-md z-25'
      >
        <div className="flex items-center justify-between border-b border-fb-dark pb-2">
          <span className='m-auto text-xl font-semibold mt-2'>
            USERNAME's Post
          </span>
          <div className='flex justify-center cursor-pointer bg-fb-gray p-2 mr-2 rounded-full'
            onClick={() => dispatch(setShowCmt(0))}>
            <AiOutlineClose size={20} />
          </div>
        </div>
        <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
          <div>
            <Post lastCmt={lastCmt} />
            {/* Comment */}
            <div>
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
                  adsfdasdfsdafaafdfdfdfdfdfdfdfdfdfdfdfdfdef
                </span>
              </div>
              <div className="flex gap-4 pl-10 mx-auto w-[90%] relative">
                <span className="font-semibold text-xs text-fb-dark-1"
                  onMouseOver={() => setShowIconCmt(123)} onMouseLeave={() => setShowIconCmt(0)}>
                  Like
                </span>
                <span className="font-semibold text-xs text-fb-dark-1">Reply</span>
                <span className="text-xs text-fb-dark-1">2h</span>
                {showIconCmt > 0 && <Reaction />}
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
          </div>
        </Scrollbars>
        <div>

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment