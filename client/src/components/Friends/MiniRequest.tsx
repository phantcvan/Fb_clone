import { useState } from 'react'
import { Relation, UserType } from '../../static/types';
import "../../index.css";
import moment from "moment";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMess } from '../../slices/appSlice';
import { getUser } from '../../slices/whitelist';

interface MiniProp {
  item: UserType;
  request: Relation;
  setChooseFriend: React.Dispatch<React.SetStateAction<number>>;
}

const MiniRequest = ({ item, request, setChooseFriend }: MiniProp) => {
  const [canceled, setCanceled] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const userNow = useSelector(getUser)

  const dispatch = useDispatch();

  const timeRequest = (moment(request?.date_request).diff(moment(), 'days')) * -1
  // Đồng ý lời mời kết bạn
  const handleAddFriend = () => {
    axios.put(`http://localhost:8000/api/v1/relation/accept`, {
      request_id: item?.id,
      accept_id: userNow?.id
    })
      .then(response => {
        console.log('API call successful:', response.data);
        setConfirmed(true);
      })
      .catch(error => {
        console.error('API call failed:', error);
      });
  };
  // Từ chối lời mời kết bạn
  const handleRejectFriend = () => {
    axios.delete(`http://localhost:8000/api/v1/relation/cancelRequest`, {
      data: {
        accept_id: userNow?.id,
        request_id: item?.id
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
          {timeRequest > 0
            ? <span className="text-fb-gray-text text-xs">
              {timeRequest}d ago
            </span>
            : <span className="text-fb-gray-text text-xs">
              {moment(request?.date_request).fromNow()}
            </span>}
        </div>
        {confirmed && <span className='text-fb-gray-text text-xs'>Request accepted</span>}
        {canceled && <span className='text-fb-gray-text text-xs'>Request removed</span>}
        {(!confirmed && !canceled)
          && <div className="flex justify-between font-semibold gap-2">
            <button className="btn-primary"
              onClick={handleAddFriend}>
              Confirm
            </button>
            <button className="btn-reject"
              onClick={handleRejectFriend}>
              Delete
            </button>
          </div>}
        {/* : (canceled)
            ? <span className='text-fb-gray-text text-xs'>Request removed</span>
            : <span className='text-fb-gray-text text-xs'>Request accepted</span>} */}
      </div>
    </div>
  )
}

export default MiniRequest