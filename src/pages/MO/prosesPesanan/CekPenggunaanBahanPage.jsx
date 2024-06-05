import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShowPenggunaanBahanPesanan, ProsesPesanan } from "../../../api/pesanan";
import { toast } from "sonner";

const CekPenggunaanBahanPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id_pesanan = location.state?.id_pesanan;

    useEffect(() => {
        if (!id_pesanan) navigate('/dashboard/pesanan/proses')
    }, [id_pesanan, navigate])

    const [isLoading, setIsLoading] = useState(false);
    const [penggunaanBahanBaku, setPenggunaanBahanBaku] = useState([]);
    const [bahanBakuAsli, setBahanBakuAsli] = useState([]);

    const fetchPenggunaanBahanBaku = () => {
        setIsLoading(true);
        ShowPenggunaanBahanPesanan(id_pesanan)
            .then((response) => {
                setPenggunaanBahanBaku(response.data);
                setBahanBakuAsli(response.bahan_baku_asli);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setPenggunaanBahanBaku([]);
                setBahanBakuAsli([]);
                console.log(error);
            });
    }

    useEffect(() => {
        if (id_pesanan) fetchPenggunaanBahanBaku();
    }, [id_pesanan]);

    const handleClose = () => {
        navigate('/dashboard/pesanan/proses');
    }

    const handleProsesPesanan = () => {
        console.log(id_pesanan);
        ProsesPesanan(id_pesanan)
            .then((response) => {
                if(response.success){
                    toast.success("Pesanan berhasil diproses");
                    navigate('/dashboard/pesanan/proses');
                }else{
                    toast.error("Terjadi kesalahan saat memproses pesanan");
                }
            })
            .catch((error) => {
                toast.error("Terjadi kesalahan saat memproses pesanan", {
                    description: error
                });

            });
    }


    return (
        <div className="w-screen p-4 min-h-screen overflow-y-auto">
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">
                    Proses Pesanan Hari Ini
                </h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">Manajemen Atma Kitchen</p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    {
                        isLoading && (
                            <div className="flex flex-col items-center">
                                <span className="loading loading-spinner loading-lg"></span>
                                <span className="mt-2">Memuat Data...</span>
                            </div>
                        )
                    }
                    {
                        !isLoading && penggunaanBahanBaku.length == 0 && (
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-semibold">Data Kosong</span>
                            </div>
                        )
                    }
                    {
                        !isLoading && penggunaanBahanBaku.length > 0 && (
                            <>
                                <h1 className="text-2xl font-semibold text-center">Cek Penggunaan Bahan</h1>
                                <p>Jumlah Pesanan : {id_pesanan.length}</p>
                                <table className="table-auto w-full my-4">
                                    <thead>
                                        <tr>
                                            <th className="border px-4 py-2">Nama Bahan Baku</th>
                                            <th className="border px-4 py-2">Jumlah Dipakai</th>
                                            <th className="border px-4 py-2">Jumlah Sekarang</th>
                                            <th className="border px-4 py-2">Satuan</th>
                                            <th className="border px-4 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            penggunaanBahanBaku.map((bahan) => {
                                                const bahanAsli = bahanBakuAsli.find((b) => b.id_bahan_baku === bahan.id_bahan_baku);
                                                return (
                                                    <tr key={bahan.id_bahan_baku}>
                                                        <td className="border px-4 py-2">{bahanAsli.nama_bahan_baku}</td>
                                                        <td className="border px-4 py-2">{bahan.jumlah}</td>
                                                        <td className="border px-4 py-2">{bahanAsli.jumlah}</td>
                                                        <td className="border px-4 py-2">{bahanAsli.satuan}</td>
                                                        {/* check if jumlah bahan is over jumlah bahan asli */}
                                                        {
                                                            bahan.jumlah > bahanAsli.jumlah ? (
                                                                <td className="border bg-error text-white text-center text-sm font-semibold">
                                                                    Jumlah bahan tidak cukup
                                                                </td>
                                                            ) : (
                                                                <td className="border px-4 py-2 bg-success text-white text-center text-sm font-semibold">
                                                                    Jumlah bahan cukup
                                                                </td>
                                                            )
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="flex flex-row justify-end gap-x-2">
                                    <button
                                        onClick={handleClose}
                                        className="btn btn-error text-white"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="btn btn-success text-white"
                                        disabled={penggunaanBahanBaku.some((bahan) => bahan.jumlah > bahanBakuAsli.find((b) => b.id_bahan_baku === bahan.id_bahan_baku).jumlah)}
                                        onClick={handleProsesPesanan}
                                    >
                                        Proses Pesanan
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CekPenggunaanBahanPage;