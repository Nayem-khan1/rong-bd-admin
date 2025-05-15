import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";

import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/OtherPage/NotFound";
import Home from "./pages/Dashboard/Home";
import { useAuth } from "./context/AuthContext";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "৳";

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop />
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login/>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add/>} />
                <Route path="/list" element={<List/>} />
                <Route path="/orders" element={<Order/>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
