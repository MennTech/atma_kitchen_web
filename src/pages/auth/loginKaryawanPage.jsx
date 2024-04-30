import { useNavigate } from "react-router-dom";
import LoginKaryawanForm from "../../components/forms/loginKaryawanForm";

const LoginKaryawanPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card shrink-0 w-full max-w-md shadow-2xl bg-white-100">
                <div className="card-body">
                    <div className="flex flex-col items-center">
                        <a onClick={() => navigate('/')} className="text-center text-3xl font-bold cursor-pointer">Atma Kitchen</a>
                        <p className="">Login Karyawan Atma Kitchen</p>
                    </div>
                    <LoginKaryawanForm />
                </div>
            </div>
        </div>
    )
}

export default LoginKaryawanPage;