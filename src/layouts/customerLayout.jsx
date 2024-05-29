import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNavbarLogin from "../components/TopNavbarLogin";
import Footer from "../components/Footer";
import { isLoggedIn } from "../utils/userCheck";
import { toast, Toaster } from "sonner";
import { AddProdukToKeranjang, EditMetodePesan, GetKeranjangPesanan, InitPesanan } from "../api/pesanan";

let routes = [
    {
        name: "Profile",
        path: "/customer/profile"
    },
];

const CustomerLayout = () => {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pesananKeranjang, setPesananKeranjang] = useState(null);
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState({
        status: "",
        message: "",
    });

    const fetchKeranjang = async () => {
        setLoading(true);
        try {
            const response = await GetKeranjangPesanan();
            if (response.success) {
                setPesananKeranjang(response.data);
                setCart(response.data.produk_pesanan.map((item) => item.pivot));
                setCart((prev) => [...prev, ...response.data.hampers_pesanan.map((item) => item.pivot)]);
            } else {
                await initPesanan();
                setCart([]);
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const initPesanan = async () => {
        setLoading(true);
        try {
            const response = await InitPesanan();
            if (response.success) {
                // edit previous state
                setPesananKeranjang((prev) => (
                    { ...prev, ...response.data }
                ));
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const editMetode = async (data) => {
        setLoading(true);
        try {
            await EditMetodePesan(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleClickPO = async (item) => {
        setLoading(true);
        if (pesananKeranjang === null) {
           await initPesanan();
           setLoading(false);
        }
        if (pesananKeranjang.metode_pesan === null) {
            setPesananKeranjang((prev) => ({ ...prev, metode_pesan: "PO" }));
            await editMetode({ id_pesanan: pesananKeranjang.id_pesanan, metode_pesan: "PO" });
            setLoading(false);
        }
        if (pesananKeranjang.metode_pesan !== null && pesananKeranjang.metode_pesan !== "PO") {
            setStatus((prev) => ({
                ...prev,
                status: "error",
                message: "Anda tidak bisa memesan produk PO dan Pesan Langsung sekaligus"
            }));
            toast.error("Anda tidak bisa memesan produk PO dan Pesan Langsung sekaligus");
            setLoading(false);
            return;
        }
        let isPresent = false;
        cart.map((cartItem) => {
            if (cartItem.id_produk === item.id_produk && cartItem.id_hampers === null) {
                isPresent = true;
            }
            if (cartItem.id_hampers === item.id_hampers && cartItem.id_produk === null) {
                isPresent = true;
            }
        });
        if (isPresent) {
            console.log("produk sudah ada di keranjang");
            setStatus((prev) => ({
                ...prev,
                status: "error",
                message: "Produk sudah ada di keranjang"
            }));
            toast.error("Produk sudah ada di keranjang");
            setLoading(false);
            return;
        }
        // check if item has id_produk
        if (Object.keys(item).includes('id_produk') && item.id_produk !== null) {
            const dataProdukBaru = {
                id_pesanan: pesananKeranjang.id_pesanan,
                id_produk: item.id_produk,
                id_hampers: null,
                jumlah: 1,
                subtotal: item.harga,
            }
            setCart([...cart,
                dataProdukBaru
            ]);
            await AddProdukToKeranjang(dataProdukBaru);
            setStatus((prev) => ({
                ...prev,
                status: "success",
                message: "Produk berhasil ditambahkan ke keranjang"
            }));
            setLoading(false);
        } 
        if (Object.keys(item).includes('id_hampers') && item.id_hampers !== null){
            const dataHampersBaru = {
                id_pesanan: pesananKeranjang.id_pesanan,
                id_produk: null,
                id_hampers: item.id_hampers,
                jumlah: 1,
                subtotal: item.harga,
            }
            setCart([...cart,
                dataHampersBaru
            ]);
            await AddProdukToKeranjang(dataHampersBaru);
            setStatus((prev) => ({
                ...prev,
                status: "success",
                message: "Produk berhasil ditambahkan ke keranjang"
            }));
            setLoading(false);
        }
    }

    const handleClickLangsung = async (item) => {
        setLoading(true);
        if (pesananKeranjang === null) {
            await initPesanan();
            setLoading(false);
        }
        if (pesananKeranjang.metode_pesan === null) {
            setPesananKeranjang((prev) => ({ ...prev, metode_pesan: "Pesan Langsung" }));
            await editMetode({ id_pesanan: pesananKeranjang.id_pesanan, metode_pesan: "Pesan Langsung" });
            setLoading(false);
        }
        if (pesananKeranjang.metode_pesan !== null && pesananKeranjang.metode_pesan !== "Pesan Langsung") {
            setStatus({
                status: "error",
                message: "Anda tidak bisa memesan produk PO dan Pesan Langsung sekaligus"
            });
            toast.error("Anda tidak bisa memesan produk PO dan Pesan Langsung sekaligus");
            setLoading(false);
            return;
        }
        let isPresent = false;
        cart.map((cartItem) => {
            if (cartItem.id_produk === item.id_produk && cartItem.id_hampers === null) {
                isPresent = true;
            }
            if (cartItem.id_hampers === item.id_hampers && cartItem.id_produk === null) {
                isPresent = true;
            }
        });
        if (isPresent) {
            console.log("produk sudah ada di keranjang");
            setStatus({
                status: "error",
                message: "Produk sudah ada di keranjang"
            })
            toast.error("Produk sudah ada di keranjang");
            setLoading(false);
            return;
        }
        // check if item has id_produk
        if (Object.keys(item).includes('id_produk') && item.id_produk !== null) {
            const dataProdukBaru = {
                id_pesanan: pesananKeranjang.id_pesanan,
                id_produk: item.id_produk,
                id_hampers: null,
                jumlah: 1,
                subtotal: item.harga,
            }
            setCart([...cart,
                dataProdukBaru
            ]);
            await AddProdukToKeranjang(dataProdukBaru);
            setStatus({
                status: "success",
                message: "Produk berhasil ditambahkan ke keranjang"
            });
            setLoading(false);
        }
        if (Object.keys(item).includes('id_hampers') && item.id_hampers !== null) {
            const dataHampersBaru = {
                id_pesanan: pesananKeranjang.id_pesanan,
                id_produk: null,
                id_hampers: item.id_hampers,
                jumlah: 1,
                subtotal: item.harga,
            }
            setCart([...cart,
                dataHampersBaru
            ]);
            await AddProdukToKeranjang(dataHampersBaru);
            setStatus({
                status: "success",
                message: "Produk berhasil ditambahkan ke keranjang"
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoggedIn(isLoggedIn());
        fetchKeranjang();
    }, []);

    useEffect(() => {
        console.log(pesananKeranjang);
        console.log(cart);
    }, [pesananKeranjang])

    useEffect(() => {
        if(status.status === ""){
            if (status.status === "success") {
                toast.success(status.message);
            }
            if (status.status === "error") {
                toast.error(status.message);
            }
        }else{
            if (status.status === "success") {
                toast.success(status.message);
            }
            if (status.status === "error") {
                toast.error(status.message);
            }
        }
    }, [status])

    return (
        <div className="w-screen">
            {
                loading && (
                    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-[#F9F9F1] flex flex-col gap-y-4 justify-center items-center">
                        <span className="loading bg-black ease-linear rounded-full h-32 w-32"></span>
                        <span>
                            <h1 className="text-2xl">Loading...</h1>
                        </span>
                    </div>
                )
            }
            <div className="w-screen">
                <TopNavbarLogin routes={routes} isLoggedIn={loggedIn} size={cart.length} />
                {
                    !loading && (
                        <Outlet context={{ handleClickPO, handleClickLangsung, pesananKeranjang, cart}} />
                    )
                }
            </div>
            <Footer />
            {
                status.status === "success" && (
                    <Toaster
                        message={status.message}
                        toastOptions={{
                            style: {
                                backgroundColor: "#008000",
                                border: "none",
                                color: "#FFFFFF"
                            }
                        }}
                    />
                )
            }
            {
                status.status === "error" && (
                    <Toaster
                        message={status.message}
                        toastOptions={{
                            style: {
                                backgroundColor: "#FF0000",
                                border: "none",
                                color: "#FFFFFF"
                            }
                        }}
                    />
                )
            }
        </div>
    )
};

export default CustomerLayout;