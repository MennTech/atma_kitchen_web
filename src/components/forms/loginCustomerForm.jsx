import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Login } from "../../api/authCustomerApi";
import { LoginKaryawan } from "../../api/authKaryawanApi";
import ErrorToast from "../alerts/errorAlert";

const LoginCustomerForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const timerToast = setTimeout(() => {
            setErrorLogin(false);
            setErrorMessage("");
        }, 2000);

        return () => clearTimeout(timerToast);
    }, [errorLogin])

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);

        if (newData.email.trim().length > 0 && newData.password.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const CustLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const responseCustomer = await Login(data);
            if (responseCustomer.success) {
                sessionStorage.setItem("token", responseCustomer.token);
                sessionStorage.setItem("customer", JSON.stringify(responseCustomer.customer));
                setLoading(false);
                navigate("/");
            } else {
                const dataKaryawan = {
                    email_karyawan: data.email,
                    password: data.password
                }
                const responseKaryawan = await LoginKaryawan(dataKaryawan);
                if (responseKaryawan.success) {
                    sessionStorage.setItem("token", responseKaryawan.token);
                    sessionStorage.setItem("karyawan", JSON.stringify(responseKaryawan.karyawan));
                    sessionStorage.setItem("role", responseKaryawan.karyawan.role.jabatan);
                    setLoading(false);
                    navigate("/dashboard");
                } else {
                    setLoading(false);
                    setErrorLogin(true);
                    setErrorMessage(responseKaryawan.error || responseCustomer.error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {errorLogin && <ErrorToast message={errorMessage} />}
            <form onSubmit={CustLogin}>
                <div className="space-y-2">
                    <div className="form-control">
                        <label className="input input-bordered flex items-center gap-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input onChange={handleChange} type="email" name="email" className="grow bg-white" placeholder="Email" required />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input input-bordered flex items-center gap-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input onChange={handleChange} type={showPassword ? `text` : `password`} name="password" className="grow input-primary" placeholder="Password" required />
                            <label className="swap">
                                <input type="checkbox" onClick={() => {setShowPassword(!showPassword)}} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 swap-off opacity-70">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 swap-on opacity-70">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </label>
                        </label>
                        <label className="label">
                            <Link to="/forgot-password" className="label-text-alt link link-hover hover:link-hover">Lupa Password?</Link>
                        </label>
                    </div>
                </div>
                <div className="form-control mt-6">
                    <button disabled={isDisabled} type="submit" className="btn btn-ghost bg-yellow-500 hover:bg-yellow-400 text-black">
                        {loading ? <span className="loading loading-spinner loading-md"></span> : "Login"}
                    </button>
                </div>
            </form>
        </>
    );
}

export default LoginCustomerForm;