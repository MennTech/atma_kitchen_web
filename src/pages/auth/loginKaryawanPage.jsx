import { useNavigate } from "react-router-dom";
import LoginKaryawanForm from "../../components/forms/loginKaryawanForm";

const LoginKaryawanPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white-100">
                <div className="card-body">
                    <div>
                        <div className="flex justify-center mb-2">
                            <h1 className="text-2xl font-bold">Atma Kitchen</h1>
                        </div>
                        <LoginKaryawanForm />
                        <label className="label flex justify-center">
                            <a onClick={() => navigate('/')} className="text-sm label-text-alt link-hover">Kembali ke Beranda</a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginKaryawanPage;