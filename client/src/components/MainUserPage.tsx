import { useSelector } from 'react-redux';
import Post from './Post';
import { useState, useEffect } from "react";
import { getUser } from "../slices/whitelist";
import CreatePost from './CreatePost';
import { useParams } from 'react-router';
import { UserType, PostType } from "../static/types"
import axios from 'axios';


interface MainProp {
  pageNow: UserType | null;
  posts: PostType[];
}

const MainUserPage = ({ pageNow, posts }: MainProp) => {
  const userNow = useSelector(getUser);
  const [uploadPost, setUploadPost] = useState(false);
  const { userId } = useParams();
  const pageId = Number(userId);
  const [lastCmt, setLastCmt] = useState(true);
  const left = -300;
  const [newPost, setNewPost] = useState<PostType | null>(null);
  console.log(pageNow);
  


  return (
    <div className=' mr-40'>
      <div className="content-box w-full flex bg-white border border-fb-gray p-4 rounded-lg my-3">
        <div>
          <img src={userNow.avatar} alt=""
            className="w-10 h-10 rounded-full cursor-pointer object-cover mr-4" />
        </div>
        <div className="bg-gray-100 hover:bg-fb-gray w-full rounded-l-full rounded-r-full flex items-center"
          onClick={() => setUploadPost(true)}>
          {userNow?.id === pageId
            ? <span className="ml-3 text-fb-gray-text text-[15px]">What's on your mind, {userNow?.last_name}?</span>
            : <span className="ml-3 text-fb-gray-text text-[15px]">Write something to {pageNow?.last_name}...</span>}

        </div>
      </div>
      {newPost
        && <div className="content-box bg-white border border-fb-gray rounded-lg my-1">
          <Post lastCmt={lastCmt} post={newPost} />
        </div>}
      {posts?.map((post) => (
        <div className="content-box bg-white border border-fb-gray rounded-lg my-3" key={post?.id}>
          <Post lastCmt={lastCmt} post={post} />
        </div>
      ))}


      {uploadPost && <CreatePost setUploadPost={setUploadPost} userNow={userNow} left={left}
        setNewPost={setNewPost} />}
    </div>
  )
}

export default MainUserPage