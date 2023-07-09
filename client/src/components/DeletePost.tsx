import "../index.css";
import { useDispatch, useSelector } from 'react-redux';
import { getEditPostId, setActionPost } from '../slices/postSlice';
import { AiOutlineClose } from 'react-icons/ai';
import axios from "axios";
import { getHadNew, setHadNew } from "../slices/appSlice";

interface DeletePost {
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeletePost = ({ setIsDeleted, setIsLoaded }: DeletePost) => {
  const editPostId = useSelector(getEditPostId);
  console.log("editPostId", editPostId);
  // const hadNew= useSelector(getHadNew)+1;

  const dispatch = useDispatch();
  const handleDeletePost = async () => {
    setIsLoaded(false);
    try {
      await Promise.all([
        axios.delete(`http://localhost:8000/api/v1/posts/media/${editPostId}`),
        axios.delete(`http://localhost:8000/api/v1/posts/tag/${editPostId}`),
        // axios.delete(`http://localhost:8000/api/v1/posts/post/${editPostId}`),
      ]);
      await axios.delete(`http://localhost:8000/api/v1/posts/post/${editPostId}`),
        dispatch(setActionPost(0));
      setIsDeleted(prev => !prev);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  }

  return (
    <div className='w-full absolute top-0 z-[60] min-h-screen bg-overlay-40 flex items-center justify-center '>

      <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
        justify-center z-[60]'
        onClick={() => { dispatch(setActionPost(0)); dispatch(setActionPost(0)) }} >
        <div className={`login_box w-[450px] top-40 bg-white pt-4 flex flex-col items-center
                justify-center fixed rounded-md z-[70] `}>
          <div className='absolute top-2 right-2 cursor-pointer p-2 rounded-full bg-fb-gray hover:bg-fb-dark'
            onClick={() => { dispatch(setActionPost(0)); dispatch(setActionPost(0)) }}>
            <AiOutlineClose size={20} />
          </div>
          <span className="font-semibold text-lg">Move to your trash?</span>
          <div className="flex justify-center my-3 items-center gap-2">
            <button className="hover:bg-gray-100 px-5 py-2 rounded-md text-blue-400"
              onClick={() => { dispatch(setActionPost(0)); dispatch(setActionPost(0)) }}>
              Cancel
            </button>
            <button className="bg-blue-400 text-white px-4 py-2 rounded-md"
              onClick={handleDeletePost}>
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DeletePost