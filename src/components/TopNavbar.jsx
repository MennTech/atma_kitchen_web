import { useNavigate, useLocation } from "react-router-dom";
import DropDownProfile from "./Dropdown/DropDownProfile";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const TopNavbar = ({ routes, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar sticky bg-white">
      <div className="flex-1">
        <a
          onClick={() => navigate("/")}
          className="text-xl cursor-pointer px-1 mx-1"
        >
          Atma Kitchen
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal space-x-2">
          {!isLoggedIn &&
            // eslint-disable-next-line react/prop-types
            routes?.map((route, index) => {
              return (
                <li key={index} onClick={() => navigate(route.path)}>
                  <a
                    className={`hover:bg-yellow-400 ${
                      location.pathname === route.path
                        ? "bg-yellow-400"
                        : "bg-yellow-200"
                    }`}
                  >
                    {route.name}
                  </a>
                </li>
              );
            })}
        </ul>
        {isLoggedIn && (
          <div>
            <div className="avatar me-4">
              <div className="w-12 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {open && <DropDownProfile setOpen={setOpen} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
