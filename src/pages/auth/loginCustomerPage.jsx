const LoginCustomerPage = () => {
    return (
        <div className="hero min-h-screen bg-white-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white-100">
                    <form className="card-body">
                        <div className="form-control">
                            {/* <label className="label">
                                <span className="label-text text-black">Email</span>
                            </label>
                        <input type="email" placeholder="email" className="input input-bordered" required /> */}
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="text" className="grow bg-white" placeholder="Email" required />
                            </label>
                        </div>
                        <div className="form-control">
                            {/* <label className="label">
                                <span className="label-text text-black">Password</span>
                                </label>
                            <input type="password" placeholder="password" className="input input-bordered" required /> */}
                            <label className="input input-bordered flex items-center gap-2">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow input-primary" placeholder="password" required />
                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-black hover:link-hover">Lupa Password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-yellow-500 hover:bg-yellow-400 text-black">Login</button>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text-alt">Belum punya akun? <a href="#" className="link link-hover">Daftar</a></span>
                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Login Sebagai Karyawan</a>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginCustomerPage;