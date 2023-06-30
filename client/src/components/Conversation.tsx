import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import "../index.css";
import { setShowMess, getShowMess } from "../slices/appSlice";
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from "react-custom-scrollbars-2";
import { useState } from "react";
import { TbPhotoFilled } from "react-icons/tb";
import { RiFileGifFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";


const Conversation = () => {
  const showMess = useSelector(getShowMess);
  const dispatch = useDispatch();
  const [cmtQuantity, setCmtQuantity] = useState(1);
  const [messInput, setMessInput] = useState("");



  const handleInputMess = (event: any) => {
    const inputValue = event.target.value.trim().replace(/\s+/g, " ");
    console.log(inputValue);
    setMessInput(inputValue);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    console.log(messInput);

  }

  const handleSend = () => {
    if (messInput) {
      console.log("123");
    } else {
      console.log("456");
    }

  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <div className='login_box absolute bottom-[-4px] right-20 w-[328px] h-[455px] rounded-md bg-white z-50'>
      <div className=" flex w-full items-center border-b border-fb-dark content-box">
        <div className="basis-2/3 flex gap-2 hover:bg-fb-gray rounded-md p-2">
          <div className={`w-9 h-9 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
            <img
              className="object-cover w-full"
              src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">USERNAME</p>
            <p className="text-xs">Active now</p>
          </div>
        </div>
        <div className="flex flex-1"></div>
        <div className="flex items-center hover:bg-fb-gray rounded-full p-2 mr-1w-9 h-9"
          onClick={() => dispatch(setShowMess(0))}>
          <AiOutlineClose size={19} />
        </div>
      </div>
      <Scrollbars autoHide style={{ width: '100%', height: 'calc(100vh - 140px)' }}>
        {cmtQuantity === 0
          ? <div className="flex flex-col items-center gap-1 justify-center mt-10">
            <div className={`w-16 h-16 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-full"
                src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
              />
            </div>
            <span className="font-semibold">USERNAME</span>
            <span className="text-[13px] text-fb-dark-1">Facebook</span>
            <span className="text-[13px] text-fb-dark-1">You're friends on Facebook</span>
            <span className="text-[13px] text-fb-dark-1">Lives in Hanoi, Vietnam</span>
          </div>
          : <div className="p-2 flex flex-col gap-2">
            <div className="flex justify-start items-end gap-2">
              <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
                <img
                  className="object-cover w-full"
                  src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
                />
              </div>
              <span className="p-2 rounded-lg bg-fb-gray w-2/3">
                adfjasdfjkasdfjksadfj sdafjhakjsdf
              </span>
              <div className="flex">

              </div>
            </div>
            <div className="flex justify-end items-end gap-2">
              <span className="p-2 rounded-lg bg-blue-500 w-2/3 text-white">
                adfjasdfjkasdfjksa dfjksdajfsdak
              </span>
              <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
                <img
                  className="object-cover w-full"
                  src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
                />
              </div>
            </div>
          </div>}
      </Scrollbars>
      <div className="fixed bottom-2 flex ml-2 items-center justify-between w-[318px]">
        <div className="w-8 h-8 rounded-full hover:bg-fb-gray flex items-center justify-center">
          <TbPhotoFilled style={{ color: messInput ? "#0084FF" : "#BCC0C4", cursor: "pointer" }} size={22} />
        </div>
        <div className="flex flex-1">
          <textarea onChange={handleInputMess} onKeyDown={(e) => handleKeyDown(e)}
            placeholder="Aa "
            className="border-none outline-none bg-gray-100 text-black px-2 rounded-xl w-full
            resize-none pt-1 text-sm mx-1" />
        </div>
        <div className="flex w-7 h-7 flex items-center justify-center rounded-full hover:bg-fb-gray"
          onClick={handleSend}>
          <AiFillLike size={22} style={{ color: messInput ? "#0084FF" : "#BCC0C4", cursor: "pointer" }} />
        </div>
      </div>

    </div>
  )
}

export default Conversation