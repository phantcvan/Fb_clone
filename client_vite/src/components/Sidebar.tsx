import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import { SideBarGroup } from "../static/menu";
// import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex basis-1/4 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D] pr-32">
            <div className="px-5 w-[100%] my-2">
                <div className="w-[100%] font-semibold">
                    <div className="flex gap-2 my-3 cursor-pointer">
                        <AiFillHome size={20} style={{ color: "#1A6ED8" }} />
                        <span>Home</span>
                    </div>
                    <div className="flex gap-2 my-3 cursor-pointer">
                        <img src="http://localhost:5173/assets/person/1.jpeg" alt="avatar"
                            className="w-5 h-5 rounded-full object-cover overflow-hidden " />
                        <span>UserName</span>
                    </div>
                    <hr className="text-fb-gray" />

                    {SideBarGroup.Group.map((item, index) => (
                        // <Link to={item.path} key={index}>
                        <div  key={index}
                            className={`flex gap-2 my-3 items-center cursor-pointer` }
                        >
                            <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                                <img src={item.logoUrl} alt="" />
                            </div>
                            <span className="">{item.name}</span>
                        </div>
                        // </Link>
                    ))}
                    <div className="flex gap-2 my-3 cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-fb-gray-light flex items-center justify-center">
                        <HiUserGroup size={14} />
                        </div>
                        <span>See all groups</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Sidebar