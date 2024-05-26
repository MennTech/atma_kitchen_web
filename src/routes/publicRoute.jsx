import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("karyawan")) {
            navigate("/dashboard");
        }
        if (sessionStorage.getItem("token")) {
            if (sessionStorage.getItem("customer")) {
                navigate("/home");
            } else if (sessionStorage.getItem("karyawan")) {
                navigate("/dashboard");
            } else {
                sessionStorage.clear();
                navigate("/");
            }
        }
    }, [navigate]);
    return (
        children ? children : <Outlet />
)
};

export default PublicRoute;