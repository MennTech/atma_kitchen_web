import { useEffect, useState } from "react";
import { GetPenjualanProdukMonth } from "../../../api/laporanPenjualanApi";
import DataTable from "react-data-table-component";
import CetakLaporanPenjualanBulanan from "./CetakPenjualanProdukBulanan";

const LaporanPenjualanProdukBulananPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const [combinedProducts, setCombinedProducts] = useState([]);
    const [columns, setColumns] = useState([]);
    const [bulan, setBulan] = useState("");
    const [tahun, setTahun] = useState("");

    const fetchData = async (bulan, tahun) => {
        setIsLoading(true);
        GetPenjualanProdukMonth(bulan, tahun)
            .then((response) => {
                if (response.success) {
                    setData(response.data);
                    const combinedProduk = [
                        ...response.data.produk.map(item => ({
                            ...item,
                            type: "produk",
                            nama: item.nama_produk,
                            id: item.id_produk,
                        })),
                        ...response.data.hampers.map(item => ({
                            ...item,
                            type: "hampers",
                            nama: item.nama_hampers,
                            id: item.id_hampers,
                        }))
                    ];

                    setCombinedProducts(
                        combinedProduk
                    );

                    setIsLoading(false);
                    return;
                }
                setIsLoading(false);
                setData(undefined);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();
        setBulan(currentMonth);
        setTahun(currentYear);
        fetchData(currentMonth, currentYear);
        setColumns([
            {
                name: <span className="font-bold">No</span>,
                selector: (row, index) => index + 1,
                sortable: true,
            },
            {
                name: <span className="font-bold">Nama Produk/Hampers</span>,
                selector: (row) => row.nama,
                sortable: true,
            },
            {
                name: <span className="font-bold">Jenis Produk</span>,
                selector: (row) => row.type,
            },
            {
                name: <span className="font-bold">Harga</span>,
                selector: (row) => row.harga,
                sortable: true,
            },
            {
                name: <span className="font-bold">Jumlah Terjual</span>,
                selector: (row) => row.jumlah,
                sortable: true,
            },
            {
                name: <span className="font-bold">Subtotal</span>,
                selector: (row) => row.total,
                sortable: true,
            }

        ]);
    }, []);

    useEffect(() => {
        fetchData(bulan, tahun);
    }, [bulan, tahun])

    const handleChangeMonth = (e) => {
        setBulan(e.target.value);
    }

    const handleChangeYear = (e) => {
        setTahun(e.target.value);
    }

    return (
        <div className="w-screen p-4 min-h-screen overflow-y-auto">
            <div className="flex items-center">
                <h1 className="text-4xl text-[#8F5C54] font-semibold">
                    Laporan Penjualan Produk Bulanan
                </h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">Manajemen Atma Kitchen</p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between">
                            <div className="flex gap-x-4">
                                {/* create month and year input */}
                                <div className="flex items-center gap-x-2">
                                    <label htmlFor="month" className="font-medium">
                                        Bulan
                                    </label>
                                    <select
                                        id="month"
                                        name="month"
                                        className="input input-bordered bg-white placeholder-gray-500"
                                        placeholder="Pilih Bulan"
                                        value={bulan}
                                        onChange={handleChangeMonth}
                                    >
                                        <option value="" disabled>Pilih Bulan</option>
                                        <option value="1">Januari</option>
                                        <option value="2">Februari</option>
                                        <option value="3">Maret</option>
                                        <option value="4">April</option>
                                        <option value="5">Mei</option>
                                        <option value="6">Juni</option>
                                        <option value="7">Juli</option>
                                        <option value="8">Agustus</option>
                                        <option value="9">September</option>
                                        <option value="10">Oktober</option>
                                        <option value="11">November</option>
                                        <option value="12">Desember</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-x-2">
                                    <label htmlFor="year" className="font-medium">
                                        Tahun
                                    </label>
                                    <input
                                        type="number"
                                        id="year"
                                        name="year"
                                        min="2023"
                                        max="2100"
                                        step="1"
                                        value={tahun}
                                        placeholder="(YYYY)"
                                        className="input input-bordered bg-white"
                                        onChange={handleChangeYear}
                                    />
                                </div>
                            </div>
                            {
                                !isLoading && data !== undefined && (
                                    <CetakLaporanPenjualanBulanan data={data} produks={combinedProducts} bulan={bulan} tahun={tahun}/>
                                )
                            }
                        </div>
                        {isLoading &&
                            <div className="flex flex-col items-center">
                                <span className="loading loading-spinner loading-lg"></span>
                                <span className="mt-2">Memuat Data...</span>
                            </div>
                        }
                        {
                            !isLoading && data === undefined && (
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-semibold">Data Kosong</span>
                                </div>
                            )
                        }
                        {
                            !isLoading && data !== undefined && (
                                <>
                                    <DataTable
                                        columns={columns}
                                        data={combinedProducts}
                                        pagination
                                        noHeader
                                        persistTableHead
                                    />
                                    <p className="text-md font-bold">
                                        Total Penjualan : Rp{data.total_penjualan}
                                    </p>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LaporanPenjualanProdukBulananPage;