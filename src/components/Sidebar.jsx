import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutKaryawan } from "../api/authKaryawanApi";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ routes }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [karyawan, setKaryawan] = useState({});

    useEffect(() => {
        const karyawanData = JSON.parse(sessionStorage.getItem("karyawan"));
        setKaryawan(karyawanData);
    }, [])

    const logoutKaryawan = () => {
        try{
            LogoutKaryawan();
            sessionStorage.clear();
            navigate("/");
        }catch(error){
            console.log(error);
        }
    }
    return (
        <section className="w-64 h-screen">
            <ul className="menu p-4 w-64 min-h-full bg-white text-base-content">
                    <a onClick={() => navigate("/dashboard")} className="text-center text-2xl font-bold cursor-pointer">Atma Kitchen</a>
                <div className="divider"></div>
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
                    <div className="space-y-2">
                        {/* eslint-disable-next-line react/prop-types */}
                        {routes?.map((route, index) => {
                            return (
                                <li key={index} onClick={() => navigate(route.path)}>
                                    <a className={`hover:bg-yellow-400 ${location.pathname === route.path ? 'bg-yellow-400' : 'bg-yellow-200'}`}>
                                        {route.name}
                                    </a>
                                </li>
                            )
                        })}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex-none">
                    <div className="flex flex-row bg-base rounded-box space-x-1 items-center">
                        <div className="flex-1">
                            <div className="flex flex-col">
                                <h1 className="font-bold">{karyawan.nama_karyawan}</h1>
                                <p className="text-xs bg-base">{karyawan.role && karyawan.role.jabatan}</p>
                            </div>
                        </div>
                        <div className="flex-none">
                            <div className="dropdown dropdown-right dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-sm p-0 btn-ghost no-animation hover:bg-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                                    <li>
                                        <a>Ganti Password</a>
                                    </li>
                                    <li>
                                        <a onClick={logoutKaryawan}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </section>
    )
}

export default Sidebar;