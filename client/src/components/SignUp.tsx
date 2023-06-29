import { AiOutlineClose } from "react-icons/ai";
import "../index.css";
import { useState } from "react";

const SignUp = ({ setOpenSignUp }: { setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [dayInput, setDayInput] = useState(1);
    const [monthInput, setMonthInput] = useState(1);
    const [yearInput, setYearInput] = useState(0);
    const [gender, setGender] = useState(0);


    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    const dayOptions = days.map((day) => (
        <option key={day} value={day}>{day}</option>
    ));
    const handleChangeDay = (event: any) => {
        setDayInput(parseInt(event.target.value));
    };
    const months = [
        { label: 'Jan', value: 1 },
        { label: 'Feb', value: 2 },
        { label: 'Mar', value: 3 },
        { label: 'Apr', value: 4 },
        { label: 'May', value: 5 },
        { label: 'Jun', value: 6 },
        { label: 'Jul', value: 7 },
        { label: 'Aug', value: 8 },
        { label: 'Sep', value: 9 },
        { label: 'Oct', value: 10 },
        { label: 'Nov', value: 11 },
        { label: 'Dec', value: 12 }
    ];

    const handleChangeMonth = (event: any) => {
        setMonthInput(parseInt(event.target.value));
    };

    const monthOptions = months.map((month) => (
        <option key={month.value} value={month.value}>{month.label}</option>
    ));

    const currentYear = new Date().getFullYear();
    // setYearInput(currentYear)
    const startYear = 1905; // Năm bắt đầu
    console.log(yearInput);
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }
    const handleChangeYear = (event: any) => {
        setYearInput(parseInt(event.target.value));
    };

    const yearOptions = years.map((year) => (
        <option key={year} value={year}>{year}</option>
    ));
    return (
        <div className='w-[100%] h-[100%] absolute left-0 bg-overlay-40 flex items-center 
        justify-center z-20'>
            <div className='w-[100%] h-[100%] fixed left-0 bg-overlay-40 flex items-center 
        justify-center z-21'
                onClick={() => setOpenSignUp(false)}
            >
            </div>
            <div
                className='login_box w-[450px] top-3 bottom-3 bg-white pt-4 flex flex-col
          fixed rounded-md z-25'
            >
                <div className='absolute top-2 right-2 cursor-pointer px-2'
                    onClick={() => setOpenSignUp(false)}>
                    <AiOutlineClose size={20} />
                </div>
                <p className='text-3xl font-semibold px-5'>
                    Sign Up
                </p>
                <span className=" text-fb-gray-text mb-2 px-5">It's quick and easy.</span>
                <hr className="text-fb-dark" />
                <div className="w-full">
                    <form action="" method="post"
                        className='flex flex-col px-5 my-2'
                    //  onSubmit={handleAddVideo}
                    >
                        <div className="flex w-full gap-2 mt-2 mb-1">
                            <div className="bg-gray-100 basis-1/2 rounded-md">
                                <input type="text"
                                    className="bg-gray-100 pl-1 py-2 w-full border border-fb-dark outline-none rounded-md"
                                    placeholder="First name" />
                            </div>
                            <div className="bg-gray-100 basis-1/2  rounded-md">
                                <input type="text"
                                    className="bg-gray-100 pl-1 py-2 w-full border border-fb-dark outline-none rounded-md"
                                    placeholder="Surname" />
                            </div>
                        </div>
                        <div className="bg-gray-100 w-full rounded-md my-1">
                            <input type="text"
                                className="bg-gray-100 pl-1 py-2 w-full border border-fb-dark outline-none rounded-md"
                                placeholder="Mobile number or email address" />
                        </div>
                        <div className="bg-gray-100 w-full rounded-md my-1">
                            <input type="text"
                                className="bg-gray-100 pl-1 py-2 w-full border border-fb-dark outline-none rounded-md"
                                placeholder="New password" />
                        </div>
                        <span className="text-xs text-left">Date of birth</span>
                        <div className="flex w-full gap-2 mt-1 mb-2">
                            <select name="date" id="" value={dayInput} onChange={handleChangeDay}
                                className="flex basis-1/3 outline-none bg-gray-100 py-2 border border-fb-dark rounded-md">
                                {dayOptions}
                            </select>
                            <select name="month" id="" value={monthInput} onChange={handleChangeMonth}
                                className="flex basis-1/3 outline-none bg-gray-100 py-2 border border-fb-dark rounded-md">
                                {monthOptions}
                            </select>
                            <select name="year" id="" value={yearInput} onChange={handleChangeYear}
                                className="flex basis-1/3 outline-none bg-gray-100 py-2 border border-fb-dark rounded-md">
                                {yearOptions}
                            </select>
                        </div>
                        <span className="text-xs text-left">Gender</span>
                        <div className="flex w-full gap-2 mt-1 mb-1">
                            <div className='flex basis-1/3 justify-between gap-2 items-center bg-gray-100 border border-fb-dark rounded-md px-3 py-2 '>
                                <label htmlFor="gender">Female</label>
                                <input type="radio" value="Female" name='gender' className='w-3 h-3'
                                    onChange={() => setGender(1)} />
                            </div>
                            <div className='flex basis-1/3 justify-between gap-2 items-center bg-gray-100 border border-fb-dark rounded-md px-3 py-2 '>
                                <label htmlFor="gender">Male</label>
                                <input type="radio" value="Male" name='gender' className='w-3 h-3'
                                    onChange={() => setGender(0)} />
                            </div>
                        </div>
                        <span className="text-xs text-fb-gray-text my-1">
                            People who use our service may have uploaded your contact information to Facebook.
                        </span>
                        <span className="text-xs text-fb-gray-text my-1">
                            By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.
                        </span>
                        <button className={`bg-green rounded-md text-white text-lg font-semibold w-fit m-auto py-2 px-20 my-3`}>
                            Sign Up
                        </button>
                    </form>
                </div>
                <div>
                </div>


            </div >
        </div >
    )
}

export default SignUp