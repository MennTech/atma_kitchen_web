import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ProtectedCustomerRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    useEffect(() => {
        const userToken = sessionStorage.getItem("token");
        setToken(userToken);
        if (!userToken) {
            navigate("/");
        }
    }, [navigate]);
    return token && (
        children ? children : <Outlet />
    )
};

export default ProtectedCustomerRoutes;