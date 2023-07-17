import { useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getUser } from '../slices/whitelist';
import { CmtType } from '../static/types';
import { getShowCmt } from '../slices/appSlice';
import axios from 'axios';
import { MdAddPhotoAlternate } from 'react-icons/md';

interface AddProp {
  level: number;
  setNewCmt: React.Dispatch<React.SetStateAction<boolean>>;
  postId: number;
}
interface CmtSend {
  post_id: number;
  user_id: number;
  content: string | null;
  mediaUrl: string | null;
  level: number;
  cmt_reply: number;
}
const AddComment = ({ level, setNewCmt, postId }: AddProp) => {
  const userNow = useSelector(getUser);
  const [input, setInput] = useState("");
  const [comment, setComment] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [flag, setFlag] = useState(false)
  // const [mediaType, setMediaType] = useState("");
  const [previewSrc, setPreviewSrc] = useState('');

  // const postId = useSelector(getShowCmt);
  // console.log("postId", postId);




  const handleTextareaChange = (event: any) => {
    const value = event.target.value;
    setInput(value);
    setComment(value.trim());
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    // console.log(event.target.scrollHeight);
  };
  // console.log("level", level);

  // choose photos/videos
  const handleAddMedia = (event: any) => {
    console.log("22222222")
    const mediaFileArr = event.target.files[0].name.split('.');
    const typeOfMedia = mediaFileArr[mediaFileArr.length - 1].toLowerCase();
    if (typeOfMedia === "png" || typeOfMedia === 'jpg' || typeOfMedia === 'jpeg' || typeOfMedia === 'bmp' || typeOfMedia === 'gif') {
      console.log("picture");
      setSelectedMedia(event.target.files[0]);
    }
    // xem trước media
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event: any) {
      setPreviewSrc(event.target.result);
    };
    console.log("file", file)
    reader.readAsDataURL(file);
  };
  // console.log("picture", previewSrc);
  const handlePostCmt = async () => {
    const levelCmt = level === 0 ? 1 : 2;
    const cmtReply = level === 0 ? -1 : level;
    const cmtData: CmtSend = {
      post_id: postId,
      user_id: userNow?.id,
      content: comment,
      mediaUrl: null,
      level: levelCmt,
      cmt_reply: cmtReply,
    };
    if (mediaUrl) {
      cmtData.mediaUrl = mediaUrl
    }
    // const newCmt: CmtType = {
    //   id: Math.floor(Math.random() * 10000000),
    //   post_id: postId,
    //   user_id: userNow?.id,
    //   content: comment,
    //   mediaUrl: null,
    //   level: levelCmt,
    //   cmt_reply: cmtReply,
    //   date: new Date().toISOString()
    // }

    try {
      const [createPostResponse] = await Promise.all([
        axios.post(`http://localhost:8000/api/v1/cmt`, cmtData),
      ])
      if (createPostResponse.data.status === 200) {
        setInput("");
        setNewCmt(true);
        console.log('Comment added successfully');
      }
      if (createPostResponse.data.status === 400) {
        // setMessage("Error");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handlePostCmt();
    }
  };

  useEffect(() => {
    // previewSrc && setFlag(true)
    if (previewSrc) setFlag(true)
    // console.log("--------------------------------Preview", previewSrc)
    // console.log("--------------------------------Flag", flag)
  }, [previewSrc])

  // console.log(flag);
  return (
    <div className=" mx-auto gap-2 flex my-1 w-[90%] flex-col overflow-y-auto max-h-[350px] min-h-[52px]">
      <div className='flex items-center gap-2'>
        <div className={`w-8 h-8 box-content rounded-full flex items-center
  justify-center cursor-pointer overflow-hidden`}>
          <img
            className="object-cover w-8 h-8"
            src={userNow?.avatar} />
        </div>
        <div className="flex-1 flex-col h-fit text-fb-gray-text bg-gray-100 rounded-xl flex">
          <div className='flex items-center'>
            <textarea onChange={handleTextareaChange} value={input}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder={level === 0 ? "Write a comment... " : "Reply..."}
              className="border-none outline-none bg-gray-100 text-black px-2 rounded-xl w-[93%]
    resize-none pt-1" />
            {comment
              ? <div className='flex items-center gap-2 mr-2'>
                {/* <div className="">
                  <label htmlFor="uploadMedia" className="flex gap-3 cursor-pointer flex-col items-center justify-center">
                    <p className="p-1 rounded-full hover:bg-fb-gray h-8 w-8 flex items-center justify-center">
                      <MdAddPhotoAlternate size={24} style={{}} />
                    </p>
                  </label>
                  <input type="file" name="uploadMedia" id="uploadMedia"
                    className="hidden" onChange={handleAddMedia} />
                </div> */}
                <p onClick={handlePostCmt}>
                  <IoMdSend size={20}
                    style={{ color: '#0571ED', cursor: 'pointer' }} />
                </p>
              </div>
              : <div className='flex items-center gap-2 mr-2'>
                {/* <div className="">
                  <label htmlFor="uploadMedia" className="flex gap-3 cursor-pointer flex-col items-center justify-center">
                    <p className="p-1 rounded-full hover:bg-fb-gray h-8 w-8 flex items-center justify-center">
                      <MdAddPhotoAlternate size={22} style={{}} />
                    </p>
                  </label>
                  <input type="file" name="uploadMedia" id="uploadMedia"
                    className="hidden" onChange={handleAddMedia} />
                </div> */}
                <p>
                  <IoMdSend size={20}
                    style={{ color: '#BEC3C9', cursor: 'not-allowed' }} />
                </p>
              </div>}

          </div>

        </div>
      </div>
      {/* <div className='w-96 h-96'>
      </div> */}
{/* 
      {
        previewSrc ?  */}
        {/* <div className='w-16 h-16 aspect-[4/3] ml-[40px]'>
          <h2>222222</h2>
          <img src="https://i.pinimg.com/564x/55/67/48/556748f6bfc33e1e39fecc7e4efecb77.jpg" alt="" />
        </div>  */}
        {/* : <></>

      } */}
    </div>

  )
}

export default AddComment