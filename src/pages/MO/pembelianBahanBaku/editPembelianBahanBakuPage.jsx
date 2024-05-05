import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ShowPembelianBahanBaku, UpdatePembelianBahanBaku } from "../../../api/pembelianBahanBakuApi";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import { toast } from "sonner";

const EditPembelianBahanBakuPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [bahanBaku, setBahanBaku] = useState([]);
    const [pembelianBahanBaku, setPembelianBahanBaku] = useState({
        id_pembelian_bahan_baku: "",
        id_bahan_baku: "",
        tanggal: "",
        jumlah: 0,
        harga: 0
    });
    const [data, setData] = useState({
        id_pembelian_bahan_baku: "",
        id_bahan_baku: "",
        tanggal: "",
        jumlah: 0,
        harga: 0
    });

    const getData = async () => {
        setIsLoading(true);
        try {
            if (!/^[0-9]+$/.test(id)) {
                navigate("/dashboard/pembelian-bahan-baku");
            }
            const response = await ShowPembelianBahanBaku(id);
            const responseBahanBaku = await GetAllBahanBaku();
            if (!response.success) {
                navigate("/dashboard/pembelian-bahan-baku");
            } else {
                setPembelianBahanBaku({
                    id_pembelian_bahan_baku: response.data.id_bahan_baku,
                    id_bahan_baku: response.data.id_bahan_baku,
                    tanggal: response.data.tanggal,
                    jumlah: response.data.jumlah,
                    harga: response.data.harga
                });
                setData({
                    id_pembelian_bahan_baku: response.data.id_bahan_baku,
                    id_bahan_baku: response.data.id_bahan_baku,
                    tanggal: response.data.tanggal,
                    jumlah: response.data.jumlah,
                    harga: response.data.harga
                });
                setBahanBaku(responseBahanBaku);
            }
        } catch (error) {
            console.log(error);
            navigate("/dashboard/pembelian-bahan-baku");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);
    }

    const areObjectsEqual = (obj1, obj2) => {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.id_pembelian_bahan_baku === "" || data.id_bahan_baku === "" || data.tanggal === "" || (data.jumlah === 0 || data.jumlah === "") || (data.harga === 0 || data.harga === "")) {
            toast.error("Semua data harus diisi");
            return;
        }

        if (data.jumlah < 0 || data.harga < 0) {
            toast.error("Jumlah dan harga tidak boleh kurang dari 0");
            return;
        }

        if(areObjectsEqual(data, pembelianBahanBaku)){
            toast.info("Tidak ada data yang diubah");
            navigate('/dashboard/pembelian-bahan-baku');
            return;
        }

        try{
            const response = await UpdatePembelianBahanBaku(id, data);
            if(response.success){
                toast.success("Pembelian Bahan Baku berhasil Diubah");
                navigate('/dashboard/pembelian-bahan-baku');
            }else{
                toast.error(response.data.message,{
                    description: response.data.error
                });
            }
        }catch(error){
            console.log(error);
            toast.error("Terjadi kesalahan saat mengupdate data", {
                description: [error]
            });
        }
    }

    return (
        <div className='w-screen min-h-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Tambah Pembelian Bahan Baku</h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">
                    Manajemen Pembelian Bahan Baku Atma Kitchen
                </p>
            </div>
            <div className="card w-full h-fit bg-white mt-2">
                <div className="card-body h-full p-4">
                    {isLoading &&
                        <div className="flex flex-col items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                            <span className="mt-2">Memuat Data...</span>
                        </div>
                    }
                    {!isLoading &&
                        <div>
                            <div className="flex justify-center">
                                <form id="createPembelianForm" onSubmit={handleSubmit} className="form-control h-full w-3/4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label htmlFor="bahanBaku">Bahan Baku</label>
                                        </div>
                                        <div>
                                            <label htmlFor="tanggalPembelian">Tanggal Pembelian</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="w-full">
                                            <select value={data.id_bahan_baku} name="id_bahan_baku" id="bahanBaku" className="select select-bordered w-full bg-white" onChange={handleChange}>
                                                <option disabled>Pilih Bahan Baku</option>
                                                {bahanBaku.map((bahan) => {
                                                    return (
                                                        <option
                                                            key={bahan.id_bahan_baku}
                                                            value={bahan.id_bahan_baku}
                                                        >
                                                            {bahan.nama_bahan_baku}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <input
                                                type="date"
                                                id="tanggalPembelian"
                                                name="tanggal"
                                                className="input input-bordered w-full bg-white"
                                                value={data.tanggal}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <div>
                                            <label htmlFor="jumlah">Jumlah</label>
                                        </div>
                                        <div>
                                            <label htmlFor="harga">Harga</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="w-full">
                                            <input
                                                type="number"
                                                id="jumlah"
                                                name="jumlah"
                                                className="input input-bordered w-full bg-white"
                                                value={data.jumlah}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                id="harga"
                                                name="harga"
                                                className="input input-bordered w-full bg-white"
                                                value={data.harga}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="divider"></div>
                            <div className="flex flex-row-reverse space-x-1 space-x-reverse">
                                <button form="createPembelianForm" type="submit" className="btn btn-primary text-white">
                                    Edit
                                </button>
                                <button onClick={() => navigate('/dashboard/pembelian-bahan-baku')} className="btn btn-error text-white">
                                    Batal
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default EditPembelianBahanBakuPage;