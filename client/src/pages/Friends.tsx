import { useEffect, useState } from "react";
import Topbar from '../components/Topbar'
import { getUser } from '../slices/whitelist'
import { useDispatch, useSelector } from 'react-redux';
import SmallSidebar from '../components/SmallSidebar';
import { FaUserGroup } from 'react-icons/fa6';
import { BsFillPersonPlusFill, BsFillPersonLinesFill } from 'react-icons/bs';
import "../index.css"
import { getAllUsers, getFriendRequest, setFriendRequest, setMyRequest, setRelation } from '../slices/userSlice';
import { Relation, UserType } from '../static/types';
import FriendsRequestComp from '../components/Friends/FriendsRequestComp';
import { BiArrowBack } from 'react-icons/bi';
import MiniRequest from '../components/Friends/MiniRequest';
import axios from 'axios';
import HeaderUser from "../components/HeaderUser";
import Introduction from "../components/Introduction";
import UserPhoto from "../components/UserPhoto";
import MainUserPage from "../components/MainUserPage";
import ViewSentRequest from "../components/Friends/ViewSentRequest";

const Friends = () => {
  const userNow = useSelector(getUser);
  const [pick, setPick] = useState(0);
  const [chooseFriend, setChooseFriend] = useState(0);
  const friendRequest = useSelector(getFriendRequest);
  const allUsers = useSelector(getAllUsers);
  const dispatch = useDispatch();
  const [pageNow, setPageNow] = useState<UserType | null>(null);
  const [friends, setFriends] = useState<UserType[] | []>([]);
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [relationship, setRelationship] = useState<UserType | null>(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [edited, setEdited] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [viewSent, setViewSent] = useState(false);




  const friendRequestInfo = allUsers?.filter((user: UserType) =>
    friendRequest?.some((req: Relation) => req.request_id === user.id)
  )


  const fetchDataUser = async () => {
    try {
      const [userResponse, listFriendsResponse, checkFriendResponse, postResponse, relationResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/users/${chooseFriend}`),
        axios.get(`http://localhost:8000/api/v1/relation/friends/${chooseFriend}`),
        axios.post(`http://localhost:8000/api/v1/relation/isFriend`, {
          userId1: chooseFriend,
          userId2: userNow?.id,
        }),
        axios.get(`http://localhost:8000/api/v1/posts/loadPostsBelongToUser/${chooseFriend}`),
        axios.get(`http://localhost:8000/api/v1/relation/${userNow.id}`),
      ]);
      const friend = relationResponse?.data?.request?.filter((item: Relation) => item.status === 2);
      const idsFromRelation = friend?.map((item: Relation) => [item.request_id, item.accept_id])
        .flat().filter((id: number) => id !== userNow.id);
      const filteredObjects = relationResponse?.data?.request?.filter((item: Relation) => item.status === 1 && item.accept_id === userNow.id);
      const myRequest = relationResponse?.data?.request?.filter((item: Relation) => item.status === 1 && item.request_id === userNow.id);
      if (myRequest.length > 0) dispatch(setMyRequest(myRequest))
      if (filteredObjects.length > 0) dispatch(setFriendRequest(filteredObjects));
      dispatch(setRelation(allUsers?.filter((user: UserType) => idsFromRelation.includes(user.id))));
      setPageNow(userResponse?.data?.user[0]);
      setFriends(listFriendsResponse?.data?.friends);
      setIsLoaded(true);
      if (chooseFriend !== userNow?.id) {
        if (checkFriendResponse?.data?.checkFriend.length > 0) setIsFriend(true)
      }
      setPosts(postResponse?.data?.posts);
      if (userResponse?.data?.user[0]?.relationship_to) {
        try {
          const relation = await axios.get(`http://localhost:8000/api/v1/users/${userResponse.data.user[0].relationship_to}`);
          setRelationship(relation?.data?.user[0])
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchDataUser();
  }, [chooseFriend, userNow]);
  const totalStyle = "w-full ml-[2px]";
  const coverStyle = "h-[350px] rounded-md mr-12 object-cover w-full";
  const avatarStyle = "absolute bottom-[30px] left-[-100px] border-4 border-white rounded-full bg-white";
  const divAdd = "w-[100px]";
  const subTotalStyle = "ml-[170px] mx-auto mr-16";


  return (
    <div className='relative '>
      <Topbar userNow={userNow} />
      <div className="flex w-[100%] bg-fb-gray min-h-screen relative">
        <div className='w-[60px]'>
          <SmallSidebar userNow={userNow} />
        </div>
        {pick === 0
          ? <div className='flex flex-col pb-3 w-1/4 content-box px-2 py-4 h-screen fixed top-[57px] left-[60px] bg-white'>
            <div className='border-b pb-3 border-fb-gray'>
              <p className='text-2xl font-semibold '>Friends</p>
            </div>
            <span className={`font-semibold flex items-center gap-2 py-2 px-1 rounded-md mb-1 mt-4 cursor-pointer
         ${pick === 0 ? "bg-gray-100" : ""}`} onClick={() => setPick(0)}>
              <div className={`w-6 h-6 rounded-full p-[6px] flex items-center justify-center
          ${pick === 0 ? "bg-fb-blue " : "bg-fb-gray"}`}>
                <FaUserGroup size={22} style={{ color: pick === 0 ? "#ffffff" : "black" }} />
              </div>
              Home
            </span>
            <span className={`font-semibold flex items-center gap-2 py-2 px-1 rounded-md my-1  cursor-pointer
         hover:bg-gray-100`} onClick={() => setPick(1)}>
              <div className={`w-7 h-7 rounded-full p-[6px] flex items-center justify-center bg-fb-gray
          `}>
                <BsFillPersonPlusFill size={22} />
              </div>
              Friend Requests
            </span>
            <span className={`font-semibold flex items-center gap-2 py-2 px-1 rounded-md my-1 cursor-pointer
            hover:bg-gray-100`} onClick={() => setPick(2)}>
              <div className={`w-7 h-7 rounded-full p-[6px] flex items-center justify-center bg-fb-gray`}>
                <BsFillPersonLinesFill size={20} />
              </div>
              All friends
            </span>
          </div>
          : pick === 1
          && <div className='flex flex-col pb-3 w-1/4 content-box px-2 py-4 h-screen fixed top-[57px] left-[60px] bg-white'>
            <div className='flex items-center gap-2 border-b pb-3 border-fb-gray'>
              <span className='p-2 rounded-full hover:bg-gray-100 mb-3 cursor-pointer'
                onClick={() => setPick(0)}>
                <BiArrowBack size={20} style={{ color: "#606770", backgroundColor: "" }} /> </span>
              <div className=''>
                <span className='text-xs text-fb-gray-text'>Friends</span>
                <p className='text-2xl font-semibold '>Friend Requests</p>
              </div>
            </div>
            <div className='flex flex-col mt-3 gap-2'>
              <span className='text-md font-semibold'>{friendRequestInfo.length} Friend {friendRequestInfo.length > 1 ? "Requests" : "Request"}</span>
              <span className='text-sm text-fb-blue cursor-pointer' onClick={() => setViewSent(true)}>
                View sent request
              </span>
              {friendRequestInfo.reverse().map((item: UserType, index: number) => (
                <div className=' w-full' key={index}>
                  <MiniRequest item={item} setChooseFriend={setChooseFriend}
                    request={friendRequest?.filter((fQ: Relation) => fQ.request_id === item.id)[0]} />
                </div>
              ))}
            </div>

          </div>}

        {pick === 0
          && <div className='flex flex-col mt-6 gap-3 ml-[calc(100vh*1/3+170px)]'>
            <span className='text-xl font-semibold'>Friend Requests</span>
            <div className='flex flex-wrap gap-7 '>
              {friendRequestInfo.map((item: UserType, index: number) => (
                <div className=' w-[240px] h-[392px]' key={index}>
                  <FriendsRequestComp item={item} />
                </div>
              ))}
            </div>
          </div>}
        {(pick === 1 && chooseFriend === 0)
          && <div className='flex flex-col mt-6 gap-3 ml-[calc(100vh*1/3+170px)] items-center justify-center w-full'>
            <img src="/assets/friendPage.png" alt="" className='w-[112px] h-[112px] overflow-hidden object-cover' />
            <span className='text-fb-gray-text font-semibold text-xl'>Select people's names to preview their profile.</span>
          </div>}
        {chooseFriend !== 0
          && <div className='flex flex-col gap-3 ml-[calc(100vh*1/3+140px)] w-[900px]' >
            <div className="bg-white rounded-md ml-[-11px]">
              <HeaderUser pageNow={pageNow} friends={friends} setIsEditProfile={setIsEditProfile}
                totalStyle={totalStyle} avatarStyle={avatarStyle} coverStyle={coverStyle} divAdd={divAdd}
                subTotalStyle={subTotalStyle} setFriends={setFriends} />
            </div>
            <div className="bg-white mx-24 p-3 rounded-md ">
              <Introduction pageNow={pageNow} relationship={relationship} />
            </div>
            <div className="bg-white mx-24 p-3 rounded-md ">
              <UserPhoto posts={posts} />
            </div>
            <div className="ml-[84px] p-3 rounded-md mr-[-75px] mt-[-26px]">
              <MainUserPage pageNow={pageNow} posts={posts} isLoaded={isLoaded} deleted={deleted}
                setIsLoaded={setIsLoaded} edited={edited} />
            </div>
          </div>}
      {viewSent && <ViewSentRequest setViewSent={setViewSent}/>}
      </div>
    </div>
  )
}

export default Friends