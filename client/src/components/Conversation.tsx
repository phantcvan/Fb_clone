import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import "../index.css";
import { setShowMess, getShowMess } from "../slices/appSlice";
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from "react-custom-scrollbars-2";
import { useState, useEffect } from "react";
import { TbPhotoFilled } from "react-icons/tb";
import { RiFileGifFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { getUser } from "../slices/whitelist";
import axios from "axios";
import { UserType } from "../static/types";


const Conversation = () => {
  const showMess = useSelector(getShowMess);
  const dispatch = useDispatch();
  const [cmtQuantity, setCmtQuantity] = useState(1);
  const [messInput, setMessInput] = useState("");
  const userNow = useSelector(getUser);
  const [friendChat, setFriendChat] = useState<UserType | null>(null)

  const fetchDataUser = async () => {
    try {
      const [userResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/users/${showMess}`),
      ]);
      setFriendChat(userResponse?.data?.user[0]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchDataUser()
  }, [showMess])



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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <div className='login_box bottom-0 right-20 w-[328px] h-[455px] rounded-md z-50 bg-white'>
      <div className=" flex w-full items-center border-b border-fb-dark content-box">
        <div className="basis-2/3 flex gap-2 hover:bg-fb-gray rounded-md p-2">
          <div className={`w-9 h-9 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
            <img
              className="object-cover w-full"
              src={friendChat?.avatar}
            />
          </div>
          <div>
            <p className="text-sm font-semibold">{friendChat?.first_name} {friendChat?.last_name}</p>
            <p className="text-xs">Active now</p>
          </div>
        </div>
        <div className="flex flex-1"></div>
        <div className="flex items-center hover:bg-fb-gray rounded-full p-2 mr-1w-9 h-9"
          onClick={() => dispatch(setShowMess(0))}>
          <AiOutlineClose size={19} />
        </div>
      </div>
      {cmtQuantity === 0
        ? <div className="flex flex-col items-center gap-1 justify-center mt-10 overflow-y-auto min-h-[100px]">
          <div className={`w-16 h-16 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
            <img
              className="object-cover w-full h-16 overflow-hidden"
              src={friendChat?.avatar}
            />
          </div>
          <span className="font-semibold">{friendChat?.first_name} {friendChat?.last_name}</span>
          <span className="text-[13px] text-fb-dark-1">Facebook</span>
          <span className="text-[13px] text-fb-dark-1">You're friends on Facebook</span>
          <span className="text-[13px] text-fb-dark-1">Lives in Hanoi, Vietnam</span>
        </div>
        : <div className="p-2 flex flex-col gap-2 overflow-y-auto max-h-[338px]">
          <div className="flex justify-start items-end gap-2">
            <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-full"
                src={friendChat?.avatar}
              />
            </div>
            <span className="p-2 rounded-lg bg-fb-gray w-fit">
              Chị ơi
            </span>
            <div className="flex">
            </div>
          </div>

 


          <div className="flex justify-start items-end gap-2">
            <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-full"
                src={friendChat?.avatar}
              />
            </div>
            <span className="p-2 rounded-lg bg-fb-gray w-fit">
              Chị ơi
            </span>
            <div className="flex">
            </div>
          </div>

          <div className="flex justify-end items-end gap-2">
            <span className="p-2 rounded-lg bg-blue-500 w-fit text-white">
              Ơi
            </span>
            <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-full"
                src={userNow?.avatar}
              />
            </div>
          </div>
        </div>}
      {/* </Scrollbars> */}
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
        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-fb-gray"
          onClick={handleSend}>
          <AiFillLike size={22} style={{ color: messInput ? "#0084FF" : "#BCC0C4", cursor: "pointer" }} />
        </div>
      </div>

    </div>
  )
}

export default Conversation