import { useSelector } from 'react-redux';
import Post from './Post';
import { useState, useEffect } from "react";
import { getUser } from "../slices/whitelist";
import CreatePost from './CreatePost';
import { useParams } from 'react-router';
import { UserType, PostType } from "../static/types"
import axios from 'axios';
import { getEditPostId } from '../slices/postSlice';
import Loading from './Loading';


interface MainProp {
  pageNow: UserType | null;
  posts: PostType[];
  isLoaded: boolean;
  deleted: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  edited: boolean;
  setEdited: React.Dispatch<React.SetStateAction<boolean>>
}

const MainUserPage = ({ pageNow, posts, isLoaded, deleted, setIsLoaded, edited, setEdited }: MainProp) => {
  const userNow = useSelector(getUser);
  const [uploadPost, setUploadPost] = useState(false);
  const { userId } = useParams();
  const pageId = Number(userId);
  const [lastCmt, setLastCmt] = useState(true);
  const left = -300;
  const [newPost, setNewPost] = useState<PostType | null>(null);
  const editPostId = useSelector(getEditPostId);
  const [updatedPosts, setUpdatedPosts] = useState<PostType[]>([]);
  const [editedPost, setEditedPost] = useState<PostType | {}>({});
  const [upperCmt, setUpperCmt] = useState(true);




  useEffect(() => {
    if (editPostId) {
      if (newPost?.id === editPostId) setNewPost(null)
      setUpdatedPosts(posts?.filter((post) => post.id !== editPostId));
      setIsLoaded(true);
    }
  }, [deleted])
  const fetchData = async () => {
    try {
      const [updatePostsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/posts/loadPostsBelongToUser/${userNow.id}`)
      ]);
      setUpdatedPosts(updatePostsResponse?.data?.posts);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }
  console.log("edited MAIN", edited);
  // console.log("updatedPosts", updatedPosts);

  useEffect(() => {
    // if (editPostId) {
    fetchData();
    setIsLoaded(true);
    // }
  }, [edited, editPostId]);

  return (
    <div className=' mr-40'>
      {isLoaded
        ? <div className='mt-3'>
          {userNow?.id === pageId
            && <div className="content-box w-full flex bg-white border border-fb-gray p-4 rounded-lg my-3">
              <div>
                <img src={userNow.avatar} alt=""
                  className="w-10 h-10 rounded-full cursor-pointer object-cover mr-4" />
              </div>
              <div className="bg-gray-100 hover:bg-fb-gray w-full rounded-l-full rounded-r-full flex items-center"
                onClick={() => setUploadPost(true)}>
                <span className="ml-3 text-fb-gray-text text-[15px]">What's on your mind, {userNow?.last_name}?</span>
              </div>
            </div>}
          {newPost
            && <div className="content-box bg-white border border-fb-gray rounded-lg my-1">
              <Post post={newPost} upperCmt={upperCmt} />
            </div>}
          {(deleted || edited)
            ? <div>
              {updatedPosts?.map((post: PostType) => (
                <div className="content-box bg-white border border-fb-gray rounded-lg my-1"
                  key={post.id}>
                  <Post post={post} upperCmt={upperCmt} />
                </div>
              ))}
            </div>
            : <div>
              {posts?.map((post: PostType) => (
                <div className="content-box bg-white border border-fb-gray rounded-lg my-3"
                  key={post.id}>
                  <Post post={post} upperCmt={upperCmt} />
                </div>
              ))}
            </div>
          }

        </div>
        : <div className='absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center'>
          <Loading />
        </div>}


      {uploadPost && <CreatePost setUploadPost={setUploadPost} userNow={userNow} left={left}
        setNewPost={setNewPost} />}
    </div>
  )
}

export default MainUserPage