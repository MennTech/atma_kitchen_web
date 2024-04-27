import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/isLoggedIn";

// eslint-disable-next-line react/prop-types
const ProtectedCustomerRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    useEffect(() => {
        if(!isLoggedIn()){
            navigate("/login");
        }else{
            setToken(sessionStorage.getItem("token"));
        }
    }, [navigate]);
    return token && (
        children ? children : <Outlet />
    )
};

export default ProtectedCustomerRoutes;