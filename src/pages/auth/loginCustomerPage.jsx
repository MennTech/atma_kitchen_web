import { useNavigate } from "react-router-dom";
import LoginCustomerForm from "../../components/forms/loginCustomerForm";

const LoginCustomerPage = () => {
    const navigate = useNavigate();
    return (
        <div className="hero min-h-screen bg-white-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white-100">
                    <div className="card-body">
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