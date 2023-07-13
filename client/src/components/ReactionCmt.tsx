import { useState } from "react";
import { Icon } from "../static/icon";
import Tippy from '@tippyjs/react/headless';
import { useSelector } from "react-redux";
import { getUser } from "../slices/whitelist";
import axios from "axios";
import { ReactionType } from "../static/types";

interface ReactionProps {
  cmtId: number;
}
const ReactionCmt = ({ cmtId}: ReactionProps) => {
  const userNow = useSelector(getUser);
  // const visible = showIconCmt === cmtId ? true : false;
  // console.log("visible", visible);
  // console.log("showIconCmt", showIconCmt);



  const handleAddReaction = async (index: number) => {
    const reaction_type = Icon.Reaction[index].name.toLowerCase();
    // console.log("reaction_type", reaction_type);
    // console.log("cmtId", cmtId);
    // if (userNowReaction) {
    //   try {
    //     const [reactionResponse] = await Promise.all([
    //       axios.put(`http://localhost:8000/api/v1/reaction/${postId}`, {
    //         user_id: userNow.id,
    //         reaction_type: reaction_type,
    //       })
    //     ]);
    //     setUserNowReaction(reaction_type);
    //     setUserNowReactionImg(Icon.Reaction[index].static);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   try {
    //     const [reactionResponse] = await Promise.all([
    //       axios.post(`http://localhost:8000/api/v1/reaction/${postId}`, {
    //         user_id: userNow.id,
    //         reaction_type: reaction_type,
    //       })
    //     ]);
    //     setUserNowReaction(reaction_type);
    //     setUserNowReactionImg(Icon.Reaction[index].static);
    //     const id=Math.floor(Math.random()*10000000000)
    //     const newReaction = {
    //       id: id,
    //       post_id: postId,
    //       user_id: userNow?.id,
    //       reaction_type: reaction_type
    //     }
    //     setReactions((pre)=>[...pre, newReaction])
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

  }


  return (
    <div className="absolute bottom-10 left-0 p-[2px] bg-white rounded-3xl shadow-xl flex z-40">
      {Icon.Reaction.map((item, index) => (
        <Tippy key={index} interactive
          render={attrs => (
            <div className={`box addOn-box py-1 px-2 bg-fb-dark-2 text-white rounded-lg cursor-pointer text-xs`}
              {...attrs}>
              {item.name}
            </div>)}>
          <div className={``}
            onClick={() => handleAddReaction(index)}
            key={index}>
            <div className="flex p-[2px] cursor-pointer items-center relative">
              <div className="h-10 w-10 rounded-full overflow-hidden object-cover">
                <img src={item.iconURL} alt="" />
              </div>
            </div>
          </div>
        </Tippy>
      ))}
    </div>
  )
}

export default ReactionCmt