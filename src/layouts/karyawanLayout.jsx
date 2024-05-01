import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

const KaryawanLayout = () => {
    const [role, setRole] = useState("");
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        const karyawanRole = sessionStorage.getItem("role");
        setRole(karyawanRole);
    }, []);

    useEffect(() => {
        if (role === "Admin"){
            setRoutes([
                {
                    name: "Produk",
                    path: "/dashboard/produk"
                },
                {
                    name: "Hampers",
                    path: "/dashboard/hampers"
                },
            ])
        }else if (role === "Manager Operational"){
            setRoutes([
                {
                    name: "Bahan Baku",
                    path: "/dashboard/bahan"
                }
                /*
                 isi routes untuk Manager Operasional
                */
            ])
        }else if (role === "Owner"){
                /*
                 isi routes untuk Owner
                */
        }else{
            setRoutes([]);
        }
    }, [role])
    return (
        <div className="flex flex-row h-screen">
            <Sidebar routes={routes} />
            <Outlet />
        </div>
    )
}

export default KaryawanLayout;