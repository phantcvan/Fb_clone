import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import Topbar from "../components/Topbar";
// import { useNavigate } from "react-router-dom";
import { publicAxios } from "../static/myAxios";
import { setShowMess, getShowMess, getShowCmt } from "../slices/appSlice";
import { useSelector } from 'react-redux';
import Conversation from "../components/Conversation";
import Comment from "../components/Comment";




const Home = ({ setNewNotifications }: { setNewNotifications: React.Dispatch<React.SetStateAction<number>> }) => {
  const showMess = useSelector(getShowMess);
  const showCmt = useSelector(getShowCmt);

  console.log("showMess", showMess);

  // const result = publicAxios.get("/user")


  return (
    <div>
      <Topbar />
      <div className="flex w-[100%] relative">
        <Sidebar />
        <Feed />
        <SidebarRight />
      </div>
      {showMess > 0 && <Conversation />}
      {showCmt > 0 && <Comment />}
    </div>
  )
}

export default Home