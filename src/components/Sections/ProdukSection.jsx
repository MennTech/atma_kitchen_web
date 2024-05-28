import { useEffect, useState } from "react";
import { GetAtmaKitchenProduk } from "../../api/produkApi";
import { GetLimitByDate } from "../../api/limitProdukApi";
import { Toaster } from "sonner";
import { getProdukPhoto } from "../../api";

// eslint-disable-next-line react/prop-types
const ProdukSection = ({ date, handleClickPO, handleClickLangsung }) => {
    const [loading, setLoading] = useState(false);
    const [produk, setProduk] = useState([]);
    const [limitProduk, setLimitProduk] = useState([]);

    // const nextTwoDayDate = new Date();
    // nextTwoDayDate.setDate(nextTwoDayDate.getDate() + 2);
    // const humanDate = nextTwoDayDate.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    // const date = new Date(nextTwoDayDate.getTime() - (nextTwoDayDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const getLimitNextTwoDays = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    const fetchAtmaKitchenProduk = async () => {
        setLoading(true);
        try {
            const response = await GetAtmaKitchenProduk();
            if (response.success) {
                setProduk(response.produks);
            } else {
                Toaster.error("Terjadi kesalahan");
            }
        } catch (error) {
            console.log(error);
            Toaster.error("Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchAtmaKitchenProduk();
        getLimitNextTwoDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getLimitNextTwoDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="divider text-center text-4xl max-md:text-2xl max-sm:text-md font-bold mb-8">
                    Produk Atma Kitchen
                </div>
                {loading &&
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <span className="mt-2">Memuat Data...</span>
                    </div>
                }
                {
                    !loading && produk.length === 0 &&
                    <div className="flex flex-col items-center">
                        <span className="text-center text-2xl text-bold">Tidak ada produk yang tersedia</span>
                    </div>
                }
                {!loading && (
                    <>
                        <p className="text-start text-2xl font-bold mb-8">
                            Cake
                        </p>
                        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-16 ">
                            {
                                produk.filter((item) => item.kategori === "Cake")
                                    .map((item, index) => (
                                        <div key={index} className="card card-compact w-full border shadow-md">
                                            <figure><img src={getProdukPhoto(item.gambar_produk)} alt={item.nama_produk} /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{item.nama_produk}</h2>
                                                <p>{item.deskripsi_produk}</p>
                                                <p hidden={item.stok_tersedia === 0}>
                                                    <span className="font">Stok Tersedia: </span>
                                                    <span className="font">{item.stok_tersedia}</span>
                                                </p>
                                                <p>
                                                    <span className="font">Stok Pre-order : </span>
                                                    <span className="font">{
                                                        limitProduk.filter((limit) => limit.id_produk === item.id_produk)
                                                            .map((limit, index) => (
                                                                <span key={index}>{limit.stok}</span>
                                                            ))
                                                    }</span>
                                                </p>
                                                <p className="text-xl text-center font-bold">
                                                    Rp{item.harga}
                                                </p>
                                                <div className="card-actions justify-center">
                                                    <button
                                                        disabled={item.stok_tersedia === 0}
                                                        className="btn btn-ghost disabled:text-opacity-50"
                                                        onClick={() => handleClickLangsung(item)}
                                                    >Pesan Sekarang</button>
                                                    <button disabled={
                                                        limitProduk.filter((limit) => limit.id_produk === item.id_produk)
                                                            .map((limit) => limit.stok) == 0
                                                    }
                                                        className="btn btn-ghost disabled:text-opacity-50"
                                                        onClick={() => handleClickPO(item)}
                                                    >Pre-order</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                        <p className="text-start text-2xl font-bold mt-16 mb-8">
                            Roti
                        </p>
                        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-16">
                            {
                                produk.filter((item) => item.kategori === "Roti")
                                    .map((item, index) => (
                                        <div key={index} className="card card-compact w-full border">
                                            <figure><img src={item.gambar_produk} alt={item.nama_produk} /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{item.nama_produk}</h2>
                                                <p>{item.deskripsi_produk}</p>
                                                <p>
                                                    <span className="font">Stok Tersedia: </span>
                                                    <span className="font">{item.stok_tersedia}</span>
                                                </p>
                                                <p>
                                                    <span className="font">Stok Pre-order : </span>
                                                    <span className="font">{
                                                        limitProduk.filter((limit) => limit.id_produk === item.id_produk)
                                                            .map((limit, index) => (
                                                                <span key={index}>{limit.stok}</span>
                                                            ))
                                                    }</span>
                                                </p>
                                                <p className="text-xl text-center font-bold">
                                                    Rp{item.harga}
                                                </p>
                                                <div className="card-actions justify-center">
                                                    <button
                                                        disabled={item.stok_tersedia === 0}
                                                        className="btn btn-ghost disabled:text-opacity-50"
                                                        onClick={() => handleClickLangsung(item)}
                                                    >Pesan Sekarang</button>
                                                    <button
                                                        disabled={
                                                            limitProduk.filter((limit) => limit.id_produk === item.id_produk)
                                                                .map((limit) => limit.stok) == 0
                                                        }
                                                        className="btn btn-ghost disabled:text-opacity-50"
                                                        onClick={() => handleClickPO(item)}
                                                    >Pre-order</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                        <p className="text-start text-2xl font-bold mt-16 mb-8">
                            Minuman
                        </p>
                        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-16">
                            {
                                produk.filter((item) => item.kategori === "Minuman")
                                    .map((item, index) => (
                                        <div key={index} className="card card-compact w-full border">
                                            <figure><img src={item.gambar_produk} alt={item.nama_produk} /></figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{item.nama_produk}</h2>
                                                <p>{item.deskripsi_produk}</p>
                                                <p>
                                                    <span className="font">Stok Tersedia: </span>
                                                    <span className="font">{item.stok_tersedia}</span>
                                                </p>
                                                <p>
                                                    <span className="font">Stok Pre-order : </span>
                                                    <span className="font">{
                                                        limitProduk.filter((limit) => limit.id_produk === item.id_produk)
                                                            .map((limit, index) => (
                                                                <span key={index}>{limit.stok}</span>
                                                            ))
                                                    }</span>
                                                </p>
                                                <p className="text-xl text-center font-bold">
                                                    Rp{item.harga}
                                                </p>
                                                <div className="card-actions justify-center">
                                                    <button
                                                        disabled={item.stok_tersedia === 0}
                                                        className="btn btn-ghost disabled:text-opacity-50"
                                                        onClick={() => handleClickLangsung(item)}
                                                    >Pesan Sekarang</button>
                                                    <button
                                                        disabled={
                                                            limitProduk.filter((limit) => limit.id_produk === item.id_produk)
                                                                .map((limit) => limit.stok) == 0
                                                        }
                                                        className="btn btn-ghost disabled:text-opacity-50"
                                                        onClick={() => handleClickPO(item)}
                                                    >Pre-order</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProdukSection;