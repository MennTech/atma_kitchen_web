import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedCustomerRoutes from './protectedCustomerRoutes';
import ProtectedKaryawanRoutes from './protectedKaryawanRoute';
import RoleBasedRoute from './roleBasedRoutes';
import PublicRoute from './publicRoute';
import HomeLayout from '../layouts/homeLayout';
import KaryawanLayout from '../layouts/karyawanLayout';
import NotFoundPage from '../pages/notFoundPage';
import LoginCustomerPage from '../pages/auth/loginCustomerPage';
import LoginKaryawanPage from '../pages/auth/loginKaryawanPage';
import BahanBakuPage from '../pages/admin/bahanBaku/bahanBakuPage';
import ProdukPage from '../pages/admin/produkPage';
import HampersPage from '../pages/admin/hampersPage';
import PembelianBahanBakuPage from '../pages/MO/pembelianBahanBakuPage';
import RegisterCustomerPage from '../pages/auth/registerCustomerPage';
import ResepPage from "../pages/admin/resep/resepPage";
import AddResepPage from "../pages/admin/resep/addResepPage";
import EditResepPage from "../pages/admin/resep/editResepPage";
import PenitipPage from "../pages/MO/Penitip/penitipPage"
import PengeluaranLainPage from "../pages/MO/PengeluaranLain/PengeluaranLain"
import AddPengeluaranLain from "../pages/MO/PengeluaranLain/AddPengeluaranLain"

const router = createBrowserRouter([
    // wildcard route
    {
        path: '*',
        element: <NotFoundPage />
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
                element: <div>Home</div>
            }
        ]
    },
    // public auth route for customer
    {
        children: [
            {
                path: '/login',
                element: <LoginCustomerPage />
            },
            {
                path: '/register',
                element: <RegisterCustomerPage />
            },
        ]
    },
    // public auth route for karyawan
    {
        path: '/karyawan',
        children: [
            {
                path: '/karyawan/login',
                element: <LoginKaryawanPage />
            },
        ]
    },
    // protected route for customer
    {
        path: '/customer',
        element:
            <ProtectedCustomerRoutes>
                {/* customerLayout */}
            </ProtectedCustomerRoutes>,
        children: [
            {
                path: '/customer/profile',
                element: <div>Customer Profile</div>
            },
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
                path: '/dashboard/produk',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <ProdukPage />
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
                path: '/dashboard/pembelian-bahan-baku',
                element: (
                    <RoleBasedRoute allowedRoles={["Manager Operational"]}>
                        <PembelianBahanBakuPage />
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
