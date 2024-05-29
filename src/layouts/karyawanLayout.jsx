import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdBadge } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { TbPackageImport } from "react-icons/tb";
import { LuPackagePlus } from "react-icons/lu";
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
                path: "/dashboard/pembelian-bahan-baku",
                icon: <TbPackageImport size={24}/>
               },
               {
                name: "Karyawan",
                path: "/dashboard/karyawan",
                icon: <FaUsers size={24}/>
               },
               {
                name: "Penitip",
                path: "/dashboard/penitip",
                icon: <BsFillPersonLinesFill size={24}/>
               },
               {
                name: "Pengeluaran Lain",
                path: "/dashboard/pengeluaranLain",
                icon: <GiExpense size={24}/>
               },
               {
                name: "Jabatan",
                path: "/dashboard/jabatan",
                icon: <MdBadge size={24}/>
               },
               {
                name: "Pesanan",
                path: "/dashboard/pesanan-valid",
                icon: <LuPackagePlus size={24}/>
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