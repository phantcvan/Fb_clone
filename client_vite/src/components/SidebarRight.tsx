import { Scrollbars } from 'react-custom-scrollbars-2';

const SidebarRight = () => {
    return (
        <div className="flex flex-col basis-1/3 h-[calc(100vh-50px)] text-sm gap-2 text-[#1D1D1D] pl-32">
            <Scrollbars autoHide style={{ width: '100%', height: '100%', overflow: "hidden" }}>
                <div>

                    <div className="px-5 w-[100%] my-2">
                        <div className="w-[100%] flex justify-between my-3">
                            <span className=" font-semibold">Friend requests</span>
                            <span className="text-fb-blue cursor-pointer">See all</span>
                        </div>
                        <div className="flex items-start">
                            <img src="http://localhost:5173/assets/person/2.jpeg" alt=""
                                className="w-14 h-14 rounded-full object-cover overflow-hidden " />
                            <div className="flex flex-col gap-2 w-[calc(100%-60px)] ml-2">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-semibold mb-1">John </span>
                                        <span className="text-xs text-fb-gray-text">3 mutual friends</span>
                                    </div>
                                    <span>4d</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <button className="bg-fb-blue text-white px-3 py-2 rounded-md">
                                        Confirm
                                    </button>
                                    <button className="bg-fb-gray-light hover:bg-fb-gray px-4 py-2 rounded-md">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 w-[100%] mt-4 mb-3">
                        <span className=" mb-3 font-semibold">Contacts</span>
                        <div className="hover:bg-fb-gray flex gap-2 p-2 w-[100%] rounded-md cursor-pointer">
                            <img src="http://localhost:5173/assets/person/3.jpeg" alt="avatar"
                                className="w-5 h-5 rounded-full object-cover overflow-hidden " />
                            <span>UserName</span>
                        </div>
                        <div className="hover:bg-fb-gray flex gap-2 p-2 w-[100%] rounded-md cursor-pointer">
                            <img src="http://localhost:5173/assets/person/3.jpeg" alt="avatar"
                                className="w-5 h-5 rounded-full object-cover overflow-hidden " />
                            <span>UserName</span>
                        </div>
                        <div className="hover:bg-fb-gray flex gap-2 p-2 w-[100%] rounded-md cursor-pointer">
                            <img src="http://localhost:5173/assets/person/3.jpeg" alt="avatar"
                                className="w-5 h-5 rounded-full object-cover overflow-hidden " />
                            <span>UserName</span>
                        </div>


                    </div>
                </div>

            </Scrollbars>
        </div>

    )
}

export default SidebarRight