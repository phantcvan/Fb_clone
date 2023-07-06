import { useState } from "react";
import { BiArrowBack, BiSolidLockAlt } from "react-icons/bi";
import { FaEarthAmericas, FaUserGroup } from "react-icons/fa6";


interface SelectAudienceProps {
    setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setAudience: React.Dispatch<React.SetStateAction<string>>;
    audience: string;
}
const SelectAudience = ({ setSelectAddOn, setUploadPost, setAudience, audience }: SelectAudienceProps) => {
    const [newAudience, setNewAudience] = useState("");

    return (
            <div className='login_box w-[450px] top-20 bg-white pt-4 flex flex-col 
          fixed rounded-md z-[80]'>
                <div className="flex items-center mx-3 mt-1 mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectAddOn(0)}>
                        <BiArrowBack size={20} style={{ color: "#606770" }} />
                    </div>
                    <p className='text-xl font-semibold flex flex-1 items-center justify-center'>
                        Post Audience
                    </p>
                </div>
                <hr className="text-fb-dark" />
                <div className="m-2">
                    <p className="px-2 text-[15px] font-semibold py-1">Who can see your post?</p>
                    <p className="px-2 text-[15px] py-1">
                        Your post will show up in Feed, on your profile and in search results.
                    </p>
                    <p className="px-2 text-[15px] py-1">
                        Your default audience is set to <strong>{audience}</strong>, but you can change the audience of this specific post.
                    </p>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 items-center justify-between p-2 hover:bg-gray-100 rounded-md'
                            onClick={() => setNewAudience("Public")} >
                            <label htmlFor="public" className="flex gap-2 items-center">
                                <div className="w-[60px] h-[60px] flex items-center justify-center bg-fb-gray rounded-full">
                                    <FaEarthAmericas size={24} />
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold">
                                        Public
                                    </p>
                                    <span>Anyone on or off Facebook</span>
                                </div>
                            </label>
                            <input type="radio" value="public" name='audienceOption' className='w-5 h-5'
                                id='public' />
                        </div>
                        <div className='flex gap-2 items-center justify-between p-2 hover:bg-gray-100 rounded-md'
                            onClick={() => setNewAudience("Friends")} >
                            <label htmlFor="friends" className="flex gap-2 items-center">
                                <div className="w-[60px] h-[60px] flex items-center justify-center bg-fb-gray rounded-full">
                                    <FaUserGroup size={24} />
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold">
                                        Friends
                                    </p>
                                    <span>Your friends on Facebook</span>
                                </div>
                            </label>
                            <input type="radio" value="friends" name='audienceOption' className='w-5 h-5'
                                id='friends' />
                        </div>
                        <div className='flex gap-2 items-center justify-between p-2 hover:bg-gray-100 rounded-md'
                            onClick={() => setNewAudience("Only me")} >
                            <label htmlFor="onlyMe" className="flex gap-2 items-center">
                                <div className="w-[60px] h-[60px] flex items-center justify-center bg-fb-gray rounded-full">
                                    <BiSolidLockAlt size={24} />
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold">
                                        Only me
                                    </p>
                                </div>
                            </label>
                            <input type="radio" value="onlyMe" name='audienceOption' className='w-5 h-5'
                                id='onlyMe' />
                        </div>

                    </div>
                </div>
                <div className="flex justify-end gap-3 font-semibold mb-3 px-3">
                    <button className=" hover:bg-gray-100 text-fb-blue px-5 py-2 rounded-md"
                        onClick={() => { setSelectAddOn(0) }}>
                        Cancel
                    </button>
                    <button className="bg-blue-400 text-white px-7 py-2 rounded-md"
                        onClick={() => { setSelectAddOn(0); setAudience(newAudience) }}>
                        Done
                    </button>
                </div>
            </div >

    )
}

export default SelectAudience