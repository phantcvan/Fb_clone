import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import Topbar from "../components/Topbar";
// import { useNavigate } from "react-router-dom";
import { setShowMess, getShowMess, getShowCmt } from "../slices/appSlice";
import { getUser, setUser } from "../slices/whitelist";
import { getAllUsers, setAllUsers, setRelation, getRelation } from "../slices/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import Conversation from "../components/Conversation";
import Comment from "../components/Comment";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { UserType, Relation } from "../static/types"
import { useLocation } from "react-router";



const Home = ({ setNewNotifications }: { setNewNotifications: React.Dispatch<React.SetStateAction<number>> }) => {
  const showMess = useSelector(getShowMess);
  const showCmt = useSelector(getShowCmt);
  const userNow = useSelector(getUser);
  const allUsers = useSelector(getAllUsers);
  const relation = useSelector(getRelation);
  const dispatch = useDispatch();
  const [contact, setContact] = useState([]); //danh sách bạn bè
  const [contactListId, setContactListId] = useState([]); //danh sách id bạn bè
  const [lastRequest, setLastRequest] = useState<UserType | null>(null);
  const [lastRequestId, setLastRequestId] = useState(0);
  const [mutualCount, setMutualCount] = useState(0);



  // console.log("showMess", showMess);
  // Hàm so sánh hai thời gian
  function compareDate(a: Relation, b: Relation) {
    return new Date(a.date_request).getTime() - new Date(b.date_request).getTime();
  }

  // console.log("user",userNow);

  const fetchData = async () => {
    try {
      const [requestResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/relation/${userNow.id}`),
      ]);
      dispatch(setRelation(requestResponse.data.request));
      const friend = requestResponse?.data?.request?.filter((item: Relation) => item.status === 2);
      const idsFromRelation = friend?.map((item: Relation) => [item.request_id, item.accept_id])
        .flat().filter((id: number) => id !== userNow.id);
      setContactListId(idsFromRelation);
      // console.log("ids", idsFromRelation);
      setContact(allUsers?.filter((user: UserType) => idsFromRelation.includes(user.id)));
      const filteredObjects = requestResponse?.data?.request?.filter((item: Relation) => item.status === 1 && item.accept_id === userNow.id);
      if (filteredObjects.length > 0) {
        const latestObject = filteredObjects.reduce((prev: Relation, current: Relation) => {
          return compareDate(prev, current) < 0 ? current : prev;
        });
        setLastRequestId(latestObject.id);
        const lastRequestUser = allUsers.find((user: UserType) => user.id === latestObject.request_id)
        setLastRequest(lastRequestUser);
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
  useEffect(() => {
    if (userNow) fetchData()
  }, [userNow])
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0)
  }, [location.pathname])



  return (
    <div>
      <Topbar userNow={userNow} />
      <div className="flex w-[100%] relative">
        <Sidebar userNow={userNow} />
        <Feed userNow={userNow} allUsers={allUsers} relation={relation} contactListId={contactListId} 
        />
        <SidebarRight userNow={userNow} contact={contact} lastRequest={lastRequest}
          lastRequestId={lastRequestId} mutualCount={mutualCount} />
        {showMess > 0 && <Conversation />}
        {showCmt > 0 && <Comment />}
      </div>
    </div>
  )
}

export default Home