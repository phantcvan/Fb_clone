import React from 'react'
import { UserType } from '../../static/types';

interface MessComp {
  setChooseFriend: React.Dispatch<React.SetStateAction<number>>;
  user: UserType
}
const MessCompMini = ({ setChooseFriend, user }: MessComp) => {

  return (
    <div className="p-[10px] hover:bg-gray-100 rounded-md flex items-center gap-3"
      onClick={() => setChooseFriend(user?.id)}>
      <div className="h-14 w-14 ">
        <img src={user?.avatar} alt=""
          className="h-14 w-14 overflow-hidden object-cover rounded-full" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-semibold">{user?.first_name} {user?.last_name}</span>
        <span className="">Chị ơi</span>
      </div>
    </div>
  )
}

export default MessCompMini