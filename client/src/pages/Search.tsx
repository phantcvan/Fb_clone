import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSearchQuery, getShowMess, setShowCmt, setShowMess } from '../slices/appSlice';
import Topbar from '../components/Topbar';
import { getUser } from '../slices/whitelist';
import SmallSidebar from '../components/SmallSidebar';
import "../index.css"
import { FaBullseye, FaFacebookF, FaUserFriends } from 'react-icons/fa';
import { BsFillPeopleFill, BsFillPostcardFill } from 'react-icons/bs';
import axios from 'axios';
import { PostType, UserType } from '../static/types';
import { getAllUsers, getRelation } from '../slices/userSlice';
import { Link } from 'react-router-dom';
import ViewMiniProfile from '../components/ViewMiniProfile';
import Tippy from '@tippyjs/react/headless';
import Post from '../components/Post';
import Conversation from '../components/Conversation';
import Loading from '../components/Loading';


const Search = () => {
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("");
  const [pick, setPick] = useState(0);
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);
  const userNow = useSelector(getUser);
  const [findUser, setFindUser] = useState<UserType[] | []>([]);
  const [findPosts, setFindPosts] = useState([]);
  const relation = useSelector(getRelation);
  const allUsers = useSelector(getAllUsers);
  const [lastCmt, setLastCmt] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const showMess = useSelector(getShowMess);
  console.log("showMess", showMess);



  const fetchSearchData = async () => {
    try {
      const [findPostResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/posts/search/search?keyword=${searchQuery}`),
      ]);
      console.log(findPostResponse?.data.findPosts);
      setFindUser(allUsers?.filter((user: UserType) => (user.first_name.toLowerCase().includes(searchQuery) ||
        user.last_name.toLowerCase().includes(searchQuery)) && user.id !== userNow?.id));
      const filteredPosts = findPostResponse?.data.findPosts.filter((post: PostType) => {
        if (post.audience === 'public') {
          return true;
        } else if (post.audience === 'friends') {
          const isFriend = relation.some(
            (relationItem: UserType) =>
              relationItem.id === post.user_id
          );
          return isFriend;
        } else {
          return false;
        }
      });
      setFindPosts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchSearchData();
    setIsLoaded(true)
  }, [searchQuery])

  return (
    <div className='relative '>
      <Topbar userNow={userNow} />
      <div className="flex w-[100%] bg-fb-gray min-h-screen relative">
        <div className='w-[60px]'>
          <SmallSidebar userNow={userNow} />
        </div>
        <div className='flex flex-col w-1/4 content-box px-2 py-4 h-screen fixed top-[57px] left-[60px] bg-white'>
          <p className='text-2xl font-semibold '>Search results</p>
          <p className='text-fb-gray my-3'>
            <hr />
          </p>
          <p className='font-semibold my-2'>Filter</p>
          <span className={`font-semibold flex items-center gap-2 py-2 px-1 rounded-md my-1
           ${pick === 0 ? "bg-gray-100" : ""}`} onClick={() => setPick(0)}>
            <div className={`w-6 h-6 rounded-full p-[6px] flex items-center justify-center
            ${pick === 0 ? "bg-fb-blue " : "bg-fb-gray"}`}>
              <FaFacebookF size={20} style={{ color: pick === 0 ? "#ffffff" : "black" }} />
            </div>
            All
          </span>
          <span className={`font-semibold flex items-center gap-2 py-2 px-1 rounded-md my-1
           ${pick === 1 ? "bg-gray-100" : ""}`} onClick={() => setPick(1)}>
            <div className={`w-7 h-7 rounded-full p-[6px] flex items-center justify-center
            ${pick === 1 ? "bg-fb-blue " : "bg-fb-gray"}`}>
              <BsFillPostcardFill size={20} style={{ color: pick === 1 ? "#ffffff" : "black" }} />
            </div>
            Posts
          </span>
          <span className={`font-semibold flex items-center gap-2 py-2 px-1 rounded-md my-1
           ${pick === 2 ? "bg-gray-100" : ""}`} onClick={() => setPick(2)}>
            <div className={`w-7 h-7 rounded-full p-[6px] flex items-center justify-center
            ${pick === 2 ? "bg-fb-blue " : "bg-fb-gray"}`}>
              <BsFillPeopleFill size={20} style={{ color: pick === 2 ? "#ffffff" : "black" }} />
            </div>
            People
          </span>

        </div>
        {isLoaded
          ? <>
            {pick === 0
              ? (findPosts.length === 0 && findUser.length === 0)
                ? <span className='content-box bg-white flex ml-[calc(100vh*1/3+350px)] p-2 mt-3 gap-2 w-full mr-[200px] rounded-lg'>
                  There are no result that include <strong>{searchQuery}</strong>
                </span>
                : <div className='flex flex-col ml-[calc(100vh*1/3+350px)] mt-3 gap-2 w-full mr-[200px]'>
                  <div className='p-2 shadow-md rounded-md bg-white'>
                    <span className='font-semibold'>Search instead for
                      <span className='text-fb-blue'> {searchQuery}</span>
                    </span>
                  </div>
                  {findUser?.length > 0 && (
                    <div className="flex flex-col gap-2 p-2 shadow-md w-full rounded-md bg-white">
                      <span className="font-semibold">People</span>
                      <div className='flex flex-col gap-3'>
                        {findUser.map((user) => (
                          <div key={user?.id} className='flex gap-3 justify-between items-center'>
                            <div className='flex gap-4 items-start'>
                              <Tippy placement="bottom" interactive
                                render={attrs => (
                                  <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                                    {...attrs} >
                                    <ViewMiniProfile userView={user} />
                                  </div>)}>
                                <Link to={`/${user?.id}`}>
                                  <div className='w-16 h-16 rounded-full'>
                                    <img src={user?.avatar} alt="" className='w-16 h-16 rounded-full object-cover overflow-hidden' />
                                  </div>
                                </Link>
                              </Tippy >

                              <div className='flex flex-col'>
                                <Tippy placement="bottom" interactive
                                  render={attrs => (
                                    <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                                      {...attrs} >
                                      <ViewMiniProfile userView={user} />
                                    </div>)}>
                                  <Link to={`/${user?.id}`}>
                                    <span className="font-semibold">{user?.first_name} {user?.last_name}</span>
                                  </Link>
                                </Tippy >

                                {user?.highSchool && <span className=' text-fb-gray-text text-[13px]'>
                                  Studied at <strong>{user?.highSchool}</strong>
                                </span>}
                                {user?.job && <span className=' text-fb-gray-text text-[13px]'>
                                  Works at <strong>{user?.job}</strong>
                                </span>}
                                {user?.currentCity && <span className=' text-fb-gray-text text-[13px]'>
                                  Lives in <strong>{user?.currentCity}</strong>
                                </span>}

                              </div>
                            </div>
                            {relation?.filter((relation: UserType) => relation.id === user.id).length > 0
                              ? <div className='mr-3'>
                                <span className='bg-blue-100 p-2 rounded-md text-fb-blue text-[14px] font-semibold cursor-pointer'
                                  onClick={() => dispatch(setShowMess(user?.id))}>
                                  Message
                                </span>
                              </div>
                              : <div className='mr-3'>
                                <span className='bg-blue-100 p-2 rounded-md text-fb-blue text-[14px] font-semibold cursor-pointer'>
                                  Add friend
                                </span>
                              </div>}

                          </div>
                        ))}

                      </div>
                    </div>
                  )}

                  {findPosts?.map((post: PostType) => (
                    <div className="content-box bg-white border border-fb-gray rounded-lg my-1"
                      key={post.id}>
                      <Post lastCmt={lastCmt} post={post} />
                    </div>
                  ))}
                </div>
              : pick === 1
                ? findPosts.length > 0
                  ? <div className='flex flex-col ml-[calc(100vh*1/3+350px)] mt-3 gap-2 w-full mr-[200px]'>
                    {findPosts?.map((post: PostType) => (
                      <div className="content-box bg-white border border-fb-gray rounded-lg my-1"
                        key={post.id}>
                        <Post lastCmt={lastCmt} post={post} />
                      </div>
                    ))}
                  </div>
                  : <span className='content-box bg-white flex ml-[calc(100vh*1/3+350px)] p-2 mt-3 gap-2 w-full mr-[200px] rounded-lg'>
                    There are no posts that include <strong>{searchQuery}</strong>
                  </span>
                : pick === 2
                && findUser.length>0 
                ?<div className='flex flex-col ml-[calc(100vh*1/3+350px)] mt-3 gap-2 w-full mr-[200px]'>
                  {findUser?.length > 0 && (
                    <div className="flex flex-col gap-2 p-2 w-full rounded-md">
                      <div className='flex flex-col gap-3'>
                        {findUser.map((user) => (
                          <div key={user?.id} className='flex gap-3 justify-between items-center shadow-md bg-white p-2 rounded-md'>
                            <div className='flex gap-4 items-start'>
                              <Tippy placement="bottom" interactive
                                render={attrs => (
                                  <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                                    {...attrs} >
                                    <ViewMiniProfile userView={user} />
                                  </div>)}>
                                <Link to={`/${user?.id}`}>
                                  <div className='w-16 h-16 rounded-full'>
                                    <img src={user?.avatar} alt="" className='w-16 h-16 rounded-full object-cover overflow-hidden' />
                                  </div>
                                </Link>
                              </Tippy >

                              <div className='flex flex-col'>
                                <Tippy placement="bottom" interactive
                                  render={attrs => (
                                    <div className={`box py-1 px-2 h-fit rounded-lg text-xs`}
                                      {...attrs} >
                                      <ViewMiniProfile userView={user} />
                                    </div>)}>
                                  <Link to={`/${user?.id}`}>
                                    <span className="font-semibold">{user?.first_name} {user?.last_name}</span>
                                  </Link>
                                </Tippy >

                                {user?.highSchool && <span className=' text-fb-gray-text text-[13px]'>
                                  Studied at <strong>{user?.highSchool}</strong>
                                </span>}
                                {user?.job && <span className=' text-fb-gray-text text-[13px]'>
                                  Works at <strong>{user?.job}</strong>
                                </span>}
                                {user?.currentCity && <span className=' text-fb-gray-text text-[13px]'>
                                  Lives in <strong>{user?.currentCity}</strong>
                                </span>}

                              </div>
                            </div>
                            {relation?.filter((relation: UserType) => relation.id === user.id).length > 0
                              ? <div className='mr-3'>
                                <span className='bg-blue-100 p-2 rounded-md text-fb-blue text-[14px] font-semibold cursor-pointer'
                                  onClick={() => dispatch(setShowMess(user?.id))}>
                                  Message
                                </span>
                              </div>
                              : <div className='mr-3'>
                                <span className='bg-blue-100 p-2 rounded-md text-fb-blue text-[14px] font-semibold cursor-pointer'>
                                  Add friend
                                </span>
                              </div>}

                          </div>
                        ))}

                      </div>
                    </div>
                  )}

                </div>
                :<span className='content-box bg-white flex ml-[calc(100vh*1/3+350px)] p-2 mt-3 gap-2 w-full mr-[200px] rounded-lg'>
                There are no people's name that include <strong>{searchQuery}</strong>
              </span>}
          </>
          : <Loading />}


        {showMess > 0 && <div className="fixed bottom-0 right-16 "><Conversation /></div>}
      </div>
    </div>
  )
}

export default Search