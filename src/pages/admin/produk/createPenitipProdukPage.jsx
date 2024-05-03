import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllPenitip } from "../../../api/Penitip";
import { CreateProduk } from "../../../api/produkApi";
import { toast } from "sonner";

const CreatePenitipProdukPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [penitip, setPenitip] = useState([]);
    const [data, setData] = useState({
        id_penitip: "",
        gambar_produk: null,
        nama_produk: "",
        deskripsi_produk: "",
        harga: 0,
        stok_tersedia: 0,
        kategori: "Penitip"
    });

    const getAllPenitip = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllPenitip();
            if (response !== null) {
                setPenitip(response);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPenitip();
    }, [])

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);
    }

    const handleFileChange = (event) => {
        const newData = { ...data, gambar_produk: event.target.files[0] };
        setData(newData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.id_penitip === "" || data.nama_produk === "" || data.stok_tersedia === "" || data.harga === 0 || data.deskripsi_produk === "" || data.gambar_produk === null) {
            toast.error("Semua data harus diisi");
            return;
        }

        if (data.gambar_produk.size > 2000000) {
            toast.error("Ukuran gambar terlalu besar, maksimal 2MB");
            return;
        }

        if (data.gambar_produk.type !== "image/jpeg" && data.gambar_produk.type !== "image/png" && data.gambar_produk.type !== "image/jpg" && data.gambar_produk.type !== "image/webp") {
            toast.error("Format gambar tidak didukung");
            return;
        }

        if (data.stok_tersedia < 0) {
            toast.error("Stok tidak boleh kurang dari 0");
            return;
        }

        if (data.harga < 0) {
            toast.error("Harga tidak boleh kurang dari 0");
            return;
        }

        const formData = new FormData();
        formData.append("id_penitip", data.id_penitip);
        formData.append("nama_produk", data.nama_produk);
        formData.append("harga", data.harga);
        formData.append("kategori", data.kategori);
        formData.append("deskripsi_produk", data.deskripsi_produk);
        formData.append("stok_tersedia", data.stok_tersedia);   
        formData.append("gambar_produk", data.gambar_produk);

        try {
            const response = await CreateProduk(formData);
            if (response.success) {
                toast.success("Produk berhasil ditambahkan");
                navigate('/dashboard/produk');
            } else {
                toast.error(response.data.message, {
                    description: [response.error]
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Gagal menambahkan produk", {
                description: [error.message]
            });
        }
    }

    return (
        <div className='w-screen min-h-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Tambah Produk Penitip</h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">
                    Manajemen Segala Produk Atma Kitchen
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
                                <form onSubmit={handleSubmit} id="createPembelianForm" className="form-control h-full w-3/4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="penitip">Penitip</label>
                                        </div>
                                        <div>
                                            <label htmlFor="namaProduk">Nama Produk</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <select name="id_penitip" defaultValue={"Pilih Penitip"} id="penitip" className="select select-bordered w-full bg-white" onChange={handleChange}>
                                                <option disabled>Pilih Penitip</option>
                                                {penitip.map((penitip) => {
                                                    return (
                                                        <option key={penitip.id_penitip} value={penitip.id_penitip}>{penitip.nama_penitip} - Penitip{penitip.id_penitip}</option>
                                                    )
                                                })};
                                            </select>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                id="namaProduk"
                                                name="nama_produk"
                                                placeholder="Isi Nama Produk"
                                                className="input input-bordered w-full bg-white"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label htmlFor="stok_tersedia">Jumlah Stok</label>
                                        </div>
                                        <div>
                                            <label htmlFor="harga">Harga</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <input
                                                type="number"
                                                id="stok_tersedia"
                                                name="stok_tersedia"
                                                placeholder="Isi Stok Produk Penitip"
                                                className="input input-bordered w-full bg-white"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                id="harga"
                                                name="harga"
                                                placeholder="Isi Harga Produk"
                                                className="input input-bordered w-full bg-white"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label htmlFor="gambar">Gambar Produk</label>
                                        </div>
                                        <div>
                                            <label htmlFor="deskripsi">Deskripsi Produk</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/jpeg, image/png, image/jpg, image/webp"
                                                max={1}
                                                id="gambar"
                                                name="gambar_produk"
                                                className="file-input file-input-bordered file:border-0 file:border-r file:border-slate-100 file:bg-white w-full h-full bg-white btn-danger"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                name="deskripsi_produk"
                                                className="textarea textarea-bordered resize-none w-full h-full bg-white"
                                                placeholder="Isi Deskripsi Produk"
                                                onChange={handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 mt-4">
                                        <div>
                                            <label htmlFor="gambar_preview">Preview Gambar Produk :</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-rows-1 gap-4 mt-2">
                                        <div>
                                            <div className="flex justify-center items-center min-h-[200px] w-full">
                                                {data.gambar_produk === null &&
                                                    <div className="text-center">
                                                        <p>Belum ada Gambar</p>
                                                    </div>
                                                }
                                                {data.gambar_produk !== null &&
                                                    <img src={URL.createObjectURL(data.gambar_produk)}
                                                        alt="gambar_preview"
                                                        className="rounded-md shadow w-1/4 h-1/4 max-h-full max-w-full object-contain"
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex flex-row-reverse space-x-1 space-x-reverse">
                                <button form="createPembelianForm" type="submit" className="btn btn-success text-white">
                                    Tambah
                                </button>
                                <button onClick={() => navigate('/dashboard/produk')} className="btn btn-error text-white">
                                    Batal
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CreatePenitipProdukPage;