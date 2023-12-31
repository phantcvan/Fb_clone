import { setShowCmt, getShowCmt } from "../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Post from "./Post";
import { useEffect, useState, useRef } from "react";
import ReactionCmt from "./ReactionCmt";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import ViewMiniProfile from "./ViewMiniProfile";
import Tippy from '@tippyjs/react/headless';
import { getUser } from "../slices/whitelist";
import { CmtReactionType, CmtType, IconReaction, PostType, ReactionType, UserType } from "../static/types";
import { getPost } from "../slices/postSlice";
import { getAllUsers, getUserPost } from "../slices/userSlice";
import AddComment from "./AddComment";
import axios from "axios";
import moment from "moment";
import { Icon } from "../static/icon";



const Comment = () => {
  const showCmt = useSelector(getShowCmt);
  const userNow = useSelector(getUser);
  const post = useSelector(getPost);
  const userPost = useSelector(getUserPost);
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const [showIconCmt, setShowIconCmt] = useState(0);
  const [showCmtL2, setShowCmtL2] = useState<number[] | []>([]);
  const [addCmtL2, setAddCmtL2] = useState<number[] | []>([]);
  const [comment, setComment] = useState("");
  const [upperCmt, setUpperCmt] = useState(false);
  const [allCmtL1, setAllCmtL1] = useState<CmtType[] | []>([]);
  const [allCmtL2, setAllCmtL2] = useState<CmtType[] | []>([]);
  const [allCmtUser, setAllCmtUser] = useState<UserType[] | []>([]);
  const [newCmt, setNewCmt] = useState(false);
  const [newCmtReaction, setNewCmtReaction] = useState(false);
  const [cmtReactions, setCmtReactions] = useState<CmtReactionType[] | []>([]);
  const [cmtReactionUsers, setCmtReactionUsers] = useState([]);
  const [cmtReactionsExist, setCmtReactionsExist] = useState<string[] | []>([]);
  const [userNowCmtReaction, setUserNowCmtReaction] = useState("");
  const myRef = useRef<HTMLDivElement>(null);

  // const handleTextareaChange = (event: any) => {
  //   const { value } = event.target;
  //   setComment(value);
  //   event.target.style.height = 'auto';
  //   event.target.style.height = `${event.target.scrollHeight}px`;
  //   console.log(event.target.scrollHeight);
  // };
  const fetchData = async () => {
    try {
      const [cmtResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/cmt/${post?.id}`),
      ]);
      // console.log("cmtResponse", cmtResponse);
      const allCmt = cmtResponse?.data?.comments.reverse();
      setAllCmtL1(allCmt?.filter((cmt: CmtType) => cmt.level === 1));
      setAllCmtL2(allCmt?.filter((cmt: CmtType) => cmt.level === 2));
      const cmtUsers: number[] = cmtResponse?.data?.comments.map(
        (cmt: CmtType) => cmt.user_id
      );
      const uniqueCmtUser: number[] = Array.from(new Set(cmtUsers));
      setAllCmtUser(allUsers.filter((user: UserType) => {
        return uniqueCmtUser.some((uni: number) => uni === user.id);
      }));
    } catch (error) {
      console.error(error);
    }
  }
  const fetchDataCmtReaction = async () => {
    try {
      const [cmtReactionResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/reaction/cmt/${post?.id}`)
      ]);
      setCmtReactions(cmtReactionResponse?.data?.reactions);
      // Thông tin của những người từng like/love
      setCmtReactionUsers(allUsers.filter((user: UserType) =>
        cmtReactions?.some((reaction) => reaction.user_id === user.id)
      ));
    } catch (error) {
      console.error(error);
    }
  }
  // console.log("cmtReactions", cmtReactions);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.focus();
    }
    fetchData();
    fetchDataCmtReaction();
    if (newCmt) {
      setShowCmtL2([...showCmtL2, allCmtL2[0]?.id])
    }
  }, [newCmt, newCmtReaction]);



  // console.log("cmtReactionsExist", cmtReactionsExist);


  // console.log("showIconCmt", showIconCmt);


  // console.log("L1", cmtReactions?.filter((cR) => (cR.cmt_id === 1 && cR.user_id === userNow?.id))[0]?.reaction_type === "love")
  // console.log("showCmt", showCmt)
  return (
    <div className='w-[100%] h-[100%] absolute top-0 left-0 bg-overlay-40 flex items-center 
    justify-center z-50'>
      <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
    justify-center z-21' onClick={() => dispatch(setShowCmt(0))}>
      </div>
      <div className='login_box w-[700px] top-6 bottom-3 bg-white py-2 flex flex-col
      fixed rounded-md z-25'
      >
        <div className="flex items-center justify-between border-b border-fb-dark pb-2">
          <span className='m-auto text-xl font-semibold mt-2'>
            {userPost?.first_name}'s Post
          </span>
          <div className='flex justify-center cursor-pointer bg-fb-gray p-2 mr-2 rounded-full'
            onClick={() => dispatch(setShowCmt(0))}>
            <AiOutlineClose size={20} />
          </div>
        </div>
        {/* <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}> */}
          <div className=" overflow-y-auto h-full">
            <Post post={post} upperCmt={upperCmt} />
            {/* Comment */}

            {allCmtL1?.length > 0
              && <div ref={myRef}>
                {allCmtL1?.map((cmt1, index) => {
                  return <div>
                    <div className=" mx-auto gap-2 m-2 flex w-[90%] items-center relative">
                      <Tippy placement="bottom" interactive
                        render={attrs => (
                          <div className={`box py-1 px-2 h-fit rounded-lg cursor-pointer text-xs`}
                            {...attrs} >
                            <ViewMiniProfile userView={allCmtUser?.filter((user) => user.id === cmt1?.user_id)[0]} />
                          </div>)}>
                        <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
                          <img
                            className="object-cover w-8 h-8"
                            src={allCmtUser?.filter((user) => user.id === cmt1.user_id)[0]?.avatar}
                          />
                        </div>
                      </Tippy>

                      <span className="flex-1 h-fit bg-gray-100 rounded-xl flex items-center p-2">
                        {cmt1?.content}
                      </span>
                      {/* Hiển thị reaction cho cmt level 1 */}
                      <div className="relative p-1 bg-white">
                        {cmtReactions?.filter((cr: CmtReactionType) => cr.cmt_id === cmt1?.id).length > 0
                          && <div className="absolute right-0 bottom-[-32px] p-1 bg-white rounded-lg">
                            {(cmtReactions?.filter((cr: CmtReactionType) => cr.cmt_id === cmt1?.id))
                              .slice(0, 2)
                              .reduce((uniqueReactions: CmtReactionType[], cmtR, index) => {
                                if (
                                  index === 0 ||
                                  cmtR.reaction_type !== uniqueReactions[index - 1].reaction_type
                                ) {
                                  uniqueReactions.push(cmtR);
                                }
                                return uniqueReactions;
                              }, [])
                              .map((cmtR, index) => (
                                <div
                                  className={`w-[22px] h-[22px] absolute bottom-0`}
                                  style={{ right: `${(index + 1) * 16}px` }}
                                  key={index}
                                >
                                  <img
                                    src={Icon?.Reaction?.filter(
                                      (ir) => ir.name.toLowerCase() === cmtR?.reaction_type
                                    )[0]?.static}
                                    alt=""
                                    className="border-2 border-white rounded-full"
                                  />
                                </div>
                              ))}
                            <span className="absolute text-[13px] top-[-12px] right-[6px]">
                              {cmtReactions?.filter((cr: CmtReactionType) => cr.cmt_id === cmt1?.id).length}
                            </span>
                          </div>}
                      </div>
                    </div>
                    {cmt1?.mediaUrl
                      && <div className=" mx-auto gap-2 ml-[76px] my-2 flex w-[90%] items-center">
                        <img src={cmt1?.mediaUrl} alt="" className="w-[40%] rounded-md" />
                      </div>
                    }
                    <div className="pl-10 mx-auto w-[90%] relative flex items-center gap-3">
                      <div className="flex gap-4 w-[26px] items-center "
                        onMouseEnter={() => setShowIconCmt(cmt1?.id)} onMouseLeave={() => setShowIconCmt(0)}>

                        {cmtReactions?.filter((cR) => (cR.cmt_id === cmt1.id && cR.user_id === userNow?.id)).length > 0
                          ? (
                            <div
                              className="flex flex-row"
                            >
                              <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer"
                                style={{
                                  color: cmtReactions?.filter((cR) => (cR.cmt_id === cmt1.id && cR.user_id === userNow?.id))[0]?.reaction_type === "like"
                                    ? "#2078F4"
                                    : cmtReactions?.filter((cR) => (cR.cmt_id === cmt1.id && cR.user_id === userNow?.id))[0]?.reaction_type === "love"
                                      ? "#F33E58"
                                      : "#F7B125"
                                }}>
                                {cmtReactions?.filter((cR) => (cR.cmt_id === cmt1.id && cR.user_id === userNow?.id))[0]?.reaction_type.charAt(0).toUpperCase()}
                              </span>
                              <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer"
                                style={{
                                  color: cmtReactions?.filter((cR) => (cR.cmt_id === cmt1.id && cR.user_id === userNow?.id))[0]?.reaction_type === "like"
                                    ? "#2078F4"
                                    : cmtReactions?.filter((cR) => (cR.cmt_id === cmt1.id && cR.user_id === userNow?.id))[0]?.reaction_type === "love"
                                      ? "#F33E58"
                                      : "#F7B125"
                                }}>
                                {cmtReactions?.filter((cR) => (cR.cmt_id === cmt1.id && cR.user_id === userNow?.id))[0]?.reaction_type.slice(1)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer">
                              Like
                            </span>
                          )}

                        {/* <div className="absolute top-0"> */}
                        {showIconCmt === cmt1?.id &&
                          <div className="relative ml-[-116px] bottom-[-31px]">
                            <ReactionCmt cmtId={cmt1?.id} setNewCmtReaction={setNewCmtReaction} />
                          </div>}
                      </div>
                      <div className="flex gap-3 items-center">
                        <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer"
                          onClick={() => setAddCmtL2([...addCmtL2, cmt1?.id])}>
                          Reply
                        </span>
                        <span className="text-xs text-fb-dark-1">{moment(cmt1?.date).fromNow()}</span>

                      </div>

                    </div>
                    {/* <div className="flex gap-4 pl-14 mx-auto w-[90%] relative">
                      <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer"
                        onMouseEnter={() => setShowIconCmt(cmt1.id)} onMouseLeave={() => setShowIconCmt(0)}>
                        Like
                      </span>
                      <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer"
                        onClick={() => setAddCmtL2([...addCmtL2, cmt1.id])}>
                        Reply
                      </span>
                      <span className="text-xs text-fb-dark-1">{moment(cmt1?.date).fromNow()}</span>
                      {showIconCmt === cmt1.id && <ReactionCmt />}
                    </div> */}
                    <div className="flex gap-4 pl-2 mx-auto w-[90%] relative">
                      {addCmtL2?.includes(cmt1?.id)
                        && <AddComment level={cmt1?.id} setNewCmt={setNewCmt} postId={showCmt} />}
                    </div>


                    {
                      (allCmtL2?.filter((cmt2) => cmt2?.cmt_reply === cmt1?.id).length > 0 && !showCmtL2.includes(cmt1.id))
                      && <div className="flex gap-2 my-1 pl-14 mx-auto w-[90%] relative"
                        onClick={() => setShowCmtL2([...showCmtL2, cmt1.id])}>
                        <span className="font-semibold text-xs text-fb-dark-1">
                          <PiArrowBendDownRightBold size={18} style={{ color: "#65676B" }} />
                        </span>
                        <span className="font-semibold text-[13px] text-fb-dark-1 cursor-pointer hover:underline">
                          {allCmtL2?.filter((cmt2) => cmt2.cmt_reply === cmt1?.id).length} {allCmtL2?.filter((cmt2) => cmt2?.cmt_reply === cmt1?.id).length > 1 ? "relies" : "reply"}
                        </span>
                      </div>
                    }
                    {
                      (allCmtL2?.filter((cmt2) => cmt2?.cmt_reply === cmt1?.id).length > 0 && showCmtL2.includes(cmt1?.id))
                      && <div className="flex gap-2 my-1 pl-10 mx-auto w-full relative flex-col">
                        {allCmtL2.filter((cmt) => cmt?.cmt_reply === cmt1?.id).map((cmt2, index) => {
                          return <div className="w-full">
                            <div className=" mx-auto gap-2 m-2 flex w-[90%] items-center">
                              <Tippy placement="bottom" interactive
                                render={attrs => (
                                  <div className={`box py-1 px-2 h-fit rounded-lg cursor-pointer text-xs`}
                                    {...attrs} >
                                    <ViewMiniProfile userView={allCmtUser?.filter((user) => user?.id === cmt2?.user_id)[0]} />
                                  </div>)}>
                                <div className={`w-8 h-8 box-content rounded-full flex items-center
          justify-center cursor-pointer overflow-hidden`}>
                                  <img
                                    className="object-cover w-8 h-8"
                                    src={allCmtUser?.filter((user) => user.id === cmt2?.user_id)[0].avatar}
                                  />
                                </div>
                              </Tippy>
                              <span className="flex-1 h-fit bg-gray-100 rounded-xl flex items-center p-2">
                                {cmt2.content}
                              </span>
                              {/* Hiển thị reaction cho cmt level 2 */}
                              <div className="relative p-1 bg-white">
                                {cmtReactions?.filter((cr: CmtReactionType) => cr.cmt_id === cmt2?.id).length > 0
                                  && <div className="absolute right-0 bottom-[-32px] p-1 bg-white rounded-lg">
                                    {(cmtReactions?.filter((cr: CmtReactionType) => cr.cmt_id === cmt2?.id))
                                      .slice(0, 2)
                                      .reduce((uniqueReactions: CmtReactionType[], cmtR, index) => {
                                        if (
                                          index === 0 ||
                                          cmtR.reaction_type !== uniqueReactions[index - 1].reaction_type
                                        ) {
                                          uniqueReactions.push(cmtR);
                                        }
                                        return uniqueReactions;
                                      }, [])
                                      .map((cmtR, index) => (
                                        <div
                                          className={`w-[22px] h-[22px] absolute bottom-0`}
                                          style={{ right: `${(index + 1) * 16}px` }}
                                          key={index}
                                        >
                                          <img
                                            src={Icon?.Reaction?.filter(
                                              (ir) => ir.name.toLowerCase() === cmtR?.reaction_type
                                            )[0]?.static}
                                            alt=""
                                            className="border-2 border-white rounded-full"
                                          />
                                        </div>
                                      ))}
                                    <span className="absolute text-[13px] top-[-12px] right-[6px]">
                                      {cmtReactions?.filter((cr: CmtReactionType) => cr.cmt_id === cmt2?.id).length}
                                    </span>
                                  </div>}
                              </div>
                            </div>
                            <div className="pl-10 mx-auto w-[90%] relative"
                              onMouseEnter={() => setShowIconCmt(cmt2.id)} onMouseLeave={() => setShowIconCmt(0)}>
                              <div className="flex gap-4">
                                {cmtReactions?.filter((cR) => (cR.cmt_id === cmt2.id && cR.user_id === userNow?.id)).length > 0
                                  ? (
                                    <div
                                      className="flex flex-row"
                                    >
                                      <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer"
                                        style={{
                                          color: cmtReactions?.filter((cR) => (cR.cmt_id === cmt2.id && cR.user_id === userNow?.id))[0]?.reaction_type === "like"
                                            ? "#2078F4"
                                            : cmtReactions?.filter((cR) => (cR.cmt_id === cmt2.id && cR.user_id === userNow?.id))[0]?.reaction_type === "love"
                                              ? "#F33E58"
                                              : "#F7B125"
                                        }}>
                                        {cmtReactions?.filter((cR) => (cR.cmt_id === cmt2.id && cR.user_id === userNow?.id))[0]?.reaction_type.charAt(0).toUpperCase()}
                                      </span>
                                      <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer"
                                        style={{
                                          color: cmtReactions?.filter((cR) => (cR.cmt_id === cmt2.id && cR.user_id === userNow?.id))[0]?.reaction_type === "like"
                                            ? "#2078F4"
                                            : cmtReactions?.filter((cR) => (cR.cmt_id === cmt2.id && cR.user_id === userNow?.id))[0]?.reaction_type === "love"
                                              ? "#F33E58"
                                              : "#F7B125"
                                        }}>
                                        {cmtReactions?.filter((cR) => (cR.cmt_id === cmt2.id && cR.user_id === userNow?.id))[0]?.reaction_type.slice(1)}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="font-semibold text-xs text-fb-dark-1 cursor-pointer">
                                      Like
                                    </span>
                                  )}
                                <span className="text-xs text-fb-dark-1">{moment(cmt2?.date).fromNow()}</span>

                              </div>
                              {showIconCmt === cmt2?.id &&
                                <div className="relative ml-[-110px] bottom-[-25px] ">
                                  <ReactionCmt cmtId={cmt2?.id} setNewCmtReaction={setNewCmtReaction} />
                                </div>}
                            </div>
                          </div>
                        })}

                      </div>
                    }
                    {
                      (allCmtL2?.filter((cmt2) => cmt2?.cmt_reply === cmt1?.id).length > 0 && showCmtL2.includes(cmt1?.id))
                      && <div className=" mx-auto gap-2 m-2 flex items-center my-1 pl-[42px] w-full">
                        <AddComment level={cmt1?.id} setNewCmt={setNewCmt} postId={showCmt} />
                      </div>

                    }

                  </div>
                })}

              </div>}

          </div>
        {/* </Scrollbars> */}
        {/* <div> */}

        <AddComment level={0} postId={showCmt} setNewCmt={setNewCmt} />

        {/* </div> */}
      </div >
    </div >
  )
}

export default Comment