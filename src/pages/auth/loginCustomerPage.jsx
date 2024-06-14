import { useNavigate } from "react-router-dom";
import LoginCustomerForm from "../../components/forms/loginCustomerForm";
import { isLoggedIn } from "../../utils/userCheck";
import BgCake from "../../assets/a.png";

const LoginCustomerPage = () => {
    const navigate = useNavigate();
    if (isLoggedIn() && sessionStorage.getItem("userType") === "customer"){
        navigate('/home');
    }
    if(isLoggedIn() && sessionStorage.getItem("userType") === "karyawan"){
        navigate('/dashboard');
    }
    return (
        <>
            <div className="absolute inset-0 z-0">
                <img
                    src={BgCake}
                    alt="Chocolate Cake"
                    className="w-screen h-full object-cover"
                />
            </div>  
            <div className="hero min-h-screen bg-white-200 backdrop-blur-sm backdrop-brightness-75">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="poppins-bold text-center text-white lg:text-left m-8">
                        <a onClick={() => navigate('/')} className="text-5xl font-bold cursor-pointer">Atma Kitchen</a>
                        <p className="italic">
                            Surga Kelezatan, Harmoni Rasa yang Memanjakan Jiwa.
                            Di sini, kami mengolah setiap produk dengan penuh cinta, menciptakan sajian yang memanjakan lidah sekaligus menghanyutkan perasaan Anda.
                        </p>
                    </div>
                    <div className="card shrink-0 w-full max-w-md shadow-2xl bg-white">
                        <div className="card-body">
                            <div className="flex justify-center mb-5">
                                <h4 className="text-center text-xl font-semibold">Login ke Atma Kitchen</h4>
                            </div>
                            <LoginCustomerForm />
                            <div>
                                <label className="label">
                                    <span className="label-text-alt">Belum punya akun? <a onClick={() => navigate('/register')} className="link link-hover">Daftar</a></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginCustomerPage;