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
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Contact",
            path: "/contact"
        },
        {
            name: "Home",
            path: "/"
        }
    ]);

    // check if user is logged in
    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    useEffect(() => {
        if (loggedIn) {
            setRoutes([]);
        } else {
            setRoutes([
                {
                    name: "Home",
                    path: "/"
                },
                {
                    name: "About",
                    path: "/about"
                },
                {
                    name: "Contact",
                    path: "/contact"
                },
                {
                    name: "Login",
                    path: "/login"
                },
                {
                    name: "Register",
                    path: "/register"
                },
            ])
        }
    }, [loggedIn]);

    return (
        <div className="w-screen">
            <div className="w-full">
                <TopNavbar routes={routes} isLoggedIn={loggedIn} />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
};

export default HomeLayout;