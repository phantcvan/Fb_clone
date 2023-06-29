import { useState } from "react";
import { FaEarthAmericas } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { IoChatboxOutline, IoArrowRedoOutline } from "react-icons/io5";
import { Icon } from "../static/icon";


export default function Post() {
  const [showIcon, setShowIcon] = useState(false);



  return (
    <div className="rounded-xl mt-4 bg-white">
      <div className="px-4 pt-1 mb-3 flex gap-2">
        <div
          className={`w-10 h-10 border-[3px] box-content border-blue-500 rounded-full bg-gray-200 flex items-center
          justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}
        >
          <img
            className="object-cover w-full"
            src="https://img.meta.com.vn/Data/image/2021/10/12/hinh-anh-lisa-blackpink-2.jpg"
          />
        </div>
        <div>
          <div className="font-semibold text-[15px]">
            Username
          </div>
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
          className="object-cover"
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
          <div className="text-sm text-fb-gray-text">3,8K</div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="text-sm text-fb-gray-text mr-2">
            <span className="flex gap-2">457 <IoChatboxOutline size={18} /></span>
          </div>
          <div className="text-sm text-fb-gray-text">
            <span className="flex gap-2">45 <IoArrowRedoOutline size={18} /></span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 h-11 w-[90%] mx-auto border-t border-fb-dark relative">
        <div onMouseOver={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}
          className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto 
         rounded">
          <div className="flex items-center gap-2">
            <span className="mt-[-2px]"><AiOutlineLike size={18} /></span>
            <span>Like</span>
          </div>
          {showIcon &&
            <div className="absolute top-0 left-0 bg-white rounded-3xl shadow-xl">
              {Icon.Reaction.map((item, index) => (
                // <Link to={item.path} key={index}>
                <div className={`hover:bg-fb-gray p-2 rounded-sm
                           `}
                  // onClick={() => setPick(index + 3)}
                   key={index}>
                    <div className="flex px-5 gap-4 cursor-pointer items-center ">
                      <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                        <img src={item.iconURL} alt="" />
                      </div>
                      <span className="">{item.name}</span>
                    </div>
                </div>
              ))}
              
            </div>}
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto rounded">
          <div className="flex items-center gap-2">
            <span className=""><IoChatboxOutline size={18} /></span>
            <span>Comment</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto rounded">
          <div className="flex items-center gap-2">
            <span className="mt-[-2px]"><IoArrowRedoOutline size={18} /></span>
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
