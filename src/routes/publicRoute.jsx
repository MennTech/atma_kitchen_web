import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
    return (
        children ? children : <Outlet />
)
};

export default PublicRoute;