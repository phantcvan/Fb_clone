import { Scrollbars } from 'react-custom-scrollbars-2';

const SidebarRight = () => {
    return (
        <div className="flex flex-col flex-1 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D] pl-20">
            <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                <div>
                    <div className="px-5 w-[100%] my-2">
                        <div className="w-[100%] flex justify-between mt-3 mb-2 p-2">
                            <span className="text-base font-semibold">Friend requests</span>
                            <span className="text-fb-blue cursor-pointer">See all</span>
                        </div>
                        <div className="flex items-start rounded-md px-2">
                            <img src="http://localhost:5173/assets/person/2.jpeg" alt=""
                                className="w-14 h-14 rounded-full object-cover overflow-hidden " />
                            <div className="flex flex-col gap-2 w-[calc(100%-68px)] ml-3">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-semibold mb-1">John </span>
                                        <span className="text-xs text-fb-gray-text">3 mutual friends</span>
                                    </div>
                                    <span className="text-fb-gray-text">4d</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <button className="bg-blue-400 text-white px-4 py-2 rounded-md">
                                        Confirm
                                    </button>
                                    <button className="bg-gray-100 hover:bg-fb-gray px-5 py-2 rounded-md">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 w-[100%] mt-5 mb-3 ">
                        <span className="text-base pb-3 font-semibold px-2 mb-2">Contacts</span>
                        <div className="flex gap-4 pb-2 pt-3 cursor-pointer items-center px-2 hover:bg-fb-gray rounded-md">
                            <img src="http://localhost:5173/assets/person/3.jpeg" alt="avatar"
                                className="w-6 h-6 rounded-full object-cover overflow-hidden " />
                            <span>UserName</span>
                        </div>
                        <div className="flex gap-4 py-2 cursor-pointer items-center px-2 hover:bg-fb-gray rounded-md">
                            <img src="http://localhost:5173/assets/person/4.jpeg" alt="avatar"
                                className="w-6 h-6 rounded-full object-cover overflow-hidden " />
                            <span>UserName</span>
                        </div>
                        <div className="flex gap-4 py-2 cursor-pointer items-center px-2 hover:bg-fb-gray rounded-md">
                            <img src="http://localhost:5173/assets/person/5.jpeg" alt="avatar"
                                className="w-6 h-6 rounded-full object-cover overflow-hidden " />
                            <span>UserName</span>
                        </div>


                    </div>
                </div>

            </Scrollbars>
        </div>

    )
}

export default SidebarRight