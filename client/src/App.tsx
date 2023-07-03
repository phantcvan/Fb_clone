import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import User from "./pages/User";
import { getUser} from "./slices/whitelist";
import { getAllUsers, setAllUsers } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";



function App() {
  const [newNotifications, setNewNotifications] = useState<number>(5);
  const dispatch = useDispatch();
  const allUsers = useSelector(getAllUsers);
  const userNow = useSelector(getUser);

  const fetchDataUsers = async () => {
    try {
      const [usersResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/v1/users`),
      ]);
      dispatch(setAllUsers(usersResponse?.data.users));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    fetchDataUsers();
  },[])
console.log(allUsers);

  useEffect(() => {
    updateTitle();
  }, [newNotifications]);

  const updateTitle = () => {
    if (newNotifications > 0) {
      document.title = `(${newNotifications}) Clone Facebook`;
    } else {
      document.title = "Clone Facebook";
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/" element={<Home setNewNotifications={setNewNotifications} />} />
            <Route path="/:user" element={<Login />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
