import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { GetLaporanPenggunaanBahanBaku } from "../../../api/laporanPenjualanApi";
import CetakLaporanPenggunaanBahanBaku from "./CetakLaporanPenggunaanBahanBaku";

const LaporanPenggunaanBahanBaku = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getOneMonthAgoDate = () => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [startDate, setStartDate] = useState(formatDate(getOneMonthAgoDate()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));

    const fetchLaporanPenggunaanBahanBaku = () => {
        setIsLoading(true);
        GetLaporanPenggunaanBahanBaku(startDate, endDate)
        .then((res) => {
            setData(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setData([]);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchLaporanPenggunaanBahanBaku();
    }, [startDate, endDate]);

    const pageOptions = {
        rowsPerPageText: "Baris per halaman",
        rangeSeparatorText: "dari",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Semua",
    };

    const columns = [
        {
            name: <span className="font-bold text-base">Nama Bahan Baku</span>,
            selector: (row) => row.nama_bahan_baku
        },
        {
            name: <span className="font-bold text-base">Satuan</span>,
            selector: (row) => row.satuan
        },
        {
            name: <span className="font-bold text-base">Jumlah Digunakan</span>,
            selector: (row) => row.digunakan
        }
    ];

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    return (
        <div className="w-screen p-4 min-h-screen overflow-y-auto">
            <div className="flex items-center">
                <h1 className="text-4xl text-[#8F5C54] font-semibold">
                    Laporan Penggunaan Bahan Baku
                </h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">Manajemen Laporan Atma Kitchen</p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    <div className="flex justify-between">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid grid-rows-2 gap-0">
                                <div>
                                    <label htmlFor="startDate">Dari</label>
                                </div>
                                <div>
                                    <input
                                        id="startDate"
                                        type="date"
                                        value={startDate}
                                        className="input bg-slate-100"
                                        onChange={handleStartDateChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-rows-2">
                                <div>
                                    <label htmlFor="endDate">Sampai</label>
                                </div>
                                <div>
                                    <input
                                        id="endDate"
                                        type="date"
                                        value={endDate}
                                        className="input bg-slate-100"
                                        onChange={handleEndDateChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-x-1">
                            {!isLoading && data.length > 0 && (
                                <CetakLaporanPenggunaanBahanBaku data={data} startDate={startDate} endDate={endDate}/>
                            )}
                        </div>
                    </div>
                    {isLoading ?(
                        <div className="flex flex-col items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                            <span className="mt-2">Memuat Data...</span>
                        </div>)
                    
                    :
                        !isLoading && data.length == 0 ? (
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-semibold">Data Kosong</span>
                            </div>
                        )
                    :
                        !isLoading && data?.length > 0 ? (
                            <div className="flex flex-col gap-y-4">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    paginationComponentOptions={pageOptions}
                                    noHeader
                                    persistTableHead
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default LaporanPenggunaanBahanBaku;