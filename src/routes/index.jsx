import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedCustomerRoutes from './protectedCustomerRoutes';
import ProtectedKaryawanRoutes from './protectedKaryawanRoute';
import RoleBasedRoute from './roleBasedRoutes';
import PublicRoute from './publicRoute';
import HomeLayout from '../layouts/homeLayout';
import KaryawanLayout from '../layouts/karyawanLayout';
import NotFoundPage from '../pages/notFoundPage';
import LoginCustomerPage from '../pages/auth/loginCustomerPage';
// import LoginKaryawanPage from '../pages/auth/loginKaryawanPage';
import BahanBakuPage from '../pages/admin/bahanBaku/bahanBakuPage';
import ProdukPage from '../pages/admin/produk/produkPage';
import CreateAtmaProdukPage from '../pages/admin/produk/createAtmaProdukPage';
import CreatePenitipProdukPage from '../pages/admin/produk/createPenitipProdukPage';
import EditProdukPage from '../pages/admin/produk/editProdukPage';
import HampersPage from '../pages/admin/hampers/hampersPage';
import CreateHampersPage from '../pages/admin/hampers/createHampersPage';
import EditHampersPage from '../pages/admin/hampers/editHampersPage';
import PembelianBahanBakuPage from '../pages/MO/pembelianBahanBaku/pembelianBahanBakuPage';
import CreatePembelianBahanBakuPage from '../pages/MO/pembelianBahanBaku/createPembelianBahanBakuPage';
import EditPembelianBahanBakuPage from '../pages/MO/pembelianBahanBaku/editPembelianBahanBakuPage';
import RegisterCustomerPage from '../pages/auth/registerCustomerPage';
import ResepPage from "../pages/admin/resep/resepPage";
import AddResepPage from "../pages/admin/resep/addResepPage";
import EditResepPage from "../pages/admin/resep/editResepPage";
import KaryawanPage from '../pages/MO/Karyawan/karyawanPage';
import AddKaryawanPage from '../pages/MO/Karyawan/addKaryawanPage';
import EditKaryawanPage from '../pages/MO/Karyawan/editKaryawanPage';
import PenitipPage from "../pages/MO/Penitip/penitipPage"
import PengeluaranLainPage from "../pages/MO/PengeluaranLain/PengeluaranLain"
import AddPengeluaranLain from "../pages/MO/PengeluaranLain/AddPengeluaranLain"
import Customer from "../pages/admin/customer/customerPage"
import DetailPesanan from "../pages/admin/customer/detailPesanan"
import Pesanan from "../pages/admin/customer/pesanan"
import RolePage from '../pages/MO/Role/rolePage';
import OwnerKaryawanPage from '../pages/owner/ownerKaryawanPage';
import OwnerJabatanPage from '../pages/owner/ownerJabatanPage';
import ProfilePage from '../pages/customer/profilePage';
import CustomerLayout from '../layouts/customerLayout';
import HistoryPage from '../pages/customer/historyPage';
import ForgotPassword from '../pages/customer/forgotPassword';
import ResetPassword  from '../pages/customer/resetPassword';
import HomeCustomer from '../pages/customer/homeCustomer';
import Keranjang from '../pages/customer/keranjang';
import Checkout from '../pages/customer/checkout';
import PesananPage from '../pages/admin/pesanan/pesananPage';
import HomePage from '../pages/homePage';
import AboutUs from '../pages/aboutUs';
import Produk from '../pages/produk';
import HomeContent from '../layouts/homeContent';
import PesananCustomer from '../pages/customer/pesananCustomer';
import PesananDiproses from '../pages/admin/pesanan/pesananDiproses.page';
import PesananTelatBayar from '../pages/admin/pesanan/pesananTelatBayar';
import PesananValid from '../pages/MO/Pesanan/Pesanan'
import LaporanPenjualanProdukBulananKeseluruhan from '../pages/MO/LaporanPenjualanBulananKeseluruhan/LaporanPenjualanBulananKeseluruhan';
import LaporanPenggunaanBahanBaku from '../pages/MO/LaporanPenggunaanBahanBaku/LaporanPenggunaanBahanBaku';
import LaporanStokBahanPage from '../pages/MO/LaporanStokBahan/LaporanStokBahanPage';
import LaporanPenjualanProdukBulananPage from '../pages/MO/LaporanPenjualanProdukBulanan/LaporanPenjualanProdukBulananPage';
import ProsesPesananPage from '../pages/MO/prosesPesanan/ProsesPesananPage';
import CekPenggunaanBahanPage from '../pages/MO/prosesPesanan/CekPenggunaanBahanPage';
import PenarikanSaldo from '../pages/admin/TransferSaldo/KonfirmasiTarikSAldo';
import LaporanTransaksi from '../pages/MO/Laporan/ReportPemasukanPengeluaran';
import LaporanPresensi from '../pages/MO/Laporan/ReportPresensi';
import LaporanPenitip from '../pages/MO/Laporan/ReportPenitip';

