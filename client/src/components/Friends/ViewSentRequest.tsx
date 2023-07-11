import { AiOutlineClose } from "react-icons/ai";
import "../../index.css";
import { Scrollbars } from 'react-custom-scrollbars-2';


interface ViewProp {
  setViewSent: React.Dispatch<React.SetStateAction<boolean>>;
}
const ViewSentRequest = ({ setViewSent }: ViewProp) => {
  return (
    <div className='w-full absolute top-[-60px] z-[60] min-h-screen bg-overlay-40 flex items-center justify-center '>
      <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
        justify-center z-[70]'
        onClick={() => setViewSent(false)} >
      </div>
      <div className={`login_box w-[450px] top-20 bg-white pt-4 flex flex-col items-center
                justify-center fixed rounded-md z-[70] `}>
        <div className='absolute top-2 right-2 cursor-pointer p-2 rounded-full bg-fb-gray hover:bg-fb-dark'
          onClick={() => setViewSent(false)} >
          <AiOutlineClose size={20} />
        </div>
        <div className="border-b border-fb-gray w-full flex justify-center">
          <span className="font-semibold text-lg pb-3">Sent Requests</span>
        </div>
        <Scrollbars autoHide style={{ width: '100%', height: `350px`, overflow: 'hidden' }}>
          <div className="flex flex-col">
            <span className="h-[100px]">abc</span>
            <span className="h-[100px]">abc</span>
            <span className="h-[100px]">abc</span>
            <span className="h-[100px]">abc</span>
            <span className="h-[100px]">abc</span>
            <span className="h-[100px]">abc</span>
            <span className="h-[100px]">abc</span>
          </div>
        </Scrollbars>

      </div>
      ViewSentRequest
    </div>
  )
}

export default ViewSentRequest