import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../api/authCustomerApi";

const LoginCustomerForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email_customer: "",
        password: ""
    });

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);
    }

    const CustLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            const response = await Login(data);
            if(response.success){
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("customer", JSON.stringify(response.customer));
                setLoading(false);
                navigate("/");
            }
        }catch (error){
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={CustLogin}>
            <div className="space-y-2">
                <div className="form-control">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input onChange={handleChange} type="email" name="email_customer" className="grow bg-white" placeholder="Email" required />
                    </label>
                </div>
                <div className="form-control">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input onChange={handleChange} type="password" name="password" className="grow input-primary" placeholder="password" required />
                    </label>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover text-black hover:link-hover">Lupa Password?</a>
                    </label>
                </div>
            </div>
            <div className="form-control mt-6">
                <button type="submit" className="btn bg-yellow-500 hover:bg-yellow-400 text-black">
                    {loading ? <span className="loading loading-spinner loading-md"></span> : "Login"}
                </button>
            </div>
        </form>
    );
}

export default LoginCustomerForm;