const router = createBrowserRouter([
    // wildcard route
    {
        path: '*',
        element: <NotFoundPage />
    },
    {
        children:[{
            path: '/login',
            element: 
                <PublicRoute>
                    <LoginCustomerPage />
                </PublicRoute>,
            id: "login"
        },
        {
            path: '/register',
            element: 
                <PublicRoute>
                    <RegisterCustomerPage />
                </PublicRoute>,
            id: "register"
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword />,
            id: "forgot"
        },
        {
            path: '/reset-password',
            element: <ResetPassword />,
            id: "reset"
        }]
    },
    // home route
    {
        element:(
            <PublicRoute>
                <HomeLayout />
            </PublicRoute>   
        ),
        children: [
            {
                path: '/',
                element: <HomeContent />,
                id: "home"
            },
            {
                path: '/aboutUs',
                element:<AboutUs/>,
                id: "about"
            },
            {
                path: '/produk',
                element:<Produk/>,
                id: "produk"
            },
            
        ]
    },
    
    // public auth route for karyawan
    // {
    //     path: '/karyawan',
    //     children: [
    //         {
    //             path: '/karyawan/login',
    //             element: <LoginKaryawanPage />
    //         },
    //     ]
    // },
    {
        // path: '/home',
        element: 
            <ProtectedCustomerRoutes>
                <CustomerLayout />
            </ProtectedCustomerRoutes>,
        children: [
            {
                path: '/home',
                element: <HomeCustomer />
            },
            {
                path: '/keranjang',
                element: <Keranjang />
            },
            {
                path: '/keranjang/checkout',
                element: <Checkout />
            }
        ]
    },
    // protected route for customer
    {
        // path: '/customer',
        element:
            <ProtectedCustomerRoutes>
                <CustomerLayout/>
            </ProtectedCustomerRoutes>,
        children: [
            {
                path: '/customer/profile',
                element: <ProfilePage/>
            },
            {
                path: '/customer/history',
                element: <HistoryPage/>
            },
            {
                path: '/customer/pesanan',
                element: <PesananCustomer/>
            }
        ]
    },
    // protected route for karyawan
    {
        path: '/dashboard',
        element:
            <ProtectedKaryawanRoutes>
                <KaryawanLayout />
            </ProtectedKaryawanRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <div>Dashboard Home</div>
            },
            {
                path: '/dashboard/profile',
                element: <div>Dashboard Profile</div>
            },
            {
                path: '/dashboard/pesanan-masuk',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <PesananPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pesanan-diproses',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <PesananDiproses />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pesanan-telat-bayar',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <PesananTelatBayar />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/produk',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <ProdukPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/produk/create/atma-produk',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <CreateAtmaProdukPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/produk/create/penitip-produk',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <CreatePenitipProdukPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/produk/edit/:id',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <EditProdukPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/hampers',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <HampersPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/hampers/create',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <CreateHampersPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/hampers/edit/:id',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <EditHampersPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pembelian-bahan-baku',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <PembelianBahanBakuPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pembelian-bahan-baku/tambah',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <CreatePembelianBahanBakuPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pembelian-bahan-baku/edit/:id',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <EditPembelianBahanBakuPage />
                    </RoleBasedRoute>
                )
            },
            {
              path: "/dashboard/resep",
              element: (
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <ResepPage />
                </RoleBasedRoute>
              ),
            },
            {
              path: "/dashboard/tambah-resep",
              element: (
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <AddResepPage />
                </RoleBasedRoute>
              ),
            },
            {
              path: "/dashboard/edit-resep/:id",
              element: (
                <RoleBasedRoute allowedRoles={["Admin"]}>
                  <EditResepPage />
                </RoleBasedRoute>
              ),
            },
            {
                path: '/dashboard/laporan',
                element: (
                    <RoleBasedRoute allowedRoles={"Manager Operational"}>
                        <div>Dashboard Laporan</div>
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan/penjualan-bulanan-keseluruhan',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational", "Owner"]}>
                        <LaporanPenjualanProdukBulananKeseluruhan />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan/penggunaan-bahan-baku',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational", "Owner"]}>
                        <LaporanPenggunaanBahanBaku />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan/stok-bahan-baku',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational", "Owner"]}>
                        <LaporanStokBahanPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan/penjualan-produk-bulanan',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational", "Owner"]}>
                        <LaporanPenjualanProdukBulananPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/penitip',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <PenitipPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pengeluaranLain',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <PengeluaranLainPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/addPengeluaranLain',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <AddPengeluaranLain />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/bahan',
                element: (
                    <RoleBasedRoute allowedRoles={"Admin"}>
                        <BahanBakuPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/customer',
                element: (
                    <RoleBasedRoute allowedRoles={"Admin"}>
                        <Customer />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/karyawan',
                element: (
                    <RoleBasedRoute allowedRoles={"Manager Operational"}>
                        <KaryawanPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/tambah-karyawan',
                element: (
                    <RoleBasedRoute allowedRoles={"Manager Operational"}>
                        <AddKaryawanPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/edit-karyawan/:id',
                element: (
                    <RoleBasedRoute allowedRoles={"Manager Operational"}>
                        <EditKaryawanPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pesanan/:id',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <Pesanan />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/jabatan/',
                element: (
                    <RoleBasedRoute allowedRoles={"Manager Operational"}>
                        <RolePage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/detail_pesanan/:id',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <DetailPesanan />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/owner/jabatan',
                element: (
                    <RoleBasedRoute allowedRoles={"Owner"}>
                        <OwnerJabatanPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/owner/karyawan',
                element: (
                    <RoleBasedRoute allowedRoles={"Owner"}>
                        <OwnerKaryawanPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pesanan-valid',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <PesananValid />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/penarikan-saldo',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <PenarikanSaldo />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan-transaksi',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational", "Owner"]}>
                        <LaporanTransaksi />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan-presensi',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational", "Owner"]}>
                        <LaporanPresensi />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan-penitip',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational", "Owner"]}>
                        <LaporanPenitip />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pesanan/proses',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <ProsesPesananPage />
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pesanan/proses/cek-bahan',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <CekPenggunaanBahanPage />
                    </RoleBasedRoute>
                )
            }
        ]
    }
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
