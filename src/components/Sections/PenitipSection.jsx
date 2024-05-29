import { useEffect, useState } from "react";
import { GetPenitipProduk } from "../../api/produkApi";
import { getProdukPhoto } from "../../api";

const PenitipSection = ({ handleClickLangsung }) => {
    const [loading, setLoading] = useState(false);
    const [produkPenitip, setProdukPenitip] = useState([]);

    const fetchProdukPenitip = async () => {
        setLoading(true);
        try {
            const response = await GetPenitipProduk();
            if (response.success) {
                setProdukPenitip(response.produks);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProdukPenitip();
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="divider text-center text-4xl max-md:text-2xl max-sm:text-md font-bold mt-8 mb-16">
                    Produk Lain
                </div>
                {loading &&
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <span className="mt-2">Memuat Data...</span>
                    </div>
                }
                {
                    !loading && produkPenitip.length === 0 &&
                    <div className="flex flex-col items-center">
                        <span className="text-center text-2xl text-bold">Tidak ada produk yang tersedia</span>
                    </div>
                }
                {!loading && (
                    <>
                        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-16 ">
                            {
                                produkPenitip.map((item, index) => (
                                    <div key={index} className="card card-compact w-full border shadow-md">
                                        <figure><img src={getProdukPhoto(item.gambar_produk)} alt={item.nama_produk} className="w-full h-48"/></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{item.nama_produk}</h2>
                                            <p>{item.deskripsi_produk}</p>
                                            <p>
                                                <span className="font">Stok Tersedia: </span>
                                                <span className="font">{item.stok_tersedia}</span>
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

export default PenitipSection;