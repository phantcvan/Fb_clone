import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import { SideBarGroup } from "../static/menu";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex basis-1/4 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D]">
            <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                <div className="px-5 w-[100%] my-2">
                    <div className="w-[100%] font-semibold">
                        <Link to="/">
                            <div className="flex gap-4 my-5 cursor-pointer items-center">
                                <AiFillHome size={24} style={{ color: "#1A6ED8" }} />
                                <span>Home</span>
                            </div>
                        </Link>
                        <div className="flex gap-4 my-5 cursor-pointer items-center">
                            <img src="http://localhost:5173/assets/person/1.jpeg" alt="avatar"
                                className="w-6 h-6 rounded-full object-cover overflow-hidden " />
                            <span>UserName</span>
                        </div>
                        <hr className="text-fb-gray" />

                        {SideBarGroup.Group.map((item, index) => (
                            // <Link to={item.path} key={index}>
                            <div key={index}
                                className={`flex gap-4 my-5 items-center cursor-pointer`}
                            >
                                <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                                    <img src={item.logoUrl} alt="" />
                                </div>
                                <span className="">{item.name}</span>
                            </div>
                            // </Link>
                        ))}
                        <div className="flex gap-4 my-5 cursor-pointer items-center">
                            <div className="w-6 h-6 rounded-full bg-fb-gray-light flex items-center justify-center">
                                <HiUserGroup size={18} />
                            </div>
                            <span>See all groups</span>
                        </div>

                    </div>

                </div>
            </Scrollbars>

        </div>
    )
}

export default Sidebar