import { useState } from "react";
import "../index.css";
import SignUp from "../components/SignUp";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "../slices/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openSignUp, setOpenSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [active, setActive] = useState(1);
    const [message, setMessage] = useState("");
    const [emailInput, setEmail] = useState("");
    const [passwordInput, setPassword] = useState("");
    const user = useSelector(getUser);
    if (user) navigate("/");
    const handleAddEmail = (e: any) => {
        setEmail(e.target.value);
        setMessage("");
    };
    const handleAddPassword = (e: any) => {
        setPassword(e.target.value);
        setMessage("");
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (emailInput.trim() === "") {
            setMessage("The email address you entered isn't connected to an account.")
        } else if (passwordInput === "") {
            setMessage("Please enter your password.")
        } else {
            await axios.post('http://localhost:8000/api/v1/users/login', {
                email: emailInput,
                password: passwordInput
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === 200) {
                        console.log('Đăng nhập thành công');
                        setMessage("");
                        dispatch(setUser(res.data.data));
                        navigate({
                            pathname: `/`,
                        })
                    }
                })
                .catch(error => console.log(error))
        }
    }
    console.log("user", user);

    return (
        <div className="bg-gray-100 w-[100%] h-screen">
            <div className="flex px-[142px] gap-8">
                <div className="w-[580px] flex flex-col items-start justify-start pt-[72px]">
                    <img src="/assets/fb-logo.png" alt=""
                        className="w-[300px] overflow-hidden object-cover mt-[90px]" />
                    <span className="text-[26px] pr-10 mt-1">Facebook helps you connect and share with the people in your life.</span>
                </div>
                <div className="login_box w-[400px] my-28 rounded-md pb-6" >
                    <form action="" method="post" onSubmit={handleLogin}>
                        <div className={`mx-3 border mt-3 w-[calc(100%-24px)] rounded-md ${active === 1 ? "border-fb-blue" : "border-fb-gray"}`}>
                            <input type="text" className="my-[14px] mx-4 w-[calc(100%-36px)] border-none outline-none bg-gray-100"
                                placeholder="Email address" onChange={handleAddEmail}
                                onClick={() => setActive(1)} />
                        </div>
                        <div className={`mx-3 border mt-3 w-[calc(100%-24px)] rounded-md flex
                        ${active === 2 ? "border-fb-blue" : "border-fb-gray"}`}>
                            <input type={`${showPassword ? "text" : "password"}`} 
                            className="my-[14px] mx-4 w-[calc(100%-48px)] border-none outline-none bg-gray-100"
                                placeholder="Password" onChange={handleAddPassword}
                                onClick={() => setActive(2)} />
                                <div className="flex items-center mr-1" onClick={()=>setShowPassword((pre:boolean)=>!pre)}>
                                    {showPassword
                                ? <AiFillEye size={22} />
                                : <AiFillEyeInvisible size={22} />}</div>
                            
                        </div>
                        {message
                            && <div className="mx-3 w-[calc(100%-24px)] text-red mt-3 font-semibold text-xs">
                                <span>{message}</span>
                            </div>}
                        <div className="mx-3 bg-fb-blue mt-3 w-[calc(100%-24px)] rounded-md">
                            <button className="my-[8px] mx-4 w-[calc(100%-36px)] border-none outline-none
                            bg-fb-blue text-xl text-white font-semibold cursor-pointer" >
                                Log in
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center my-4">
                        <span className="text-fb-blue cursor-pointer text-sm">Forgotten password?</span>
                    </div>
                    <hr className="mx-3 text-fb-dark mb-7 mt-2" />
                    <div className="mx-3 mt-3 flex items-center justify-center">
                        <div className="w-fit bg-green rounded-md py-2 px-4 cursor-pointer"
                            onClick={() => setOpenSignUp(true)}>
                            <span className="py-2 text-white text-xl font-semibold">Create new account</span>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                {openSignUp &&
                    <SignUp setOpenSignUp={setOpenSignUp} />}
            </div>
        </div>
    )
}

export default Login