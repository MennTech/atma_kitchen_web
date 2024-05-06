import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";

let routes = [
    {
        name: "Profile",
        path: "/customer/profile"
    },
];

const CustomerLayout = () => {
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

export default CustomerLayout;