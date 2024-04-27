import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

let routes = [
    {
        name: "Profile",
        path: "/profile"
    }
];

const CustomerLayout = () => {
    return (
        <div>   
            <TopNavbar routes={routes} />
            <Outlet />
            <Footer />
        </div>
    )
};

export default CustomerLayout;