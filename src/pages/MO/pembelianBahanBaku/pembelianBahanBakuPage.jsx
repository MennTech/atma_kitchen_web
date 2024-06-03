import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { GetAllPembelianBahanBaku, DeletePembelianBahanBaku } from "../../../api/pembelianBahanBakuApi";
import { EditButton, DeleteButton } from "../../../components/buttons/buttons";
import ConfirmDeleteModal from "../../../components/Modals/confirmDeleteModal";
import { toast } from "sonner";

const PembelianBahanBakuPage = () => {
    const [pembelianBahanBaku, setPembelianBahanBaku] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idPembelianBahanBaku, setIdPembelianBahanBaku] = useState(null);
    const navigate = useNavigate();

    const getAllPembelianBahanBaku = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllPembelianBahanBaku();
            if (response.success) {
                setPembelianBahanBaku(response.data);
                setSearch(response.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPembelianBahanBaku();
    }, []);

    const actionButton = (id_pembelian_bahan_baku) => {
        return (
            <div className="flex space-x-1">
                <EditButton onClick={() => navigate(`/dashboard/pembelian-bahan-baku/edit/${id_pembelian_bahan_baku}`)} />
                <DeleteButton onClick={() => handleShowModal(id_pembelian_bahan_baku)} />
            </div>
        )
    }

    const columns = [
        {
            name: 'ID Pembelian Bahan Baku',
            selector: row => row.id_pembelian_bahan_baku,
            sortable: true,
        },
        {
            name: 'Nama Bahan Baku',
            selector: row => row.bahan_baku.nama_bahan_baku,
            sortable: true,
        },
        {
            name: 'Tanggal Pembelian',
            selector: row => row.tanggal,
            sortable: true,
        },
        {
            name: 'Jumlah Pembelian',
            selector: row => row.jumlah,
            sortable: true,
        },
        {
            name: 'Satuan',
            selector: row => row.bahan_baku.satuan,
            sortable: true,
        },
        {
            name: 'Harga Pembelian (Rp)',
            selector: row => row.harga,
            sortable: true,
        },
        {
            cell: row => actionButton(row.id_pembelian_bahan_baku),
        }
    ];

    const paginationOptions = {
        rowsPerPageText: 'Baris per halaman',
        rangeSeparatorText: 'dari',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Semua'
    };

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = pembelianBahanBaku.filter((data) => {
            return data.bahan_baku.nama_bahan_baku.toLowerCase().includes(value) ||
                data.tanggal.toString().includes(value) ||
                data.jumlah.toString().includes(value) ||
                data.bahan_baku.satuan.toLowerCase().includes(value) ||
                data.harga.toString().includes(value);
        });
        setSearch(result);
    }
    const handleShowModal = (id_pembelian_bahan_baku) => {
        setShowModal(true);
        setIdPembelianBahanBaku(id_pembelian_bahan_baku);
    }
    const handleCloseModal = () => setShowModal(false);
    const deletePembelianBahanBaku = async (id) => {
        try {
            const response = await DeletePembelianBahanBaku(id);
            if (response.success) {
                getAllPembelianBahanBaku();
                toast.success("Pembelian Bahan Baku berhasil dihapus");
            } else {
                toast.error("Gagal menghapus data pembelian bahan baku", { description: response.message });
            }
        } catch (error) {
            console.log(error);
            toast.error("Gagal menghapus data pembelian bahan baku");
        } finally {
            setShowModal(false);
        }
    }

    return (
        <>
            <div className='w-screen min-h-screen p-4 overflow-y-auto'>
                <div className="flex items-center">
                    <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Pembelian Bahan Baku</h1>
                    <div className="divider divider-horizontal m-1"></div>
                    <p className="text-slate-400">
                        Manajemen Pembelian Bahan Baku Atma Kitchen
                    </p>
                </div>
                <div className="card w-full h-fit bg-white mt-2">
                    <div className="card-body h-full p-4">
                        <div className='flex justify-between'>
                            <div className="flex items-center">
                                <input type="text" placeholder="Cari Pembelian" className='input bg-slate-100' onChange={handleSearch} />
                            </div>
                            <div className="space-x-1">
                                <button className='btn btn-outline bg-[#d08854] text-white' onClick={() => navigate('/dashboard/pembelian-bahan-baku/tambah')}>Tambah Pembelian</button>
                            </div>
                        </div>
                        <div className="divider m-1"></div>
                        <div>
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
                                    noDataComponent='Tidak ada pembelian yang ditemukan'
                                    highlightOnHover
                                    paginationComponentOptions={paginationOptions}
                                    className='mt-2'
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDeleteModal
                entity={"Pembelian Bahan Baku"}
                message={"Yakin ingin menghapus data pembelian bahan baku ini?"}
                onYes={() => deletePembelianBahanBaku(idPembelianBahanBaku)}
                onClose={handleCloseModal}
                showModal={showModal}
            />
        </>
    )
}

export default PembelianBahanBakuPage;