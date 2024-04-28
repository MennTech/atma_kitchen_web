
import { Outlet,useNavigate} from "react-router-dom";
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
                    path: "/profile"
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
const HomeLayout = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen">
            <TopNavbar routes={routes} />
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => navigate('/bahan')}>Bahan Baku</button>
                <Outlet />
            <Footer />
        </div>
    )
};

export default HomeLayout;