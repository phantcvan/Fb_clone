

const MessengerComp = () => {


  return (
    <div className="flex flex-row gap-3 items-center hover:bg-gray-100 rounded-md p-2 cursor-pointer">
      <div className="w-14 h-14 rounded-full">
        <img src="/assets/person/1.jpeg" alt=""
          className="w-full h-14 rounded-full cursor-pointer object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">USERNAME</span>
        <span className="text-xs">Em ơi · 5m</span>
      </div>
    </div>
  )
}

export default MessengerComp