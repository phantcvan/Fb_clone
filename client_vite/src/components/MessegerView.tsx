import "../index.css";
import { GrNext } from 'react-icons/gr';
import { AiFillSetting } from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';
import { BiSolidHelpCircle, BiSolidMoon, BiSolidCommentError } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { CategoryItems } from "../static/menu";


const MessegerView = () => {

  return (
    <div className="bg-white p-[16px] absolute top-14 right-0 login_box rounded-md z-40">
      <div className="addOn-box bg-white w-[338px] px-2 py-1 rounded-lg ">
        <Link to={'/user/1'} className="px-2 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] flex gap-2 items-center text-[15px] font-semibold cursor-pointer mb-1">
          <img src="http://localhost:5173/assets/person/1.jpeg"
            className="w-10 h-10 object-cover overflow-hidden rounded-full" />
          <div>USERNAME</div>
        </Link>
        <div className="border border-fb-gray"></div>
        <div className="px-2 py-2 rounded-lg hover:bg-[rgba(0,0,0,0.05)] flex gap-2 items-center text-[15px]
        font-semibold cursor-pointer my-1 text-fb-blue">
          See all profiles
        </div>
      </div>

      <div className="mt-4 p-2 hover:bg-fb-gray-light rounded-lg flex items-center justify-between cursor-pointer">
        <div className="font-semibold text-[15px] flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
            <div style={{ backgroundPosition: "-88px -110px" }}>
              <AiFillSetting size={24} />
            </div>
          </div>
          Settings & privacy
        </div>
        <div className="">
          <span><GrNext size={24} style={{ color: "red" }} /></span>
        </div>
      </div>

      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center justify-between cursor-pointer">
        <div className="font-semibold text-[15px] flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
            <div style={{ backgroundPosition: "-88px -110px" }}>
              <BiSolidHelpCircle size={24} />
            </div>
          </div>
          Help & support
        </div>
        <div className="text-[#606770]">
          <span><GrNext size={24} style={{ color: "red" }} /></span>
        </div>
      </div>

      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center justify-between cursor-pointer">
        <div className="font-semibold text-[15px] flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
            <div style={{ backgroundPosition: "-88px -110px" }}>
              <BiSolidMoon size={24} />
            </div>
          </div>
          Display & accessibility
        </div>
        <div className="text-[#606770]"><GrNext size={24} style={{ color: "#606770" }} /></div>
      </div>

      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center justify-between cursor-pointer">
        <div className="font-semibold text-[15px] flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
            <div style={{ backgroundPosition: "-88px -110px" }}>
              <BiSolidCommentError size={24} />
            </div>
          </div>
          Give feedback
        </div>
      </div>


      <div className="p-2 hover:bg-gray-200 rounded-lg flex items-center justify-between cursor-pointer">
        <div className="font-semibold text-[15px] flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-fb-gray ">
            <div style={{ backgroundPosition: "-88px -110px" }}>
              <IoLogOut size={24} />
            </div>
          </div>
          Log Out
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




  );
}
export default MessegerView