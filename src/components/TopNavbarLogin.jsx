import { useNavigate, useLocation } from "react-router-dom";
import DropDownProfile from "./Dropdown/DropDownProfile";
import { useState } from "react";
import { HamburgerMenu, Xmark } from "../components/Icon/icon";
import logo from "../assets/logo.png";
// eslint-disable-next-line react/prop-types
const TopNavbarLogin = ({ routes, isLoggedIn, size }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-50">
      <div className="navbar sticky bg-[#DCD8D0] px-4 flex justify-between py-6 mx-auto sm:px-16 sm:py-8 lg:px-64 lg:py-4">
        <div className="order-1 cursor-pointer">
          <a 
            onClick={() => navigate("/home")}
            className={`flex items-center poppins-bold font-medium sm:font-semibold sm:text-lg lg:text-xl text-xl text-[#8F5C54]" hover:cursor-pointer`}
          >
            <img src={logo} alt="Atma Kitchen Logo" className={`sm:w-20 sm:h-20 lg:w-20 lg:h-20 w-14 h-14 mr-2`} />
            Atma Kitchen
          </a>
        </div>
        <div className="order-2 items-center">
          {isLoggedIn && (
            <>
              <div className="relative mr-4">
                <button className="flex items-end" onClick={() => navigate('/keranjang')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
                <div
                  className={`${size === 0 ? 'hidden' : ''} absolute top-0 right-0 transform -translate-y-1 translate-x-1 badge bg-red-500 border-none text-md p-1 text-white`}
                >
                  {size}
                </div>
              </div>
              <div className="avatar me-4">
                <div className="w-12 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer"
                  />
                </div>
                {open && <DropDownProfile setOpen={setOpen} />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default TopNavbarLogin;
