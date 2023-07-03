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
import { useEffect, useState } from "react";
import { UserType, Relation } from "../static/types"



const Home = ({ setNewNotifications }: { setNewNotifications: React.Dispatch<React.SetStateAction<number>> }) => {
  const showMess = useSelector(getShowMess);
  const showCmt = useSelector(getShowCmt);
  const userNow = useSelector(getUser);
  const allUsers = useSelector(getAllUsers);
  const relation = useSelector(getRelation);
  const dispatch = useDispatch();
  const [contact, setContact] = useState([]);
  const [lastRequest, setLastRequest] = useState([]);
  const [lastRequestId, setLastRequestId] = useState(0);

  console.log("showMess", showMess);
  // Hàm so sánh hai thời gian
  function compareDate(a: Relation, b: Relation) {
    return new Date(a.date_request).getTime() - new Date(b.date_request).getTime();
  }


  const fetchData = async () => {
    try {
      const [requestResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/relation/${userNow.id}`),
      ]);
      dispatch(setRelation(requestResponse.data.request));
      const friend = requestResponse?.data?.request?.filter((item: Relation) => item.relation_type === 2);
      const idsFromRelation = friend?.map((item: Relation) => [item.request_id, item.accept_id])
        .flat().filter((id: number) => id !== userNow.id);
      console.log("ids", idsFromRelation);
      setContact(allUsers.filter((user: UserType) => idsFromRelation.includes(user.id)));
      const filteredObjects = requestResponse.data.request.filter((item: Relation) => item.relation_type === 1 && item.accept_id === userNow.id);
      if (filteredObjects.length > 0) {
        const latestObject = filteredObjects.reduce((prev: Relation, current: Relation) => {
          return compareDate(prev, current) < 0 ? current : prev;
        });
        setLastRequestId(latestObject.id);
        const lastRequestUser = allUsers.find((user: UserType) => user.id === latestObject.request_id)
        setLastRequest(lastRequestUser);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])
  console.log(lastRequest);




  return (
    <div>
      <Topbar userNow={userNow} />
      <div className="flex w-[100%] relative Z-30">
        <Sidebar userNow={userNow} />
        <Feed userNow={userNow} allUsers={allUsers} relation={relation} />
        <SidebarRight userNow={userNow} contact={contact} lastRequest={lastRequest}
          lastRequestId={lastRequestId} />
        {showMess > 0 && <Conversation />}
        {showCmt > 0 && <Comment />}
      </div>
    </div>
  )
}

export default Home