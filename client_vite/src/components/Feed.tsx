import Slick from "./Stories";
import { FaBookOpen } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import "../index.css";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useState } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

const Feed = () => {
    const [selectStory, setSelectStory] = useState(true);
    const [uploadPost, setUploadPost] = useState(false);

    return (
        <div className="flex flex-col w-[45%] pl-20 text-sm gap-3 text-[#1D1D1D] my-2">
            <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden", }}>
                <>
                    <div className="content-box w-full h-[275px] flex flex-col my-3 bg-white border p-4
                     border-fb-gray rounded-lg">
                        <div className="flex gap-2">
                            <div className={`w-1/2 flex items-center justify-center cursor-pointer
                             ${selectStory && "border-b-[3px] border-fb-blue"} gap-3 pb-2`}
                                onClick={() => setSelectStory(true)}>
                                {selectStory
                                    ? <FaBookOpen size={22} style={{ color: "#1876F2" }} />
                                    : <FaBookOpen size={22} style={{ color: "#65676B" }} />}

                                <span className={`${selectStory ? "text-fb-blue" : "text-fb-gray-text"}`}>Stories</span>
                            </div>
                            <div className={`w-1/2 flex items-center justify-center ${!selectStory && "border-b-[3px] border-fb-blue"} cursor-pointer gap-3 pb-2`}
                                onClick={() => setSelectStory(false)}>
                                {selectStory
                                    ? <BiSolidMoviePlay size={22} style={{ color: "#65676B" }} />
                                    : <BiSolidMoviePlay size={22} style={{ color: "#1876F2" }} />}
                                <span className={`${selectStory ? "text-fb-gray-text" : "text-fb-blue"}`}>Reels</span>
                            </div>
                        </div>
                        <Slick />
                    </div>
                    <div className="content-box w-full flex bg-white border border-fb-gray p-4 rounded-lg my-3">
                        <div>
                            <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                                className="w-10 h-10 rounded-full cursor-pointer object-cover mr-4" />
                        </div>
                        <div className="bg-gray-100 hover:bg-fb-gray w-full rounded-l-full rounded-r-full flex items-center"
                            onClick={() => setUploadPost(true)}>
                            <span className="ml-3 text-fb-gray-text text-[15px]">What's on your mind, USERNAME?</span>
                        </div>
                    </div>
                    <div className="content-box bg-white border border-fb-gray rounded-lg my-3">
                        <Post />
                    </div>
                    <div className="content-box bg-white border border-fb-gray rounded-lg my-3">
                        <Post />
                    </div>
                </>
            </Scrollbars>

            {uploadPost && <CreatePost setUploadPost={setUploadPost} />}
        </div>
    )
}

export default Feed