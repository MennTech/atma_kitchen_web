import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner';

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
                    name: "Bahan Baku",
                    path: "/dashboard/bahan"
                },
                {
                    name: "Produk",
                    path: "/dashboard/produk"
                },
                {
                    name: "Hampers",
                    path: "/dashboard/hampers"
                },
                {
                    name: "Pembelian Bahan Baku",
                    path: "/dashboard/pembelian-bahan-baku"
                },
                {
                    name: "Resep",
                    path: "/dashboard/resep"
                }
            ])
        }else if (role === "Manager Operational"){
            setRoutes([
                /*
                 isi routes untuk Manager Operasional
                */
               {
                name: "Pembelian Bahan Baku",
                path: "/dashboard/pembelian-bahan-baku"
               },
               {
                name: "Karyawan",
                path: "/dashboard/karyawan"
               },
               {
                name: "Jabatan",
                path: "/dashboard/jabatan"
               }
            ])
        }else if (role === "Owner"){
                setRoutes([
                    {
                        name: "Jabatan",
                        path: "/dashboard/owner/jabatan"
                    },
                    {
                        name: "Karyawan",
                        path: "/dashboard/owner/karyawan"
                    },
                ])
        }else{
            setRoutes([]);
        }
    }, [role])
    return (
        <div className="flex flex-row h-screen">
            <Toaster richColors position="top-center"/>
            <Sidebar routes={routes} />
            <Outlet />
        </div>
    )
}

export default KaryawanLayout;