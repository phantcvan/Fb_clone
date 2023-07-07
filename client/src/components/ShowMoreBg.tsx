import { BiArrowBack } from "react-icons/bi";
import { BgPost } from "../static/background";
import { Scrollbars } from 'react-custom-scrollbars-2';



interface BgProps {
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setPostBgUrl: React.Dispatch<React.SetStateAction<string>>;
    setPostBg: React.Dispatch<React.SetStateAction<number>>;
    setTextColor: React.Dispatch<React.SetStateAction<string>>;
    setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
}

const ShowMoreBg = ({ setUploadPost, setPostBgUrl, setPostBg, setTextColor, setSelectAddOn }: BgProps) => {


    // Nếu người dùng chọn background
    // const styleBg = postBgUrl
    //     ? {
    //         background: `url(${postBgUrl}) no-repeat center center / cover`,
    //         color: `${textColor}, `
    //     }
    //     : {};



    return (
            <div
                className='login_box w-[450px] top-20 bg-white pt-4 flex flex-col 
          fixed rounded-md z-[70]'
            >            <div className="flex items-center mx-3 mt-1 mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectAddOn(0)}>
                        <BiArrowBack size={20} style={{ color: "#606770" }} />
                    </div>
                    <p className='text-xl font-semibold flex flex-1 items-center justify-center'>
                        Choose Background
                    </p>
                </div>
                <hr className="text-fb-dark" />
                <div className="w-full h-[400px]">
                    <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                        <div className="gap-3 m-3 relative flex items-center justify-evenly flex-wrap">
                            {BgPost.map((item, index) => (
                                <div key={index}
                                    className={`cursor-pointer w-20 h-20 rounded-lg`}
                                >
                                    <img src={item.thumbnail} className="w-20 h-20 rounded-lg"
                                        onClick={() => {
                                            setSelectAddOn(0);
                                            setPostBgUrl(BgPost[index].bgURL);
                                            setPostBg(index); setTextColor(BgPost[index].textColor)
                                        }} />
                                </div>
                            ))}
                        </div >
                    </Scrollbars>
                </div>
            </div >

    )
}

export default ShowMoreBg;