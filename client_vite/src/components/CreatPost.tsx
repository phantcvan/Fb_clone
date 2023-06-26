import { AiOutlineClose } from "react-icons/ai";
import { TbPhotoFilled } from "react-icons/tb";
import { BiSolidLockAlt, BiSolidDownArrow } from "react-icons/bi";
import "../index.css";
import { useState } from "react";
import SelectAudience from "./SelectAudience";

const CreatPost = ({ setUploadPost }: { setUploadPost: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [selectAudience, setSelectAudience] = useState(false);

    return (
        <div className='w-[100%] h-fit absolute left-0 bg-overlay-40 flex items-center 
        justify-center z-20'>
            <div className='w-[100%] h-[100%] fixed left-0 bg-overlay-40 flex items-center 
        justify-center z-21'
                onClick={() => setUploadPost(false)}
            >
            </div>
            <div
                className='login_box w-[450px] top-3 bottom-3 bg-white pt-4 flex flex-col
          fixed rounded-md z-25'
            >
                <div className='absolute top-2 right-2 cursor-pointer px-2'
                    onClick={() => setUploadPost(false)}>
                    <AiOutlineClose size={20} />
                </div>
                <p className='text-xl text-center font-semibold px-5 pt-1 pb-3'>
                    Create post
                </p>
                <hr className="text-fb-gray-dark" />
                <div className="w-full">
                </div>
                <div className="flex flex-row gap-3 mt-3 mb-2 mx-3">
                    <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                        className="w-10 h-10 rounded-full cursor-pointer object-cover" />
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-black">USERNAME</span>
                        <div className="bg-fb-gray flex items-center rounded-md cursor-pointer"
                            onClick={() => setSelectAudience(true)}
                        >
                            <span className="p-1 text-black"><BiSolidLockAlt /></span>
                            <span className="text-xs p-1 text-black">
                                Only me
                            </span>
                            <span className="p-1 text-black"><BiSolidDownArrow size={10} /></span>
                        </div>
                    </div>
                </div>
                <div className="gap-3 m-3">
                    <textarea className="placeholder text-xl p-2 border w-full outline-none resize-none"
                        name="myTextarea" id="myTextarea"
                        rows={3} placeholder="What's on your mind, USERNAME?"></textarea>
                </div>
                <div className="gap-3 m-3 border border-fb-gray flex rounded-md items-center">
                    <span className="p-3 font-semibold w-1/2">
                        Add to your post
                    </span>
                    <TbPhotoFilled style={{ color: "#45BD62" }} size={24}/>

                </div>
            </div >
            {selectAudience && <SelectAudience setSelectAudience={setSelectAudience} setUploadPost={setUploadPost} />}
        </div >

    )
}

export default CreatPost;