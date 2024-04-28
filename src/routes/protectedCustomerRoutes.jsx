import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMemoizationUserCheck } from "../utils/memoizationUserCheck";

// eslint-disable-next-line react/prop-types
const ProtectedCustomerRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    const { memoizationIsLoggedIn, memoizationUserType } = useMemoizationUserCheck();

    useEffect(() => {
        if (!memoizationIsLoggedIn || memoizationUserType !== "customer") {
            navigate("/");
        } else {
            setToken(sessionStorage.getItem("token"));
        }
    }, [memoizationIsLoggedIn, memoizationUserType, navigate]);
    return memoizationIsLoggedIn && token && memoizationUserType === "customer" && (
        children ? children : <Outlet />
    )
};

export default ProtectedCustomerRoutes;