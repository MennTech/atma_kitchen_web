import { useNavigate } from "react-router-dom";

const DropDownProfile = ({setOpen}) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col dropDownProfile">
            <div className="flex flex-col gap-4">
                <ul>
                    <li className="hover:bg-gray-100 hover:text-orange-500"><a onClick={() => {
                        navigate('/customer/profile')
                        setOpen(false)
                    }} className="cursor-pointer">Profile</a></li>
                    <li className="hover:bg-gray-100 hover:text-orange-500"><a className="cursor-pointer" onClick={() => {
                        navigate('/customer/history')
                        setOpen(false)
                    }}>History</a></li>
                    <li className="hover:bg-gray-100 hover:text-orange-500">Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default DropDownProfile;