import "../index.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Scrollbars from "react-custom-scrollbars-2";
import MessengerComp from "./MessengerComp";
import { Link } from "react-router-dom";
import { setShowMess, getShowMess } from "../slices/appSlice";
import { useDispatch, useSelector } from 'react-redux';



const MessengerView = ({ setPick }: { setPick: React.Dispatch<React.SetStateAction<number>> }) => {
  const showMess = useSelector(getShowMess);
  const dispatch = useDispatch();
  const handleShowMess = (id: number) => {
    dispatch(setShowMess(id)); 
    setPick(0);
  }

  return (
    <div className="w-[100%] h-screen absolute top-[70px] right-0">
      <div className="w-full h-full z-10" onClick={() => setPick(0)}>
      </div>
    <div className="bg-white py-4 w-[330px] absolute top-[-14px] right-0 login_box rounded-md z-40">
      <Scrollbars autoHide style={{ width: '100%', height: 'calc(100vh - 140px)' }}>
        <div>
          <span className="text-2xl font-bold mx-4">Chats</span>
          <div className=" h-10 py-2 my-2 mx-4 text-fb-gray-text bg-gray-100 hover:bg-fb-gray rounded-l-full rounded-r-full flex items-center">
            <div className="cursor-pointer mx-1 px-2">
              <HiMagnifyingGlass size={18} />
            </div>
            <input type="text"
              placeholder="Search Messenger "
              className="border-none outline-none bg-gray-100 h-10 w-[100%] pl-2 rounded-r-full hover:bg-fb-gray" />
          </div>
          <div className="flex flex-col gap-2 mt-3 mx-2 ">
            <div onClick={() => handleShowMess(123)}>
              <MessengerComp />
            </div>
            <div onClick={() => handleShowMess(135)}>
              <MessengerComp />
            </div>

            <MessengerComp />
            <MessengerComp />
            <MessengerComp />
            <MessengerComp />
          </div>
        </div>

      </Scrollbars >
      <div className="h-9 border-t border-gray-100 flex items-center justify-center">
        <Link to="/messenger/t">
          <span className="mt-2 text-fb-blue font-medium cursor-pointer hover:underline">See all in Messenger</span>
        </Link>
      </div>
    </div>
    </div>





  );
}
export default MessengerView