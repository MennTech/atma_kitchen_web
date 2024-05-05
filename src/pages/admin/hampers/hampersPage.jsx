import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { GetAllHampers, DeleteHampers } from "../../../api/hampersApi";
import { getHampersPhoto } from "../../../api";
import { EditButton, DeleteButton } from "../../../components/buttons/buttons";
import ConfirmDeleteModal from "../../../components/Modals/confirmDeleteModal";
import { toast } from "sonner";

const HampersPage = () => {
    const [hampers, setHampers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idHampers, setIdHampers] = useState(null);
    const navigate = useNavigate();

    const getAllHampers = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllHampers();
            if (response.status === "OK") {
                setHampers(response.data);
                setSearch(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllHampers();
    }, []);

    const actionButton = (id_hampers) => {
        return (
            <div className="flex space-x-1">
                <EditButton onClick={() => navigate(`/dashboard/hampers/edit/${id_hampers}`)}/>
                <DeleteButton onClick={() => handleShowModal(id_hampers)}/>
            </div>
        )
    }

    const columns = [
        {
            name: 'ID Hampers',
            selector: row => row.id_hampers,
            sortable: true,
        },
        {
            name: 'Gambar Hampers',
            cell: row => <img src={getHampersPhoto(row.gambar_hampers)} alt={row.nama_hampers} className='h-20 object-cover rounded-md' />
        },
        {
            name: 'Nama Hampers',
            selector: row => row.nama_hampers,
            sortable: true,
        },
        {
            name: 'Deskripsi Hampers',
            selector: row => row.deskripsi_hampers,
            wrap: true,
        },
        {
            name: 'Produk Hampers',
            selector: row => [
                row.produk.map((produk) => {
                    return produk.nama_produk;
                }).join(', '),
            ],
            wrap: true,
        },
        {
            name: 'Harga Hampers (Rp)',
            selector: row => row.harga,
            sortable: true,
        },
        {
            cell: row => actionButton(row.id_hampers),
        }
    ];

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = hampers.filter((data) => {
            return data.nama_hampers.toLowerCase().includes(value) ||
                (data.produk && data.produk?.some((produk) => {
                    return produk.nama_produk.toLowerCase().includes(value);
                })) ||
                data.harga.toString().includes(value);
        });
        setSearch(result);
    }

    const paginationOptions = {
        rowsPerPageText: 'Baris per Halaman',
        rangeSeparatorText: 'dari',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Semua'
    };

    const handleShowModal = (id) => {
        setShowModal(true);
        setIdHampers(id);
    }

    const handeCloseModal = () => setShowModal(false);
    const deleteHampers = async (id) => {
        try{
            const response = await DeleteHampers(id);
            if(response.success){
                getAllHampers();
                toast.success('Hampers berhasil dihapus');
            }else{
                toast.error('Hampers gagal dihapus');
            }
        }catch(error){
            console.log(error);
            toast.error('Hampers gagal dihapus');
        }finally{
            setShowModal(false);
        }
    }

    return (
        <div className='w-screen min-h-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Data Hampers</h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">
                    Manajemen Hampers Atma Kitchen
                </p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    <div className='flex justify-between'>
                        <div className="flex items-center">
                            <input type="text" placeholder="Cari Hampers" className='input bg-slate-100' onChange={handleSearch} />
                        </div>
                        <div className="space-x-1">
                            <button onClick={() => navigate('/dashboard/hampers/create')} className='btn btn-outline bg-[#d08854] text-white'>Tambah Hampers</button>
                        </div>
                    </div>
                    <div className="divider m-1"></div>
                    <div className='mt-2'>
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
                                noDataComponent='Tidak ada hampers yang ditemukan'
                                highlightOnHover
                                paginationComponentOptions={paginationOptions}
                                className='mt-2'
                            />
                        }
                    </div>
                </div>
            </div>
            <ConfirmDeleteModal
                entity={"Produk"}
                message={"Yakin ingin menghapus data produk ini?"}
                onYes={() => deleteHampers(idHampers)}
                onClose={handeCloseModal}
                showModal={showModal}
            />
        </div>
    )
}

export default HampersPage;