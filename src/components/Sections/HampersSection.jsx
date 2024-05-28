import { useEffect, useState } from "react";
import { getHampersPhoto } from "../../api";
import { GetAllHampers } from "../../api/hampersApi";
import { Toaster } from "sonner";
import { GetLimitByDate } from "../../api/limitProdukApi";

// eslint-disable-next-line react/prop-types
const HampersSection = ({ date, handleClickPO, handleClickLangsung }) => {
    const [loading, setLoading] = useState(false);
    const [hampers, setHampers] = useState([]);
    const [limitProduk, setLimitProduk] = useState([]);

    // const nextTwoDayDate = new Date();
    // nextTwoDayDate.setDate(nextTwoDayDate.getDate() + 2);
    // const humanDate = nextTwoDayDate.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    // const date = new Date(nextTwoDayDate.getTime() - (nextTwoDayDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const fetchHampers = async () => {
        setLoading(true);
        try {
            const response = await GetAllHampers();
            if (response.status === "OK") {
                setHampers(response.data);
            } else {
                Toaster.error('Terjadi Kesalahan');
            }
        } catch (error) {
            Toaster.error('Terjadi Kesalahan');
            console.log(error);
        }
        setLoading(false);
    }

    const fetchLimitProduk = async () => {
        setLoading(true);
        try {
            const response = await GetLimitByDate(date);
            if (response.success) {
                setLimitProduk(response.data);
            } else {
                Toaster.error('Terjadi Kesalahan');
            }
        } catch (error) {
            Toaster.error('Terjadi Kesalahan');
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchHampers();
        fetchLimitProduk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchLimitProduk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

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
        const currentHampers = hampers.find(item => item.id_hampers === id_hampers);
        if (currentHampers) {
            currentHampers.produk.map(produk => {
                if (checkLimit(produk.id_produk) === 0) {
                    isLimit = true;
                }
            })
        }
        return isLimit;
    }

    const checkHampersProdukStok = (id_hampers) => {
        let isZero = false;
        const currentHampers = hampers.find(item => item.id_hampers === id_hampers);
        if (currentHampers) {
            currentHampers.produk.map(produk => {
                if (produk.stok_tersedia === 0) {
                    isZero = true;
                }
            })
        }
        return isZero;
    }

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="divider text-center text-4xl max-md:text-2xl max-sm:text-md font-bold mt-8 mb-16">
                    Hampers
                </div>
                {loading &&
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <span className="mt-2">Memuat Data...</span>
                    </div>
                }
                {
                    !loading && hampers.length === 0 &&
                    <div className="flex flex-col items-center">
                        <span className="text-center text-2xl text-bold">Tidak ada hampers yang tersedia</span>
                    </div>
                }
                {!loading && (
                    <>
                        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-16 ">
                            {
                                hampers.map((item, index) => (
                                    <div key={index} className="card card-compact w-full border shadow-md">
                                        <figure><img src={getHampersPhoto(item.gambar_hampers)} alt={item.nama_hampers} /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{item.nama_hampers}</h2>
                                            <p>{item.deskripsi_hampers}</p>
                                            <p>
                                                <span className="font">Isi Hampers: </span>
                                                <span className="font">{
                                                    item.produk.map((produk, index) => (
                                                        <span key={index}>{produk.nama_produk}{index < item.produk.length - 1 ? ', ' : ''}</span>
                                                    ))
                                                }</span>
                                            </p>
                                            <p className="text-xl text-center font-bold">
                                                Rp{item.harga}
                                            </p>
                                            <div className="card-actions justify-center">
                                                <button
                                                    disabled={checkHampersProdukStok(item.id_hampers)}
                                                    className="btn btn-ghost disabled:text-opacity-50"
                                                    onClick={() => handleClickLangsung(item)}
                                                >Pesan Sekarang</button>
                                                <button
                                                    disabled={checkHampersProdukLimit(item.id_hampers)}
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

export default HampersSection;