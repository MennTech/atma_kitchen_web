import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNavbar from "../components/TopNavbar";
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
        <div className="flex flex-col">
            <div className="flex-1">
                <TopNavbar routes={routes} isLoggedIn={loggedIn} />
                <Outlet />
            </div>   
            <Footer />
        </div>
    )
};

export default CustomerLayout;