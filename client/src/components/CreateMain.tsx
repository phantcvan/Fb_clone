import { AiFillAppstore, AiOutlineClose, } from "react-icons/ai";
import { TbPhotoFilled } from "react-icons/tb";
import { FaUserTag, } from "react-icons/fa";
import { FaRegFaceLaugh, FaLocationDot, FaEarthAmericas, FaUserGroup } from "react-icons/fa6";
import { BiSolidLockAlt, BiSolidDownArrow } from "react-icons/bi";
import Tippy from '@tippyjs/react/headless';
import { useState } from "react";
import { useNavigate } from "react-router";
import { MdAddPhotoAlternate, MdArrowBackIosNew } from "react-icons/md";
import { BgPost } from "../static/background";
import { UserType, PostType } from "../static/types";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../slices/whitelist";
import Scrollbars from "react-custom-scrollbars-2";
import ReactPlayer from "react-player";
import axios from "axios";
import { getAudience, getFeeling, getLocation, getTag, setAudience, setBgUrl, setCreatedPost, setFeeling, setLocation, setTag, setType } from "../slices/postSlice";
import CreatePostLoading from "./CreatePostLoading";
import { notification } from "antd";

interface Check {
    checkIn: string;
    city: string;
}
interface CreatePost {
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
    setNewPost: React.Dispatch<React.SetStateAction<PostType | null>>;
}
interface MediaPost {
    post_id: number,
    mediaUrl: string,
    type: string
}
interface Tag {
    id: number,
    first_name: string,
    last_name: string,
}
const CreateMain = ({ setUploadPost, setSelectAddOn, setNewPost }: CreatePost) => {
    // const [selectAudience, setSelectAudience] = useState(false);
    const userNow = useSelector(getUser);
    const [upload, setUpload] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState("");
    const [previewSrc, setPreviewSrc] = useState('');
    const [mediaUrl, setMediaUrl] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [showBgView, setShowBgView] = useState(false);
    const [postBg, setPostBg] = useState(-1);
    const [postBgUrl, setPostBgUrl] = useState("");
    const [textColor, setTextColor] = useState("black");
    const audience = useSelector(getAudience);
    const audienceFirstLetter = audience.charAt(0).toUpperCase() + audience.slice(1);
    const tag = useSelector(getTag);
    const feeling = useSelector(getFeeling);
    const location = useSelector(getLocation);
    const dispatch = useDispatch();
    const [isCreated, setIsCreated] = useState(false);

    console.log("feeling", feeling);

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
        } else {
            notification.warning({
                message: "Please choose a picture or a video",
                style: {
                    top: 5,
                },
            });
            return;
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


    const handleAddPost = async () => {
        setIsCreated(true);
        const idPost = Math.floor(Math.random() * 10000000);
        // mảng tags gồm id của user được tag

        // Create Post
        const postData: PostType = {
            id: idPost,
            user_id: userNow?.id,
            content: content,
            audience: audience,
            feeling: null,
            location: null,
            bgUrl: null,
            textColor: null,
            date: new Date().toISOString(),
        };

        if (location.length > 0) {
            postData.location = location[0]?.city;
        }

        if (feeling.length > 0) {
            postData.feeling = feeling[0]?.name;
        }

        if (postBgUrl) {
            postData.bgUrl = "http://localhost:8000" + postBgUrl;
            postData.textColor = textColor;
        }
        // console.log("postData", postData);

        try {
            const [createPostResponse] = await Promise.all([
                axios.post(`http://localhost:8000/api/v1/posts/createPost`, postData),
            ])
            if (createPostResponse.data.status === 200) {
                console.log('Create Post Successfully');
            }
            if (createPostResponse.data.status === 400) {
                // setMessage("Error");
            }


        } catch (error) {
            console.log(error)
        }
        // Tag people
        let tags: number[] = [];
        console.log("tags", tags);

        if (tag.length > 0) {
            tags = tag.map((item: Tag) => item.id);
            try {
                const [PostTagResponse] = await Promise.all([
                    axios.post(`http://localhost:8000/api/v1/tag`, {
                        post_id: idPost,
                        tags: tags
                    })
                ])
                if (PostTagResponse.data.status === 200) {
                    console.log('Create Tags Successfully');
                }
                if (PostTagResponse.data.status === 400) {
                    console.log("Error")
                    // setMessage("Error");
                }
            } catch (error) {
                console.log(error)
            }
        }
        // Upload media
        let media;
        if (selectedMedia) {
            const formData = new FormData();
            formData.append('file', selectedMedia);
            formData.append('upload_preset', 'facebook');
            try {
                let uploadMedia;
                if (mediaType === "picture") {
                    uploadMedia = await axios.post('https://api.cloudinary.com/v1_1/dbs47qbrd/image/upload', formData);
                } else if (mediaType === "video") {
                    uploadMedia = await axios.post('https://api.cloudinary.com/v1_1/dbs47qbrd/video/upload', formData);
                } else {
                    // Xử lý khi mediaType không hợp lệ
                    console.log("Invalid mediaType");
                    return;
                }
                media = uploadMedia.data.secure_url;
                setMediaUrl(media);
                const mediaPost: MediaPost = {
                    post_id: idPost,
                    mediaUrl: media,
                    type: mediaType
                }
                // if (mediaUrl) {
                //     mediaPost.mediaUrl = mediaUrl;
                // }
                try {
                    const [uploadResponse] = await Promise.all([
                        axios.post(`http://localhost:8000/api/v1/posts/uploadMedia`, mediaPost),
                    ])
                    if (uploadResponse.data.status === 200) {
                        console.log('Upload Media Successfully');
                    }
                    if (uploadResponse.data.status === 400) {
                        // setMessage("Error");
                    }
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        const newPost = postData;
        newPost.mediaUrl = media;
        newPost.type = mediaType;
        dispatch(setCreatedPost(newPost));
        setUploadPost(false);
        setNewPost(newPost);
        dispatch(setAudience("public"));
        dispatch(setTag([]));
        dispatch(setFeeling([]));
        dispatch(setLocation(""));
        dispatch(setBgUrl(""));
        // dispatch(setTextColor(""));
        // dispatch(setMediaUrl(""));
        // dispatch(setType(""));


    }

    // console.log("mediaUrl", mediaUrl);

    const handleClickTag = (id: number) => {
        navigate(`/user/${id}`)
    }
    // Nếu người dùng chọn background
    const styleBg = postBgUrl
        ? {
            background: `url(${postBgUrl}) no-repeat center center / cover`,
            color: `${textColor}`
        }
        : {};
    // console.log("audience", content, feeling.length, tag.length, location);


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
                                        <span key={item?.id} onClick={() => handleClickTag(item.id)}
                                            className="cursor-pointer hover:underline">
                                            {item?.first_name} {item?.last_name}
                                        </span>
                                    )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                                </span>
                            )}

                            {tag.length > 3 && (
                                <span>
                                    with {tag.slice(0, 2).map((item: Tag) => (
                                        <span key={item.id} onClick={() => handleClickTag(item.id)}>
                                            {item?.first_name} {item?.last_name}
                                        </span>
                                    )).reduce((prev: any, curr: any): any => [prev, ', ', curr])} and {tag.length - 2} other people
                                </span>
                            )}
                            {(location.length > 0 && feeling.length > 0) && <span> at {location[0].city}</span>}
                            {(location.length > 0 && feeling.length === 0) && <span> in {location[0].city}</span>}
                            {(feeling.length > 0 && tag.length > 0 && location.length > 0) && <span>.</span>}
                        </span>
                    </div>
                    <div className="bg-fb-gray flex items-center rounded-md cursor-pointer w-fit"
                        onClick={() => setSelectAddOn(1)}
                    >
                        {audience === "public"
                            ? <span className="p-1 text-black"><FaEarthAmericas /></span>
                            : audience === "friends"
                                ? <span className="p-1 text-black"><FaUserGroup /></span>
                                : <span className="p-1 text-black"><BiSolidLockAlt /></span>}

                        <span className="text-xs p-1 text-black">
                            {audienceFirstLetter}
                        </span>
                        <span className="p-1 text-black"><BiSolidDownArrow size={10} /></span>
                    </div>
                </div>
            </div>



            {/* mediaType===video-> player, mediaType===picture -> img */}
            {upload
                ? <div className="gap-3 m-3 relative flex flex-col items-center justify-center">
                    <textarea name="myTextarea" id="myTextarea" rows={2} placeholder={`What's on your mind, ${userNow.first_name}?`}
                        className={`text-xl px-2 w-full outline-none resize-none flex items-center justify-center`}
                        onChange={(e) => setContent(e.target.value)}
                        style={styleBg}
                    ></textarea>
                    {/* <Scrollbars autoHide style={{ width: '100%', height: `150px`, overflow: 'hidden' }}> */}


                    {mediaType === ""
                        ?
                        <div className=" min-h-[130px] rounded-md border border-fb-dark overflow-y-auto w-full">
                            <div className="m-1 hover:bg-gray-100 rounded-md h-[191px] flex items-center justify-center relative">
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
                        : mediaType === "picture"
                            ?
                            <div className="min-h-fit rounded-md overflow-y-auto">
                                <div className='absolute top-3 right-1 cursor-pointer px-2'
                                    onClick={() => setUpload(false)}>
                                    <AiOutlineClose size={20} />
                                </div>
                                <div className="m-1 hover:bg-gray-100 rounded-md h-[100px] flex items-center justify-center">
                                    <div className='absolute top-3 right-1 cursor-pointer px-2'
                                        onClick={() => { setUpload(false); setSelectedMedia("") }}>
                                        <AiOutlineClose size={20} />
                                    </div>
                                    <div className="">
                                        <img src={previewSrc} alt="w-full round-md" />
                                    </div>
                                </div>
                            </div>
                            : <div className="min-h-fit rounded-md overflow-y-auto">
                                <div className='absolute top-3 right-1 cursor-pointer px-2'
                                    onClick={() => setUpload(false)}>
                                    <AiOutlineClose size={20} />
                                </div>
                                <div className="m-1 hover:bg-gray-100 rounded-md h-[100px] flex items-center justify-center">
                                    <div className='absolute top-3 right-1 cursor-pointer px-2'
                                        onClick={() => { setUpload(false); setSelectedMedia("") }}>
                                        <AiOutlineClose size={20} />
                                    </div>
                                    <div className="">
                                        <ReactPlayer url={previewSrc} controls
                                            width="100%"
                                            height="100%" />
                                    </div>
                                </div>
                            </div>}

                    {/* </Scrollbars> */}
                </div>

                //     ? <div className="gap-3 m-3 relative flex items-center justify-center">
                //         <Scrollbars autoHide style={{ width: '100%', height: `200px`, overflow: 'hidden' }}>
                //             <div className="min-h-fit rounded-md border border-fb-dark">

                //             </div>
                //         </Scrollbars>
                //     </div>
                //     : <div className="gap-3 m-3 relative flex items-center justify-center">
                //         <Scrollbars autoHide style={{ width: '100%', height: `200px`, overflow: 'hidden' }}>
                //             <div className="min-h-fit rounded-md border border-fb-dark">

                //             </div>
                //         </Scrollbars>
                //     </div>
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
                ? isCreated
                    ? <div className="flex justify-between items-center w-full">
                        <button className={`w-[85%] mt-2 mb-3 bg-fb-blue mx-3 text-white py-[6px] rounded-md font-semibold cursor-pointer`}>
                            Post
                        </button>
                        <div className="mr-3 mt-2 mb-3 flex-1 ">
                            <CreatePostLoading />
                        </div>
                    </div>

                    : <button className={`mt-2 mb-3 bg-fb-blue mx-3 text-white py-[6px] rounded-md font-semibold cursor-pointer`}
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