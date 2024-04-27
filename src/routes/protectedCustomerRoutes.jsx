import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn, userTypes } from "../utils/userCheck";

// eslint-disable-next-line react/prop-types
const ProtectedCustomerRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    useEffect(() => {
        if (!isLoggedIn() || userTypes() !== "customer") {
            navigate("/");
        } else {
            setToken(sessionStorage.getItem("token"));
        }
    }, [navigate]);
    return token && (
        children ? children : <Outlet />
    )
};

export default ProtectedCustomerRoutes;