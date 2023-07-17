import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { getUser } from "../slices/whitelist";
import SmallSidebar from "../components/SmallSidebar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import MessCompMini from "../components/MessagePage/MessCompMini";
import { getAllUsers } from "../slices/userSlice";
import { UserType } from "../static/types";

const Messenger = () => {
  const userNow = useSelector(getUser);
  const [chooseFriend, setChooseFriend] = useState(0);
  const allUsers = useSelector(getAllUsers);

  const handleInputKeyword = (e: any) => {
    // const inputSearch = e.target.value.trim().replace(/\s+/g, " ").toLowerCase();
    // setResult(relation?.filter(
    //   (user: UserType) =>
    //   (user.first_name.toLowerCase().includes(inputSearch) ||
    //     user.last_name.toLowerCase().includes(inputSearch))
    // ));
  }

  return (
    <div className='relative '>
      <Topbar userNow={userNow} />
      <div className="flex w-[100%] bg-fb-gray min-h-screen relative">
        <div className='w-[60px]'>
          <SmallSidebar userNow={userNow} />
        </div>
        <div className='flex flex-col pb-3 w-1/4 content-box px-2 py-4 h-screen fixed top-[57px] left-[60px] bg-white'>
          <p className='text-2xl font-semibold '>Chat</p>
          <div className='flex items-center mt-3 pb-3 w-[100%] h-10 py-2 text-fb-gray-text bg-gray-100 rounded-l-full rounded-r-full'>
            <div className="pl-2 flex items-center justify-center ">
              <span><HiMagnifyingGlass size={19} /></span>
            </div>
            <input
              type="text"
              onChange={handleInputKeyword}
              placeholder="Search Messenger"
              className="border-none outline-none bg-gray-100 w-[100%] pl-2 rounded-r-full"
            />
          </div>
          <div className="overflow-y-auto min-h-[552px] mt-3">
            {allUsers?.slice(3, 8).map((user: UserType) => <MessCompMini setChooseFriend={setChooseFriend} user={user} />)}


          </div>


        </div>
        {(chooseFriend === 0)
          && <div className='flex flex-col gap-3 ml-[calc(100vh*1/3+170px)] items-center justify-center w-full'>
            <span className='text-fb-gray-text font-semibold text-xl'>
              Select a chat or start a new conversation
            </span>
          </div>}
      </div>

    </div>
  )
}

export default Messenger