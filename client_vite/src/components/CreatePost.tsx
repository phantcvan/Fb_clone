import { AiOutlineClose } from "react-icons/ai";
import { TbPhotoFilled } from "react-icons/tb";
// import { GiCheckeredFlag } from "react-icons/gi";
import { FaUserTag, } from "react-icons/fa";
import { FaRegFaceLaugh, FaLocationDot } from "react-icons/fa6";
import { BiSolidLockAlt, BiSolidDownArrow } from "react-icons/bi";
import Tippy from '@tippyjs/react/headless';
import { useState } from "react";
import SelectAudience from "./SelectAudience";
import TagPeople from "./TagPeople";
import Feeling from "./Feeling";
import CheckIn from "./CheckIn";
import { useNavigate } from "react-router";

interface Tag {
    id: number;
    username: string;
}
interface Feel {
    icon: string;
    name: string;
}
interface Check {
    checkIn: string;
    city: string;
}
const CreatePost = ({ setUploadPost }: { setUploadPost: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [selectAudience, setSelectAudience] = useState(false);
    const [addOn, setAddOn] = useState(0);
    const [selectAddOn, setSelectAddOn] = useState(0);
    const [media, setMedia] = useState("");
    const [newPost, setNewPost] = useState("");
    const [tag, setTag] = useState<Tag[]>([]);
    const [feeling, setFeeling] = useState<Feel[]>([]);
    const [location, setLocation] = useState<Check[]>([]);
    const navigate = useNavigate();


    console.log(newPost);
    // Khi đóng cửa sổ Post
    const handleClose = () => {
        setUploadPost(false);
    }
    const handleAddPost = () => {

    }

    const handleClickTag = (id: number) => {
        navigate(`/${id}`)
    }
    console.log(feeling);

    return (
        <div className='w-[100%] h-full absolute left-0 bg-overlay-40 flex items-center 
        justify-center z-20'>

            <div className='w-[100%] h-[100%] fixed left-0 bg-overlay-40 flex items-center 
        justify-center z-21'
                onClick={handleClose}
            >
            </div>
            <div
                className='login_box w-[450px] top-20 bg-white pt-4 flex flex-col
          fixed rounded-md z-25'
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
                    <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                        className="w-10 h-10 rounded-full cursor-pointer object-cover" />
                    <div className="flex flex-col gap-1">
                        <div className="flex text-sm text-black font-semibold">
                            <span className="text-sm text-black">USERNAME
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
                    <textarea className="placeholder text-xl px-2 w-full outline-none resize-none"
                        name="myTextarea" id="myTextarea"
                        rows={3} placeholder="What's on your mind, USERNAME?"
                        onChange={(e) => setNewPost(e.target.value)}></textarea>
                </div>
                <div className="gap-3 m-3 border border-fb-gray flex rounded-md items-center">
                    <span className="p-3 font-semibold w-[53%]">
                        Add to your post
                    </span>
                    <div className="flex">
                        <Tippy
                            render={attrs => (
                                <div className={`box addOn-box  py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
                                    {...attrs}>
                                    Photo/video
                                </div>)}>
                            <div className={`w-9 h-9 relative rounded-full flex items-center justify-center mx-1
                            ${media ? "bg-[#D8E4CA] hover:bg-[#D8E4CA]" : "hover:bg-fb-gray"} `}
                                onClick={() => setSelectAddOn(1)}>
                                <TbPhotoFilled style={{ color: "#45BD62", cursor: "pointer" }} size={24} />
                            </div>
                        </Tippy>
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


                        {/* <div className="w-9 h-9 relative rounded-full flex items-center justify-center hover:bg-fb-gray mx-1"
                            onMouseEnter={() => setAddOn(5)}
                            onMouseLeave={() => setAddOn(0)}
                            onClick={() => setSelectAddOn(5)}>
                            {addOn === 5
                                && <span className="addOn-box absolute top-[-30px] bg-fb-dark-2 py-1 px-2 text-white rounded-lg w-[77px] cursor-pointer">
                                    Life event
                                </span>}
                            <GiCheckeredFlag
                                style={{ color: "#009DE8", transform: "scaleX(-1)", cursor: "pointer" }}
                                size={24} />
                        </div> */}
                    </div>

                </div>
                {newPost || (feeling.length > 0 || tag.length > 0 || location)
                    ? <button className={`mt-2 mb-3 bg-fb-blue mx-3 text-white py-[6px] rounded-md font-semibold cursor-pointer`}
                        onClick={handleAddPost}>
                        Post
                    </button>
                    : <button className={`mt-2 mb-3 mx-3 py-[6px] rounded-md font-semibold bg-gray-100 text-fb-dark cursor-not-allowed`}>
                        Post
                    </button>}

            </div >
            {selectAudience && <SelectAudience setSelectAudience={setSelectAudience} setUploadPost={setUploadPost} />}
            {selectAddOn === 2
                ? <TagPeople setUploadPost={setUploadPost} tag={tag} setTag={setTag}
                    setSelectAddOn={setSelectAddOn} selectAddOn={selectAddOn} />
                : selectAddOn === 3
                    ? <Feeling setUploadPost={setUploadPost} setSelectAddOn={setSelectAddOn}
                        setFeeling={setFeeling} feeling={feeling} />
                    : selectAddOn === 4
                    && < CheckIn setUploadPost={setUploadPost} setSelectAddOn={setSelectAddOn}
                        setLocation={setLocation} location={location} />}
        </div >

    )
}

export default CreatePost;