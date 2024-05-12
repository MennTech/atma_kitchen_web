import { useNavigate, useLocation } from "react-router-dom";
import DropDownProfile from "./Dropdown/DropDownProfile";
import { useState } from "react";
import { HamburgerMenu, Xmark } from "../components/Icon/icon";
// eslint-disable-next-line react/prop-types
const TopNavbar = ({ routes, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const filteredRoutes = routes.filter(
    (route) => !["/login", "/register"].includes(route.path)
  );
  return (
    <div>
      <div className="navbar sticky bg-[#DCD8D0] px-4 flex justify-between py-6 mx-auto sm:px-16 sm:py-8 lg:px-64 lg:py-4">
        <div className="order-1 sm:order-2 lg:order-1 sm:ml-32 lg:ml-0">
          <a
            onClick={() => navigate("/")}
            className="font-medium sm:font-semibold sm:text-lg lg:text-xl"
          >
            Atma Kitchen
          </a>
        </div>
        <div className="hidden lg:block lg:order-2 border-2 border-[#253331] rounded-full">
          <ul className="menu menu-horizontal">
            {!isLoggedIn &&
              // eslint-disable-next-line react/prop-types
              filteredRoutes?.map((route, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => navigate(route.path)}
                    className={`hover:bg-[#8F5C54] hover:text-white px-4 py-[10px] rounded-full ${
                      location.pathname === route.path
                        ? "bg-[#8F5C54] text-white"
                        : "bg-[#DCD8D0] text-[#253331]"
                    } ${index === filteredRoutes.length - 1 ? "" : "mr-5"}`}
                  >
                    <h1 className="px-0 py-0 font-semibold text-base">
                      {route.name}
                    </h1>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="hidden sm:block order-2 sm:order-3">
          <ul className="menu menu-horizontal">
            {!isLoggedIn &&
              // eslint-disable-next-line react/prop-types
              routes
                ?.filter(
                  (route) =>
                    route.path === "/login" || route.path === "/register"
                )
                .map((route, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => navigate(route.path)}
                      className={`hover:bg-[#8F5C54] hover:text-white px-4 py-[10px] rounded-full ${
                        location.pathname === route.path
                          ? "bg-[#8F5C54] text-white"
                          : "bg-[#DCD8D0] text-[#253331]"
                      }`}
                    >
                      <h1 className="px-0 py-0 lg:text-xl sm:text-base sm:font-semibold">
                        {route.name}
                      </h1>
                    </li>
                  );
                })}
          </ul>
        </div>
        <div
          className="cursor-pointer order-3 sm:order-1 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <Xmark /> : <HamburgerMenu />}
        </div>
      </div>
      <div className={`bg-[#DCD8D0] ${open ? "block" : "hidden"}`}>
        <ul>
          {!isLoggedIn &&
            window.innerWidth < 640 &&
            // eslint-disable-next-line react/prop-types
            routes?.map((route, index) => {
              return (
                <li
                  key={index}
                  onClick={() => navigate(route.path)}
                  className={`hover:bg-[#8F5C54] hover:text-white px-4 py-[10px] ${
                    location.pathname === route.path
                      ? "bg-[#8F5C54] text-white"
                      : "bg-[#DCD8D0] text-[#253331]"
                  }`}
                >
                  <h1 className="px-0 py-0">{route.name}</h1>
                </li>
              );
            })}
          {!isLoggedIn &&
            window.innerWidth > 640 &&
            // eslint-disable-next-line react/prop-types
            filteredRoutes?.map((route, index) => {
              return (
                <li
                  key={index}
                  onClick={() => navigate(route.path)}
                  className={`hover:bg-[#8F5C54] hover:text-white px-4 py-[10px] ${
                    location.pathname === route.path
                      ? "bg-[#8F5C54] text-white"
                      : "bg-[#DCD8D0] text-[#253331]"
                  }`}
                >
                  <h1 className="px-0 py-0">{route.name}</h1>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TopNavbar;
