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
import { getGoHome, getHadNew, setHadNew } from "../slices/appSlice";
import { useLocation, useNavigate } from "react-router";
import Loading from "./Loading";
import { getAllPosts, getCreatedPost, getEditPostId, setAllPosts } from "../slices/postSlice";
import { getUser } from "../slices/whitelist";



interface FeedProps {
    posts: PostType[];
    isLoaded: boolean;
    deleted: boolean;
    setIsLoaded:React.Dispatch<React.SetStateAction<boolean>>;
}
const Feed = ({ posts, isLoaded, deleted, setIsLoaded}: FeedProps) => {
    const userNow = useSelector(getUser);
    const [selectStory, setSelectStory] = useState(true);
    const [uploadPost, setUploadPost] = useState(false);
    const [lastCmt, setLastCmt] = useState(true);
    const [updatedPosts, setUpdatedPosts] = useState<PostType[]>([]);
    const goHome = useSelector(getGoHome);
    const [newPost, setNewPost] = useState<PostType | null>(null);
    const editPostId = useSelector(getEditPostId);
    const [upperCmt, setUpperCmt] = useState(true);




    // chuyển về đầu trang khi biến goHome thay đổi
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [goHome])
    useEffect(() => {
        if (editPostId) {
            if (newPost?.id === editPostId) setNewPost(null)
            // else {
                setUpdatedPosts(posts?.filter((post) => post.id !== editPostId));
            // }
            setIsLoaded(true);
            console.log("123", updatedPosts);

        }
    }, [deleted])
    const left = 0;

    return (
        <div className="flex flex-col mt-3 w-[45%] pl-20 text-sm gap-1 text-[#1D1D1D]" >
            {isLoaded
                ?
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
                    {newPost
                        && <div className="content-box bg-white border border-fb-gray rounded-lg my-2">
                            <Post lastCmt={lastCmt} post={newPost} upperCmt={upperCmt} />
                        </div>}
                    {deleted
                        ? <div>
                            {updatedPosts?.map((post: PostType) => (
                                <div className="content-box bg-white border border-fb-gray rounded-lg my-2"
                                    key={post.id}>
                                    <Post lastCmt={lastCmt} post={post} upperCmt={upperCmt} />
                                </div>
                            ))}
                        </div>
                        : <div>
                            {posts?.map((post: PostType) => (
                                <div className="content-box bg-white border border-fb-gray rounded-lg my-2"
                                    key={post.id}>
                                    <Post lastCmt={lastCmt} post={post} upperCmt={upperCmt} />
                                </div>
                            ))}
                        </div>
                    }

                </>
                : <div className='absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center'>
                    <Loading />
                </div>

                // <div className="mt-5 w-[200px] h-[200px] flex items-center justify-center">
                //     <img src="/assets/loading.gif" alt="Loading" 
                //      className="w-[200px] flex items-center justify-center"/>
                // </div>
            }
            {/* </Scrollbars> */}

            {uploadPost && <CreatePost setUploadPost={setUploadPost} userNow={userNow} left={left}
                setNewPost={setNewPost} />}
        </div>
    )
}

export default Feed