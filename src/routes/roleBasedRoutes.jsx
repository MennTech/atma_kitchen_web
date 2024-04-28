import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RoleBasedRoute = ({ children, allowedRoles }) => {
    const userRole = sessionStorage.getItem("role");

    // eslint-disable-next-line react/prop-types
    return allowedRoles.includes(userRole) ? (
        children ? children :
        <Outlet />
    ) : (
        <Navigate to={"/dashboard"} replace/>
    );
};

export default RoleBasedRoute;