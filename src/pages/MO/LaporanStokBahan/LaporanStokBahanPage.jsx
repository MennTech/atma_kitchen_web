import { useEffect, useState } from "react";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import DataTable from "react-data-table-component";
import CetakLaporanStokBahan from "./CetakLaporanStokBahan";

const LaporanStokBahanPage = () => {
    const [bahanBaku, setBahanBaku] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [columns, setColumns] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        GetAllBahanBaku()
            .then((response) => {
                setBahanBaku(response);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchData();
        setColumns([
            {
                name: <span className="font-bold">No</span>,
                selector: (row, index) => index + 1,
                sortable: true,
            },
            {
                name: <span className="font-bold">Nama Bahan Baku</span>,
                selector: (row) => row.nama_bahan_baku,
                sortable: true,
            },
            {
                name: <span className="font-bold">Satuan</span>,
                selector: (row) => row.satuan,
                sortable: true,
            },
            {
                name: <span className="font-bold">Stok</span>,
                selector: (row) => row.stok,
                sortable: true,
            },
        ]);
    }, []);

    const pageOptions = {
        rowsPerPageText: "Baris per halaman",
        rangeSeparatorText: "dari",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Semua",
    };

    const date = new Date();
    // format date to "d MMMM y"
    const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <div className="w-screen p-4 min-h-screen overflow-y-auto">
            <div className="flex items-center">
                <h1 className="text-4xl text-[#8F5C54] font-semibold">
                    Laporan Stok Bahan Baku
                </h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">Manajemen Atma Kitchen</p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    {isLoading &&
                        <div className="flex flex-col items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                            <span className="mt-2">Memuat Data...</span>
                        </div>
                    }
                    {
                        !isLoading && (bahanBaku === undefined || bahanBaku.length === 0) && (
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-semibold">Data Kosong</span>
                            </div>
                        )
                    }
                    {
                        !isLoading && bahanBaku !== undefined && bahanBaku.length > 0 && (
                            <div className="flex flex-col gap-y-4">
                                <div className="flex justify-between">
                                    <p>
                                        <span className="font-bold">Tanggal :</span> {formattedDate}  
                                    </p>
                                    <CetakLaporanStokBahan item={bahanBaku} date={formattedDate}/>
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={bahanBaku}
                                    pagination
                                    paginationComponentOptions={pageOptions}
                                    noHeader
                                    persistTableHead
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default LaporanStokBahanPage;