import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import Topbar from "../components/Topbar";
// import { useNavigate } from "react-router-dom";
import { setShowMess, getShowMess, getShowCmt, setGoHome } from "../slices/appSlice";
import { getUser, setUser } from "../slices/whitelist";
import { getAllUsers, setAllUsers, setRelation, getRelation, getNotification, setNotification } from "../slices/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import Conversation from "../components/Conversation";
import Comment from "../components/Comment";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { UserType, Relation, PostType } from "../static/types"
import { useLocation } from "react-router";
import { getActionPost, getEditPostId } from "../slices/postSlice";
import EditPost from "../components/EditPost";
import DeletePost from "../components/DeletePost";



const Home = () => {
  const showMess = useSelector(getShowMess);
  const showCmt = useSelector(getShowCmt);
  const userNow = useSelector(getUser);
  const allUsers = useSelector(getAllUsers);
  const relation = useSelector(getRelation);
  const dispatch = useDispatch();
  const [contact, setContact] = useState([]); //danh sách bạn bè
  const [contactListId, setContactListId] = useState([]); //danh sách id bạn bè
  const [lastRequest, setLastRequest] = useState<Relation | null>(null);
  const [lastRequestUser, setLastRequestUser] = useState<UserType | null>(null);
  const [mutualCount, setMutualCount] = useState(0);
  const notification = useSelector(getNotification);
  const action: number = useSelector(getActionPost);
  // const [isEdited, setIsEdited] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [start, setStart] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [edited, setEdited] = useState(false);
  const editPostId = useSelector(getEditPostId);




  const updateTitle = () => {
    if (notification > 0) {
      document.title = `(${notification}) Clone Facebook`;
    } else {
      document.title = "Clone Facebook";
    }
  };


  // Hàm so sánh hai thời gian
  function compareDate(a: Relation, b: Relation) {
    return new Date(a.date_request).getTime() - new Date(b.date_request).getTime();
  }


  const fetchData = async () => {
    try {
      const [requestResponse, postResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/relation/${userNow.id}`),
        axios.post(`http://localhost:8000/api/v1/posts/loadAll/${userNow.id}`, {
          start,
        })
      ]);
      setPosts((prevPosts: PostType[]) => [...prevPosts, ...postResponse?.data?.posts.
        filter((post: PostType) => post.user_id !== userNow.id)]);

      setIsLoaded(true);

      const friend = requestResponse?.data?.request?.filter((item: Relation) => item.status === 2);
      const idsFromRelation = friend?.map((item: Relation) => [item.request_id, item.accept_id])
        .flat().filter((id: number) => id !== userNow.id);
      setContactListId(idsFromRelation);
      // console.log("ids", idsFromRelation);
      setContact(allUsers?.filter((user: UserType) => idsFromRelation.includes(user.id)));
      dispatch(setRelation(allUsers?.filter((user: UserType) => idsFromRelation.includes(user.id))));
      const filteredObjects = requestResponse?.data?.request?.filter((item: Relation) => item.status === 1 && item.accept_id === userNow.id);
      if (filteredObjects.length > 0) {
        const latestObject = filteredObjects.reduce((prev: Relation, current: Relation) => {
          return compareDate(prev, current) < 0 ? current : prev;
        });
        setLastRequest(latestObject);
        const lastRequestUser = allUsers?.find((user: UserType) => user.id === latestObject?.request_id)
        setLastRequestUser(lastRequestUser);
        try {
          const [mutualResponse] = await Promise.all([
            axios.post(`http://localhost:8000/api/v1/relation/mutual-relations`, {
              user1: userNow.id,
              user2: lastRequestUser?.id
            })
          ])
          setMutualCount(mutualResponse?.data?.mutual.length)
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setStart((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDeleted]);

  useEffect(() => {
    if (userNow) {
      fetchData()
      updateTitle();
    }
  }, [start])
  useEffect(() => {
    if (isDeleted && editPostId!==0) {
      setDeleted(pre=>!pre)
    }
  }, [isDeleted])





  return (
    <div>
      <Topbar userNow={userNow} />
      <div className="flex w-[100%] relative">
        <Sidebar userNow={userNow} />
        <Feed posts={posts} isLoaded={isLoaded} deleted={deleted} setIsLoaded={setIsLoaded}
        />
        <SidebarRight userNow={userNow} contact={contact} lastRequestUser={lastRequestUser}
          lastRequest={lastRequest} mutualCount={mutualCount} />
        {showMess > 0 && <div className="fixed bottom-0 right-16 "><Conversation /></div>}
        {showCmt > 0 && <Comment />}
        {/* {action === 1
          ? <EditPost setIsEdited={setIsEdited} />
          : action === 2
          && <DeletePost setIsDeleted={setIsDeleted} setIsLoaded={setIsLoaded}/>} */}
      </div>
    </div>
  )
}

export default Home