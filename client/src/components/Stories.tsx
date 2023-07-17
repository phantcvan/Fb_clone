import { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext, GrPrevious } from "react-icons/gr";
import { AiFillPlusCircle } from "react-icons/ai";
import "../index.css";
import { UserType } from "../static/types"
import { useSelector } from "react-redux";
import { getAllUsers } from "../slices/userSlice";

// import plusIcon from '../../assets/Home/plusIcon.svg'

interface SampleArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// eslint-disable-next-line react-refresh/only-export-components
function SampleNextArrow(props: SampleArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "99999px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "30px"
      }}
      className={className}
      onClick={onClick}
    >
      <GrNext style={{ ...style, fontSize: "24px", }} />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function SamplePrevArrow(props: SampleArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "99999px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "30px",
        zIndex: 20,
      }}
      className={className}
      onClick={onClick}
    >
      <GrPrevious style={{ ...style, fontSize: "24px" }} />
    </div>
  );
}

const Slick = ({ userNow }: { userNow: UserType }) => {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const allUsers = useSelector(getAllUsers);

  const afterChangeHandler = (currentSlide) => {
    setIsFirstSlide(currentSlide === 0);
  };

  const n = 3;
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: n,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: isFirstSlide ? undefined : <SamplePrevArrow />,
    centerMode: true,
    afterChange: afterChangeHandler,
  };

  return (
    <div className="mt-4 w-full flex flex-col gap-1">
      <Slider {...settings}>
        <div className="ml-[-168px]">
          <div className={`w-[calc(100%/(${n}+1)-20px)] h-[200px] mr-2 rounded-xl overflow-hidden flex flex-col justify-between items-center relative border border-fb-gray shadow-sm cursor-pointer`}>
            <img
              className="object-cover w-full basis-[80%] cursor-pointer"
              src={userNow.avatar}
            />
            <div className="absolute bottom-0 border-4 border-white -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center">
              <div className="w-[80%] h-[80%] rounded-full flex items-center justify-center bg-white z-0 absolute">
              </div>
              <AiFillPlusCircle size={36} style={{ color: "#1A6ED8", zIndex: "10" }} />
            </div>
            <div className="text-center w-full hover:bg-fb-gray flex-1 flex justify-center items-end text-xs font-medium ">
              <span className="font-semibold mb-1">Create story</span>
            </div>
          </div>
        </div>
        <div className="ml-[-168px]">
          <div className={`w-[calc(100%/(${n}+1)-20px)] h-[200px] mr-2 rounded-xl overflow-hidden flex items-center justify-center  relative`}>
            <img
              className="object-cover w-full h-full cursor-pointer"
              src="https://i.pinimg.com/564x/63/a3/1f/63a31f2eeb5cdf22c2a35eb3a7479dc6.jpg"
            />
            <div className="absolute w-10 h-10 border-4 border-fb-blue  top-2 left-2 rounded-full overflow-hidden flex items-center justify-center">
              <img className="object-cover" src={allUsers[1].avatar} />
            </div>
            <div className="absolute bottom-1 left-1">
              <span className="text-xs font-semibold mb-1 text-white">Create story</span>
            </div>
          </div>
        </div>
        <div className="ml-[-168px]">
          <div className={`w-[calc(100%/(${n}+1)-20px)] h-[200px] mr-2 rounded-xl  overflow-hidden flex items-center justify-center  relative`}>
            <img
              className="object-cover w-full h-full cursor-pointer"
              src="/assets/story/2.jpg"
            />
            <div className="absolute w-10 h-10 border-4 border-fb-blue top-2 left-2 rounded-full overflow-hidden flex items-center justify-center">
              <img className="object-cover" src={allUsers[2].avatar} />
            </div>
          </div>
        </div>
        <div className="ml-[-168px]">
          <div className={`w-[calc(100%/(${n}+1)-20px)] h-[200px] mr-2 rounded-xl  overflow-hidden flex items-center justify-center  relative`}>
            <img
              className="object-cover w-full h-full cursor-pointer"
              src="/assets/story/3.jpg"
            />
            <div className="absolute w-10 h-10 border-4 border-fb-blue top-2 left-2 rounded-full overflow-hidden flex items-center justify-center">
            <img className="object-cover" src={allUsers[4].avatar} />
            </div>
          </div>
        </div>
        <div className="ml-[-168px]">
          <div className={`w-[calc(100%/(${n}+1)-20px)] h-[200px] mr-2 rounded-xl  overflow-hidden flex items-center justify-center  relative`}>
            <img
              className="object-cover w-full h-full cursor-pointer"
              src="/assets/story/4.jpg"
            />
            <div className="absolute w-10 h-10 border-4 border-fb-blue top-2 left-2 rounded-full overflow-hidden flex items-center justify-center">
            <img className="object-cover" src={allUsers[3].avatar} />
            </div>
          </div>
        </div>
        <div className="ml-[-168px]">
          <div className={`w-[calc(100%/(${n}+1)-20px)] h-[200px] mr-2 rounded-xl  overflow-hidden flex items-center justify-center  relative`}>
            <img
              className="object-cover w-full h-full cursor-pointer"
              src="/assets/story/5.jpg"
            />
            <div className="absolute w-10 h-10 border-4 border-fb-blue top-2 left-2 rounded-full overflow-hidden flex items-center justify-center">
            <img className="object-cover" src={allUsers[5].avatar} />
            </div>
          </div>
        </div>

      </Slider>
    </div>
  );
}
export default Slick;
