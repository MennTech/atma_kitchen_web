import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/userCheck";
import HomeContent from "./homeContent";
import { HomeIcon,ProdukIcon,AboutIcon,LoginIcon,RegisterIcon } from "../components/Icon/icon";
import "../../src/app.css";

const HomeLayout = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const [routes, setRoutes] = useState([]);

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
                    id:"home",
                    icon: <HomeIcon />,
                },
                {
                    name: "Produk",
                    id: "produk",
                    icon: <ProdukIcon />
                },
                {
                    name: "About",
                    id: "about",
                    icon: <AboutIcon />
                    
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
        <div className="overflow-x-hidden">
            <TopNavbar routes={routes} isLoggedIn={loggedIn}/>
            {location.path === "/" ? <HomeContent/> : <Outlet/>}
            <Footer /> 
        </div>
            
    )
};

export default HomeLayout;