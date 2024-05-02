import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import { CreatePembelianBahanBaku } from "../../../api/pembelianBahanBakuApi";
import { toast } from "sonner";

const CreatePembelianBahanBakuPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [bahanBaku, setBahanBaku] = useState([]);
    const [data, setData] = useState({
        id_bahan_baku: "",
        tanggal: "",
        jumlah: 0,
        harga: 0
    });

    const getAllBahanBaku = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllBahanBaku();
            if (response !== null) {
                setBahanBaku(response);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBahanBaku();
    }, [])

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(data.id_bahan_baku === "" || data.tanggal === "" || data.jumlah === 0 || data.harga === 0) {
            toast.error("Semua data harus diisi");
            return;
        }

        if(data.jumlah < 0 || data.harga < 0) {
            toast.error("Jumlah dan harga tidak boleh kurang dari 0");
            return;
        }

        try{
            const response = await CreatePembelianBahanBaku(data);
            if(response.success){
                toast.success("Pembelian Bahan Baku berhasil ditambahkan");
                navigate('/dashboard/pembelian-bahan-baku');
            }else{
                toast.error(response.message,{
                    description: [response.error]
                });
            }
        }catch(error){
            console.log(error);
            toast.error("Gagal menambahkan pembelian bahan baku", {
                description: [error.message]
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
                                            <select name="id_bahan_baku" defaultValue={"Pilih Bahan Baku"} id="bahanBaku" className="select select-bordered w-full bg-white" onChange={handleChange}>
                                                <option disabled>Pilih Bahan Baku</option>
                                                {bahanBaku.map((bahan) => {
                                                    return (
                                                        <option key={bahan.id_bahan_baku} value={bahan.id_bahan_baku}>{bahan.nama_bahan_baku}</option>
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
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                id="harga"
                                                name="harga"
                                                className="input input-bordered w-full bg-white"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="divider"></div>
                            <div className="flex flex-row-reverse space-x-1 space-x-reverse">
                                <button form="createPembelianForm" type="submit" className="btn btn-success text-white">
                                    Tambah
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

export default CreatePembelianBahanBakuPage;