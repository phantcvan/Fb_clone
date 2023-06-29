import React from 'react'
import Topbar from '../components/Topbar'
import SmallSidebar from '../components/SmallSidebar'

const User = () => {
  return (
    <div className=' '>
      <Topbar/>
      <div className="flex w-[100%]">
<SmallSidebar/>
      </div>
    </div>
  )
}

export default User