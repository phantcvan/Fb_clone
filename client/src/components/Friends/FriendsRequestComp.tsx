import { useState } from 'react'
import { UserType } from '../../static/types'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../slices/whitelist';
import axios from 'axios';

interface FRC {
  item: UserType;
}

const FriendsRequestComp = ({ item}: FRC) => {
  const [canceled, setCanceled] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const dispatch = useDispatch();
  const userNow = useSelector(getUser);

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


  return (
    <div style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
      className="rounded-xl overflow-hidden border border-fb-gray content-box">
      <div className="aspect-square flex items-center justify-center">
        <img className="object-cover w-full aspect-square"
          src={item?.avatar} />
      </div>
      <div className="p-3 bg-white">
        <span className="text-[17px] font-semibold">
          {item?.first_name} {item?.last_name}
        </span>
        {confirmed && <div className="flex flex-col gap-2 mt-3">
          <button className="bg-[#E4E6EB] px-5 py-2 rounded-md mt-12">Request accepted</button>
        </div>}
        {canceled && <div className="flex flex-col gap-2 mt-3">
          <button className="bg-[#E4E6EB] px-5 py-2 rounded-md mt-12">Request removed</button>
        </div>}
        {(!confirmed && !canceled)
          && <div className="flex flex-col gap-2 mt-3">
            <button className="btn-primary " onClick={handleAddFriend}>Confirm</button>
            <button className="btn-reject">Delete</button>
          </div>}


      </div>
    </div>
  )
}

export default FriendsRequestComp