import Slick from "./Stories";
import { FaBookOpen } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import "../index.css";
import { useState } from "react";
import CreatePost from "./CreatePost";

const Feed = () => {
    const [selectStory, setSelectStory] = useState(true);
    const [uploadPost, setUploadPost] = useState(true);

    return (
        <div className="flex flex-col w-[45%] pl-20 text-sm gap-3 text-[#1D1D1D] my-2">
            <div className="content-box w-full h-[275px] flex flex-col bg-white border border-fb-gray p-4 rounded-lg">
                <div className="flex gap-2">
                    <div className={`w-1/2 flex items-center justify-center ${selectStory && "border-b-[3px] border-fb-blue"} cursor-pointer gap-3 pb-2`}
                        onClick={() => setSelectStory(true)}>
                        <FaBookOpen size={22} style={{ color: "#1876F2" }} />
                        <span className={`${selectStory ? "text-fb-blue" : "text-fb-gray-text"}`}>Stories</span>
                    </div>
                    {/* <div className={`w-1/2 flex items-center justify-center ${!selectStory&&"border-b-[3px] border-fb-blue"} cursor-pointer gap-3 pb-2`}
                    onClick={()=>setSelectStory(false)}>
                        {selectStory
                            ? <BiSolidMoviePlay size={22} style={{ color:"#65676B"  }} />
                            : <BiSolidMoviePlay size={22} style={{ color: "#1876F2" }} />}
                        <span className={`${selectStory ? "text-fb-gray-text" : "text-fb-blue"}`}>Reels</span>
                    </div> */}
                </div>
                <Slick />
            </div>
            <div className="content-box w-full flex bg-white border border-fb-gray p-4 rounded-lg">
                <div>
                    <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                        className="w-10 h-10 rounded-full cursor-pointer object-cover mr-4" />
                </div>
                <div className="bg-fb-gray-light hover:bg-fb-gray w-full rounded-l-full rounded-r-full flex items-center"
                    onClick={() => setUploadPost(true)}>
                    <span className="ml-3 text-fb-gray-text text-[15px]">What's on your mind, USERNAME?</span>
                </div>
            </div>
            {uploadPost && <CreatePost setUploadPost={setUploadPost} />}
        </div>
    )
}

export default Feed