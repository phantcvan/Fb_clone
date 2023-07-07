import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Icon } from "../static/icon";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeling, setFeeling } from "../slices/postSlice";


interface Feel {
    icon: string;
    name: string;
}
interface FeelingProps {
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
}

const Feeling = ({ setUploadPost, setSelectAddOn, }: FeelingProps) => {
    const feeling = useSelector(getFeeling);
    const dispatch = useDispatch();

    const [iconSearch, setIconSearch] = useState<Feel[]>([]);
    const [message, setMessage] = useState("");
    const handleAddDone = (item: Feel) => {
        if (feeling.length > 0 && feeling[0].name === item.name) {
            dispatch(setFeeling([]));
            setSelectAddOn(0);
        } else {
            dispatch(setFeeling([item]));
            setSelectAddOn(0);
        }
    };
    const handleSearchIcon = (e: any) => {
        const searchInput = e.target.value.trim().toLowerCase();
        if (searchInput !== "") {
            const findIcon = Icon.Feeling.filter(item => item.name.includes(searchInput));
            if ((findIcon.length === 0)) {
                setMessage("Nothing found");
                setIconSearch([]);
            } else {
                setIconSearch(findIcon);
            }
        } else {
            setMessage("");
            setIconSearch([]);
        }

    }
    console.log("iconSearch", iconSearch);

    return (
        <div
            className='login_box w-[450px] top-20 bottom-3 bg-white pt-4 flex flex-col
      fixed rounded-md z-[70] h-[470px]'
        >
            <div className='absolute top-2 right-2 cursor-pointer px-2'
                onClick={() => setUploadPost(false)}>
                <AiOutlineClose size={20} />
            </div>
            <div className="flex items-center mx-3 mt-1 mb-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectAddOn(0)}>
                    <BiArrowBack size={20} style={{ color: "#606770" }} />
                </div>
                <p className='text-xl font-semibold flex flex-1 items-center justify-center'>
                    How are you feeling?
                </p>
            </div>

            <hr className="text-fb-dark" />
            <div className="w-full">
            </div>
            <div className="flex flex-row gap-3 m-3">
                <div className="w-full h-10 py-2 text-fb-gray-text bg-gray-100 hover:bg-fb-gray rounded-l-full rounded-r-full flex items-center">
                    <div className="mx-1 px-2">
                        <HiMagnifyingGlass size={18} />
                    </div>
                    <input type="text"
                        placeholder="Search"
                        className="border-none outline-none bg-gray-100 h-10 ml-2 w-[100%] pl-2 rounded-r-full hover:bg-fb-gray"
                        onChange={handleSearchIcon} />
                </div>
            </div>
            <Scrollbars autoHide style={{ width: '100%', height: `350px`, overflow: 'hidden' }}>
                <div className="flex flex-row ml-3 my-1 flex-wrap items-center">
                    {iconSearch.length === 0
                        ? message.length > 0
                            ? <span className="text-fb-gray-text m-auto mt-2 text-[15px]">{message}</span>
                            : <>
                                {Icon.Feeling.map((item, index) => (
                                    // <Link to={item.path} key={index}>
                                    <div key={index}
                                        onClick={() => handleAddDone(item)}
                                        className={`flex w-1/2 gap-4 my-1 items-center cursor-pointer hover:bg-fb-gray p-1 rounded-md
                                ${feeling[0]?.name === item.name && "bg-gray-100"}`}
                                    >
                                        <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                                            <span>{item.icon}</span>
                                        </div>
                                        <span className="">{item.name}</span>
                                    </div>
                                    // </Link>
                                ))}
                            </>
                        : <>
                            {iconSearch.map((item, index) => (
                                // <Link to={item.path} key={index}>
                                <div key={index}
                                    onClick={() => handleAddDone(item)}
                                    className={`flex w-1/2 gap-4 my-1 items-center cursor-pointer hover:bg-fb-gray p-1 rounded-md
                                ${feeling[0]?.name === item.name && "bg-gray-100"}`}
                                >
                                    <div className="h-6 w-6 rounded-md overflow-hidden object-cover">
                                        <span>{item.icon}</span>
                                    </div>
                                    <span className="">{item.name}</span>
                                </div>
                                // </Link>
                            ))}
                        </>
                    }
                </div>
            </Scrollbars>


        </div >
    )
}

export default Feeling