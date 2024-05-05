import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllResep } from "../../../api/resepApi";
import { GetAllPenitip } from "../../../api/Penitip";
import { ShowProduk, UpdateProduk } from "../../../api/produkApi";
import { getProdukPhoto } from "../../../api";
import { toast } from "sonner";

const EditProdukPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [resep, setResep] = useState([]);
    const [penitip, setPenitip] = useState([]);
    const [isAtmaProduk, setIsAtmaProduk] = useState(false);
    const [produk, setProduk] = useState({
        id_produk: "",
        id_resep: null,
        id_penitip: null,
        nama_produk: "",
        deskripsi_produk: "",
        gambar_produk: null,
        harga: 0,
        kategori: "",
        status: "",
        stok_tersedia: 0,
    });
    const [data, setData] = useState({
        id_produk: "",
        id_resep: null,
        id_penitip: null,
        nama_produk: "",
        deskripsi_produk: "",
        gambar_produk: null,
        harga: 0,
        kategori: "",
        status: "",
        stok_tersedia: 0,
    });

    const ketegori = [
        "Cake",
        "Roti",
        "Minuman",
        "Titipan"
    ]

    const getData = async () => {
        setIsLoading(true);
        try {
            if (!/^[0-9]+$/.test(id)) {
                navigate('/dashboard/produk');
            }

            const response = await ShowProduk(id);
            const responseResep = await GetAllResep();
            const responsePenitip = await GetAllPenitip();
            if (response.success) {
                setProduk(response.produk);
                setData(response.produk);
                setResep(responseResep.data.data);
                setPenitip(responsePenitip);
            } else {
                toast.error("Terjadi kesalahan saat mengambil data produk");
                navigate('/dashboard/produk');
            }
        } catch (error) {
            console.log(error);
            toast.error("Terjadi Kesalahan", {
                description: [error.message]
            })
            navigate('/dashboard/produk');
        } finally {
            setIsLoading(false);
        }
    }

    const checkIsAtmaProduk = async () => {
        if (produk.id_resep !== null && produk.id_resep !== "" && produk.id_penitip === null) {
            setIsAtmaProduk(true);
        } else {
            setIsAtmaProduk(false);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        checkIsAtmaProduk();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [produk])

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);
    }

    const handleFileChange = (event) => {
        const newData = { ...data, gambar_produk: event.target.files[0] };
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
        if (areObjectsEqual(data, produk)) {
            toast.info("Tidak ada perubahan data");
            navigate('/dashboard/produk');
            return;
        }

        if (data.nama_produk === "" || data.kategori === "" || data.harga === 0 || data.deskripsi_produk === "" || data.gambar_produk === null) {
            toast.error("Semua data harus diisi");
            return;
        }

        if (isAtmaProduk && data.id_resep === null) {
            toast.error("Resep harus diisi");
            return;
        }

        if (!isAtmaProduk && data.id_penitip === null) {
            toast.error("Penitip harus diisi");
            return;
        }


        if (data.gambar_produk !== produk.gambar_produk) {
            if (data.gambar_produk.size > 2000000) {
                toast.error("Ukuran gambar terlalu besar, maksimal 2MB");
                return;
            }

            if (data.gambar_produk.type !== "image/jpeg" && data.gambar_produk.type !== "image/png" && data.gambar_produk.type !== "image/jpg" && data.gambar_produk.type !== "image/webp") {
                toast.error("Format gambar tidak didukung");
                return;
            }
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
        if (data.gambar_produk !== produk.gambar_produk) {
            formData.append("gambar_produk", data.gambar_produk);
        }
        formData.append("nama_produk", data.nama_produk);
        formData.append("deskripsi_produk", data.deskripsi_produk);
        formData.append("harga", data.harga);
        formData.append("kategori", data.kategori);
        formData.append("status", data.status);
        formData.append("stok_tersedia", data.stok_tersedia);
        if (isAtmaProduk) {
            formData.append("id_resep", data.id_resep);
        } else {
            formData.append("id_penitip", data.id_penitip);
        }

        try {
            const response = await UpdateProduk(id, formData);
            console.log(response);
            if (response.success) {
                toast.success("Produk berhasil diedit");
                navigate('/dashboard/produk');
            } else {
                toast.error(response.data.message, {
                    description: [response.error]
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Gagal mengedit produk", {
                description: [error.message]
            });
        }
    }

    return (
        <div className='w-screen min-h-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Edit Produk Atma Kitchen</h1>
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
                                            <label htmlFor="resep" className="flex items-center">
                                                Resep
                                                <span className="ml-1 text-sm text-gray-500">(untuk Produk Atma Kitchen)</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="penitip" className="felx items-center">
                                                Penitip
                                                <span className="ml-1 text-sm text-gray-500">(untuk Produk Penitip)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <select value={produk.id_resep === null ? "Pilih Resep" : data.id_resep} disabled={!isAtmaProduk} name="id_resep" id="resep" className="select select-bordered w-full bg-white disabled:bg-white disabled:border-slate-100" onChange={handleChange}>
                                                <option disabled>Pilih Resep</option>
                                                {resep.map((resep) => {
                                                    return (
                                                        <option key={resep.id_resep} value={resep.id_resep}>{resep.nama_resep}</option>
                                                    )
                                                })};
                                            </select>
                                        </div>
                                        <div>
                                            <select value={produk.id_penitip === null ? "Pilih Penitip" : data.id_penitip} disabled={isAtmaProduk} name="id_penitip" id="penitip" className="select select-bordered w-full bg-white disabled:bg-white disabled:border-slate-100" onChange={handleChange}>
                                                <option disabled>Pilih Penitip</option>
                                                {penitip.map((penitip) => {
                                                    return (
                                                        <option key={penitip.id_penitip} value={penitip.id_penitip}>{penitip.nama_penitip} - Penitip{penitip.id_penitip}</option>
                                                    )
                                                })};
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label htmlFor="namaProduk">Nama Produk</label>
                                        </div>
                                        <div>
                                            <label htmlFor="kategori">Kategori</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                value={data.nama_produk}
                                                type="text"
                                                id="namaProduk"
                                                name="nama_produk"
                                                placeholder="Isi Nama Produk"
                                                className="input input-bordered w-full bg-white"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <select value={data.kategori} disabled={!isAtmaProduk} name="kategori" id="kategori" className="select select-bordered w-full bg-white disabled:bg-white disabled:border-slate-100" onChange={handleChange}>
                                                <option disabled>Pilih Kategori</option>
                                                {
                                                    ketegori.map((kategori) => {
                                                        return (
                                                            <option key={kategori} value={kategori} hidden={isAtmaProduk ? (kategori === "Titipan" ? true : false) : false}>{kategori}</option>
                                                        )
                                                    })
                                                }
                                            </select>
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
                                                value={data.stok_tersedia}
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
                                                value={data.harga}
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
                                            <label htmlFor="gambar" className="flex items-center">
                                                Gambar Produk
                                                <span className="ml-1 text-sm text-gray-500">(optional)</span>
                                            </label>
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
                                                value={data.deskripsi_produk}
                                                name="deskripsi_produk"
                                                className="textarea textarea-bordered resize-none w-full h-full bg-white"
                                                placeholder="Isi Deskripsi Produk"
                                                onChange={handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label htmlFor="status">Status Produk</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <select value={data.status} name="status" id="status" className="select select-bordered w-full bg-white" onChange={handleChange}>
                                                <option disabled>Pilih Kategori</option>
                                                <option key={"Dijual"} value="Dijual">Dijual</option>
                                                <option key={"Tidak Dijual"} value="Tidak Dijual">Tidak Dijual</option>
                                            </select>
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
                                                {data.gambar_produk === produk.gambar_produk &&
                                                    <img src={getProdukPhoto(produk.gambar_produk)}
                                                        alt="gambar_preview"
                                                        className="rounded-md shadow w-1/4 h-1/4 max-h-full max-w-full object-contain"
                                                    />
                                                }
                                                {data.gambar_produk !== produk.gambar_produk &&
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
                                <button form="createPembelianForm" type="submit" className="btn btn-primary text-white">
                                    Edit
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

export default EditProdukPage;