import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import { Link } from "react-router-dom";



const Topbar = () => {


    return (
        <div className="h-[50px] w-[100%] flex items-center sticky top-0 shadow-md py-7 z-30 bg-white">
            <div className="flex basis-1/4 ml-4">
            <Link to="/">
                <img src="http://localhost:5173/assets/facebook-logo.png"
                    className="w-[141px] h-[37px] cursor-pointer object-cover" />
            </Link>
            </div>
            <div className="flex flex-1 items-center">
                <div className="w-[100%] h-10 py-2 text-fb-gray-text bg-fb-gray-light hover:bg-fb-gray rounded-l-full rounded-r-full flex items-center">
                    <div className="cursor-pointer mx-1 px-2">
                        <HiMagnifyingGlass size={18} />
                    </div>
                    <input type="text"
                        placeholder="Search for friend, post or video... "
                        className="border-none outline-none bg-fb-gray-light h-10 ml-2 w-[100%] pl-2 rounded-r-full hover:bg-fb-gray" />
                </div>
            </div>
            <div className="flex basis-1/4 text-red-500 flex-row items-center justify-end mr-4">
                {/* <div>
                    <span>Homepage</span>
                    <span>Timeline</span>
                </div> */}
                <div className="flex flex-row">
                    <div className="w-10 h-10 flex flex-row items-center justify-center rounded-full mr-4 cursor-pointer relative bg-fb-gray-light hover:bg-fb-gray">
                        <BsMessenger size={18}/>
                        <span className="w-4 h-4 text-xs text-center bg-red rounded-full text-white absolute top-[-5px] right-[-2px]">1</span>
                    </div>
                    <div className="w-10 h-10 flex flex-row items-center justify-center rounded-full mr-4 cursor-pointer relative bg-fb-gray-light hover:bg-fb-gray">
                        <MdNotifications size={24}/>
                        <span className="w-4 h-4 text-xs text-center bg-red rounded-full text-white absolute top-[-5px] right-[-2px]">1</span>
                    </div>
                </div>
                <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                    className="w-10 h-10 rounded-full cursor-pointer object-cover" />
            </div>
        </div>
    )
}

export default Topbar