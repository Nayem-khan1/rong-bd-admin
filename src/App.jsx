import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";

import List from "./pages/Products/List";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/OtherPage/NotFound";
import Home from "./pages/Dashboard/Home";
import { useAuth } from "./context/AuthContext";
import Add from "./pages/Products/Add";
import Order from "./pages/Order/Order";
import UserManage from "./pages/UserManage/UserManage";
import SignIn from "./pages/AuthPages/SignIn";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "৳";

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <ScrollToTop />
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </>
          ) : (
            <>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/users" element={<UserManage />} />
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
