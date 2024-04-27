import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl">404</h1>
            <h1 className="text-2xl">Halaman Tidak Ditemukan 😢</h1>
            <a className="cursor-pointer mt-2 link-hover" onClick={() => navigate("/")}>Kembali Ke Beranda</a>
        </div>
    )
}

export default NotFoundPage;