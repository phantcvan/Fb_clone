import { useState, useEffect } from 'react'
import { Mutual, Relation, UserType } from '../../static/types';
import "../../index.css";
import moment from "moment";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../slices/whitelist';
import { getRelation } from '../../slices/userSlice';



interface MiniProp {
  item: UserType;
  setChooseFriend: React.Dispatch<React.SetStateAction<number>>;

}

const MiniFriend = ({ item, setChooseFriend }: MiniProp) => {
  const [relationHadMutual, setRelationHadMutual] = useState<Mutual | null>(null);
  const relation = useSelector(getRelation);
  const userNow = useSelector(getUser);



  const fetchMutualFriend = async () => {
    try {
      const [mutualResponse] = await Promise.all([
        axios.post(`http://localhost:8000/api/v1/relation/mutual-relations`, {
          user1: userNow?.id,
          user2: item.id
        })
      ])
      return mutualResponse?.data?.mutual?.length
    } catch (error) {
      console.error(error);
    }
  }
  const updateMutualFriends = async () => {
    for (let index = 0; index < relation.length; index++) {
      const id = item.id;
      const mutual = await fetchMutualFriend();

      const updatedRelation: Mutual = {
        id,
        mutual
      };
      setRelationHadMutual(updatedRelation);
    }
  };
  useEffect(() => {
    updateMutualFriends()

  }, [])
  console.log("relationHadMutual", relationHadMutual);



  // console.log("canceled", canceled, confirmed);
  return (
    <div className='flex items-center gap-3 hover:bg-gray-100 p-3 rounded-md'>
      <div className='w-[60px] h-[60px] rounded-full ' onClick={() => setChooseFriend(item?.id)}>
        <img src={item?.avatar} alt="" className='w-[60px] h-[60px] rounded-full object-cover overflow-hidden' />
      </div>
      <div className='flex flex-col justify-between flex-1 '>
        <div className='flex justify-between items-center w-full'>
          <span className='font-semibold mb-1 cursor-pointer' onClick={() => setChooseFriend(item?.id)}>
            {item?.first_name} {item?.last_name}
          </span>
        </div>
        <span>{relationHadMutual?.mutual} mutual friends</span>


      </div>
    </div>
  )
}
export default MiniFriend