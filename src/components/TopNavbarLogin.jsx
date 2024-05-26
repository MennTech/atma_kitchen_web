import { useNavigate, useLocation } from "react-router-dom";
import DropDownProfile from "./Dropdown/DropDownProfile";
import { useState } from "react";
import { HamburgerMenu, Xmark } from "../components/Icon/icon";
// eslint-disable-next-line react/prop-types
const TopNavbarLogin = ({ routes, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-50">
      <div className="navbar sticky bg-[#DCD8D0] px-4 flex justify-between py-6 mx-auto sm:px-16 sm:py-8 lg:px-64 lg:py-4">
        <div className="order-1">
          <a onClick={() => navigate("/home")}>Atma Kitchen</a>
        </div>
        <div className="order-2">
        {isLoggedIn && (
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
        )}

        </div>
        </div>
    </div>
  );
};
export default TopNavbarLogin;
