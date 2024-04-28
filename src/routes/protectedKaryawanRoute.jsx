import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMemoizationUserCheck } from "../utils/memoizationUserCheck";

// eslint-disable-next-line react/prop-types
const ProtectedKaryawanRoutes = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    const { memoizationIsLoggedIn, memoizationUserType } = useMemoizationUserCheck();

    useEffect(() => {
        if (!memoizationIsLoggedIn) {
            navigate("/karyawan/login");
        }else if(memoizationUserType !== "karyawan"){
            navigate("/");
        } else {
            setToken(sessionStorage.getItem("token"));
        }
    }, [memoizationIsLoggedIn, memoizationUserType, navigate]);
    return memoizationIsLoggedIn && token && memoizationUserType && (
        children ? children : <Outlet />
    )
};

export default ProtectedKaryawanRoutes;