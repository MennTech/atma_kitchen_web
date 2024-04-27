import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/isLoggedIn";
// eslint-disable-next-line react/prop-types
const ProtectedKaryawanRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    useEffect(() => {
        if(!isLoggedIn()){
            navigate("/karyawan/login");
        }else{
            setToken(sessionStorage.getItem("token"));
        }
    }, [navigate]);
    return token && (
        children ? children : <Outlet />
    )
};

export default ProtectedKaryawanRoutes;