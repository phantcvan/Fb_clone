import { useState, useEffect } from 'react'
import { Mutual, Relation, UserType } from '../../static/types';
import "../../index.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getUser } from '../../slices/whitelist';
import { getRelation } from '../../slices/userSlice';


interface MiniProp {
  item: UserType;

}

const MiniMyRequest = ({ item }: MiniProp) => {
  const [relationHadMutual, setRelationHadMutual] = useState<Mutual | null>(null);
  const [canceled, setCanceled] = useState(false);
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
  }, []);
  const handleCancelRequest = () => {
    axios.delete(`http://localhost:8000/api/v1/relation/cancelRequest`, {
      data: {
        accept_id: item.id,
        request_id: userNow?.id
      },
    })
      .then(response => {
        console.log('API call successful:', response.data);
        setCanceled(true);
      })
      .catch(error => {
        console.error('API call failed:', error);
      });
  }
  return (
    <div>
      <div className='flex items-center gap-3 hover:bg-gray-100 p-3 rounded-md'>
        <div className='w-[60px] h-[60px] rounded-full '>
          <img src={item?.avatar} alt="" className='w-[60px] h-[60px] rounded-full object-cover overflow-hidden' />
        </div>
        <div className='flex flex-col justify-between flex-1 '>
          <div className='flex justify-between items-center w-full'>
            <span className='font-semibold mb-1 cursor-pointer'>
              {item?.first_name} {item?.last_name}
            </span>
          </div>
          {canceled
            ? <span className='text-[13px]'>Request canceled</span>
            : <span className='text-[13px]'>{relationHadMutual?.mutual} mutual friends</span>}

        </div>
        {!canceled
          && <div onClick={handleCancelRequest}>
            <button className='py-2 px-4 bg-fb-gray rounded-md'>Cancel request</button>
          </div>}

      </div>
    </div>
  )
}

export default MiniMyRequest