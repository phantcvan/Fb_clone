import "../index.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAudience, getEditPostId, getTag, setActionPost, setAudience, setBgUrl, setContent, setDate, setEditPostId, setFeeling, setLocation, setMediaUrl, setTag, setType } from '../slices/postSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getUser } from "../slices/whitelist";
import axios from "axios";
import { PostType } from "../static/types";
import EditMain from "./EditMain";
import TagPeople from "./TagPeople";
import Feeling from "./Feeling";
import CheckIn from "./CheckIn";
import ShowMoreBg from "./ShowMoreBg";
import SelectAudience from "./SelectAudience";
import { Icon } from "../static/icon";
import { Location } from "../static/location";

interface EditProp {
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedPost: React.Dispatch<React.SetStateAction<PostType | []>>;
  isEdited: boolean;
}
const EditPost = ({ setIsEdited, setEditedPost, isEdited }: EditProp) => {
  const dispatch = useDispatch();
  const [selectAddOn, setSelectAddOn] = useState(0);
  const navigate = useNavigate();
  const [postBg, setPostBg] = useState(-1);
  const [postBgUrl, setPostBgUrl] = useState("");
  const [preMedia, setPreMedia] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [editPost, setEditPost] = useState<PostType | []>([]);
  const [uploadPost, setUploadPost] = useState(false);


  const userNow = useSelector(getUser);
  const editPostId = useSelector(getEditPostId);
  const fetchData = async () => {
    try {
      const [editPost, tagsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/posts/loadPostsBelongToPostId/${editPostId}`),
        axios.get(`http://localhost:8000/api/v1/tag/${editPostId}`),
      ]);
      console.log(editPost?.data?.post[0].bgUrl);

      if (editPost?.data?.post.length > 0) {
        // setIsEdited(pre=>!pre);

        setEditPost(editPost?.data?.post);
        dispatch(setContent(editPost?.data?.post[0].content));
        dispatch(setAudience(editPost?.data?.post[0].audience));
        dispatch(setFeeling(Icon.Feeling.filter((item) => item.name === editPost?.data?.post[0].feeling)));
        setPostBgUrl(editPost?.data?.post[0].bgUrl);
        dispatch(setLocation(Location.City.filter((item) => item.city === editPost?.data?.post[0].location)));
        dispatch(setMediaUrl(editPost?.data?.post[0].mediaUrl));
        setPreMedia(editPost?.data?.post[0].mediaUrl);
        dispatch(setType(editPost?.data?.post[0].type));
        dispatch(setTag(tagsResponse?.data?.tags));
        dispatch(setDate(editPost?.data?.post[0].date))
        setTextColor(editPost?.data?.post[0].textColor || "black")
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className='w-full absolute top-0 z-[60] min-h-screen bg-overlay-40 flex items-center justify-center '>

      <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
        justify-center z-[60]'
        onClick={() => { dispatch(setActionPost(0)); dispatch(setEditPostId(0)) }} >
      </div>
      <div className={`login_box w-[450px] top-20 bg-white pt-4 flex flex-col 
                fixed rounded-md z-[70]`}>
        <div className='absolute top-2 right-2 cursor-pointer px-2'
          onClick={() => { dispatch(setActionPost(0)); dispatch(setEditPostId(0)) }}>
          <AiOutlineClose size={20} />
        </div>
        <EditMain setSelectAddOn={setSelectAddOn} postBgUrl={postBgUrl} setPostBgUrl={setPostBgUrl} setIsEdited={setIsEdited}
          textColor={textColor} setTextColor={setTextColor} preMedia={preMedia} setEditedPost={setEditedPost}
          isEdited={isEdited}/>
        {selectAddOn === 1 && <SelectAudience setSelectAddOn={setSelectAddOn}
          setUploadPost={setUploadPost} />}
        {selectAddOn === 2
          ? <TagPeople setUploadPost={setUploadPost}
            setSelectAddOn={setSelectAddOn} />
          : selectAddOn === 3
            ? <Feeling setUploadPost={setUploadPost} setSelectAddOn={setSelectAddOn}
            />
            : selectAddOn === 4
              ? < CheckIn setUploadPost={setUploadPost} setSelectAddOn={setSelectAddOn}
              />
              : selectAddOn === 5
              && < ShowMoreBg setUploadPost={setUploadPost} setPostBgUrl={setPostBgUrl}
                setPostBg={setPostBg} setTextColor={setTextColor} setSelectAddOn={setSelectAddOn} />
        }


      </div>

    </div>
  )
}

export default EditPost