import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { GetAllPembelianBahanBaku } from "../../api/pembelianBahanBakuApi";
import { EditButton, DeleteButton } from "../../components/buttons/buttons";

const PembelianBahanBakuPage = () => {
    const [pembelianBahanBaku, setPembelianBahanBaku] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState([]);

    const getAllPembelianBahanBaku = async () => {
        setIsLoading(true);
        try {
            const response = await GetAllPembelianBahanBaku();
            console.log(response);
            setPembelianBahanBaku(response);
            setSearch(response);
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
                <EditButton />
                <DeleteButton />
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

    return (
        <div className='w-screen min-h-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Data Pembelian Bahan Baku</h1>
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
                            <button className='btn btn-outline bg-[#d08854] text-white'>Tambah Pembelian</button>
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
    )
}

export default PembelianBahanBakuPage;