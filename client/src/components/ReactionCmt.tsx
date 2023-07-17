import { useEffect, useState } from "react";
import { Icon } from "../static/icon";
import Tippy from '@tippyjs/react/headless';
import { useSelector } from "react-redux";
import { getUser } from "../slices/whitelist";
import axios from "axios";
import { CmtReactionType, ReactionType } from "../static/types";

interface ReactionProps {
  cmtId: number | undefined;
  setNewCmtReaction: React.Dispatch<React.SetStateAction<boolean>>
}
const ReactionCmt = ({ cmtId, setNewCmtReaction }: ReactionProps) => {
  const userNow = useSelector(getUser);
  const [userCmtReaction, setUserCmtReaction] = useState<CmtReactionType | null>(null)


  // const visible = showIconCmt === cmtId ? true : false;
  // console.log("userCmtReaction", userCmtReaction);
  // console.log("showIconCmt", showIconCmt);



  const handleAddReaction = async (index: number) => {
    const reaction_type = Icon.Reaction[index].name.toLowerCase();
    try {
      const [userReactionResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/reaction/cmtId/${cmtId}/${userNow?.id}`)
      ]);
      setUserCmtReaction(userReactionResponse?.data?.reaction[0]);      
      if (userReactionResponse?.data?.reaction[0] && userReactionResponse?.data?.reaction[0].reaction_type !== reaction_type) {
        try {
          const [reactionResponse] = await Promise.all([
            axios.put(`http://localhost:8000/api/v1/reaction/cmtId/${cmtId}`, {
              user_id: userNow.id,
              reaction_type: reaction_type,
            })
          ]);
          setNewCmtReaction(pre => !pre);
        } catch (error) {
          console.error(error);
        }
      } else if ((userReactionResponse?.data?.reaction[0] && userReactionResponse?.data?.reaction[0].reaction_type === reaction_type)) {
        try {
          const [reactionResponse] = await Promise.all([
            axios.delete(`http://localhost:8000/api/v1/reaction/cmtId/${cmtId}/${userNow?.id}`, )
          ]);
          setNewCmtReaction(pre => !pre);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const [reactionResponse] = await Promise.all([
            axios.post(`http://localhost:8000/api/v1/reaction/cmtId/${cmtId}`, {
              user_id: userNow.id,
              reaction_type: reaction_type,
            })
          ]);
          setNewCmtReaction(pre => !pre);
        } catch (error) {
          console.error(error);
        }
      }

    } catch (error) {
      console.error(error);
    }
    // console.log("cmtId", cmtId);

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