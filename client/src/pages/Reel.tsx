import logoFb from "../../assets/HeaderDefault/logoFb.svg";
import NavRight from "../../component/header/NavRight";
import "../Auth/index.css";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import video from "../../assets/video/354073891_1304582413804445_3690787934625286726_n.mp4";
import {
  BsX,
  BsDot,
  BsFillPlayFill,
  BsVolumeUpFill,
  BsThreeDots,
  BsPauseFill,
  BsVolumeMuteFill
} from "react-icons/bs";
import { IoEarth } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { PiShootingStarFill } from "react-icons/pi";
import { FaComment, FaShare } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Comment from "../../component/abc/Comment";

export default function Reel() {
  const [showComment, setShowComment] = useState(false);
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [play]);

  useEffect(() => {
    console.log("object");
    if (videoRef.current) {
      if (volume) {
        videoRef.current.muted=true
      } else {
        videoRef.current.muted=false
      }
    }
  }, [volume]);

  const item = [
    { id: 1, icon: <PiShootingStarFill size={20} />, title: "Tặng!" },
    { id: 2, icon: <AiFillLike size={20} />, title: "6.4K" },
    {
      id: 3,
      icon: <FaComment size={20} />,
      title: "12",
      showComment: setShowComment,
    },
    { id: 4, icon: <FaShare size={20} />, title: "15" },
  ];

  const handleVolume = (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation()
    setVolume(!volume)
  }

  return (
    <div className="h-screen flex">
      <div className="bg-black h-full text-white grid grid-cols-3 overflow-hidden flex-1 relative">

          <div className="flex items-center gap-3 fixed top-2 left-4 z-30">
            <Link to={"/watch"} className="cursor-pointer">
              <BsX size={34} />
            </Link>
            <Link to={"/"} className="w-10 h-10 overflow-hidden cursor-pointer">
              <img className="object-cover w-full h-full" src={logoFb} />
            </Link>
            <div className="text-2xl font-bold hover:underline cursor-pointer">
              Reels
            </div>
          </div>
          <div className="fixed top-2 right-4 z-30">
            <NavRight />
          </div>

        <div className="relative ml-3">
          <div className="absolute top-1/2 -translate-y-1/2 right-0 mr-3 w-12 h-12 rounded-full bg-gray-400 hover:bg-[#E4E6EB] cursor-pointer flex items-center justify-center text-black">
            <IoIosArrowBack size={30} />
          </div>
        </div>

        <div  onClick={() => setPlay(!play)} className="max-w-[400px] rounded-lg h-[96%] my-auto bg-transparent mx-auto relative overflow-hidden flex items-center justify-center">
          <div className="flex items-center justify-between w-[96%] absolute top-2 z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden rounded-full flex items-center justify-center">
                <img
                  className="object-cover w-full h-full"
                  src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/332478214_987462458883352_7524400638173794967_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PdV_h0hrMSQAX8JJZls&_nc_ht=scontent.fhan15-1.fna&oh=00_AfA8S5l4ao15oypksfZBcXAN5T71KYK-FkeO7EK6XjahYg&oe=649D90BE"
                />
              </div>
              <div>
                <div className="text-[15px] font-semibold flex items-center">
                  Mikaylah <BsDot /> Theo dõi
                </div>
                <div className="text-[13px] flex items-center gap-1">
                  <IoEarth /> Công khai
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="cursor-pointer ">
                {!play?<BsFillPlayFill size={26} />:<BsPauseFill size={26}/>}
              </div>
              <button onClick={(e)=>handleVolume(e)} className="cursor-pointer ">
                {!volume?<BsVolumeUpFill size={22} />:<BsVolumeMuteFill size={22}/>}
              </button>
              <div className="cursor-pointer ">
                <BsThreeDots size={22} />
              </div>
            </div>
          </div>

          <div className="w-full h-full">
            <video autoPlay ref={videoRef} className="object-cover w-full h-full">
              <source src={video} type="video/mp4" />
            </video>
          </div>

          <div className="absolute bottom-2 left-4">
            <div className="flex gap-2 items-center">
              <div>Lộ ác 😂😂😂 </div>
              <div className="text-[15px] font-bold hover:underline cursor-pointer">
                #mikaylah
              </div>
            </div>
          </div>
        </div>

        <div className="relative ml-3">
          <div className="absolute bg-[#E4E6EB] top-16 right-3 px-4 py-2 rounded-3xl flex items-center gap-2 cursor-pointer hover:bg-gray-300">
            <div className="createReel"></div>
            <div className="text-black text-[15px] font-semibold">
              Tạo thước phim
            </div>
          </div>
          <div className="w-12 h-12 absolute top-1/2 -translate-y-1/2 left-0 rounded-full bg-gray-400 hover:bg-[#E4E6EB] cursor-pointer flex items-center justify-center text-black">
            <IoIosArrowForward size={30} />
          </div>
          <div className="flex flex-col gap-4 mb-4 items-end justify-start absolute bottom-0 left-0">
            {item.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  item.showComment ? item.showComment(!showComment) : null
                }
                className="flex flex-col items-center "
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,.1)] hover:bg-[rgba(255,255,255,.2)] cursor-pointer">
                  <div>{item.icon}</div>
                </div>
                <div className="text-[13px] font-semibold">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showComment && <Comment />}
    </div>
  );
}
