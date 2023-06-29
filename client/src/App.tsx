import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import User from "./pages/User";




function App() {
  const [newNotifications, setNewNotifications] = useState<number>(5);
  const [originalTitle, setOriginalTitle] = useState<string>('Clone Facebook');

  useEffect(() => {
    updateTitle();
  }, [newNotifications]);

  const updateTitle = () => {
    if (newNotifications > 0) {
      document.title = `(${newNotifications}) ${originalTitle}`;
    } else {
      document.title = originalTitle;
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path="" element={<PrivateRoute />}>
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
