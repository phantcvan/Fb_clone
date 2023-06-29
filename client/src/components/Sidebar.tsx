import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import { SideBarGroup, CategoryItems } from "../static/menu";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from "react-router-dom";
import { useState } from "react";

// import { Link } from "react-router-dom";

const Sidebar = () => {
    const [pick, setPick] = useState(1);
    return (
        <div className="flex basis-1/4 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D]">
            <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                <div className={`w-[100%] my-2`}>
                    <div className={`w-[100%] font-semibold `}>
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 ${pick === 1 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(1)}>
                            <Link to="/">
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <AiFillHome size={24} style={{ color: "#1A6ED8" }} />
                                    <span>Home</span>
                                </div>
                            </Link>
                        </div>
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 ${pick === 2 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(2)}>
                            <Link to="/user">
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <img src="http://localhost:5173/assets/person/1.jpeg" alt="avatar"
                                        className="w-6 h-6 rounded-full object-cover overflow-hidden " />
                                    <span>UserName</span>
                                </div>
                            </Link>
                        </div>

                        <hr className="text-fb-gray" />

                        {SideBarGroup.Group.map((item, index) => (
                            // <Link to={item.path} key={index}>
                            <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 
                            ${pick === (index + 3) ? "border-fb-blue" : "border-white"}`}
                                onClick={() => setPick(index + 3)} key={index}>
                                <Link to="/">
                                    <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                        <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                                            <img src={item.logoUrl} alt="" />
                                        </div>
                                        <span className="">{item.name}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        <div className={`hover:bg-fb-gray p-2 rounded-sm border-l-4 ${pick === 1 ? "border-fb-blue" : "border-white"}`}
                            onClick={() => setPick(1)}>
                            <Link to="/">
                                <div className="flex px-5 gap-4 cursor-pointer items-center ">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                        <HiUserGroup size={18} />
                                    </div>
                                    <span>See all groups</span>
                                </div>
                            </Link>
                        </div>


                    </div>
                    <div className="flex flex-wrap gap-1 px-5 mt-2">
                        {CategoryItems.map((item, index) => (
                            <div key={index}
                                className={`text-xs items-center cursor-pointer text-fb-gray-text cursor-pointer`}
                            >
                                {index === CategoryItems.length - 1
                                    ? <span className="">{item}</span>
                                    : <span className="">{item} · </span>}

                            </div>
                        ))}
                    </div>
                </div>
            </Scrollbars>

        </div>
    )
}

export default Sidebar