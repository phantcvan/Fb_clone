import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import User from "./pages/User";
import { getUser } from "./slices/whitelist";
import { getAllUsers, setAllUsers } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Search from "./pages/Search";
import Friends from "./pages/Friends";
import Messenger from "./pages/Messenger";



function App() {
  const dispatch = useDispatch();
  // const allUsers = useSelector(getAllUsers);
  // const userNow = useSelector(getUser);

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
  useEffect(() => {
    fetchDataUsers();
  }, [])
  // console.log(allUsers);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/messages/t" element={<Messenger />} />
            <Route path="/search" element={<Search />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
