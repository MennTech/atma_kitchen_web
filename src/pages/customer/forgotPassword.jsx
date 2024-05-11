import React, { useState,useEffect } from "react";
import { ForgotPassword, fetchVerificationStatus } from "../../api/authCustomerApi";
import { toast } from 'sonner';
import { Toaster } from 'sonner';

function forgotPassword() {;
  const [email, setEmail] = useState("");
  const verif = async () => {
    fetchVerificationStatus()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    ForgotPassword({ email })
    .then((response) => {
      console.log(response.data);
        if (response && response.message === 'Reset password link sent on your email id.') {
            toast.success("Link reset password telah dikirim ke email Anda");
        } else {
            toast.error("Gagal mengirim link reset password ke email Anda");
        }
    })
    .catch((error) => {
        toast.error("Gagal mengirim link reset password ke email Anda");
        console.log(error);
    });
  };
  useEffect(() => {
    verif();
  } ,[]);
  return (
    <div className="flex justify-center">
      <Toaster richColors position="top-center"/>
      <div className="card w-1/3 mt-5 bg-white shadow-lg">
        <h2 className="card-title flex justify-center mt-3">Register</h2>
        <div className="card-body">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="form-control">
                <label className="input input-bordered flex items-center gap-2 bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    className="grow bg-white"
                    placeholder="Email"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-ghost bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default forgotPassword;
