import { useNavigate } from "react-router-dom";
import LoginCustomerForm from "../../components/forms/loginCustomerForm";

const LoginCustomerPage = () => {
    const navigate = useNavigate();
    return (
        <div className="hero min-h-screen bg-white-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <a onClick={() => navigate('/')} className="text-5xl font-bold cursor-pointer">Atma Kitchen</a>
                    <p className="italic">
                        Surga Kelezatan, Harmoni Rasa yang Memanjakan Jiwa.
                        Di sini, kami mengolah setiap produk dengan penuh cinta, menciptakan sajian yang memanjakan lidah sekaligus menghanyutkan perasaan Anda.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-md shadow-2xl bg-white-100">
                    <div className="card-body">
                        <div className="flex justify-center mb-5">
                            <h4 className="text-center text-xl font-semibold">Login ke Atma Kitchen</h4>
                        </div>
                        <LoginCustomerForm />
                        <div>
                            <label className="label">
                                <span className="label-text-alt">Belum punya akun? <a onClick={() => navigate('/register')} className="link link-hover">Daftar</a></span>
                            </label>
                            <label className="label">
                                <a onClick={() => navigate('/karyawan/login')} className="label-text-alt link link-hover">Login Sebagai Karyawan</a>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginCustomerPage;