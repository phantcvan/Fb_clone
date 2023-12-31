// import { AiFillAppstore, AiOutlineClose, } from "react-icons/ai";
// import { TbPhotoFilled } from "react-icons/tb";
// // import { GiCheckeredFlag } from "react-icons/gi";
// import { FaUserTag, } from "react-icons/fa";
// import { FaRegFaceLaugh, FaLocationDot, FaEarthAmericas, FaUserGroup } from "react-icons/fa6";
// import { BiSolidLockAlt, BiSolidDownArrow } from "react-icons/bi";
// import Tippy from '@tippyjs/react/headless';
import { useState } from "react";
import SelectAudience from "./SelectAudience";
import TagPeople from "./TagPeople";
import Feeling from "./Feeling";
import CheckIn from "./CheckIn";
import { useNavigate } from "react-router";
// import { MdArrowBackIosNew } from "react-icons/md";
// import { BgPost } from "../static/background";
import ShowMoreBg from "./ShowMoreBg";
import { UserType, PostType } from "../static/types";
import CreateMain from "./CreateMain";
import UploadPhoto from "./UploadPhoto";


interface CreatePost {
    userNow: UserType;
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    left: number;
    setNewPost: React.Dispatch<React.SetStateAction<PostType | null>>;
}
const CreatePost = ({ setUploadPost, userNow, left, setNewPost }: CreatePost) => {
    const [selectAddOn, setSelectAddOn] = useState(0);
    const navigate = useNavigate();
    const [postBg, setPostBg] = useState(-1);
    const [postBgUrl, setPostBgUrl] = useState("");
    const [textColor, setTextColor] = useState("black");
    console.log("123");
    


    // Khi đóng cửa sổ Post
    const handleClose = () => {
        setUploadPost(false);
    }

    // Nếu người dùng chọn background
    const styleBg = postBgUrl
        ? {
            background: `url(${postBgUrl}) no-repeat center center / cover`,
            color: `${textColor}`
        }
        : {};
    let bigDiv = "";
    if (left !== 0) {
        bigDiv = "w-[100%] h-full absolute top-0 left-[-300px] bg-overlay-40 flex items-center justify-center z-[80]";
    } else {
        bigDiv = "w-[100%] h-full absolute top-0 left-0 bg-overlay-40 flex items-center justify-center z-[80]"
    }


    return (
        <div className="w-[100%] h-full absolute top-0 left-0 bg-overlay-40 flex items-center justify-center z-[80]">

            <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
        justify-center z-[60]'
                onClick={handleClose}
            >
            </div>
            <CreateMain setUploadPost={setUploadPost}
                setSelectAddOn={setSelectAddOn} setNewPost={setNewPost} />

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
        </div >

    )
}

export default CreatePost;