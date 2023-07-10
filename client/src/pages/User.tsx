import Topbar from '../components/Topbar'
import SmallSidebar from '../components/SmallSidebar';
import { setShowMess, getShowMess, getShowCmt } from "../slices/appSlice";
import { getUser } from "../slices/whitelist";
import { useDispatch, useSelector } from 'react-redux';
import Conversation from '../components/Conversation';
import Comment from '../components/Comment';
import HeaderUser from '../components/HeaderUser';
import Introduction from '../components/Introduction';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import { PostType, Relation, UserType } from "../static/types"
import UserPhoto from '../components/UserPhoto';
import { CategoryItems } from "../static/menu";
import MainUserPage from '../components/MainUserPage';
import Scrollbars from 'react-custom-scrollbars-2';
import Loading from '../components/Loading';
import EditPost from '../components/EditPost';
import DeletePost from '../components/DeletePost';
import { getActionPost, getEditPostId } from '../slices/postSlice';
import { getAllUsers, setRelation } from '../slices/userSlice';
import EditProfile from '../components/EditProfile/EditProfile';


const User = () => {
  const showMess = useSelector(getShowMess);
  const showCmt = useSelector(getShowCmt);
  const userNow = useSelector(getUser);
  const [uploadPost, setUploadPost] = useState(false);
  const { userId } = useParams();
  const pageId = Number(userId)//id của page
  const [pageNow, setPageNow] = useState<UserType | null>(null);
  const [relationship, setRelationship] = useState<UserType | null>(null);
  const [isFriend, setIsFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const action = useSelector(getActionPost);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const editPostId = useSelector(getEditPostId);
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const [isEdited, setIsEdited] = useState(false);
  const [edited, setEdited] = useState(false);
  const [editedPost, setEditedPost] = useState<PostType | []>([]);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(false);




  const fetchDataUser = async () => {
    try {
      const [userResponse, listFriendsResponse, checkFriendResponse, postResponse, relationResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/users/${pageId}`),
        axios.get(`http://localhost:8000/api/v1/relation/friends/${pageId}`),
        axios.post(`http://localhost:8000/api/v1/relation/isFriend`, {
          userId1: pageId,
          userId2: userNow?.id,
        }),
        axios.get(`http://localhost:8000/api/v1/posts/loadPostsBelongToUser/${pageId}`),
        axios.get(`http://localhost:8000/api/v1/relation/${userNow.id}`),

      ]);
      const friend = relationResponse?.data?.request?.filter((item: Relation) => item.status === 2);
      const idsFromRelation = friend?.map((item: Relation) => [item.request_id, item.accept_id])
        .flat().filter((id: number) => id !== userNow.id);
      dispatch(setRelation(allUsers?.filter((user: UserType) => idsFromRelation.includes(user.id))));
      setPageNow(userResponse?.data?.user[0]);
      setFriends(listFriendsResponse?.data?.friends);
      setIsLoaded(true);
      if (pageId !== userNow?.id) {
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
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchDataUser();
  }, [userId, userNow, isDeleted, isEdited, editedProfile]);
  useEffect(() => {
    if (isDeleted && editPostId !== 0) {
      setDeleted(pre => !pre)
    }
  }, [isDeleted])

  useEffect(() => {
    if (isEdited && editPostId !== 0) {
      setEdited(true);
    }
  }, [isEdited])
  // console.log("isEdited",isEdited);


  return (
    <div className='bg-white relative'>
      <Topbar userNow={userNow} />
      {isLoaded
        ? <div className="flex w-[100%] bg-white">
          <SmallSidebar userNow={userNow} />
          <div className='flex flex-col'>
            <HeaderUser pageNow={pageNow} friends={friends} isFriend={isFriend} setIsEditProfile={setIsEditProfile} />
            <div className="bg-gray-100 relative ml-[60px] w-full">
              <div className="flex ml-[170px] mx-auto pt-5 ">
                <div className=" w-[360px] mt-3 h-fit top-[60px] bottom-0 left-0 inset-0 sticky">
                  <div className=" shadow-lg border border-gray-100 bg-white p-3 rounded-xl w-full">
                    <Introduction pageNow={pageNow} relationship={relationship} />
                  </div>
                  <div className="h-fit mt-5 shadow-lg border border-gray-100 bg-white p-3 rounded-xl w-full">
                    <UserPhoto posts={posts} />
                  </div>
                  <div className="flex flex-wrap gap-1 px-5 mt-5">
                    {CategoryItems.map((item, index) => (
                      <div key={index}
                        className={`text-xs items-center text-fb-gray-text cursor-pointer`}
                      >
                        {index === CategoryItems.length - 1
                          ? <span className="">{item}</span>
                          : <span className="">{item} · </span>}
                      </div>
                    ))}
                  </div>


                </div>
                <div className="flex-1 ml-3 flex flex-col mr-16 pb-2">
                  <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                    <MainUserPage pageNow={pageNow} posts={posts} isLoaded={isLoaded} deleted={deleted}
                      setIsLoaded={setIsLoaded} edited={edited} />
                  </Scrollbars >
                </div>
              </div>
            </div>
          </div>
        </div>
        : <div className='absolute top-[260px] bottom-0 left-0 right-0 z-20 flex items-center justify-center'>
          <Loading />
        </div>
      }
      {showMess > 0 && <Conversation />}
      {showCmt > 0 && <Comment />}
      {action === 1
        ? <EditPost setIsEdited={setIsEdited} setEditedPost={setEditedPost} isEdited={isEdited} />
        : action === 2
        && <DeletePost setIsDeleted={setIsDeleted} setIsLoaded={setIsLoaded} />}
      {isEditProfile && <EditProfile setIsEditProfile={setIsEditProfile} setEditedProfile={setEditedProfile}/>}
    </div>
  )
}

export default User