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
import { UserType, PostType, ReactionType, CmtType } from "../static/types";
import { getUser } from "../slices/whitelist";
import axios from "axios";
import { BiPencil, BiSolidLockAlt } from "react-icons/bi";
import ReactPlayer from 'react-player';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { setPost, setActionPost, setEditPostId } from "../slices/postSlice";
import { getAllUsers, setUserPost } from "../slices/userSlice";
import AddComment from "./AddComment";
import { BsFillTrashFill, BsThreeDots } from "react-icons/bs";
import ReactionCmt from "./ReactionCmt";

interface PostProps {
  post: PostType;
  upperCmt: boolean
}
interface Tag {
  id: number;
  first_name: string;
  last_name: string;
}


export default function Post({ post, upperCmt }: PostProps) {
  const userNow = useSelector(getUser);
  const [showIcon, setShowIcon] = useState(false);
  // const [showProfile, setShowProfile] = useState(false);
  const [showIconCmt, setShowIconCmt] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userPosted, setUserPosted] = useState<UserType | null>(null);
  const showCmt = useSelector(getShowCmt);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [reactions, setReactions] = useState<ReactionType[] | []>([]);
  const [reactionUsers, setReactionUsers] = useState([]);
  const [allCmt, setAllCmt] = useState<CmtType[] | []>([]);
  const [allCmtUser, setAllCmtUser] = useState<UserType[] | []>([]);
  const [lastCmtUser, setLastCmtUser] = useState<UserType | null>(null);
  const [reactionsExist, setReactionsExist] = useState<string[] | []>([]);
  const navigate = useNavigate();
  const allUsers = useSelector(getAllUsers);
  const [userNowReaction, setUserNowReaction] = useState("");
  const [userNowReactionImg, setUserNowReactionImg] = useState("");
  const [newCmt, setNewCmt] = useState<CmtType | null>(null);
  const [allCmtL1, setAllCmtL1] = useState<CmtType[] | []>([]);
  const [allCmtL2, setAllCmtL2] = useState<CmtType[] | []>([]);

  const fetchData = async () => {
    try {
      const [userResponse, tagsResponse, cmtResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/users/${post?.user_id}`),
        axios.get(`http://localhost:8000/api/v1/tag/${post?.id}`),
        axios.get(`http://localhost:8000/api/v1/cmt/${post?.id}`),
      ]);
      // console.log("cmtResponse", cmtResponse);
      setAllCmt(cmtResponse?.data?.comments);
      setAllCmtL1(cmtResponse?.data?.comments.filter((cmt: CmtType) => cmt.level === 1));
      setAllCmtL2(cmtResponse?.data?.comments.filter((cmt: CmtType) => cmt.level === 2));
      const cmtUsers: number[] = cmtResponse?.data?.comments.map(
        (cmt: CmtType) => cmt.user_id
      );
      const uniqueCmtUser: number[] = Array.from(new Set(cmtUsers));
      setAllCmtUser(allUsers?.filter((user: UserType) => {
        return uniqueCmtUser.some((uni: number) => uni === user.id);
      }));
      setLastCmtUser(allUsers
        .filter((user: UserType) => user?.id === (cmtResponse?.data?.comments
          .filter((cmt: CmtType) => cmt?.level === 1))[0]?.user_id)[0])
      // setLastCmtUser(allUsers?.find((user: UserType) => {
      //   return cmtResponse?.data?.comments?.some((cmt: CmtType) => cmt.level === 1 && cmt.user_id == user.id);
      // }))
      setUserPosted(userResponse?.data?.user[0]);
      setTags(tagsResponse?.data?.tags);
    } catch (error) {
      console.error(error);
    }
  }


  const fetchDataReaction = async () => {
    try {
      const [reactionResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/reaction/${post?.id}`)
      ]);
      setReactions(reactionResponse?.data?.reactions);
      const reactionTypes: string[] = reactionResponse?.data?.reactions.map(
        (reaction: ReactionType) => reaction.reaction_type
      );
      const uniqueReactionTypes: string[] = Array.from(new Set(reactionTypes));
      const sortedReactionTypes: string[] = uniqueReactionTypes.sort((a, b) => {
        const countA = reactionTypes.filter((reaction) => reaction === a).length;
        const countB = reactionTypes.filter((reaction) => reaction === b).length;
        return countB - countA;
      });
      setReactionsExist(sortedReactionTypes);
      setReactionUsers(allUsers.filter((user: UserType) =>
        reactions?.some((reaction: ReactionType) => reaction.user_id === user.id)
      ));
      const userReaction = reactionResponse?.data?.reactions.filter((reaction: ReactionType) => reaction.user_id === userNow?.id)
      if (userReaction.length > 0) {
        setUserNowReaction(userReaction[0]?.reaction_type);
        setUserNowReactionImg(Icon.Reaction
          .find(item => item.name.toLowerCase() === userReaction[0]?.reaction_type).static);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
    fetchDataReaction()
  }, [post?.user_id]);
  // useEffect(() => {
  //   fetchDataReaction();
  // }, [userNowReaction])
  const handleDeleteReaction = async () => {
    try {
      const [reactionResponse] = await Promise.all([
        axios.delete(`http://localhost:8000/api/v1/reaction/${post?.id}`, {
          data: { user_id: userNow?.id },
        }),
      ]);
      setUserNowReaction("");
      setUserNowReactionImg("");
      setShowIcon(false);
      const reactionArr = reactions.filter(r => r.user_id !== userNow?.id);
      setReactions(reactionArr);
    } catch (error) {
      console.error(error);
    }
  }
  const handleAddReaction = async () => {
    try {
      const [reactionResponse] = await Promise.all([
        axios.post(`http://localhost:8000/api/v1/reaction/${post?.id}`, {
          user_id: userNow.id,
          reaction_type: "like",
        })
      ]);
      setUserNowReaction("like");
      setUserNowReactionImg("/assets/reactions/like_s.png");
      setShowIcon(false);
      const id = Math.floor(Math.random() * 10000000000)
      const newReaction = {
        id: id,
        post_id: post?.id,
        user_id: userNow?.id,
        reaction_type: "like"
      }
      setReactions((pre) => [...pre, newReaction])
    } catch (error) {
      console.error(error);
    }
  }
  // console.log("reactionUsers", reactionUsers)
  // console.log("reactions", reactions)
  // console.log("userNowReaction", userNowReaction)
  // console.log("userNowReactionImg", userNowReactionImg)
  // console.log("allCmtL1", allCmtL1, lastCmtUser)

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
    navigate(`/user/${id}`)
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
            <Link to={`/user/${post?.user_id}`}>
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
          : <Link to={`/user/${post?.user_id}`}>
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
            <div className="flex flex-wrap">
              {userPosted?.id !== userNow?.id
                ? <Tippy placement="bottom" interactive
                  render={attrs => (
                    <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                      {...attrs} >
                      <ViewMiniProfile userView={userPosted} />
                    </div>)}>
                  <Link to={`/user/${post?.user_id}`}>
                    <span className="font-semibold text-[15px] cursor-pointer">
                      {userPosted?.first_name} {userPosted?.last_name}
                    </span>
                  </Link >
                </Tippy>
                : <Link to={`/user/${post?.user_id}`}>
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
                    <Link to={`/user/${item?.id}`}>
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
                        onClick={() => { dispatch(setActionPost(1)); dispatch(setEditPostId(post?.id)) }}>
                        <BiPencil size={20} /> Edit post
                      </span>
                      <span className="hover:bg-fb-dark p-2 rounded-lg cursor-pointer flex gap-2"
                        onClick={() => { dispatch(setActionPost(2)); dispatch(setEditPostId(post?.id)) }}>
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
        && <div className="w-full h-full overflow-hidden flex items-center object-cover"
          onClick={handleShowCmt}>
          <img
            className="object-cover w-full aspect-[4/3]"
            src={post?.mediaUrl}
          />
        </div>
      }
      {
        (post?.mediaUrl && post?.type === "video")
        && <div className="w-full overflow-hidden flex items-center object-cover" >
          <ReactPlayer url={post?.mediaUrl} controls className="aspect-video"
            width="100%" />
        </div>
      }
      {(reactions?.length > 0)
        && <div className="flex items-center justify-between px-4 py-[10px] ">
          {reactions.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              {/* Số lượng reaction */}
              <Tippy
                placement="bottom"
                render={attrs => (
                  <div className={`w-52 ml-[100px] box addOn-box mt-[-10px] px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                    {...attrs}>
                    <div className='bg-fb-dark-3 opacity-80 absolute  p-2 text-white text-xs rounded-md'>
                      {reactionUsers?.slice(0, 10).map((user: UserType) => (
                        <p className='py-[2px]'>{user?.first_name} {user?.last_name}</p>
                      ))}
                    </div>
                  </div>)}>
                <div className="flex items-center justify-center">
                  {reactionsExist?.slice(0, 3).map((reaction, index) => {
                    const reactionIcon = Icon.Reaction.find((item) =>

                      item.name.toLowerCase() === reaction.toLowerCase()
                    );

                    if (reactionIcon) {
                      return (
                        <div
                          key={reaction}
                          className={`w-[20px] h-[20px] overflow-hidden rounded-full ml-[-2px]`}
                        >
                          <img src={reactionIcon.static} alt={reaction} />
                        </div>
                      );
                    }

                    return null;
                  })}
                  <div className="text-sm ml-1 text-fb-gray-text cursor-pointer relative">
                    {reactions?.length}
                  </div>
                </div>


              </Tippy>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            {/* Số lượng cmt */}
            <Tippy
              placement="bottom"
              render={attrs => (
                <div className={`w-52 ml-[100px] box addOn-box mt-[-10px] px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                  {...attrs}>
                  <div className='bg-fb-dark-3 opacity-80 absolute  p-2 text-white text-xs rounded-md'>
                    {allCmtUser?.slice(0, 10).map((user: UserType) => (
                      <p className='py-[2px]'>{user?.first_name} {user?.last_name}</p>
                    ))}

                  </div>
                </div>)}>
              <div className="text-sm text-fb-gray-text mr-2">
                <span className="flex gap-2">{allCmt?.length} <IoChatboxOutline size={18} /></span>
              </div>
            </Tippy>
            {/* Số lượng share */}
            {/* <Tippy
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
            </Tippy> */}

          </div>
        </div>}
      <div className="grid grid-cols-3 h-11 w-[90%] mx-auto border-y border-fb-dark relative">
        {/* Reaction của userNow */}
        <div onMouseOver={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}
          className="flex items-center justify-center gap-2 cursor-pointer py-2 h-[80%] my-auto 
         rounded hover:bg-gray-100">
          {userNowReaction
            ? <div className="flex items-center gap-2"
              onClick={handleDeleteReaction}>
              <img className="mt-[-2px] w-5 h-5" src={userNowReactionImg} />
              <span>{userNowReaction.charAt(0).toUpperCase() + userNowReaction.slice(1)}</span>
            </div>
            : <div className="flex items-center gap-2"
              onClick={handleAddReaction}>
              <span className="mt-[-2px]"><AiOutlineLike size={18} /></span>
              <span>Like</span>
            </div>}
          <div className="flex items-center gap-2">

          </div>
          {showIcon &&
            <Reaction setUserNowReaction={setUserNowReaction} setUserNowReactionImg={setUserNowReactionImg}
              postId={post.id} userNowReaction={userNowReaction} setReactions={setReactions} />}
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
      {upperCmt && <AddComment level={0} setNewCmt={setNewCmt} postId={post?.id} />}
      {newCmt
        && <div>
          <div className=" mx-auto gap-2 m-2 flex w-[90%] items-center">
            <div className={`w-8 h-8 box-content rounded-full flex items-center
        justify-center cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-8 h-8"
                src={userNow?.avatar}
              />
            </div>
            <span className="flex-1 h-fit bg-gray-100 rounded-xl flex items-center p-2">
              {newCmt?.content}
            </span>
          </div>
          <div className="pl-10 mx-auto w-[90%] relative"
            onMouseEnter={() => setShowIconCmt(true)} onMouseLeave={() => setShowIconCmt(false)}>
            <div className="flex gap-4">
              <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer" >
                Like
              </span>
              <span className="font-semibold text-xs text-fb-dark-1">Reply</span>
              <span className="font-semibold text-xs text-fb-dark-1">
                {moment(newCmt?.date).fromNow()}
              </span>

            </div>
            {showIconCmt &&
              <div className="relative ml-[-120px] bottom-[-25px]">
                <ReactionCmt cmtId={allCmt[allCmt?.length-1]?.id +1}/>
              </div>}
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
        </div>}
      {(upperCmt && allCmt?.length > 0) ? <div>
        <div className=" mx-auto gap-2 m-2 flex w-[90%] items-center">
          <Tippy placement="bottom" interactive
            render={attrs => (
              <div className={`box py-1 px-2 h-fit rounded-lg cursor-pointer text-xs`}
                {...attrs} >
                <ViewMiniProfile userView={lastCmtUser} />
              </div>)}>
            <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
              <img
                className="object-cover w-8 h-8"
                src={lastCmtUser?.avatar}
              />
            </div>
          </Tippy>
          <span className="flex-1 h-fit bg-gray-100 rounded-xl flex items-center p-2">
            {allCmt?.find(item => item.level === 1)?.content}
          </span>
        </div>
        <div className="pl-10 mx-auto w-[90%] relative"
          onMouseEnter={() => setShowIconCmt(true)} onMouseLeave={() => setShowIconCmt(false)}>
          <div className="flex gap-4">
            <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer" >
              Like
            </span>
            <span className="font-semibold text-xs text-fb-dark-1">Reply</span>
            <span className="font-semibold text-xs text-fb-dark-1">
              {moment(allCmt?.find(item => item.level === 1)?.date).fromNow()}
            </span>

          </div>
          {showIconCmt &&
            <div className="relative ml-[-120px] bottom-[-25px]">
              <ReactionCmt cmtId={allCmt?.find(item => item.level === 1)?.id}/>
            </div>}
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
