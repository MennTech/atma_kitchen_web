import RegisterForm from "../../components/forms/registerCustomerForm";
import { useNavigate } from "react-router-dom";

const RegisterCustomerPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="card w-1/2 mt-5 bg-white shadow-lg">
        <h2 className="card-title flex justify-center mt-3">Register</h2>
        <div className="card-body">
          <RegisterForm />
          <p>Sudah Punya Akun? <a className="link link-hover" onClick={() => navigate('/login')}>Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomerPage;
