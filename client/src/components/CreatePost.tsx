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
import { UserType, Tag } from "../static/types";
import CreateMain from "./CreateMain";
import UploadPhoto from "./UploadPhoto";

interface Feel {
    icon: string;
    name: string;
}
interface Check {
    checkIn: string;
    city: string;
}
interface CreatePost {
    userNow: UserType;
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    left: number
}
const CreatePost = ({ setUploadPost, userNow, left }: CreatePost) => {
    // const [selectAudience, setSelectAudience] = useState(false);
    const [addOn, setAddOn] = useState(0);
    const [selectAddOn, setSelectAddOn] = useState(0);
    const [media, setMedia] = useState("");
    const [newPost, setNewPost] = useState("");
    const [audience, setAudience] = useState("Only me");
    const [tag, setTag] = useState<Tag[]>([]);
    const [feeling, setFeeling] = useState<Feel[]>([]);
    const [location, setLocation] = useState<Check[]>([]);
    const navigate = useNavigate();
    const [showBgView, setShowBgView] = useState(false);
    const [postBg, setPostBg] = useState(-1);
    const [postBgUrl, setPostBgUrl] = useState("");
    const [textColor, setTextColor] = useState("black");


    console.log(audience);
    // Khi đóng cửa sổ Post
    const handleClose = () => {
        setUploadPost(false);
        console.log("12");

    }
    const handleAddPost = () => {

    }

    const handleClickTag = (id: number) => {
        navigate(`/${id}`)
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
        bigDiv = "w-[100%] h-full absolute top-0 left-[-300px] bg-overlay-40 flex items-center justify-center z-50";
    } else {
        bigDiv = "w-[100%] h-full absolute top-0 left-0 bg-overlay-40 flex items-center justify-center z-50"
    }


    return (
        <div className={bigDiv}>

            <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
        justify-center z-[60]'
                onClick={handleClose}
            >
            </div>

            {selectAddOn === 1 && <SelectAudience setSelectAddOn={setSelectAddOn}
                setUploadPost={setUploadPost} setAudience={setAudience} audience={audience} />}
            {selectAddOn === 0
                ? <CreateMain setUploadPost={setUploadPost} audience={audience} selectAddOn={selectAddOn}
                    setSelectAddOn={setSelectAddOn} />
                : selectAddOn === 2
                    ? <TagPeople setUploadPost={setUploadPost} tag={tag} setTag={setTag}
                        setSelectAddOn={setSelectAddOn} selectAddOn={selectAddOn} />
                    : selectAddOn === 3
                        ? <Feeling setUploadPost={setUploadPost} setSelectAddOn={setSelectAddOn}
                            setFeeling={setFeeling} feeling={feeling} />
                        : selectAddOn === 4
                            ? < CheckIn setUploadPost={setUploadPost} setSelectAddOn={setSelectAddOn}
                                setLocation={setLocation} location={location} />
                            : selectAddOn === 5
                                && < ShowMoreBg setUploadPost={setUploadPost} setPostBgUrl={setPostBgUrl}
                                    setPostBg={setPostBg} setTextColor={setTextColor} setSelectAddOn={setSelectAddOn} />
                                }
        </div >

    )
}

export default CreatePost;