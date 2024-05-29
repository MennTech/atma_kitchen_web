import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetKeranjangPesanan, HapusProdukKeranjang, HapusSatuProdukKeranjang, KurangJumlahProdukKeranjang, TambahJumlahProdukKeranjang } from "../../api/pesanan";
import { Toaster, toast } from "sonner";
import { getHampersPhoto, getProdukPhoto } from "../../api";
import { GetLimitByDate } from "../../api/limitProdukApi";
import { ShowHampers } from "../../api/hampersApi";

const Keranjang = () => {
    const navigate = useNavigate();
    const [pesanan, setPesanan] = useState({});
    const [loading, setLoading] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [date, setDate] = useState("");
    const [limitProduk, setLimitProduk] = useState([]);
    // const [cartItemDetail, setCartItemDetail] = useState([]);

    const nextTwoDate = new Date();
    nextTwoDate.setDate(nextTwoDate.getDate() + 2);
    const formattedDate = new Date(nextTwoDate.getTime() - (nextTwoDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const getLimitNextTwoDays = async () => {
        try {
            const response = await GetLimitByDate(date);
            if (response.success) {
                setLimitProduk(response.data);
            } else {
                Toaster.error("Terjadi kesalahan");
            }
        } catch (error) {
            console.log(error);
            Toaster.error("Terjadi kesalahan");
        }
    }

    const checkLimit = (id_produk) => {
        const limit = limitProduk.find(item => item.id_produk === id_produk);
        if (limit) {
            return limit.stok;
        } else {
            return 0;
        }
    }

    const checkHampersProdukLimit = (id_hampers) => {
        let isLimit = false;
        const currentHampers = ShowHampers(id_hampers);
        if (currentHampers.success) {
            currentHampers.data.produk.map(produk => {
                if (checkLimit(produk.id_produk) == 0) {
                    isLimit = true;
                }
            })
        }
        return isLimit;
    }

    const checkHampersProdukStok = (id_hampers) => {
        let isZero = false;
        const currentHampers = ShowHampers(id_hampers);
        if (currentHampers.success) {
            currentHampers.data.produk.map(produk => {
                if (produk.stok_tersedia === 0) {
                    isZero = true;
                }
            })
        }
        return isZero;
    }

    const fetchKeranjang = async () => {
        setLoading(true);
        try {
            const response = await GetKeranjangPesanan();
            if (response.success) {
                setPesanan(response.data);
                setCartItem(response.data.produk_pesanan.map((item) => item));
                setCartItem((prev) => [...prev, ...response.data.hampers_pesanan.map((item) => item)]);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchKeranjang();
        getLimitNextTwoDays();
    }, []);

    useEffect(() => {
        getLimitNextTwoDays();
    }, [date])

    useEffect(() => {
        console.log(cartItem);
    }, [cartItem]);

    useEffect(() => {
        setDate(formattedDate);
    }, [formattedDate]);

    const handleDateChange = (e) => {
        if (e.target.value < formattedDate) {
            setDate(formattedDate);
            return;
        }
        setDate(e.target.value);
    }

    const handleDeleteAll = async (id_pesanan) => {
        try {
            const response = await HapusProdukKeranjang({ "id_pesanan": id_pesanan });
            if (response.success) {
                location.reload();
                await fetchKeranjang();
            } else {
                toast.error(response.message);
                console.log(response.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const handleDeleteOne = async (id_pesanan, id_produk, id_hampers) => {
        try {
            const response = await HapusSatuProdukKeranjang({ "id_pesanan": id_pesanan, "id_produk": id_produk, "id_hampers": id_hampers });
            if (response.success) {
                location.reload();
                fetchKeranjang();
            } else {
                toast.error(response.message);
                console.log(response.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const handleTambahProduk = async (id_pesanan, id_produk, id_hampers) => {
        try {
            const response = await TambahJumlahProdukKeranjang({ "id_pesanan": id_pesanan, "id_produk": id_produk, "id_hampers": id_hampers });
            if (response.success) {
                fetchKeranjang();
            } else {
                toast.error(response.message);
                console.log(response.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const handleKurangProduk = async (id_pesanan, id_produk, id_hampers) => {
        try {
            const response = await KurangJumlahProdukKeranjang({ "id_pesanan": id_pesanan, "id_produk": id_produk, "id_hampers": id_hampers });
            if (response.success) {
                fetchKeranjang();
            } else {
                toast.error(response.message);
                console.log(response.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col gap-y-8 w-screen min-h-[100vh] py-8 px-64 max-lg:px-16 max-md:px-16 max-sm:px-8 overflow-x-hidden">
            {
                loading && (
                    <div className="flex flex-col justify-center items-center">
                        <span className="loading loading-lg"></span>
                        <span className="mt-2">Memuat Data...</span>

                    </div>
                )
            }
            {
                !loading && cartItem.length === 0 && (
                    <div className="flex flex-col justify-center items-center gap-y-4">
                        <h1 className="text-2xl font-bold">Keranjang Kosong</h1>
                        <p className="text-lg">Yuk tambah produk ke keranjang!</p>
                    </div>
                )
            }
            {
                !loading && cartItem.length > 0 && (
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-row max-sm:flex-col justify-between items-center">
                            <h1 className="text-2xl font-bold">Keranjang</h1>
                            {/* date input to check PO stok */}
                            {
                                pesanan.metode_pesan === "PO" && (
                                    <div className="flex flex-row items-center gap-x-4">
                                        <label htmlFor="date" className="text-lg font-bold">Cek Ketersediaan PO</label>
                                        <input
                                            type="date"
                                            min={formattedDate}
                                            value={date}
                                            onChange={handleDateChange}
                                            id="date"
                                            className="max-w-lg input input-bordered border p-2 bg-white rounded-lg"
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className="bg-white rounded-xl p-8">
                            <table className="table table-xs max-md:table-md max-sm:hidden">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="text-black text-center">
                                            Gambar
                                        </th>
                                        <th className="text-black text-center">
                                            Nama Produk
                                        </th>
                                        <th className="text-black text-center">
                                            Harga Produk
                                        </th>
                                        <th className="text-black text-center">
                                            Jumlah
                                        </th>
                                        <th className="text-black text-center">
                                            {
                                                pesanan.metode_pesan === "PO" ? "Stok PO" : "Stok Tersedia"
                                            }
                                        </th>
                                        <th className="text-black text-center">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItem.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    <button
                                                        onClick={
                                                            item.id_hampers ?
                                                                async () => await handleDeleteOne(pesanan.id_pesanan, null, item.id_hampers)
                                                                : async () => await handleDeleteOne(pesanan.id_pesanan, item.id_produk, null)
                                                        }
                                                        className="btn btn-sm btn-ghost btn-circle">
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </td>
                                                <td className="flex justify-center">
                                                    <img
                                                        src={item.id_hampers ? getHampersPhoto(item.gambar_hampers) : getProdukPhoto(item.gambar_produk)}
                                                        alt="gambar"
                                                        className="w-20 h-20 object-cover rounded-lg items-center"
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    {item.id_hampers ? item.nama_hampers : item.nama_produk}
                                                </td>
                                                <td className="text-center">
                                                    Rp{item.harga}
                                                </td>
                                                <td className="text-center">
                                                    {/* create two button for increasing and decreasing */}
                                                    <div className="flex flex-row justify-center items-center gap-x-4">
                                                        <button
                                                            className="btn btn-sm btn-ghost btn-circle"
                                                            disabled={
                                                                item.pivot.jumlah === 1
                                                            }
                                                            onClick={
                                                                item.id_hampers ?
                                                                    async () => await handleKurangProduk(pesanan.id_pesanan, null, item.id_hampers)
                                                                    : async () => await handleKurangProduk(pesanan.id_pesanan, item.id_produk, null)
                                                            }
                                                        >
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                        <span>{item.pivot.jumlah}</span>
                                                        <button
                                                            className="btn btn-sm btn-ghost btn-circle"
                                                            disabled={
                                                                pesanan.metode_pesan === "PO" ?
                                                                    item.id_hampers ? checkHampersProdukLimit(item.id_hampers)
                                                                        : item.pivot.jumlah == limitProduk.filter((limit) => limit.id_produk === item.id_produk).map((limit) => limit.stok)
                                                                    : item.id_hampers ? checkHampersProdukStok(item.id_hampers)
                                                                        : item.pivot.jumlah == item.stok_tersedia
                                                            }
                                                            onClick={
                                                                item.id_hampers ?
                                                                    () => handleTambahProduk(pesanan.id_pesanan, null, item.id_hampers)
                                                                    : () => handleTambahProduk(pesanan.id_pesanan, item.id_produk, null)
                                                            }
                                                        >
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M20 12L4 12" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    {
                                                        item.id_hampers ?
                                                            pesanan.metode_pesan === "PO" ?
                                                                checkHampersProdukLimit(item.id_hampers) ? "Tidak dapat dipesan" : "Dapat dipesan"
                                                                : checkHampersProdukStok(item.id_hampers) ? "Stok Habis" : "Stok Tersedia"
                                                            : pesanan.metode_pesan === "PO" ?
                                                                limitProduk.filter((limit) => limit.id_produk === item.id_produk)
                                                                    .map((limit, index) => (
                                                                        <span key={index}>{limit.stok}</span>
                                                                    ))
                                                                : item.stok_tersedia
                                                    }
                                                </td>
                                                <td className="text-center font-semibold">
                                                    Rp{item.pivot.subtotal}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="hidden max-sm:block">
                                {
                                    cartItem.map((item, index) => (
                                        <div key={index} className="grid grid-cols-3 gap-x-4 m-4">
                                            <div className="flex flex-col justify-center">
                                                <img
                                                    src={item.id_hampers ? getHampersPhoto(item.gambar_hampers) : getProdukPhoto(item.gambar_produk)}
                                                    alt="gambar"
                                                    className="w-20 h-20 object-cover rounded-lg items-center"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-y-2">
                                                <p className="font-semibold text-sm">{item.id_hampers ? item.nama_hampers : item.nama_produk}</p>
                                                <p className="text-xs">Rp{item.harga}</p>
                                                <p className="text-xs">{item.pivot.jumlah}</p>
                                                <p className="text-xs">Rp{item.pivot.subtotal}</p>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <button className="btn btn-sm btn-ghost btn-circle">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-row justify-end gap-x-4">
                            {/* button for buy more and checkout */}
                            <button onClick={() => navigate('/home')} className="btn btn-ghost">Belanja Lagi</button>
                            <button onClick={() => handleDeleteAll(pesanan.id_pesanan)} className="btn btn-ghost bg-error text-white">Hapus Semua Produk</button>
                            <button onClick={() => navigate('/keranjang/checkout')} className="btn btn-ghost bg-success text-white">Checkout</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Keranjang;