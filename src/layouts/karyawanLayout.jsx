import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdBadge } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { TbPackageImport, TbPackageExport, TbReportAnalytics, TbReport  } from "react-icons/tb";
import { LuPackagePlus } from "react-icons/lu";
import { FaClockRotateLeft, FaArrowsRotate } from "react-icons/fa6";
import {BahanBakuIcon,CustomerIcon,HampersIcon,ProdukIcon,ResepIcon, PesananIcon,TransferSaldoIcon} from "../components/Icon/icon"

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
                    path:"/dashboard/pesanan-masuk",
                    icon: <PesananIcon/>
                },
                {
                    name:"Pesanan Diproses",
                    path:"/dashboard/pesanan-diproses",
                    icon: <FaArrowsRotate/>
                },
                {
                    name:"Pesanan Telat Bayar",
                    path:"/dashboard/pesanan-telat-bayar",
                    icon: <FaClockRotateLeft/>
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
                },
                {
                    name: "Penarikan Saldo",
                    path: "/dashboard/penarikan-saldo",
                    icon: <TransferSaldoIcon/>
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
               },
               {
                name: "Proses Pesanan Hari Ini",
                path: "/dashboard/pesanan/proses",
                icon: <TbPackageExport size={24}/>
               },
               {
                name: "Laporan Penjualan Bulanan Keseluruhan",
                path: "/dashboard/laporan/penjualan-bulanan-keseluruhan",
                icon: <TbReportAnalytics size={24}/>
               },
               {
                name: "Laporan Penggunaan Bahan Baku",
                path: "/dashboard/laporan/penggunaan-bahan-baku",
                icon: <TbReport size={24}/>
               },
               {
                name: "Laporan Penjualan Produk Bulanan",
                path: "/dashboard/laporan/penjualan-produk-bulanan",
                icon: <ProdukIcon size={24}/>
               },
               {
                name: "Laporan Stok Bahan Baku",
                path: "/dashboard/laporan/stok-bahan-baku",
                icon: <BahanBakuIcon size={24}/>
               },
               {
                   name: "Laporan Transaksi",
                   path: "/dashboard/laporan-transaksi",
                   icon: <GiExpense/>
               },
                {
                     name: "Laporan Presensi",
                     path: "/dashboard/laporan-presensi",
                     icon: <GiExpense/>
                },
                {
                    name: "Laporan Penitip",
                    path: "/dashboard/laporan-penitip",
                    icon: <GiExpense/>
                }
            ])
        }else if (role === "Owner"){
                setRoutes([
                    {
                        name: "Jabatan",
                        path: "/dashboard/owner/jabatan",
                        icon: <MdBadge size={24}/>
                    },
                    {
                        name: "Karyawan",
                        path: "/dashboard/owner/karyawan",
                        icon: <FaUsers size={24}/>
                    },
                    {
                        name: "Laporan Penjualan Bulanan Keseluruhan",
                        path: "/dashboard/laporan/penjualan-bulanan-keseluruhan",
                        icon: <TbReportAnalytics size={24}/>
                    },
                    {
                        name: "Laporan Penggunaan Bahan Baku",
                        path: "/dashboard/laporan/penggunaan-bahan-baku",
                        icon: <TbReport size={24}/>
                    },
                    {
                        name: "Laporan Penjualan Produk Bulanan",
                        path: "/dashboard/laporan/penjualan-produk-bulanan",
                        icon: <ProdukIcon size={24} />
                    },
                    {
                        name: "Laporan Stok Bahan Baku",
                        path: "/dashboard/laporan/stok-bahan-baku",
                        icon: <BahanBakuIcon size={24} />
                    },
                    {
                        name: "Laporan Transaksi",
                        path: "/dashboard/laporan-transaksi",
                        icon: <GiExpense/>
                    },
                    {
                        name: "Laporan Presensi",
                        path: "/dashboard/laporan-presensi",
                        icon: <GiExpense/>
                    },
                    {
                        name: "Laporan Penitip",
                        path: "/dashboard/laporan-penitip",
                        icon: <GiExpense/>
                    }
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