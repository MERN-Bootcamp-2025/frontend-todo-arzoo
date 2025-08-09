import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUserFromToken } from "./redux/authSlice";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/DashBoardPage";


interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        // Check if token expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          navigate("/login");
        }
        else if(storedUser){
          dispatch(setUserFromToken(JSON.parse(storedUser)))
        }
        else {
          dispatch(
            setUserFromToken({
              user: decoded.id,
              role: decoded.role,
            })
          );
        }
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }else{
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
