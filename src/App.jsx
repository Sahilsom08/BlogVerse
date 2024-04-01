import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import "./App.css";
import { login, logout } from "./store/authSlice";
import authServiceObj from "./appwrite/auth";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServiceObj
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div
      className="min-h-screen flex flex-wrap content-between"
    >
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
