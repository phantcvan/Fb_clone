// import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useSelector } from 'react-redux';
import { getUser} from "./slices/userSlice";




const PrivateRoute = ()=>{
    const user = useSelector(getUser);
    // const user = true;

  return (
    user?<Outlet/>:<Navigate to="/login"/>
 )
}

export default PrivateRoute