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
import BahanBakuPage from '../pages/admin/bahanBaku';
import RegisterCustomerPage from '../pages/auth/registerCustomerPage';

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
                        <div>Dashboard Produk</div>
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/hampers',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <div>Dashboard Hampers</div>
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/pembelian-bahan-baku',
                element: (
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <div>Dashboard Pembelian Bahan Baku</div>
                    </RoleBasedRoute>
                )
            },
            {
                path: '/dashboard/laporan',
                element: (
                    <RoleBasedRoute allowedRoles={"Manager Operasional"}>
                        <div>Dashboard Laporan</div>
                    </RoleBasedRoute>
                )
            }
        ]
    },
    {
        path: '/bahan',
        element: <BahanBakuPage />
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
