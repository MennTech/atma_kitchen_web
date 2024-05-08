import { useNavigate, useLocation } from "react-router-dom";
import { Logout } from "../../api/authCustomerApi";

// eslint-disable-next-line react/prop-types
const DropDownProfile = ({ setOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const logoutCustomer = async () => {
        try {
            await Logout();
            sessionStorage.clear();
            if(location.pathname === "/"){
                window.location.reload();
            }else{
                navigate("/");
            }
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col dropDownProfile">
            <div className="flex flex-col gap-4">
                <ul>
                    <li className="hover:bg-gray-100 hover:text-orange-500 text-center"><a onClick={() => {
                        navigate('/customer/profile')
                        setOpen(false)
                    }} className="cursor-pointer">Profile</a></li>
                    <li className="hover:bg-gray-100 hover:text-orange-500 text-center"><a className="cursor-pointer" onClick={() => {
                        navigate('/customer/history')
                        setOpen(false)
                    }}>History</a></li>
                    <li className="hover:bg-gray-100 hover:text-orange-500 text-center">
                        <a className="cursor-pointer" onClick={() => {
                            logoutCustomer();
                        }}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DropDownProfile;