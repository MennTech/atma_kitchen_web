import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/userCheck";

const HomeLayout = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [routes, setRoutes] = useState([
        {
            name: "Login",
            path: "/login"
        },
        {
            name: "Register",
            path: "/register"
        }
    ]);

    // check if user is logged in
    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    useEffect(() => {
        if (loggedIn) {
            setRoutes([
                {
                    name: "Profile",
                    path: "/customer/profile"
                }
            ]);
        } else {
            setRoutes([
                {
                    name: "Login",
                    path: "/login"
                },
                {
                    name: "Register",
                    path: "/register"
                }
            ])
        }
    }, [loggedIn]);

    return (
        <div className="flex flex-col">
            <div className="flex-1">
                <TopNavbar routes={routes} />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
};

export default HomeLayout;