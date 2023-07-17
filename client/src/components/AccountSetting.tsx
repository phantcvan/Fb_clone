import "../index.css";
import { GrNext } from 'react-icons/gr';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillSetting } from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';
import { BiSolidHelpCircle, BiSolidMoon, BiSolidCommentError } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { CategoryItems } from "../static/menu";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser, logout} from "../slices/whitelist";
import { UserType } from "../static/types"

interface AccProps {
  userNow: UserType;
  setPick: React.Dispatch<React.SetStateAction<number>>;
}

const AccountSetting = ({ setPick, userNow }: AccProps) => {
  const dispatch = useDispatch();

  return (
    <div className="w-[100%] h-screen absolute top-[70px] right-0">
      <div className="w-full h-full z-10" onClick={() => setPick(0)}>
      </div>
      <div className="bg-white p-4 w-[330px] absolute top-[-14px] right-0 login_box rounded-md z-40">
        <div className="addOn-box bg-white w-[304px] px-2 py-1 rounded-lg ">
          <Link to={`/user/${userNow.id}`} className="px-2 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] flex gap-2 items-center text-[15px] font-semibold cursor-pointer mb-1">
            <img src={userNow.avatar}
              className="w-10 h-10 object-cover overflow-hidden rounded-full" />
            <div><span>{userNow.first_name} {userNow.last_name}</span></div>
          </Link>
          <div className="border border-fb-gray"></div>
          <div className="px-2 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] flex gap-2 items-center text-[15px]
        font-semibold cursor-pointer my-1 text-fb-blue">
            See all profiles
          </div>
        </div>

        <div className="mt-4 p-2 hover:bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer">
          <div className="font-semibold text-[15px] flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
              <AiFillSetting size={24} />
            </div>
            Settings & privacy
          </div>
          <div className="">
            <span><IoIosArrowForward size={30} style={{ color: "#606770" }} /></span>
          </div>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer">
          <div className="font-semibold text-[15px] flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
              <BiSolidHelpCircle size={24} />
            </div>
            Help & support
          </div>
          <div className="">
            <span><IoIosArrowForward size={30} style={{ color: "#606770" }} /></span>
          </div>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer">
          <div className="font-semibold text-[15px] flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
              <BiSolidMoon size={24} />
            </div>
            Display & accessibility
          </div>
          <div className="">
            <span><IoIosArrowForward size={30} style={{ color: "#606770" }} /></span>
          </div>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer">
          <div className="font-semibold text-[15px] flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
              <BiSolidCommentError size={24} />
            </div>
            Give feedback
          </div>
          <div className="">
            <span><IoIosArrowForward size={30} style={{ color: "#606770" }} /></span>
          </div>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg flex items-center justify-between cursor-pointer"
          onClick={() => {dispatch(logout(null)); localStorage.setItem("authToken", "");}}>
          <div className="font-semibold text-[15px] flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
              <IoLogOut size={24} />
            </div>
            Log Out
          </div>
          <div className="">
            <span><IoIosArrowForward size={30} style={{ color: "#606770" }} /></span>
          </div>
        </div>


        <div className="flex flex-wrap gap-1 mt-2 px-2">
          {CategoryItems.map((item, index) => (
            <div key={index}
              className={`text-xs items-center cursor-pointer text-fb-gray-text cursor-pointer`}
            >
              {index === CategoryItems.length - 1
                ? <span className="">{item}</span>
                : <span className="">{item} · </span>}

            </div>
          ))}
        </div>
      </div>
    </div>




  );
}
export default AccountSetting