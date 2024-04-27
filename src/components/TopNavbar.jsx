import { useNavigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const TopNavbar = ({ routes }) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="navbar bg-white">
            <div className="flex-1">
                <a onClick={() => navigate('/')} className="text-xl cursor-pointer px-1 mx-1">Atma Kitchen</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal space-x-2">
                    {/* eslint-disable-next-line react/prop-types */}
                    {routes?.map((route, index) => {
                        return (
                            <li key={index} onClick={() => navigate(route.path)}>
                                <a className={`hover:bg-yellow-400 ${location.pathname === route.path ? 'bg-yellow-400' : 'bg-yellow-200'}`}
                                >{route.name}</a>
                            </li>
                        )
                    })}
            </ul>
        </div>
        </div >
    )
}

export default TopNavbar;