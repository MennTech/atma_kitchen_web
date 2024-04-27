import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from './protectedCustomerRoutes';
import PublicRoute from './publicRoute';
import HomeLayout from '../layouts/homeLayout';
import NotFoundPage from '../pages/notFoundPage';
import LoginCustomerPage from '../pages/auth/loginCustomerPage';
import LoginKaryawanPage from '../pages/auth/loginKaryawanPage';

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
                element: <div>Register</div>
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
            <ProtectedRoutes>
                {/* customerLayout */}
            </ProtectedRoutes>,
        children: [
        ]
    },
    // protected route for karyawan
    {
        path: '/dashboard',
        element:
            <ProtectedRoutes>
                {/* karyawanLayout */}
            </ProtectedRoutes>,
        children: [
            {
                path: '/dashboard/home',
                element: <div>Dashboard Home</div>
            },
            {
                path: '/dashboard/profile',
                element: <div>Dashboard Profile</div>
            },
        ]

    }
]);

const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRouter;