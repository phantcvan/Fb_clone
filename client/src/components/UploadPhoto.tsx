import React from 'react'
import { BiArrowBack } from 'react-icons/bi'


interface Upload {
  setSelectAddOn: React.Dispatch<React.SetStateAction<number>>;
}
const UploadPhoto = ({setSelectAddOn}: Upload) => {

  
  return (
    <div className='login_box w-[450px] top-20 bg-white pt-4 flex flex-col 
    fixed rounded-md z-[80]'>
      <div className="flex items-center mx-3 mt-1 mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectAddOn(0)}>
                        <BiArrowBack size={20} style={{ color: "#606770" }} />
                    </div>
                    <p className='text-xl font-semibold flex flex-1 items-center justify-center'>
                        Post Audience
                    </p>
                </div>
      UploadPhoto
    </div>
  )
}

export default UploadPhoto