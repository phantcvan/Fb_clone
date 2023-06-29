import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Scrollbars } from 'react-custom-scrollbars-2';
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";

interface Tag {
    id: number;
    username: string;
}
interface TagPeopleProps {
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setTag: React.Dispatch<React.SetStateAction<Tag[]>>;
    setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
    selectAddOn: number;
    tag: Tag[];
}

const TagPeople = ({ setUploadPost, tag, setTag, setSelectAddOn, selectAddOn }: TagPeopleProps) => {
    const [newTag, setNewTag] = useState<Tag[]>([]);

    // useEffect(() => {
    //     setTag([{ id: 123, username: 'A' }, { id: 13, username: 'B' }, { id: 12, username: 'C' }])
    // }, []);
    const handleAddTag = (newTag: Tag) => {
        setNewTag((prevTags) => [...prevTags, newTag]);
    };
    const handleAddDone = () => {
        setTag(newTag);
        setSelectAddOn(0)
    };



    return (
        <div className='w-[100%] h-full absolute left-0 bg-overlay-40 flex items-center 
    justify-center z-20'>
            <div className='w-[100%] h-[100%] fixed left-0 bg-overlay-40 flex items-center 
    justify-center z-21'
                onClick={() => setUploadPost(false)}
            >
            </div>
            <div
                className='login_box w-[450px] top-20 bg-white pt-4 flex flex-col
      fixed rounded-md z-25'
            >
                <div className='absolute top-2 right-2 cursor-pointer px-2'
                    onClick={() => setUploadPost(false)}>
                    <AiOutlineClose size={20} />
                </div>
                <div className="flex items-center mx-3 mt-1 mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleAddDone}>
                        <BiArrowBack size={20} style={{ color: "#606770" }} />
                    </div>
                    <p className='text-xl font-semibold flex flex-1 items-center justify-center'>
                        Tag people
                    </p>
                </div>
                <hr className="text-fb-dark" />
                <div className="mx-3 ">
                    {/* <div className="w-full">
                    </div> */}
                    <div className="flex flex-row gap-3 my-3">
                        <div className="w-[85%] h-10 py-2 text-fb-gray-text bg-gray-100 hover:bg-fb-gray rounded-l-full rounded-r-full flex items-center">
                            <div className="cursor-pointer mx-1 px-2">
                                <HiMagnifyingGlass size={18} />
                            </div>
                            <input type="text"
                                placeholder="Search for friends "
                                className="border-none outline-none bg-gray-100 h-10 ml-2 w-[100%] pl-2 rounded-r-full hover:bg-fb-gray" />
                        </div>
                        <button className="ml-1 text-fb-blue font-semibold"
                            onClick={handleAddDone}>
                            Done
                        </button>
                    </div>
                    {/* Nếu có tag thì hiển thị những người đang tag */}
                    {tag.length > 0
                        && <div className="mb-1">
                            <span className="mt-2 text-fb-gray-text font-semibold">TAGGED</span>
                            <div className="border border-fb-dark flex gap-1 rounded-md">
                                <div className="bg-[#E7F3FF] h-fit w-fit ml-2 my-2 rounded-md flex items-center">
                                    <span className="p-2 text-fb-blue font-semibold">{tag[0].username}</span>
                                    <span className="p-2 text-fb-blue cursor-pointer"><AiOutlineClose /></span>
                                </div>
                                <div className="bg-[#E7F3FF] h-fit w-fit my-2 rounded-md flex items-center">
                                    <span className="p-2 text-fb-blue font-semibold">{tag[1].username}</span>
                                    <span className="p-2 text-fb-blue cursor-pointer">
                                        <AiOutlineClose />
                                    </span>
                                </div>
                                <div className="bg-[#E7F3FF] h-fit w-fit my-2 rounded-md flex items-center">
                                    <span className="p-2 text-fb-blue font-semibold">{tag[2].username}</span>
                                    <span className="p-2 text-fb-blue cursor-pointer">
                                        <AiOutlineClose />
                                    </span>
                                </div>
                            </div>

                        </div>}

                    {/* Danh sách gợi ý */}
                    <span className="mt-2 text-fb-gray-text font-semibold">SUGGESTIONS</span>
                    <Scrollbars autoHide style={{ width: '100%', height: `${tag.length !== 0 ? '153px' : '253px'}`, overflow: 'hidden' }}>
                        <div >
                            <div className="flex gap-4 pb-2 pt-3 cursor-pointer items-center px-2 hover:bg-fb-gray rounded-md"
                                onClick={() => handleAddTag('Tag 1')}>
                                <img src="http://localhost:5173/assets/person/3.jpeg" alt="avatar"
                                    className="w-9 h-9 rounded-full object-cover overflow-hidden" />
                                <span>UserName</span>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div >
            {selectAddOn === 0 && <CreatePost setUploadPost={setUploadPost} />}
        </div >
    )
}

export default TagPeople