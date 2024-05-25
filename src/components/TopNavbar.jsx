import { useNavigate, useLocation,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HamburgerMenu, Xmark } from "../components/Icon/icon";
import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.jpg";
const TopNavbar = ({ routes, isLoggedIn }) => {
  const [color, setColor] = useState(false);
  const changeColor= () => {
    if(window.scrollY > 10){
      setColor(true);
    }else{
      setColor(false);
    }
  }
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const filteredRoutes = routes.filter(
    (route) => !["/login", "/register"].includes(route.path)
  );
  useEffect(() => {
    window.addEventListener('scroll', changeColor);
  }, [])
  return (
    <div>
      <div className={`navbar top-0 left-0 right-0 fixed px-4 flex justify-between py-1 mx-auto sm:px-16 sm:py-4 lg:px-32 lg:py-4 z-50 ${color ? "bg-[#DCD8D0]" : "bg-transparent"}`}>
        
          <div className="order-1 sm:order-2 lg:order-1 sm:ml-32 lg:ml-0">
            <img src={logo} alt="Atma Kitchen Logo" className={`sm:w-20 sm:h-20 lg:w-20 lg:h-20 w-14 h-14 mr-2`} />
            <a
              onClick={() => navigate("/")}
              className={`poppins-bold font-medium sm:font-semibold sm:text-lg lg:text-xl text-xl ${color ? "text-[#8F5C54]" : "text-[#DCD8D0]"} hover:cursor-pointer`}
            >
              Atma Kitchen
            </a>
          </div>
        <div className={`hidden lg:block lg:order-2 border-2 ${color ? "border-[#8F5C54]" : "border-[#DCD8D0]"} rounded-full ml-20`}>
          <ul className="menu menu-horizontal">
            {filteredRoutes?.map((route, index) => {
                return (
                  <a href={`#${route.id}`}>
                  <li
                    key={index}
                    className={`  ${color ? "hover:bg-[#8F5C54] hover:text-[#DCD8D0]":"hover:bg-[#DCD8D0] hover:text-[#253331]"} px-4 py-[10px] rounded-full ${color ? `${
                      window.location.toString().split('#')[1] == route.id
                        ? "bg-[#8F5C54] text-[#DCD8D0]"
                        : "bg-[#DCD8D0] text-[#8F5C54]"
                    }`: `${
                      window.location.toString().split('#')[1] == route.id
                        ? "bg-[#DCD8D0] text-[#253331]"
                        : "bg-transparent text-[#DCD8D0]"
                    }`}  ${index === filteredRoutes.length - 1 ? "" : "mr-5"}`}
                  >
                    <h1 className="poppins-bold px-0 py-0 font-semibold text-base">
                    {window.location.toString().split('#')[1] == route.id ? route.icon : ''}
                    {route.name}
                    </h1>
                  </li>
                  </a>
                );
              })}
          </ul>
        </div>
        <div className="hidden sm:block order-2 sm:order-3">
          <ul className="menu menu-horizontal">
            {!isLoggedIn &&
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
                      className={`${color ? `${
                        location.pathname === route.path
                        ? "bg-[#8F5C54] text-[#DCD8D0]"
                        : "bg-transparent text-[#8F5C54]"
                      }` : `${
                        location.pathname === route.path
                        ? "bg-[#DCD8D0] text-[#253331]"
                        : "bg-transparent text-[#DCD8D0]"
                      }`} hover:bg-[#DCD8D0] hover:text-[#253331] px-4 py-[10px] rounded-full `}
                    >
                      <h1 className="poppins-bold px-0 py-0 lg:text-xl sm:text-base sm:font-semibold">
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
          {color ? (open ? <Xmark color="#8F5C54"/> : <HamburgerMenu color="#8F5C54"/>) : (open ? <Xmark color="#DCD8D0" /> : <HamburgerMenu color="#DCD8D0" />)}
          
        </div>
      </div>
      <div className={` ${open ? "block fixed top-[64px] z-20 left-0 right-0" : "hidden"}`}>
        <ul className="bg-[#DCD8D0]">
          {!isLoggedIn &&
            window.innerWidth < 640 &&
            filteredRoutes?.map((route, index) => {
              return (
                <a href={`#${route.id}`}>
                <li
                  key={index}
                  className={`hover:bg-[#8F5C54] hover:text-white px-4 py-[10px] ${
                    window.location.toString().split('#')[1] == route.id
                      ? "bg-[#8F5C54] text-white"
                      : "bg-[#DCD8D0] text-[#253331]"
                  }`}
                >
                  <h1 className="px-0 py-0 flex items-center">
                    <span className="mr-2">{route.icon}</span>
                    {route.name}
                  </h1>
                </li>
                </a>
              );
            })}
          {!isLoggedIn &&
            window.innerWidth > 640 &&
            filteredRoutes?.map((route, index) => {
              return (
                <a href={`#${route.id}`}>
                <li
                  key={index}
                  onClick={() => navigate(route.path)}
                  className={`hover:bg-[#8F5C54] hover:text-white px-4 py-[10px] ${
                    window.location.toString().split('#')[1] == route.id
                      ? "bg-[#8F5C54] text-white"
                      : "bg-[#DCD8D0] text-[#253331]"
                  }`}
                >
                  <h1 className="px-0 py-0 flex items-center">
                    <span className="mr-2">{route.icon}</span>
                    {route.name}
                  </h1>
                </li>
                </a>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default TopNavbar;
