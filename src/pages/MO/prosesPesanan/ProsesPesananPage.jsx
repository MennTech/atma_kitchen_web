import { useEffect, useState } from "react";
import { ShowPesananPerluDiproses } from "../../../api/pesanan";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const ProsesPesananPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [pesanan, setPesanan] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const fetchPesanan = () => {
        setIsLoading(true);
        ShowPesananPerluDiproses()
            .then((response) => {
                setPesanan(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setPesanan([]);
                console.log(error);
            });
    }

    useEffect(() => {
        fetchPesanan();
        setColumns([
            {
                name: <span className="font-bold text-base">No Pesanan</span>,
                selector: (row) => {
                    const date = new Date(row.tanggal_pesan);
                    const year = String(date.getFullYear()).slice(2);
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    return `${year}.${month}.${row.id_pesanan}`;
                },
            },
            {
                name: <span className="font-bold text-base">Tanggal Pesan</span>,
                selector: (row) => {
                    const date = new Date(row.tanggal_pesan);
                    return date.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    });
                },
            },
            {
                name: <span className="font-bold text-base">Tanggal Ambil</span>,
                selector: (row) => {
                    const date = new Date(row.tanggal_ambil);
                    return date.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    });
                },
            },
            {
                name: <span className="font-bold text-base">Total</span>,
                selector: (row) => 
                    new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(row.total),
            }
        ]);
    }, []);

    const paginationOptions = {
        rowsPerPageText: "Baris per halaman",
        rangeSeparatorText: "dari",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Semua",
    };

    const handleCheckBahan = () => {
        navigate('/dashboard/pesanan/proses/cek-bahan', { state: { id_pesanan: selectedRows }});
    }

    return(
        <div className="w-screen p-4 min-h-screen overflow-y-auto">
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">
                    Proses Pesanan Hari Ini
                </h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">Manajemen Atma Kitchen</p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    {
                        isLoading && (
                            <div className="flex flex-col items-center">
                                <span className="loading loading-spinner loading-lg"></span>
                                <span className="mt-2">Memuat Data...</span>
                            </div>
                        )
                    }
                    {
                        !isLoading && (pesanan === undefined || pesanan === null || pesanan.length === 0) && (
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-semibold">Data Kosong</span>
                            </div>
                        )
                    }
                    {
                        !isLoading && pesanan !== undefined && pesanan !== null && pesanan.length > 0 && (
                            <>
                                <div className="flex flex-col gap-y-4">
                                    <DataTable
                                        columns={columns}
                                        data={pesanan}
                                        pagination
                                        highlightOnHover
                                        paginationComponentOptions={paginationOptions}
                                        responsive
                                        selectableRows
                                        onSelectedRowsChange={(state) => {
                                            const selectedIds = state.selectedRows.map((row) => row.id_pesanan);
                                            setSelectedRows(selectedIds);
                                        }}
                                    />
                                    <div className="flex justify-end items-center space-x-4">
                                        <p>
                                            <span className="font-bold">Pesanan dipilih :</span> {selectedRows.length}
                                        </p>
                                        <button className="btn btn-success text-white" onClick={handleCheckBahan} disabled={selectedRows.length == 0}>
                                            Cek Penggunaan Bahan
                                        </button>
                                    </div>
                                </div>
                                {/* <CekPenggunaanBahanModal 
                                    show={showModal}
                                    handleClose={() => setShowModal(false)}
                                    penggunaanBahanBaku={penggunaanBahan}
                                    bahanBakuAsli={bahanBakuAsli}
                                    pesanan={selectedRows}
                                /> */}
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default ProsesPesananPage;