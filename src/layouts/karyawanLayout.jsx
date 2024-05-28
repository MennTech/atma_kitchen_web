import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner';
import {BahanBakuIcon,CustomerIcon,HampersIcon,ProdukIcon,ResepIcon, PesananIcon} from "../components/Icon/icon"

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
                    name:"Pesanan Masuk",
                    path:"/dashboard/pesanan",
                    icon: <PesananIcon/>
                },
                {
                    name: "Bahan Baku",
                    path: "/dashboard/bahan",
                    icon: <BahanBakuIcon/>
                },
                {
                    name: "Produk",
                    path: "/dashboard/produk",
                    icon: <ProdukIcon/>
                },
                {
                    name: "Hampers",
                    path: "/dashboard/hampers",
                    icon: <HampersIcon/>
                },
                {
                    name: "Resep",
                    path: "/dashboard/resep",
                    icon: <ResepIcon/>
                },
                {
                    name: "Customer",
                    path: "/dashboard/customer",
                    icon: <CustomerIcon/>
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
                name: "Penitip",
                path: "/dashboard/penitip"
               },
               {
                name: "Pengeluaran Lain",
                path: "/dashboard/pengeluaranLain"
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
        <div className="flex flex-row h-screen bg-[#FEFFFF]">
            <Toaster richColors position="top-center"/>
            <Sidebar routes={routes} />
            <Outlet />
        </div>
    )
}

export default KaryawanLayout;