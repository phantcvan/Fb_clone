import { AiFillHeart } from "react-icons/ai";
// import ReactPlayer from 'react-player'
import { BsHouseFill } from "react-icons/bs";
import { MdCastConnected, MdSchool } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import Lisa from "../../assets/UserDetail/Lisa.mp4";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUser } from "../slices/whitelist";
import { useEffect, useState } from "react";
import { UserType, Relation } from "../static/types"
import { BiSolidHome } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PiBagFill } from "react-icons/pi";


interface Intro {
  pageNow: UserType;
  relationship: UserType;
}

export default function Introduction({ pageNow, relationship }: Intro) {
  const userNow = useSelector(getUser);
  const { userId } = useParams(); //id của page



  return (
    <div className="">
      <div className="text-xl font-bold">Intro</div>
      {pageNow?.bio
        && <div className="text-center text-sm p-[6px] pb-4 border-b border-fb-gray">
          {pageNow.bio}
        </div>}
      <div className="">
        {pageNow?.highSchool
          && <div className="flex items-center gap-2 mt-[16px] text-sm">
            <span className="text-gray-400">
              <MdSchool size={24} style={{ color: "#8C939D" }} />
            </span>
            <p>Studied at <strong>{pageNow.highSchool}</strong></p>
          </div>}
        {pageNow?.college
          && <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-gray-400">
              <MdSchool size={24} style={{ color: "#8C939D" }} />
            </span>
            <p>Studied at <strong>{pageNow.college}</strong></p>
          </div>}
        {pageNow?.job
          ? <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-gray-400">
              <PiBagFill size={24} style={{ color: "#8C939D" }} />
            </span>
            <p>Works at <strong>{pageNow.job}</strong></p>
          </div>
          : <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-gray-400">
              <PiBagFill size={24} style={{ color: "#8C939D" }} />
            </span>
            <p>No workplaces to show</p>
          </div>}
        {pageNow?.currentCity
          && <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-gray-400">
              <BiSolidHome size={24} style={{ color: "#8C939D" }} />
            </span>
            <p>Lives in <strong>{pageNow.currentCity}</strong></p>
          </div>}
        {pageNow?.hometown
          && <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-gray-400">
              <IoLocationSharp size={24} style={{ color: "#8C939D" }} />
            </span>
            <p>From <strong>{pageNow.hometown}</strong></p>
          </div>}
        {!pageNow?.relationship ? (
          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-gray-400">
              <AiFillHeart size={24} style={{ color: "#8C939D" }} />
            </span>
            <p>No relationship info to show</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-gray-400">
              <AiFillHeart size={24} style={{ color: "#8C939D" }} />
            </span>
            {pageNow?.relationship && <span>{pageNow.relationship}
              {relationship?.relationship_to !== 0 ? (
                pageNow?.relationship === "Married" ? (
                  <span>to <strong>
                    <Link to={`/${relationship?.id}`}>
                      {relationship?.first_name} {relationship?.last_name}
                    </Link></strong>
                  </span>
                ) : pageNow?.relationship === "In a relationship" && (
                  <span> with
                    <Link to={`/${relationship.id}`}>
                      <strong className="cursor-pointer"> {relationship?.first_name} {relationship?.last_name}</strong>
                    </Link>

                  </span>
                )
              ) : null}</span>}
          </div>
        )}


        <div className="flex items-start gap-2 mt-3 text-sm">
          <span className="text-gray-400 inline">
            <MdCastConnected size={24} style={{ color: "#8C939D" }} />
          </span>
          <span>
            {" "}
            Followed by <strong>94 people</strong>
          </span>
        </div>
      </div>
      {/* <div className="grid grid-cols-3 mt-4 gap-2">
        <div className="flex flex-col">
          <div className="h-56 cursor-pointer flex items-center justify-center overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover" src="https://www.iloveasia.su/wp-content/uploads/2021/02/lisa.jpg" />
          </div>
          <div className="text-center">Featured</div>
        </div>
        <div className="flex flex-col">
          <div className="h-56 cursor-pointer flex items-center justify-center overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover" src="https://pbs.twimg.com/media/Ex0Glp_WEAAcQ46?format=jpg&name=large" />
          </div>
          <div className="text-center">Featured</div>
        </div>
        <div className="flex flex-col">
          <div className="h-56 cursor-pointer flex items-center justify-center overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover" src="https://thuthuatnhanh.com/wp-content/uploads/2021/06/hinh-anh-Lisa-Black-Pink-o-concert.jpg" />
          </div>
          <div className="text-center">Featured</div>
        </div>
      </div> */}
    </div>
  );
}
