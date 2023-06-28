import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Location } from "../static/location";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useState } from "react";


interface Check {
    checkIn: string;
    city: string;
}
interface LocationProps {
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setLocation: React.Dispatch<React.SetStateAction<Check[]>>;
    setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
    location: Check[];
}

const CheckIn = ({ setUploadPost, setLocation, setSelectAddOn, location }: LocationProps) => {
    
    const [locationSearch, setLocationSearch] = useState<Check[]>([]);
    const [message, setMessage] = useState("");
    const handleAddDone = (item: Check) => {
        
        if (location?.length !== 0 && location[0].city === item.city) {
            setLocation([]);
            setSelectAddOn(0);
        } else {
            setLocation([item]);
            setSelectAddOn(0);
        }
    };
    const handleSearchIcon = (e: any) => {
        const searchInput = e.target.value.trim().toLowerCase();
        if (searchInput !== "") {
            // Icon.Feeling.filter(item => item.name.includes(searchInput))
            const findIcon = Location.City.filter(item => item.city.toLowerCase().includes(searchInput) ||
                item.checkIn.toLowerCase().includes(searchInput));
            if ((findIcon.length === 0)) {
                setMessage("No locations to show");
                setLocationSearch([]);
            } else {
                setLocationSearch(findIcon);
            }
        } else {
            setMessage("");
            setLocationSearch([]);
        }

    }
    console.log("location", location);
    console.log("locationCity", Location.City);

    return (
        <div className='w-[100%] h-full absolute left-0 bg-overlay-40 flex items-center 
    justify-center z-20'>
            <div className='w-[100%] h-[100%] fixed left-0 bg-overlay-40 flex items-center 
    justify-center z-21'
                onClick={() => setUploadPost(false)}
            >
            </div>
            <div
                className='login_box w-[450px] h-[80%] top-20 bottom-3 bg-white pt-4 flex flex-col
      fixed rounded-md z-25'
            >
                <div className='absolute top-2 right-2 cursor-pointer px-2'
                    onClick={() => setUploadPost(false)}>
                    <AiOutlineClose size={20} />
                </div>
                <div className="flex items-center mx-3 mt-1 mb-3">
                    <div className="w-8 h-8 bg-fb-gray-light rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectAddOn(0)}>
                        <BiArrowBack size={20} style={{ color: "#606770" }} />
                    </div>
                    <p className='text-xl font-semibold flex flex-1 items-center justify-center'>
                        Search for location
                    </p>
                </div>

                <hr className="text-fb-dark" />
                <div className="w-full">
                </div>
                <div className="flex flex-row gap-3 m-3">
                    <div className="w-full h-10 py-2 text-fb-gray-text bg-fb-gray-light hover:bg-fb-gray rounded-l-full rounded-r-full flex items-center">
                        <div className="mx-1 px-2">
                            <HiMagnifyingGlass size={18} />
                        </div>
                        <input type="text"
                            placeholder="Where are you"
                            className="border-none outline-none bg-fb-gray-light h-10 ml-2 w-[100%] pl-2 rounded-r-full hover:bg-fb-gray"
                            onChange={handleSearchIcon} />
                    </div>
                </div>
                <Scrollbars autoHide style={{ width: '100%', height: `350px`, overflow: 'hidden' }}>
                    <div className="flex flex-row ml-3 my-1 flex-wrap items-center">
                        {locationSearch?.length === 0
                            ? message.length > 0
                                ? <span className="text-fb-gray-text m-auto mt-2 text-[15px]">{message}</span>
                                : <>
                                    {Location.City.map((item, index) => (
                                        <div key={index}
                                            onClick={() => handleAddDone(item)}
                                            className={`flex w-full gap-4 my-1 items-center cursor-pointer hover:bg-fb-gray p-1 rounded-md
                                            ${location[0]?.city === item.city && "bg-fb-gray-light"}`}
                                        >

                                            <div className="bg-fb-gray-text w-8 h-8 rounded-md items-center justify-center">
                                                <span className="flex items-center justify-center pt-[2px]">
                                                    <FaLocationDot size={24} style={{ textAlign: "center", color: "#FFFFFF" }} />
                                                </span>
                                            </div>
                                            <div className="rounded-md overflow-hidden object-cover flex flex-col justify-center">
                                                <span className="font-semibold">{item.checkIn}</span>
                                                <span className="text-xs">{item.city}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            : <>
                                {locationSearch.map((item, index) => (
                                    <div key={index}
                                        onClick={() => handleAddDone(item)}
                                        className={`flex w-full gap-4 my-1 items-center cursor-pointer hover:bg-fb-gray p-1 rounded-md
                        ${location[0]?.city === item.city && "bg-fb-gray-light"}`}
                                    >
                                        <div className="bg-fb-gray-text w-8 h-8 rounded-md items-center justify-center">
                                            <span className="flex items-center justify-center pt-[2px]">
                                                <FaLocationDot size={24} style={{ textAlign: "center", color: "#FFFFFF" }} />
                                            </span>
                                        </div>
                                        <div className="rounded-md overflow-hidden object-cover flex flex-col justify-center">
                                            <span className="font-semibold">{item.checkIn}</span>
                                            <span className="text-xs">{item.city}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                </Scrollbars>


            </div >
        </div >
    )
}

export default CheckIn