import { useState } from 'react'
import { IoMdSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { getUser } from '../slices/whitelist';

const AddComment = () => {
  const userNow = useSelector(getUser);
  const [comment, setComment] = useState("");
  const handleTextareaChange = (event: any) => {
    const { value } = event.target;
    setComment(value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    // console.log(event.target.scrollHeight);
  };

  return (
    <div className=" mx-auto gap-2 m-2 m flex w-[90%] items-center">
      <div className={`w-8 h-8 box-content rounded-full flex items-center
  justify-center cursor-pointer overflow-hidden`}>
        <img
          className="object-cover w-8 h-8"
          src={userNow?.avatar}
        />
      </div>
      <div className="flex-1 h-fit text-fb-gray-text bg-gray-100 rounded-xl flex items-center">
        <textarea onChange={handleTextareaChange} value={comment}
          // onChange={handleInputKeyword} onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Write a comment... "
          className="border-none outline-none bg-gray-100 text-black px-2 rounded-xl w-[93%]
    resize-none pt-1" />
        <p>
          <IoMdSend size={20}
            style={{
              color: comment ? '#0571ED' : '#BEC3C9',
              cursor: comment ? 'pointer' : 'not-allowed',
            }} />
        </p>
      </div>
    </div>

  )
}

export default AddComment