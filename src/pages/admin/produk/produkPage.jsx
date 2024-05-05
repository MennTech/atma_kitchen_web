import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { GetAtmaKitchenProdukAdmin, GetPenitipProdukAdmin, DeleteProduk } from "../../../api/produkApi.jsx";
import { getProdukPhoto } from "../../../api/index.jsx";
import { EditButton, DeleteButton } from "../../../components/buttons/buttons.jsx";
import ConfirmDeleteModal from "../../../components/Modals/confirmDeleteModal.jsx";
import { toast } from "sonner";

const ProdukPage = () => {
    const [produks, setProduks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isAtmaProduk, setIsAtmaProduk] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [idProduk, setIdProduk] = useState(null);
    const navigate = useNavigate();

    const getAtmaProduks = async () => {
        setIsLoading(true);
        try {
            const response = await GetAtmaKitchenProdukAdmin();
            if(response.success){
                setProduks(response.produks);
                setSearch(response.produks);
            }else{
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    const getPenitipProduks = async () => {
        setIsLoading(true);
        try {
            const response = await GetPenitipProdukAdmin();
            setProduks(response.produks);
            setSearch(response.produks);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const actionButton = (id_produk) => {
        return (
            <div className="flex space-x-1">
                <EditButton onClick={() => navigate(`/dashboard/produk/edit/${id_produk}`)}/>
                <DeleteButton onClick={() => handleShowModal(id_produk)}/>
            </div>
        )
    }

    useEffect(() => {
        if (isAtmaProduk) {
            getAtmaProduks();
            setColumns([
                {
                    name: 'ID Produk',
                    selector: row => row.id_produk,
                    sortable: true,
                },
                {
                    name: 'Resep Produk',
                    selector: row => row.resep.nama_resep,
                },
                {
                    name: 'Gambar Produk',
                    cell: row => <img src={getProdukPhoto(row.gambar_produk)} alt={row.nama_produk} className='h-20 object-cover rounded-sm' />
                },
                {
                    name: 'Nama Produk',
                    selector: row => row.nama_produk,
                    sortable: true,
                },
                {
                    name: 'Deskripsi Produk',
                    selector: row => row.deskripsi_produk,
                },
                {
                    name: 'Harga Produk (Rp)',
                    selector: row => row.harga,
                    sortable: true,
                },
                {
                    name: 'Kategori Produk',
                    selector: row => row.kategori,
                    sortable: true,
                },
                {
                    name: 'Stok Produk Tersedia',
                    selector: row => row.stok_tersedia,
                    sortable: true,
                },
                {
                    name: 'Status Produk',
                    selector: row => row.status,
                    sortable: true,
                },
                {
                    cell: row => actionButton(row.id_produk),
                }
            ]);
        } else {
            getPenitipProduks();
            setColumns([
                {
                    name: 'ID Produk',
                    selector: row => row.id_produk,
                    sortable: true,
                },
                {
                    name: 'Penitip',
                    selector: row => row.penitip.nama_penitip,
                    sortable: true,
                },
                {
                    name: 'Gambar Produk',
                    cell: row => <img src={getProdukPhoto(row.gambar_produk)} alt={row.nama_produk} className='h-20 object-cover rounded-sm' />
                },
                {
                    name: 'Nama Produk',
                    selector: row => row.nama_produk,
                    sortable: true,
                },
                {
                    name: 'Deskripsi Produk',
                    selector: row => row.deskripsi_produk,
                },
                {
                    name: 'Harga Produk (Rp)',
                    selector: row => row.harga,
                    sortable: true,
                },
                {
                    name: 'Kategori Produk',
                    selector: row => row.kategori,
                    sortable: true,
                },
                {
                    name: 'Stok Produk Tersedia',
                    selector: row => row.stok_tersedia,
                    sortable: true,
                },
                {
                    name: 'Status Produk',
                    selector: row => row.status,
                    sortable: true,
                }, {
                    cell: row => actionButton(row.id_produk),
                }
            ]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAtmaProduk]);

    const handleProdukOwnerChange = (e) => {
        setIsAtmaProduk(e.target.value.toLowerCase() === 'true' ? true : false);
    }

    const handleSearch = (e) => {
        let value = e.target.value.toLowerCase();
        let result = produks.filter((data) => {
            return data.nama_produk.toLowerCase().includes(value) ||
                (data.penitip && data.penitip.nama_penitip.toLowerCase().includes(value)) ||
                (data.resep && data.resep.nama_resep.toLowerCase().includes(value)) ||
                data.harga.toString().includes(value) ||
                data.kategori.toLowerCase().includes(value) ||
                data.status.toLowerCase().includes(value);
        });
        setSearch(result);
    }

    const handleShowModal = (id_produk) => {
        setShowModal(true);
        setIdProduk(id_produk);
    }

    const handeCloseModal = () => setShowModal(false);
    const deleteProduk = async (id_produk) => {
        try {
            const response = await DeleteProduk(id_produk);
            if(response.success){
                isAtmaProduk ? getAtmaProduks() : getPenitipProduks();
                toast.success("Produk berhasil dihapus");
            }else{
                toast.error("Gagal menghapus produk", {
                    description: response.message
                });
            }

        } catch (error) {
            console.log(error);
            toast.error("Gagal menghapus produk");
        } finally {
            setShowModal(false);
        }
    }

    const paginationOptions = {
        rowsPerPageText: 'Baris per Halaman',
        rangeSeparatorText: 'dari',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Semua'
    };

    return (
        <div className='w-screen p-4 min-h-screen overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Data Produk</h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">
                    Manajemen Segala Produk Atma Kitchen
                </p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    <div className='flex justify-between'>
                        <div className="flex items-center">
                            <input type="text" placeholder="Cari Produk" className='input bg-slate-100' onChange={handleSearch} />
                        </div>
                        <div className="space-x-1">
                            <button onClick={()=> navigate('/dashboard/produk/create/penitip-produk')} className='btn btn-outline bg-[#d08854] text-white'>Tambah Produk Penitip</button>
                            <button onClick={()=> navigate('/dashboard/produk/create/atma-produk')} className='btn btn-outline bg-[#d08854] text-white'>Tambah Produk Atma Kitchen</button>
                        </div>
                    </div>
                    <div className="divider m-1"></div>
                    <div className="flex">
                        <label className="label">Pemilik Produk : </label>
                        <select onChange={handleProdukOwnerChange} className="select select-md select-bordered w-fit bg-white">
                            <option value={true}>Atma Kitchen</option>
                            <option value={false}>Penitip</option>
                        </select>
                    </div>
                    {isLoading &&
                        <div className="flex flex-col items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                            <span className="mt-2">Memuat Data...</span>
                        </div>
                    }
                    {!isLoading &&
                        <DataTable
                            columns={columns}
                            data={search}
                            fixedHeader
                            pagination
                            noDataComponent='Tidak ada produk yang ditemukan'
                            highlightOnHover
                            paginationComponentOptions={paginationOptions}
                            className='mt-2'
                        />
                    }
                </div>
            </div>
            <ConfirmDeleteModal
                entity={"Produk"}
                message={"Yakin ingin menghapus data produk ini?"}
                onYes={() => deleteProduk(idProduk)}
                onClose={handeCloseModal}
                showModal={showModal}
            />
        </div>
    )
}

export default ProdukPage;