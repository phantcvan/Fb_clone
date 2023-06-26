import { AiOutlineClose } from "react-icons/ai";

interface CheckInProps {
    setUploadPost: React.Dispatch<React.SetStateAction<boolean>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
  }

const CheckIn = ({ setUploadPost, setLocation }: CheckInProps) => {
  return (
    <div className='w-[100%] h-fit absolute left-0 bg-overlay-40 flex items-center 
    justify-center z-20'>
        <div className='w-[100%] h-[100%] fixed left-0 bg-overlay-40 flex items-center 
    justify-center z-21'
            onClick={() => setUploadPost(false)}
        >
        </div>
        <div
            className='login_box w-[450px] top-3 bottom-3 bg-white pt-4 flex flex-col
      fixed rounded-md z-25'
        >
            <div className='absolute top-2 right-2 cursor-pointer px-2'
                onClick={() => setUploadPost(false)}>
                <AiOutlineClose size={20} />
            </div>
            <p className='text-xl text-center font-semibold px-5 pt-1 pb-3'>
                Create post
            </p>
            <hr className="text-fb-dark" />
            <div className="w-full">
            </div>
            <div className="flex flex-row gap-3 m-3">
                <img src="http://localhost:5173/assets/person/1.jpeg" alt=""
                    className="w-10 h-10 rounded-full cursor-pointer object-cover" />
                <div className="flex flex-col "
                    onClick={() => setUploadPost(true)}>

                </div>
            </div>


        </div >
    </div >
  )
}

export default CheckIn