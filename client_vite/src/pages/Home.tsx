import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import Topbar from "../components/Topbar";


const Home = () => {
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