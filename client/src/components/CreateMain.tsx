import { AiFillAppstore, AiOutlineClose, } from "react-icons/ai";
import { TbPhotoFilled } from "react-icons/tb";
// import { GiCheckeredFlag } from "react-icons/gi";
import { FaUserTag, } from "react-icons/fa";
import { FaRegFaceLaugh, FaLocationDot, FaEarthAmericas, FaUserGroup } from "react-icons/fa6";
import { BiSolidLockAlt, BiSolidDownArrow } from "react-icons/bi";
import Tippy from '@tippyjs/react/headless';
import { useState } from "react";
import SelectAudience from "./SelectAudience";
import TagPeople from "./TagPeople";
import Feeling from "./Feeling";
import CheckIn from "./CheckIn";
import { useNavigate } from "react-router";
import { MdAddPhotoAlternate, MdArrowBackIosNew } from "react-icons/md";
import { BgPost } from "../static/background";
import ShowMoreBg from "./ShowMoreBg";
import { UserType, Tag, PostType } from "../static/types";
import { useSelector } from "react-redux";
import { getUser } from "../slices/whitelist";
import Scrollbars from "react-custom-scrollbars-2";
import ReactPlayer from "react-player";
import axios from "axios";

interface Feel {
    icon: string;
    name: string;
}
interface Check {
    checkIn: string;
    city: string;
}
interface CreatePost {
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
    audience: string;
    selectAddOn: number
}
const CreateMain = ({ setUploadPost, setSelectAddOn, audience, selectAddOn }: CreatePost) => {
    // const [selectAudience, setSelectAudience] = useState(false);
    const userNow = useSelector(getUser);
    const [upload, setUpload] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState("");
    const [previewSrc, setPreviewSrc] = useState('');
    const [mediaUrl, setMediaUrl] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState<Tag[]>([]);
    const [feeling, setFeeling] = useState<Feel[]>([]);
    const [location, setLocation] = useState<Check[]>([]);
    const navigate = useNavigate();
    const [showBgView, setShowBgView] = useState(false);
    const [postBg, setPostBg] = useState(-1);
    const [postBgUrl, setPostBgUrl] = useState("");
    const [textColor, setTextColor] = useState("black");


    console.log(content);
    // Khi đóng cửa sổ Post
    const handleClose = () => {
        setUploadPost(false);
    }
    // choose photos/videos
    const handleAddMedia = (event: any) => {
        const mediaFileArr = event.target.files[0].name.split('.');
        const typeOfMedia = mediaFileArr[mediaFileArr.length - 1].toLowerCase();
        if (typeOfMedia === 'mp4' || typeOfMedia === 'avi' || typeOfMedia === 'mkv') {
            setMediaType("video")
        } else if (typeOfMedia === "png" || typeOfMedia === 'jpg' || typeOfMedia === 'jpeg' || typeOfMedia === 'bmp' || typeOfMedia === 'gif') {
            setMediaType("picture")
        }
        setSelectedMedia(event.target.files[0]);
        // xem trước media
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event: any) {
            setPreviewSrc(event.target.result);
        };
        reader.readAsDataURL(file);


    };


    const handleAddPost = () => {
        const formData = new FormData();
        formData.append('file', selectedMedia);
        formData.append('upload_preset', 'facebook');
        const id = Math.floor(Math.random() * 10000000);
        // Upload media
        axios
            .post('https://api.cloudinary.com/v1_1/dbs47qbrd/image/upload', formData,)
            .then((response) => {
                const media = response.data.secure_url;
                setMediaUrl(media);
                const postData: PostType = {
                    id: id,
                    content: content,
                    user_id: userNow?.id,
                    date: new Date().toISOString(),
                    audience: audience,
                };






                if (location) {
                    // postData.location = location;
                }

                if (mediaUrl) {
                    // postData.mediaUrl = mediaUrl;
                }
                axios
                    .post('http://localhost:8000/post', postData)
                    .then((response) => {
                        console.log('Post added successfully:', response.data);
                        // Reset form or perform any other actions
                    })
                    .catch((error) => {
                        console.error('Error adding post:', error);
                    });
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    }
    // console.log(mediaUrl);

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
    console.log("audience", content, feeling.length, tag.length, location);


    return (
        <div
            className={`login_box w-[450px] top-20 bg-white pt-4 flex flex-col 
                fixed rounded-md z-[70]`}
        >
            <div className='absolute top-2 right-2 cursor-pointer px-2'
                onClick={handleClose}>
                <AiOutlineClose size={20} />
            </div>
            <p className='text-xl text-center font-semibold px-5 pt-1 pb-3'>
                Create post
            </p>
            <hr className="text-fb-dark" />
            <div className="w-full">
            </div>
            <div className="flex flex-row gap-3 mt-3 mb-2 mx-3">
                <img src={userNow.avatar} alt=""
                    className="w-10 h-10 rounded-full cursor-pointer object-cover" />
                <div className="flex flex-col gap-1">
                    <div className="flex text-sm text-black font-semibold">
                        <span className="text-sm text-black">{userNow.first_name} {userNow.last_name}
                            {(feeling.length > 0 || tag.length > 0 || location.length > 0) && <span> is </span>}
                            {feeling.length > 0 && <span>{feeling[0].icon} feeling {feeling[0].name} </span>}
                            {tag.length > 0 && tag.length <= 3 && (
                                <span>
                                    with {tag.map((item: Tag) => (
                                        <span key={item.id} onClick={() => handleClickTag(item.id)}
                                            className="cursor-pointer hover:underline">
                                            {item.username}
                                        </span>
                                    )).reduce((prev, curr): any => [prev, ', ', curr])}
                                </span>
                            )}

                            {tag.length > 3 && (
                                <span>
                                    with {tag.slice(0, 2).map((item: Tag) => (
                                        <span key={item.id} onClick={() => handleClickTag(item.id)}>
                                            {item.username}
                                        </span>
                                    )).reduce((prev, curr): any => [prev, ', ', curr])} and {tag.length - 2} other people
                                </span>
                            )}
                            {(location.length > 0 && feeling.length > 0) && <span> at {location[0].checkIn}</span>}
                            {(location.length > 0 && feeling.length === 0) && <span> in {location[0].checkIn}</span>}
                            {(feeling.length > 0 && tag.length > 0 && location.length > 0) && <span>.</span>}
                        </span>
                    </div>
                    <div className="bg-fb-gray flex items-center rounded-md cursor-pointer w-fit"
                        onClick={() => setSelectAddOn(1)}
                    >
                        {audience === "Public"
                            ? <span className="p-1 text-black"><FaEarthAmericas /></span>
                            : audience === "Friends"
                                ? <span className="p-1 text-black"><FaUserGroup /></span>
                                : <span className="p-1 text-black"><BiSolidLockAlt /></span>}

                        <span className="text-xs p-1 text-black">
                            {audience}
                        </span>
                        <span className="p-1 text-black"><BiSolidDownArrow size={10} /></span>
                    </div>
                </div>
            </div>



            {/* mediaType===video-> player, mediaType===picture -> img */}
            {upload
                ? mediaType === ""
                    ? <div className="gap-3 m-3 relative flex items-center justify-center">
                        <Scrollbars autoHide style={{ width: '100%', height: `200px`, overflow: 'hidden' }}>
                            <div className="min-h-fit rounded-md border border-fb-dark">
                                <div className="m-1 hover:bg-gray-100 rounded-md h-[191px] flex items-center justify-center">
                                    <div className='absolute top-3 right-1 cursor-pointer px-2'
                                        onClick={() => setUpload(false)}>
                                        <AiOutlineClose size={20} />
                                    </div>
                                    <div className="">
                                        <label htmlFor="uploadMedia" className="flex gap-3 cursor-pointer flex-col items-center justify-center">
                                            <p className="p-2 rounded-full bg-fb-gray h-12 w-12 flex items-center justify-center">
                                                <MdAddPhotoAlternate size={24} style={{}} />
                                            </p>
                                            <p className="font-semibold text-[16px]">Add Photo/Video</p>
                                        </label>
                                        <input type="file" name="uploadMedia" id="uploadMedia"
                                            className="hidden" onChange={handleAddMedia} />
                                    </div>

                                </div>
                            </div>
                        </Scrollbars>
                    </div>
                    : mediaType === "picture"
                        ? <div className="gap-3 m-3 relative flex items-center justify-center">
                            <Scrollbars autoHide style={{ width: '100%', height: `200px`, overflow: 'hidden' }}>
                                <div className="min-h-fit rounded-md border border-fb-dark">
                                    <div className="m-1 hover:bg-gray-100 rounded-md h-[191px] flex items-center justify-center">
                                        <div className='absolute top-3 right-1 cursor-pointer px-2'
                                            onClick={() => setUpload(false)}>
                                            <AiOutlineClose size={20} />
                                        </div>
                                        <div className="">
                                            <img src={previewSrc} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </Scrollbars>
                        </div>
                        : <div className="gap-3 m-3 relative flex items-center justify-center">
                            <Scrollbars autoHide style={{ width: '100%', height: `200px`, overflow: 'hidden' }}>
                                <div className="min-h-fit rounded-md border border-fb-dark">
                                    <div className="m-1 hover:bg-gray-100 rounded-md h-[191px] flex items-center justify-center">
                                        <div className='absolute top-3 right-1 cursor-pointer px-2'
                                            onClick={() => setUpload(false)}>
                                            <AiOutlineClose size={20} />
                                        </div>
                                        <div className="">
                                            <ReactPlayer url={previewSrc} controls
                                                width="100%"
                                                height="100%" />
                                        </div>
                                    </div>
                                </div>
                            </Scrollbars>
                        </div>
                : <div className="gap-3 m-3 relative flex items-center justify-center">
                    {/* Content */}
                    <textarea name="myTextarea" id="myTextarea" rows={7} placeholder={`What's on your mind, ${userNow.first_name}?`}
                        className={`text-xl px-2 w-full outline-none resize-none flex items-center justify-center
                                        `}
                        onChange={(e) => setContent(e.target.value)}
                        style={styleBg}
                    ></textarea>
                    {/* Show BackGround */}
                    <div className="absolute bottom-2 left-0 cursor-pointer">
                        {showBgView
                            ? <div className="flex items-center gap-[5px] ">
                                <span className="w-[38px] h-[38px] bg-fb-gray rounded-lg p-2"
                                    onClick={() => setShowBgView(false)}>
                                    <MdArrowBackIosNew size={22} />
                                </span>
                                <div
                                    className={`cursor-pointer w-[38px] h-[38px] rounded-lg`}
                                >
                                    <div className="w-[38px] h-[38px] rounded-lg border-2 border-fb-gray bg-white"
                                        onClick={() => {
                                            setPostBgUrl("");
                                            setPostBg(-1); setTextColor("black")
                                        }} >
                                        <div className="bg-fb-gray w-[34px] h-[34px] rounded-lg border-2 border-white "></div>
                                    </div>
                                </div>
                                {BgPost.slice(0, 7).map((item, index) => (
                                    <div key={index}
                                        className={`cursor-pointer w-[38px] h-[38px] rounded-lg`}
                                    >
                                        <img src={item.thumbnail} className="w-[38px] h-[38px] rounded-lg"
                                            onClick={() => {
                                                setPostBgUrl(BgPost[index].bgURL);
                                                setPostBg(index); setTextColor(BgPost[index].textColor)
                                            }} />
                                    </div>
                                ))}
                                <span className="w-[38px] h-[38px] bg-fb-gray rounded-lg p-2"
                                    onClick={() => setSelectAddOn(5)}>
                                    <AiFillAppstore size={22} />
                                </span>
                            </div>
                            : <img src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png" alt=""
                                onClick={() => setShowBgView(true)} className="w-10 h-10 flex basis-1/4" />
                        }

                    </div>
                </div>}

            <div className="gap-3 m-3 border border-fb-gray flex rounded-md items-center">
                <span className="p-3 font-semibold w-[53%]">
                    Add to your post
                </span>
                <div className="flex">
                    {postBgUrl
                        ? <Tippy
                            render={attrs => (
                                <div className={`box addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg
                                     text-xs flex-wrap`}
                                    {...attrs}>
                                    This can't be combined with what you've already added to your post.
                                </div>)}>
                            <div className={`w-9 h-9 relative rounded-full flex items-center justify-center mx-1`}
                                onClick={() => setSelectAddOn(0)}>
                                <TbPhotoFilled style={{ color: "#D9D9D9", cursor: "not-allowed" }} size={24} />
                            </div>
                        </Tippy>
                        : <Tippy
                            render={attrs => (
                                <div className={`box addOn-box  py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                                    {...attrs}>
                                    Photo/video
                                </div>)}>
                            <div className={`w-9 h-9 relative rounded-full flex items-center justify-center mx-1
                    ${mediaUrl ? "bg-[#D8E4CA] hover:bg-[#D8E4CA]" : "hover:bg-fb-gray"} `}
                                onClick={() => setUpload(true)}>
                                <TbPhotoFilled style={{ color: "#45BD62", cursor: "pointer" }} size={24} />
                            </div>
                        </Tippy>}

                    <Tippy
                        render={attrs => (
                            <div className={`box addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                                {...attrs}>
                                Tag people
                            </div>)}>
                        <div className={`w-9 h-9 relative rounded-full  flex items-center justify-center mx-1
                            ${tag.length > 0 ? "bg-[#CAEEF9] hover:bg-[#C0E2EC]" : "hover:bg-fb-gray"} `}
                            onClick={() => setSelectAddOn(2)}>
                            <FaUserTag style={{ color: "#1877F2", cursor: "pointer" }} size={24} />
                        </div>
                    </Tippy>
                    <Tippy
                        render={attrs => (
                            <div className="box addOn-box bg-fb-dark-2 py-1 px-2 text-white rounded-lg cursor-pointer text-xs"  {...attrs}>
                                Feeling/activity
                            </div>)}>
                        <div className={`w-9 h-9 relative rounded-full flex items-center justify-center mx-1
                            ${feeling.length > 0 ? "bg-[#FEF2D1] hover:bg-[#F1E6C6]" : "hover:bg-fb-gray"} `}
                            onClick={() => setSelectAddOn(3)}>
                            <FaRegFaceLaugh style={{ color: "#EAB026", cursor: "pointer" }} size={24} />
                        </div>
                    </Tippy>
                    <Tippy
                        render={attrs => (
                            <div className="box addOn-box bg-fb-dark-2 py-1 px-2 text-white rounded-lg cursor-pointer text-xs"  {...attrs}>
                                Check-in
                            </div>)}>
                        <div className={`w-9 h-9 relative rounded-full flex items-center justify-center
                             ${location.length > 0 ? "bg-[#FBCCD2] hover:bg-[#EEC2C7]" : "hover:bg-fb-gray"} mx-1`}
                            onClick={() => setSelectAddOn(4)}>
                            <FaLocationDot style={{ color: "#F5533D", cursor: "pointer" }} size={24} />
                        </div>
                    </Tippy>
                </div>

            </div>
            {content || (feeling.length > 0 || tag.length > 0 || location.length > 0 || selectedMedia)
                ? <button className={`mt-2 mb-3 bg-fb-blue mx-3 text-white py-[6px] rounded-md font-semibold cursor-pointer`}
                    onClick={handleAddPost}>
                    Post
                </button>
                : <button className={`mt-2 mb-3 mx-3 py-[6px] rounded-md font-semibold bg-gray-100 text-fb-dark cursor-not-allowed`}>
                    Post
                </button>}

        </div >

    )
}

export default CreateMain;