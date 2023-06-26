import { AiOutlineClose } from "react-icons/ai";
import { TbPhotoFilled } from "react-icons/tb";
import { GiCheckeredFlag } from "react-icons/gi";
import { FaUserTag, } from "react-icons/fa";
import { FaRegFaceLaugh, FaLocationDot } from "react-icons/fa6";
import { BiSolidLockAlt, BiSolidDownArrow } from "react-icons/bi";
import "../index.css";
import { useState } from "react";
import SelectAudience from "./SelectAudience";
import TagPeople from "./TagPeople";
import Feeling from "./Feeling";
import CheckIn from "./CheckIn";
import { useNavigate } from "react-router";
interface Tag {
    id: number;
    name: string;
}
const CreatePost = ({ setUploadPost }: { setUploadPost: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [selectAudience, setSelectAudience] = useState(false);
    const [addOn, setAddOn] = useState(0);
    const [selectAddOn, setSelectAddOn] = useState(0);
    const [newPost, setNewPost] = useState("");
    const [tag, setTag] = useState<Tag[]>([{id:123,name:"a"}]);
    const [feeling, setFeeling] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();


    console.log(newPost);
    const handleAddPost = () => {

    }

    const handleClickTag = (id)=>{
        navigate(`/${id}`)
    }

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
                <hr className="text-fb-dark" />
                <div className="w-full">
                </div>
                <div className="flex flex-row gap-3 mt-3 mb-2 mx-3">
                    <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                        className="w-10 h-10 rounded-full cursor-pointer object-cover" />
                    <div className="flex flex-col gap-1">
                        <div className="flex text-sm text-black font-semibold">
                            <span className="text-sm text-black">USERNAME
                                {(feeling || tag.length > 0 || location) && <span> is </span>}
                                {feeling && <span> feeling {feeling}</span>}
                                {tag.length > 0 && tag.length <= 3 && (
                                    <span>
                                        with {tag.map((item: Tag) => (
                                            <span key={item.id} onClick={() => handleClickTag(item.id)}
                                            className="cursor-pointer hover:underline">
                                                {item.name}
                                            </span>
                                        )).reduce((prev, curr) => [prev, ', ', curr])}
                                    </span>
                                )}

                                {tag.length > 3 && (
                                    <span>
                                        with {tag.slice(0, 2).map((item: Tag) => (
                                            <span key={item.id} onClick={() => handleClickTag(item.id)}>
                                                {item.name}
                                            </span>
                                        )).reduce((prev, curr) => [prev, ', ', curr])} and {tag.length - 2} other people
                                    </span>
                                )}


                                {(location && feeling) && <span> at {location}</span>}
                                {(location && !feeling) && <span> in {location}</span>}
                                {(feeling && tag.length > 0 && location) && <span>.</span>}
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
                        <div className="w-9 h-9 relative rounded-full flex items-center justify-center hover:bg-fb-gray mx-1"
                            onMouseEnter={() => setAddOn(1)}
                            onMouseLeave={() => setAddOn(0)}
                            onClick={() => setSelectAddOn(1)}>
                            {addOn === 1
                                && <span className="addOn-box absolute top-[-30px] bg-fb-dark-2 py-1 px-2 text-white rounded-lg cursor-pointer">
                                    Photo/video
                                </span>}
                            <TbPhotoFilled style={{ color: "#45BD62", cursor: "pointer" }} size={24} />
                        </div>
                        <div className={`w-9 h-9 relative rounded-full flex items-center justify-center hover:bg-fb-gray mx-1 ${tag.length !== 0 && "bg-[#CAEEF9]"}`}
                            onMouseEnter={() => setAddOn(2)}
                            onMouseLeave={() => setAddOn(0)}
                            onClick={() => setSelectAddOn(2)}>
                            {addOn === 2
                                && <span className="addOn-box absolute top-[-30px] bg-fb-dark-2 py-1 px-2 text-white rounded-lg w-[85px] cursor-pointer">
                                    Tag people
                                </span>}
                            <FaUserTag style={{ color: "#1877F2", cursor: "pointer" }} size={24} />
                        </div>
                        <div className={`w-9 h-9 relative rounded-full flex items-center justify-center hover:bg-fb-gray mx-1 ${feeling && "bg-[#FEF2D1]"}`}
                            onMouseEnter={() => setAddOn(3)}
                            onMouseLeave={() => setAddOn(0)}
                            onClick={() => setSelectAddOn(3)}>
                            {addOn === 3
                                && <span className="addOn-box absolute top-[-30px] bg-fb-dark-2 py-1 px-2 text-white rounded-lg cursor-pointer">
                                    Feeling/activity
                                </span>}
                            <FaRegFaceLaugh style={{ color: "#EAB026", cursor: "pointer" }} size={24} />
                        </div>
                        <div className={`w-9 h-9 relative rounded-full flex items-center justify-center hover:bg-fb-gray mx-1 ${location && "bg-[#FBCCD2]"}`}
                            onMouseEnter={() => setAddOn(4)}
                            onMouseLeave={() => setAddOn(0)}
                            onClick={() => setSelectAddOn(4)}>
                            {addOn === 4
                                && <span className="addOn-box absolute top-[-30px] bg-fb-dark-2 py-1 px-2 text-white rounded-lg w-[72px] cursor-pointer">
                                    Check-in
                                </span>}
                            <FaLocationDot style={{ color: "#F5533D", cursor: "pointer" }} size={24} />
                        </div>
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
                {newPost
                    ? <button className={`mt-2 bg-fb-blue mx-3 text-white py-[6px] rounded-md font-semibold cursor-pointer`}
                        onClick={handleAddPost}>
                        Post
                    </button>
                    : <button className={`mt-2 mx-3 py-[6px] rounded-md font-semibold bg-fb-gray-light text-fb-dark cursor-not-allowed`}>
                        Post
                    </button>}

            </div >
            {selectAudience && <SelectAudience setSelectAudience={setSelectAudience} setUploadPost={setUploadPost} />}
            {selectAddOn === 2
                ? <TagPeople setUploadPost={setUploadPost} setTag={setTag} />
                : selectAddOn === 3
                    ? <Feeling setUploadPost={setUploadPost} setFeeling={setFeeling} />
                    : selectAddOn === 4
                    && < CheckIn setUploadPost={setUploadPost} setLocation={setLocation} />}
        </div >

    )
}

export default CreatePost;