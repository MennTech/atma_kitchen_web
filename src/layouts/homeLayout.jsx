import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/userCheck";
import { HomeIcon,ContactIcon,AboutIcon,LoginIcon,RegisterIcon } from "../components/Icon/icon";

const HomeLayout = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [routes, setRoutes] = useState([
        {
            name: "Login",
            path: "/login",
            icon: <LoginIcon />
        },
        {
            name: "Register",
            path: "/register",
            icon: <RegisterIcon />
        },
        {
            name: "About",
            path: "/about",
            icon: <AboutIcon />
        },
        {
            name: "Contact",
            path: "/contact",
            icon: <ContactIcon />
        },
        {
            name: "Home",
            path: "/",
            icon: <HomeIcon />,
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
                    path: "/",
                    icon: <HomeIcon />,
                },
                {
                    name: "About",
                    path: "/about",
                    icon: <AboutIcon />
                    
                },
                {
                    name: "Contact",
                    path: "/contact",
                    icon: <ContactIcon />
                },
                {
                    name: "Sign In",
                    path: "/login",
                    icon: <LoginIcon />
                },
                {
                    name: "Sign Up",
                    path: "/register",
                    icon: <RegisterIcon />
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