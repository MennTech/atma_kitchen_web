import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoutKaryawan, ChangePassword } from "../api/authKaryawanApi";
import { toast } from "sonner";
// eslint-disable-next-line react/prop-types
const Sidebar = ({ routes }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [karyawan, setKaryawan] = useState({});
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        const karyawanData = JSON.parse(sessionStorage.getItem("karyawan"));
        setKaryawan(karyawanData);
    }, [])

    const logoutKaryawan = async () => {
        try{
            await LogoutKaryawan();
            sessionStorage.clear();
            navigate("/");
        }catch(error){
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setNewPassword(event.target.value);
    }

    const handleCloseModal = () => {
        document.getElementById('modalChangePass').close();
    }

    const changePassword = (event) => {
        event.preventDefault();
        ChangePassword({ new_password: newPassword }).then((response) => {
            if(response.message === 'Password berhasil diubah'){
                handleCloseModal();
                toast.success(response.message);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <section className="w-64 h-screen">
            {/* <div className=""> */}
                <ul className="menu p-2 w-56 min-h-full bg-[#DCD8D0] text-base-content rounded-r-3xl shadow-2xl flex items-center">
                        <a onClick={() => navigate("/dashboard")} className="text-center text-2xl font-bold cursor-pointer text-[#253331]">Atma Kitchen</a>
                    <div className="divider"></div>
                    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
                        <div className="space-y-2">
                            {/* eslint-disable-next-line react/prop-types */}
                            {routes?.map((route, index) => {
                                return (
                                    <li key={index} onClick={() => navigate(route.path)}>
                                        <a className={`hover:bg-[#8F5C54] hover:text-white ${location.pathname === route.path ? 'bg-[#8F5C54] text-white' : 'text-[#253331]'}  rounded-full`}>
                                            {route.icon}
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
                                    <h1 className="font-bold text-[#253331]">{karyawan.nama_karyawan}</h1>
                                    <p className="text-xs bg-base text-[#253331]">{karyawan.role && karyawan.role.jabatan}</p>
                                </div>
                            </div>
                            <div className="flex-none">
                                <div className="dropdown dropdown-right dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-sm p-0 btn-ghost no-animation hover:bg-transparent">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#DCD8D0] rounded-box w-52">
                                        <li>
                                            <a onClick={()=>document.getElementById('modalChangePass').showModal()} className="text-[#253331] hover:bg-[#8F5C54] hover:text-white">Ganti Password</a>
                                        </li>
                                        <li>
                                            <a onClick={logoutKaryawan} className="text-[#253331] hover:bg-[#8F5C54] hover:text-white">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            {/* </div> */}
            <dialog id="modalChangePass" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Change Password</h3>
                    <div className="modal-action flex justify-center">
                        <form method="dialog" onSubmit={changePassword} className="w-full">
                            <div className="form-control">
                                <label htmlFor="newPassword">New Password</label>
                                <input type="password" onChange={handleChange} className="input grow bg-slate-200" id="newPassword"/>
                            </div>
                            <div className="mt-3 space-x-3">
                                <button className="btn btn-primary" type="submit">Save</button>
                                <button className="btn btn-warning" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </section>
    )
}

export default Sidebar;