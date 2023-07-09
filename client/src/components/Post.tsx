import { useState, useEffect, useRef, } from "react";
import "../index.css"
import { FaEarthAmericas, FaUserGroup } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
// import { PiArrowBendDownRightBold } from "react-icons/pi";
import { IoChatboxOutline, IoArrowRedoOutline } from "react-icons/io5";
import { Icon } from "../static/icon";
import Tippy from '@tippyjs/react/headless';
import Reaction from "./Reaction";
import { setShowCmt, getShowCmt } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
// import { IoMdSend } from "react-icons/io";
import ViewMiniProfile from "./ViewMiniProfile";
import { UserType, PostType } from "../static/types";
import { getUser } from "../slices/whitelist";
import axios from "axios";
import { BiPencil, BiSolidLockAlt } from "react-icons/bi";
import ReactPlayer from 'react-player';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { setPost, setActionPost, setEditPostId } from "../slices/postSlice";
import { setUserPost } from "../slices/userSlice";
import AddComment from "./AddComment";
import { BsFillTrashFill, BsThreeDots } from "react-icons/bs";

interface PostProps {
  lastCmt: boolean;
  post: PostType;
}
interface Tag {
  id: number;
  first_name: string;
  last_name: string;
}

export default function Post({ lastCmt, post }: PostProps) {
  const videoRef = useRef(null);
  const userNow = useSelector(getUser);
  const [showIcon, setShowIcon] = useState(false);
  // const [showProfile, setShowProfile] = useState(false);
  const [showIconCmt, setShowIconCmt] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userPosted, setUserPosted] = useState<UserType | null>(null);
  const showCmt = useSelector(getShowCmt);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const [userResponse, tagsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/users/${post?.user_id}`),
        axios.get(`http://localhost:8000/api/v1/tag/${post?.id}`),
      ]);
      setUserPosted(userResponse?.data?.user[0]);
      setTags(tagsResponse?.data?.tags);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [post?.user_id]);
  const styleBg = post?.bgUrl
    ? {
      background: `url(${post?.bgUrl}) no-repeat center center / cover`,
      color: `${post?.textColor}`,
      height: "350px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
    : {};

  const handleShowCmt = () => {
    dispatch(setShowCmt(post.id));
    dispatch(setPost(post));
    dispatch(setUserPost(userPosted));
  };
  let icon = "";
  if (post?.feeling) {
    const foundFeeling = Icon.Feeling.find((item) => item.name === post.feeling);
    if (foundFeeling) {
      icon = foundFeeling.icon;
    }
  }
  const handleClickTag = (id: number) => {
    navigate(`/${id}`)
  }
  // console.log("tags", tags);


  return (
    <div className="rounded-xl my-1 bg-white relative">
      <div className="px-4 pt-1 mb-2 flex gap-2">
        {userPosted?.id !== userNow?.id
          ? <Tippy placement="bottom" interactive
            render={attrs => (
              <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                {...attrs} >
                <ViewMiniProfile userView={userPosted} />
              </div>)}>
            <Link to={`/${post?.user_id}`}>
              <div
                className={`w-10 h-10 border-[3px] box-content border-fb-blue rounded-full flex items-center
justify-center cursor-pointer overflow-hidden`}
              >
                <div className={`w-9 h-9 box-content rounded-full flex items-center justify-center 
                hover:bg-gray-300 cursor-pointer overflow-hidden`}>
                  <img
                    className="w-full h-full rounded-full object-cover overflow-hidden"
                    src={userPosted?.avatar}
                  />
                </div>
              </div>
            </Link >
          </Tippy >
          : <Link to={`/${post?.user_id}`}>
            <div
              className={`w-10 h-10 border-[3px] box-content border-fb-blue rounded-full flex items-center
justify-center cursor-pointer overflow-hidden`}
            >
              <div className={`w-9 h-9 box-content rounded-full flex items-center
justify-center hover:bg-gray-300 cursor-pointer overflow-hidden`}>
                <img
                  className="object-cover w-full h-full"
                  src={userPosted?.avatar}
                />
              </div>
            </div>
          </Link >}


        <div className=" flex flex-col">
          <div className="flex flex-row justify-between w-full">
            <div className="flex">
              {userPosted?.id !== userNow?.id
                ? <Tippy placement="bottom" interactive
                  render={attrs => (
                    <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                      {...attrs} >
                      <ViewMiniProfile userView={userPosted} />
                    </div>)}>
                  <Link to={`/${post?.user_id}`}>
                    <span className="font-semibold text-[15px] cursor-pointer">
                      {userPosted?.first_name} {userPosted?.last_name}
                    </span>
                  </Link >
                </Tippy>
                : <Link to={`/${post?.user_id}`}>
                  <div className="font-semibold text-[15px] cursor-pointer">
                    <span>{userPosted?.first_name} {userPosted?.last_name} </span>
                  </div>
                </Link >}

              {(post?.feeling)
                && <span>&nbsp;is {icon} feeling {post?.feeling} </span>}
              {(tags.length > 0 && tags.length <= 3) && (
                <span>
                  &nbsp;with{" "}
                  {tags?.map((item: Tag) => (
                    <Link to={`/${item?.id}`}>
                      <span key={item?.id} onClick={() => handleClickTag(item.id)} className="cursor-pointer hover:underline font-semibold">
                        {item.first_name} {item.last_name}
                      </span>
                    </Link>
                  )).reduce((prev: any, curr: any): any => [prev, ', ', curr])}
                </span>
              )}
              {(post?.feeling && post?.location)
                && <span>&nbsp;at {post?.location} </span>}
              {(!post?.feeling && post?.location)
                && <span>&nbsp;in {post?.location} </span>}
            </div>
            {userNow.id === post.user_id
              && <Tippy placement="bottom" interactive
                render={attrs => (
                  <div className={`box h-fit rounded-lg bg-fb-gray content_box`}
                    {...attrs} >
                    <div className="flex flex-col">
                      <span className="hover:bg-fb-dark p-2 rounded-lg cursor-pointer flex gap-2"
                        onClick={() => {dispatch(setActionPost(1)); dispatch(setEditPostId(post?.id))}}>
                        <BiPencil size={20} /> Edit post
                      </span>
                      <span className="hover:bg-fb-dark p-2 rounded-lg cursor-pointer flex gap-2"
                        onClick={() => {dispatch(setActionPost(2)); dispatch(setEditPostId(post?.id))}}>
                        <BsFillTrashFill size={20} /> Delete post
                      </span>
                    </div>
                  </div>)}>
                <div className="absolute right-2 p-2 rounded-full hover:bg-fb-gray"
                  onClick={() => setShowEdit(true)}>
                  <BsThreeDots />
                </div>
              </Tippy>
            }


          </div>

          <div className="text-[#65676B] text-[13px] flex items-center gap-3  ">
            <div>{moment(post?.date).fromNow()}</div>{" "}
            {post?.audience === "public"
              ? <div className="w-3 h-3 overflow-hidden">
                <FaEarthAmericas size={12} />
              </div>
              : post?.audience === "friends"
                ? <div className="w-3 h-3 overflow-hidden">
                  <FaUserGroup size={12} />
                </div>
                : <div className="w-3 h-3 overflow-hidden">
                  <BiSolidLockAlt size={12} />
                </div>}

          </div>
        </div>
      </div >
      {post?.bgUrl
        ? <div className={`px-4 pt-1 pb-4 text-3xl font-bold`} style={styleBg}>
          {post?.content}
        </div>
        : <div className={`px-4 pt-1 pb-4 text-[15px]`} >
          {post?.content}
        </div>}

      {
        (post?.mediaUrl && post?.type === "picture")
        && <div className="w-full h-full overflow-hidden flex items-center object-cover">
          <img
            className="object-cover w-full"
            src={post?.mediaUrl}
          />
        </div>
      }
      {
        (post?.mediaUrl && post?.type === "video")
        && <div className="w-full overflow-hidden flex items-center object-cover" >
          <ReactPlayer url={post?.mediaUrl} controls
            width="500px"
            height="278px" />
        </div>
      }

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
            <span onClick={handleShowCmt}>Comment</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto rounded">
          <div className="flex items-center gap-2">
            <span className="mt-[-2px]"><IoArrowRedoOutline size={18} /></span>
            <span>Share</span>
          </div>
        </div>
      </div>
      <AddComment />
      {
        lastCmt ? <div>
          <div className=" mx-auto gap-2 m-2 flex w-[90%] items-center">
            <Tippy placement="bottom"
              render={attrs => (
                <div className={`box py-1 px-2 h-fit rounded-lg cursor-pointer text-xs`}
                  {...attrs} >
                  <ViewMiniProfile userView={userPosted} />
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
          {/* <div className="flex gap-2 my-1 pl-10 mx-auto w-[90%] relative">
            <span className="font-semibold text-xs text-fb-dark-1">
              <PiArrowBendDownRightBold size={18} style={{ color: "#65676B" }} />
            </span>
            <span className="font-semibold text-[13px] text-fb-dark-1 cursor-pointer hover:underline"
              onClick={handleShowCmt}>
              View more comments
            </span>
          </div> */}
          <div className="flex gap-2 mt-1 mb-3 mx-auto w-[90%] relative">
            <span className="font-semibold text-[13px] text-fb-dark-1 cursor-pointer hover:underline"
              onClick={handleShowCmt}>
              View more comments
            </span>
          </div>
        </div>
          : ""
      }

    </div >
  );
}
