import "../index.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Scrollbars from "react-custom-scrollbars-2";
import MessengerComp from "./MessengerComp";
import { Link } from "react-router-dom";
import { setShowMess, getShowMess } from "../slices/appSlice";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from "../slices/userSlice";
import { UserType } from "../static/types";



const MessengerView = ({ setPick }: { setPick: React.Dispatch<React.SetStateAction<number>> }) => {
  const showMess = useSelector(getShowMess);
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const handleShowMess = (id: number) => {
    console.log("id", id);
    dispatch(setShowMess(id));
    setPick(0);
  }

  return (
    <div className="w-[100%] h-screen absolute top-[70px] right-0">
      <div className="w-full h-full z-[80]" onClick={() => setPick(0)}>
      </div>
      <div className="bg-white py-4 w-[330px] absolute top-[-14px] right-0 login_box rounded-md z-40">
        {/* <Scrollbars autoHide style={{ width: '100%', height: 'calc(100vh - 140px)' }}> */}
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
          <div className="flex flex-col gap-2 mt-3 mx-2 overflow-y-auto max-h-[352px] ">
            {allUsers?.slice(3, 8).map((user: UserType) => (
              <div onClick={() => handleShowMess(user?.id)}>
                <MessengerComp friendId={user?.id} />
              </div>
            ))}

          </div>
        </div>

        {/* </Scrollbars > */}
        <div className="h-9 border-t border-gray-100 flex items-center justify-center">
          <Link to="/messages/t">
            <span className="mt-2 text-fb-blue font-medium cursor-pointer hover:underline">See all in Messenger</span>
          </Link>
        </div>
      </div>
    </div>





  );
}
export default MessengerView