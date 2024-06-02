import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckoutPesanan, GetKeranjangPesanan } from "../../api/pesanan";
import { GetAlamat, GetProfile } from "../../api/userApi";
import ErrorAlert from "../../components/alerts/errorAlert";

const Checkout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pesanan, setPesanan] = useState({});
    const [cartItem, setCartItem] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [alamatUser, setAlamatUser] = useState([]);
    const [doublePoin, setDoublePoin] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [potonganPoin, setPotonganPoin] = useState(0);
    const [total, setTotal] = useState(0);
    const [pointDidapat, setPointDidapat] = useState(0);
    const [date, setDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [data, setData] = useState({
        "id_pesanan": null,
        "tanggal_ambil": "",
        "alamat": "",
        "delivery": "",
        "poin_dipakai": 0,
    });
    const [tanggalAmbil, setTanggalAmbil] = useState({
        "tanggal": "",
        "waktu": "",
    });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getCurrentUser = async () => {
        try {
            const response = await GetProfile();
            setCurrentUser(response.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAlamatUser = async () => {
        setLoading(true);
        try {
            const response = await GetAlamat();
            if (response.success) {
                setAlamatUser(response.data);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchKeranjang = async () => {
        setLoading(true);
        try {
            const response = await GetKeranjangPesanan();
            if (response.success) {
                setPesanan(response.data);
                setData((prev) => ({ ...prev, ["id_pesanan"]: response.data.id_pesanan }));
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
        getAlamatUser();
        getCurrentUser();
    }, []);

    useEffect(() => {
        let currentDate = new Date();
        let userDOB = new Date(currentUser.tanggal_lahir);
        let timeDiff = Math.abs(currentDate.getTime() - userDOB.getTime());
        let dayDiff = timeDiff / (1000 * 3600 * 24);
        if (dayDiff <= 3) {
            setDoublePoin(true);
        }
    }, [currentUser]);

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        // check metode pesan
        if (pesanan.metode_pesan === "PO") {
            const nextTwoDate = new Date();
            nextTwoDate.setDate(nextTwoDate.getDate() + 2);
            const formattedDate = new Date(nextTwoDate.getTime() - (nextTwoDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            setDate(formattedDate);
        }
        if (pesanan.metode_pesan === "Pesan Langsung") {
            const date = new Date();
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 1);
            const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedMaxDate = new Date(maxDate.getTime() - (maxDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            setDate(formattedDate);
            setMaxDate(formattedMaxDate);
        }
    }, [pesanan]);

    useEffect(() => {
        let subtotal = cartItem.reduce((acc, item) => acc + (item.pivot.jumlah * item.harga), 0);
        setSubTotal(subtotal);
    }, [cartItem])

    useEffect(() => {
        let total = data.poin_dipakai * 100;
        setPotonganPoin(total);
    }, [data.poin_dipakai])

    useEffect(() => {
        setTotal(subTotal - potonganPoin);
    }, [subTotal, potonganPoin])

    useEffect(() => {
        setPointDidapat(hitungPoinDidapat(total));
        if (doublePoin) {
            setPointDidapat((prev) => prev * 2);
        }
    }, [total, doublePoin])

    const hitungPoinDidapat = (total) => {
        let poinDidapat = 0;
        let totalHarga = total;
        while (totalHarga > 0) {
            if (totalHarga % 1_000_000 != totalHarga) {
                poinDidapat += 200;
                totalHarga -= 1_000_000;
            } else if (totalHarga % 500_000 != totalHarga) {
                poinDidapat += 75;
                totalHarga -= 500_000;
            } else if (totalHarga % 100_000 != totalHarga) {
                poinDidapat += 15;
                totalHarga -= 100_000;
            } else if (totalHarga % 10_000 != totalHarga) {
                poinDidapat += 1;
                totalHarga -= 10_000;
            } else {
                break;
            }
        }
        return poinDidapat;
    }

    useEffect(() => {
        console.log(date);
        console.log(maxDate);
    }, [date, maxDate])

    useEffect(() => {
        console.log(data);
    }, [data])

    const handleChangeAlamat = (e) => {
        const newData = { ...data, ["alamat"]: e.target.value };
        setData(newData);
    }

    const handleChangePoint = (e) => {
        if (e.target.value == null) {
            setData((prev) => ({ ...prev, ["poin_dipakai"]: 0 }));
            return;
        }
        if (e.target.value < 0) {
            setData((prev) => ({ ...prev, ["poin_dipakai"]: 0 }));
            return;
        }
        if (e.target.value > currentUser.poin) {
            setData((prev) => ({ ...prev, ["poin_dipakai"]: 0 }));
            return;
        }
        setData((prev) => ({ ...prev, ["poin_dipakai"]: parseInt(e.target.value) || 0 }));
    }

    const handleChangeTanggalAmbil = (e) => {
        setTanggalAmbil((prev) => ({ ...prev, ["tanggal"]: e.target.value }));
    }

    const handleChangeWaktuAmbil = (e) => {
        setTanggalAmbil((prev) => ({ ...prev, ["waktu"]: e.target.value }));
    }

    const handleChangeDelivery = (e) => {
        setData((prev) => ({ ...prev, ["delivery"]: e.target.value }));
    }

    const submitCheckout = async (e) => {
        e.preventDefault();
        if(data.id_pesanan === null || data.alamat === "" || data.tanggal_ambil === "" || data.delivery === "") {
            toast.error("Semua data harus diisi");
            return;
        }

        if(data.poin_dipakai > currentUser.poin) {
            toast.error("Poin yang dipakai melebihi poin yang dimiliki");
            return;
        }

        try {
            const response = await CheckoutPesanan(data);
            if (response.success) {
                window.location.reload();
                // toast.success("Pesanan berhasil dibuat");
            } else {
                setError(true);
                setErrorMessage(response.response.data.error);
                toast.error(response.response.data.error);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const time = setTimeout(() => {
            setError(false);
            setErrorMessage("");
        }, 2000);

        return () => clearTimeout(time);
    }, [error])

    useEffect(() => {
        if (tanggalAmbil.tanggal === "" || tanggalAmbil.waktu === "") {
            return;
        }
        const newData = { ...data, ["tanggal_ambil"]: formatDate(new Date(`${tanggalAmbil.tanggal} ${tanggalAmbil.waktu}`)) };
        setData(newData);
    }, [tanggalAmbil.tanggal, tanggalAmbil.waktu]);

    useEffect(() => {
        console.log(tanggalAmbil);
    }, [tanggalAmbil])

    return (
        <div className="flex flex-col gap-y-8 w-screen min-h-[100vh] py-8 px-64 max-lg:px-16 max-md:px-16 max-sm:px-8 overflow-x-hidden">
            {
                loading && (
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <span className="mt-2">Memuat Data...</span>
                    </div>
                )
            }
            {
                !loading && (data.id_pesanan === null || data.id_pesanan !== null) && cartItem.length == 0 &&(
                    <div className="flex flex-col justify-center items-center gap-y-4">
                        <h1 className="text-2xl font-bold">Keranjang Kosong</h1>
                        <p className="text-lg">Yuk tambah produk ke keranjang!</p>
                    </div>
                )
            }
            {
                !loading && data.id_pesanan !== null && cartItem.length > 0 && (
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-2xl font-bold">Checkout Pesanan</h1>
                        <div className="bg-white rounded-xl p-8">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-bold">Pesanan</h2>
                                {/* pesanan type */}
                                <p>Metode : {pesanan.metode_pesan}</p>
                                <p className="text-sm">Total Harga</p>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex flex-col gap-y-4">
                                {
                                    cartItem.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <div>
                                                <p>{item.nama_produk}</p>
                                                <p>{item.pivot.jumlah} x Rp{item.harga}</p>
                                            </div>
                                            <p>Rp{item.pivot.jumlah * item.harga}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>Rp{subTotal}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Potongan {data.poin_dipakai} Poin</p>
                                <p>Rp{data.poin_dipakai * 100}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Poin sisa</p>
                                <p>{currentUser.poin - data.poin_dipakai || 0}</p>
                            </div>
                            <div className="divider"></div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-lg">Total</p>
                                <p className="font-semibold text-lg">Rp{cartItem.reduce((acc, item) => acc + (item.pivot.jumlah * item.harga), 0) - data.poin_dipakai * 100}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="">Poin yang didapat*</p>
                                <p className="font-semibold text-lg">{pointDidapat}</p>
                            </div>
                            <p className="text-xs opacity-40">
                                *S&K Promo Berlaku
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-8">
                            <form id="formCheckout" className="form-control" onSubmit={(e) => submitCheckout(e)}>
                                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                                    <div className="w-full">
                                        <h2 className="text-lg font-bold">Alamat</h2>
                                        <select onChange={(e) => handleChangeAlamat(e)} defaultValue={"Pilih Alamat"} name="alamat" className="input input-bordered bg-white w-full" required>
                                            <option disabled>Pilih Alamat</option>
                                            {
                                                alamatUser.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.nama_jalan}</option>
                                                ))

                                            }
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <div className="grid grid-cols-2 gap-x-2">
                                            <div className="flex flex-col">
                                                {/* input date */}
                                                <h2 className="text-lg font-bold">Tanggal Ambil</h2>
                                                <input required onChange={(e) => handleChangeTanggalAmbil(e)} type="date" min={date}
                                                    max={pesanan.metode_pesan === "PO" ? "" : maxDate}
                                                    className="input input-bordered form-control bg-white w-full" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h2 className="text-lg font-bold">Waktu Ambil</h2>
                                                <input type="time"
                                                    required
                                                    onChange={(e) => handleChangeWaktuAmbil(e)}
                                                    className="input input-bordered form-control bg-white w-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <h2 className="text-lg font-bold">Poin yang digunakan</h2>
                                        <input onChange={(e) => handleChangePoint(e)} type="number" defaultValue={0} min={0} max={currentUser.poin} className="input input-bordered form-control bg-white w-full" />
                                    </div>
                                    <div className="w-full">
                                        <h2 className="text-lg font-bold">Jenis Delivery</h2>
                                        <select required onChange={(e) => handleChangeDelivery(e)} defaultValue={"Pilih Delivery"} name="delivery" className="input input-bordered bg-white w-full">
                                            <option disabled>Pilih Delivery</option>
                                            <option value="Pickup">Pickup</option>
                                            <option value="Ojek Online">Ojek Online</option>
                                            <option value="Kurir Atma Kitchen">Kurir Atma Kitchen</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* {
                            error && <ErrorAlert message={errorMessage} />
                        } */}
                        {/* button */}
                        <div className="flex justify-end gap-x-4">
                            <button onClick={() => navigate('/home')} className="btn btn-ghost">Belanja Lagi</button>
                            <button onClick={() => navigate('/keranjang', {replace: true})} className="btn btn-ghost bg-error text-white">Batal</button>
                            <button type="submit" form="formCheckout" className="btn btn-ghost bg-success text-white">Buat Pesanan</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Checkout;