import { AiOutlineClose } from "react-icons/ai";
import "../index.css";
import { useEffect, useState } from "react";
import Tippy from '@tippyjs/react/headless';


const SignUp = ({ setOpenSignUp }: { setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [dayInput, setDayInput] = useState(1);
    const [monthInput, setMonthInput] = useState(1);
    const [yearInput, setYearInput] = useState(0);
    const [first_name, setFirst_name] = useState("");
    const [first_name_check, setFirst_name_check] = useState(false);
    const [first_name_tippy, setFirst_name_tippy] = useState(false);
    const [last_name, setLast_name] = useState("");
    const [last_name_tippy, setLast_name_tippy] = useState(false);
    const [last_name_check, setLast_name_check] = useState(false);
    const [email, setEmail] = useState("");
    const [email_tippy, setEmail_tippy] = useState(false);
    const [email_check, setEmail_check] = useState(false);
    const [password, setPassword] = useState("");
    const [password_tippy, setPassword_tippy] = useState(false);
    const [password_check, setPassword_check] = useState(false);
    const [gender, setGender] = useState(-1);
    const [gender_tippy, setGender_tippy] = useState(false);
    const [gender_check, setGender_check] = useState(false);
    const [birthday, setBirthday] = useState("");
    const [birthday_tippy, setBirthday_tippy] = useState(false);
    const [birthday_check, setBirthday_check] = useState(false);



    const currentDay = new Date().getDate();


    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    const dayOptions = days.map((day) => (
        <option key={day} value={day}>{day}</option>
    ));
    const handleChangeDay = (event: any) => {
        setDayInput(parseInt(event.target.value));
        setBirthday_check(false);
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
    const currentMonth = new Date().getMonth() + 1;
    console.log("currentMonth", currentMonth);
    const handleChangeMonth = (event: any) => {
        setMonthInput(parseInt(event.target.value));
        setBirthday_check(false);
    };

    const monthOptions = months.map((month) => (
        <option key={month.value} value={month.value}>{month.label}</option>
    ));

    const currentYear = new Date().getFullYear();
    // setYearInput(currentYear)
    const startYear = 1905; // Năm bắt đầu
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }
    const handleChangeYear = (event: any) => {
        setYearInput(parseInt(event.target.value));
        setBirthday_check(false);
    };

    const yearOptions = years.map((year) => (
        <option key={year} value={year}>{year}</option>
    ));
    useEffect(() => {
        setDayInput(currentDay);
        setMonthInput(currentMonth);
        setYearInput(currentYear);
    }, [])

    // validate email
    function isValidEmail(email: string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    // validate password
    function isValidPassword(password: string) {
        const minLength = 6;
        const maxLength = 20;
        const passwordLength = password.trim().length;
        return passwordLength >= minLength && passwordLength <= maxLength;
    }
    // validate birthday
    console.log("check year", yearInput, currentYear);
    console.log("check month", monthInput, currentMonth);
    console.log("check day", dayInput, currentDay);

    function validateBirthday() {
        if (yearInput === currentYear && monthInput === currentMonth && dayInput === currentDay) {
            return false;
        } else if (yearInput > currentYear) {
            return false;
        } else if (yearInput === currentYear && monthInput > currentMonth) {
            return false;
        } else if (yearInput === currentYear && monthInput === currentMonth && dayInput > currentDay) {
            return false;
        } else return true;

    }

    // Khi click vào input -> ẩn tippy
    const handleAddInput = () => {
        setFirst_name_tippy(false);
        setLast_name_tippy(false);
        setEmail_tippy(false);
        setPassword_tippy(false);
        setGender_tippy(false);
        setBirthday_tippy(false);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // validate

        if (first_name.replace(/\s+/g, " ").trim() === "") setFirst_name_check(true);
        if (last_name.replace(/\s+/g, " ").trim() === "") setLast_name_check(true);
        if (isValidEmail(email) === false) setEmail_check(true);
        if (isValidPassword(password) === false) setPassword_check(true);
        if (validateBirthday() === false) setBirthday_check(true);
        if (gender < 0) setGender_check(true);

        if (first_name.replace(/\s+/g, " ").trim() === "") return setFirst_name_tippy(true);
        else if (last_name.replace(/\s+/g, " ").trim() === "") return setLast_name_tippy(true);
        else if (isValidEmail(email) === false) return setEmail_tippy(true);
        else if (isValidPassword(password) === false) return setPassword_tippy(true);
        else if (validateBirthday() === false) return setBirthday_tippy(true);
        else if (gender < 0) return setGender_tippy(true);




        //     const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        //     return setBirthday(formattedDate);

    }
    console.log("B-C", birthday_check);

    console.log("first_name", first_name);


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
                        onSubmit={handleSubmit}
                    >
                        <div className="flex w-full gap-2 mt-2 mb-1">
                            <div className="bg-gray-100 basis-1/2 rounded-md relative">
                                <input type="text"
                                    onChange={(e: any) => {
                                        setFirst_name(e.target.value);
                                        setFirst_name_tippy(false); setFirst_name_check(false)
                                    }}
                                    className={`pl-1 py-2 w-full bg-gray-100 border outline-none rounded-md 
                                    ${first_name_check ? "border-red-1" : "border-fb-dark"}`}
                                    placeholder="First name" />
                                {first_name_tippy
                                    && <div className={`bg-alert py-2 px-3 h-fit rounded-md text-white absolute top-0 left-[-140px]`} >
                                        <div className="w-[14px] h-[14px] bg-alert transform rotate-45 origin-top-left absolute right-[-12px] top-[6px] z-10"></div>
                                        <p className="text-xs z-20">What's your name?</p>
                                    </div>}
                            </div>
                            <div className="bg-gray-100 basis-1/2 relative rounded-md">
                                <input type="text" onClick={handleAddInput}
                                    onChange={(e: any) => {
                                        setLast_name(e.target.value);
                                        setLast_name_tippy(false); setLast_name_check(false)
                                    }}
                                    className={`pl-1 py-2 w-full bg-gray-100 border outline-none rounded-md 
                                    ${last_name_check ? "border-red-1" : "border-fb-dark"}`}
                                    placeholder="Surname" />
                                {last_name_tippy
                                    && <div className={`bg-alert py-2 px-2 h-fit rounded-md text-white absolute bottom-[-52px] z-20`} >
                                        <div className="w-[14px] h-[14px] bg-alert transform rotate-45 origin-top-left absolute left-[25px] top-[-9px] z-10"></div>
                                        <p className="text-xs z-20">What's your name?</p>
                                    </div>}
                            </div>
                        </div>
                        <div className="bg-gray-100 w-full rounded-md my-1 relative">
                            <input type="text" onClick={handleAddInput}
                                onChange={(e: any) => {
                                    setEmail(e.target.value);
                                    setEmail_tippy(false); setEmail_check(false)
                                }}
                                className={`pl-1 py-2 w-full bg-gray-100 border outline-none rounded-md 
                                ${email_check ? "border-red-1" : "border-fb-dark"}`}
                                placeholder="Email address" />
                            {email_tippy
                                && <div className={`bg-alert py-2 px-2 h-fit rounded-md text-white absolute top-0 left-[-233px]`} >
                                    <div className="w-[14px] h-[14px] bg-alert transform rotate-45 origin-top-left absolute right-[-13px] top-[10px] z-10"></div>
                                    <p className="text-xs z-20">
                                        You'll use this when you log in and if <br /> you ever need to reset your password.
                                    </p>
                                </div>}
                        </div>
                        <div className="bg-gray-100 w-full rounded-md my-1 relative">
                            <input type="text" onClick={handleAddInput}
                                onChange={(e: any) => {
                                    setPassword(e.target.value);
                                    setPassword_tippy(false); setPassword_check(false)
                                }}
                                className={`pl-1 py-2 w-full bg-gray-100 border outline-none rounded-md 
                                ${password_check ? "border-red-1" : "border-fb-dark"}`}
                                placeholder="New password" />
                            {password_tippy
                                && <div className={`bg-alert py-2 px-2 h-fit rounded-md text-white absolute top-0 left-[-233px]`} >
                                    <div className="w-[14px] h-[14px] bg-alert transform rotate-45 origin-top-left absolute right-[-13px] top-[10px] z-10"></div>
                                    <p className="text-xs z-20">
                                        Password must be between 6 and 20 <br /> characters in length.
                                    </p>
                                </div>}
                        </div>
                        <span className="text-xs text-left">Date of birth</span>
                        <div className="flex w-full gap-2 mt-1 mb-2 relative">
                            <select name="date" id="" value={dayInput} onChange={handleChangeDay} onClick={handleAddInput}
                                className="flex basis-1/3 outline-none bg-gray-100 py-2 border border-fb-dark rounded-md">
                                {dayOptions}
                            </select>
                            <select name="month" id="" value={monthInput} onChange={handleChangeMonth} onClick={handleAddInput}
                                className="flex basis-1/3 outline-none bg-gray-100 py-2 border border-fb-dark rounded-md">
                                {monthOptions}
                            </select>
                            <select name="year" id="" value={yearInput} onChange={handleChangeYear} onClick={handleAddInput}
                                className="flex basis-1/3 outline-none bg-gray-100 py-2 border border-fb-dark rounded-md">
                                {yearOptions}
                            </select>
                        </div>
                        <span className="text-xs text-left">Gender</span>
                        <div className="flex w-full gap-2 mt-1 mb-1">
                            <div className='flex basis-1/3 justify-between gap-2 items-center bg-gray-100 border border-fb-dark rounded-md px-3 py-2 '>
                                <label htmlFor="female">Female</label>
                                <input type="radio" value="Female" name='gender' className='w-3 h-3'
                                    onChange={() => setGender(1)} id="female" />
                            </div>
                            <div className='flex basis-1/3 justify-between gap-2 items-center bg-gray-100 border border-fb-dark rounded-md px-3 py-2 '>
                                <label htmlFor="male">Male</label>
                                <input type="radio" value="Male" name='gender' className='w-3 h-3'
                                    onChange={() => setGender(0)} id="male" />
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