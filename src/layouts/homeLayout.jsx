import { Outlet,useNavigate} from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/isLoggedIn";

let routes = [];
// check if user is logged in or not
if (!isLoggedIn()) {
    // if user is not logged in, show login and register routes
    routes = [
        {
            name: "Login",
            path: "/login"
        },
        {
            name: "Register",
            path: "/register"
        }
    ]
} else {
    // if user is logged in, show profile route
    routes = [
        {
            name: "Profile",
            path: "/profile"
        }
    ]
}

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