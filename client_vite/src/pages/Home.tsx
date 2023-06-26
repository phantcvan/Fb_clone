import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import Topbar from "../components/Topbar";
// import { getUser } from "../slices/userSlice";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';



const Home = ({ setNewNotifications }: { setNewNotifications: React.Dispatch<React.SetStateAction<number>> }) => {
  // const user = useSelector(getUser);



  return (
    <div>
      <Topbar />
      <div className="flex w-[100%]">
        <Sidebar />
        <Feed />
        <SidebarRight />
      </div>

    </div>
  )
}

export default Home