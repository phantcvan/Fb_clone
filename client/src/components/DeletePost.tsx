import "../index.css";
import { useDispatch } from 'react-redux';
import { setActionPost } from '../slices/postSlice';
import { AiOutlineClose } from 'react-icons/ai';

const DeletePost = () => {
  const dispatch = useDispatch()

  return (
    <div className='w-full absolute top-0 z-[60] min-h-screen bg-overlay-40 flex items-center justify-center '>

      <div className='w-[100%] h-[100%] fixed top-0 left-0 bg-overlay-40 flex items-center 
        justify-center z-[60]'
        onClick={() => { dispatch(setActionPost(0)); dispatch(setActionPost(0)) }} >
        <div className={`login_box w-[450px] top-20 bg-white pt-4 flex flex-col 
                fixed rounded-md z-[70]`}>
        <div className='absolute top-2 right-2 cursor-pointer px-2'
          onClick={() => { dispatch(setActionPost(0)); dispatch(setActionPost(0)) }}>
          <AiOutlineClose size={20} />
        </div>
abd

          </div>
      </div>
    </div>
  )
}

export default DeletePost