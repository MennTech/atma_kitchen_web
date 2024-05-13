import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNavbarLogin from "../components/TopNavbarLogin";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/userCheck";

let routes = [
    {
        name: "Profile",
        path: "/customer/profile"
    },
];

const CustomerLayout = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    return (
        <div className="w-screen">
            <div className="w-full">
                <TopNavbarLogin routes={routes} isLoggedIn={loggedIn} />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
};

export default CustomerLayout;