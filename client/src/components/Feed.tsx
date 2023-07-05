import Slick from "./Stories";
import { FaBookOpen } from "react-icons/fa";
import { BiSolidMoviePlay } from "react-icons/bi";
import "../index.css";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useState, useEffect, useRef, useImperativeHandle } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { UserType, Relation, PostType } from "../static/types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGoHome } from "../slices/appSlice";
import { useLocation } from "react-router";



interface FeedProps {
    userNow: UserType;
    allUsers: UserType[];
    relation: Relation[];
    contactListId: number[];
}
const Feed = ({ userNow, allUsers, relation, contactListId }: FeedProps) => {
    const [selectStory, setSelectStory] = useState(true);
    const [uploadPost, setUploadPost] = useState(false);
    const [lastCmt, setLastCmt] = useState(true);
    const [posts, setPosts] = useState<PostType[]>([]);
    const goHome=useSelector(getGoHome)

    const fetchPosts = async () => {
        try {
            if (userNow) {
                const [postResponse] = await Promise.all([
                    axios.get(`http://localhost:8000/api/v1/posts`)
                ]);
                console.log(postResponse?.data?.posts);
                setPosts((prevPosts) => [...prevPosts, ...postResponse?.data?.posts.filter((post: PostType) => {
                    if (post.audience === 'public') {
                        return true; // Bài viết công khai luôn được lấy
                    } else if (post.audience === 'friends') {
                        return contactListId.includes(post.user_id); // Kiểm tra xem user_id có trong FriendId không
                    } else {
                        return false; // Không lấy bài viết chỉ mình tôi
                    }
                })
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);

// chuyển về đầu trang khi biến goHome thay đổi
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [goHome])





    return (
        <div className="flex flex-col w-[45%] pl-20 text-sm gap-1 text-[#1D1D1D]" >
            {/* <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden"}} > */}
                <>
                    <div className="content-box w-full h-[275px] flex flex-col my-1 bg-white border p-4
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
                            <div className={`w-1/2 flex items-center justify-center cursor-pointer gap-3 pb-2
                            ${!selectStory && "border-b-[3px] border-fb-blue"}`}
                                onClick={() => setSelectStory(false)}>
                                {selectStory
                                    ? <BiSolidMoviePlay size={22} style={{ color: "#65676B" }} />
                                    : <BiSolidMoviePlay size={22} style={{ color: "#1876F2" }} />}
                                <span className={`${selectStory ? "text-fb-gray-text" : "text-fb-blue"}`}>Reels</span>
                            </div>
                        </div>
                        <Slick userNow={userNow} />
                    </div>
                    <div className="content-box w-full flex bg-white border border-fb-gray p-4 rounded-lg my-1">
                        <div>
                            <img src={userNow.avatar} alt=""
                                className="w-10 h-10 rounded-full cursor-pointer object-cover mr-4" />
                        </div>
                        <div className="bg-gray-100 hover:bg-fb-gray w-full rounded-l-full rounded-r-full flex items-center"
                            onClick={() => setUploadPost(true)}>
                            <span className="ml-3 text-fb-gray-text text-[15px]">What's on your mind, {userNow.first_name}?</span>
                        </div>
                    </div>
                    {posts.map((post) => (
                        <div className="content-box bg-white border border-fb-gray rounded-lg my-1"
                            key={post.id}>
                            <Post lastCmt={lastCmt} post={post} />
                        </div>
                    ))}
                    {/* <div className="content-box bg-white border border-fb-gray rounded-lg my-2">
                        <Post lastCmt={lastCmt} />
                    </div>
                    <div className="content-box bg-white border border-fb-gray rounded-lg my-2">
                        <Post lastCmt={lastCmt} />
                    </div> */}
                </>
            {/* </Scrollbars> */}

            {uploadPost && <CreatePost setUploadPost={setUploadPost} userNow={userNow} />}
        </div>
    )
}

export default Feed