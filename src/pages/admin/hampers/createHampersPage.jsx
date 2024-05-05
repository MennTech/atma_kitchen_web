import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAtmaKitchenProduk } from "../../../api/produkApi";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import { CreateHampers } from "../../../api/hampersApi";
import { toast } from "sonner";

const CreateHampersPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [bahanBaku, setBahanBaku] = useState([]);
    const [produk, setProduk] = useState([]);
    const [data, setData] = useState({
        nama_hampers: "",
        harga: 0,
        gambar_hampers: null,
        deskripsi_hampers: ""
    });
    const [detailHampers, setDetailHampers] = useState([
        {
            id_produks: null,
            id_bahan_bakus: null,
        },
        {
            id_produks: null,
            id_bahan_bakus: null,
        }
    ]);
    const [withDetail, setWithDetail] = useState(false);

    const getAllBahanBaku = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllBahanBaku();
            if (response !== null) {
                const filteredBahanBaku = response.filter(bahan => (bahan.nama_bahan_baku.toLowerCase().includes("premium") && bahan.nama_bahan_baku.toLowerCase().includes("box")) || bahan.nama_bahan_baku.toLowerCase().includes("botol"));
                setBahanBaku(filteredBahanBaku);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getAtmaProduk = async () => {
        setIsLoading(true);
        try {
            const response = await GetAtmaKitchenProduk();
            if (response.success) {
                setProduk(response.produks);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBahanBaku();
        getAtmaProduk();
    }, [])

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);
    }

    const handleDetailChange = (i, event) => {
        const values = [...detailHampers];
        values[i][event.target.name] = event.target.value;
        setDetailHampers(values);
    }

    const handleFileChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.files[0] };
        setData(newData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.nama_hampers === "" || data.harga === 0 || data.gambar_hampers === null || data.deskripsi_hampers === "") {
            toast.error("Semua data harus diisi");
            return;
        }

        if (data.harga < 0) {
            toast.error("Harga tidak boleh kurang dari 0");
            return;
        }

        if (data.gambar_hampers.size > 2000000) {
            toast.error("Ukuran gambar terlalu besar, maksimal 2MB");
            return;
        }

        if (data.gambar_hampers.type !== "image/jpeg" && data.gambar_hampers.type !== "image/png" && data.gambar_hampers.type !== "image/jpg" && data.gambar_hampers.type !== "image/webp") {
            toast.error("Format gambar tidak didukung");
            return;
        }

        const formData = new FormData();
        formData.append("nama_hampers", data.nama_hampers);
        formData.append("harga", data.harga);
        formData.append("gambar_hampers", data.gambar_hampers);
        formData.append("deskripsi_hampers", data.deskripsi_hampers);
        if(withDetail){
            let error = false;
            detailHampers.forEach((detail, index) => {
                if(error) return;
                if(detail.id_produks === null || detail.id_bahan_bakus === null){
                    error = true;
                }else{
                    formData.append(`id_produks[${index}]`, detail.id_produks);
                    formData.append(`id_bahan_bakus[${index}]`, detail.id_bahan_bakus);
                }
            });
            if(error) {
                toast.error("Produk Hampers harus diisi");
                return;
            }
        }

        console.log(formData);

        try {
            const response = await CreateHampers(formData);
            console.log(response);
            if (response.success) {
                toast.success("Hampers berhasil ditambahkan");
                navigate('/dashboard/hampers');
            } else {
                toast.error("Hampers gagal ditambahkan", {
                    description: response.response.data.message
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Gagal menambahkan Hampers", {
                description: [error.message]
            });
        }
    }

    const handleEnableDetail = () => {
        setWithDetail(!withDetail);
    }

    const handleAddField = () => {
        setDetailHampers([...detailHampers, { id_produks: null, id_bahan_bakus: null }]);
    }

    const handleDeleteField = (i) => {
        const values = [...detailHampers];
        values.splice(i, 1);
        setDetailHampers(values);
    }

    useEffect(() => {
        setDetailHampers([
            {
                id_produks: null,
                id_bahan_bakus: null,
            },
            {
                id_produks: null,
                id_bahan_bakus: null,
            }
        ]);
    }, [withDetail])

    return (
        <div className='w-screen min-h-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Tambah Hampers</h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">
                    Manajemen Hampers Atma Kitchen
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
                                            <label htmlFor="nama_hampers">Nama Hampers</label>
                                        </div>
                                        <div>
                                            <label htmlFor="harga">Harga Hampers</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="w-full">
                                            <input
                                                placeholder="Isi Nama Hampers"
                                                type="text"
                                                id="nama_hampers"
                                                name="nama_hampers"
                                                className="input input-bordered w-full bg-white"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                placeholder="Isi Harga Hampers"
                                                type="number"
                                                id="harga"
                                                name="harga"
                                                className="input input-bordered w-full bg-white"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <label htmlFor="gambar">Gambar Hampers</label>
                                        </div>
                                        <div>
                                            <label htmlFor="deskripsi">Deskripsi Hampers</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/jpeg, image/png, image/jpg, image/webp"
                                                max={1}
                                                id="gambar"
                                                name="gambar_hampers"
                                                className="file-input file-input-bordered file:border-0 file:border-r file:border-slate-100 file:bg-white w-full h-full bg-white btn-danger"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                name="deskripsi_hampers"
                                                className="textarea textarea-bordered resize-none w-full h-full bg-white"
                                                placeholder="Isi Deskripsi Hampers"
                                                onChange={handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 mt-4">
                                        <div>
                                            <label htmlFor="gambar_preview">Preview Gambar Hampers :</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-rows-1 gap-4 mt-2">
                                        <div>
                                            <div className="flex justify-center items-center min-h-[200px] w-full">
                                                {data.gambar_hampers === null &&
                                                    <div className="text-center">
                                                        <p>Belum ada Gambar</p>
                                                    </div>
                                                }
                                                {data.gambar_hampers !== null &&
                                                    <img src={URL.createObjectURL(data.gambar_hampers)}
                                                        alt="gambar_preview"
                                                        className="rounded-md shadow w-1/4 h-1/4 max-h-full max-w-full object-contain"
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <div className="form-control">
                                                <label className="cursor-pointer label w-fit space-x-2">
                                                    <input onChange={handleEnableDetail} type="checkbox" className="checkbox [--chkbg:#d08854] [--chkfg:#ffffff]" />
                                                    <span>dengan Produk Hampers</span>
                                                </label>
                                            </div>
                                        </div>
                                        {withDetail &&
                                            <div className="justify-self-end">
                                                <button
                                                    onClick={handleAddField}
                                                    type="button"
                                                    className="btn btn-outline bg-[#d08854] text-white"
                                                    disabled={detailHampers.length >= 5}
                                                >
                                                    Tambah Produk Hampers
                                                </button>
                                            </div>
                                        }
                                    </div>
                                    {withDetail &&
                                        <>
                                            <div className="grid grid-cols-12 gap-2 mt-2">
                                                <div className="col-span-2">
                                                </div>
                                                <div className="col-span-4">
                                                    <label htmlFor="produk">Produk</label>
                                                </div>
                                                <div className="col-span-4">
                                                    <label htmlFor="bahanBaku">Packaging</label>
                                                </div>
                                                <div className="col-span-2">
                                                </div>
                                            </div>
                                            {detailHampers.map((detail, index) => {
                                                return (
                                                    <div key={index} className="grid grid-cols-12 gap-2 mt-2">
                                                        <div className="col-span-2 flex justify-center items-center">
                                                            Produk Hampers ke-{index + 1}
                                                        </div>
                                                        <div className="col-span-4">
                                                            <select value={detail.id_produks ?? "Pilih Produk"} onChange={(event) => handleDetailChange(index, event)} name="id_produks" id="produk" className="select select-bordered w-full bg-white">
                                                                <option disabled>Pilih Produk</option>
                                                                {produk.map((produk) => {
                                                                    return (
                                                                        <option key={produk.id_produk} value={produk.id_produk}>{produk.nama_produk}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-4">
                                                            <select value={detail.id_bahan_bakus ?? "Pilih Packaging"} onChange={(event) => handleDetailChange(index, event)} name="id_bahan_bakus" id="bahanBaku" className="select select-bordered w-full bg-white">
                                                                <option disabled>Pilih Packaging</option>
                                                                {bahanBaku.map((bahan) => {
                                                                    return (
                                                                        <option key={bahan.id_bahan_baku} value={bahan.id_bahan_baku}>{bahan.nama_bahan_baku}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <button type="button" onClick={() => handleDeleteField(index)} disabled={detailHampers.length <= 2} className="btn btn-error text-white">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    }
                                </form>
                            </div>
                            <div className="divider"></div>
                            <div className="flex flex-row-reverse space-x-1 space-x-reverse">
                                <button form="createPembelianForm" type="submit" className="btn btn-success text-white">
                                    Tambah
                                </button>
                                <button onClick={() => navigate('/dashboard/hampers')} className="btn btn-error text-white">
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

export default CreateHampersPage;