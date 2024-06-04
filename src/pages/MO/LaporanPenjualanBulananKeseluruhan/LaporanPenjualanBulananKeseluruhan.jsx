import { useEffect, useState } from "react";
import { GetLaporanPenjualanKeseluruhan } from "../../../api/laporanPenjualanApi";
import DataTable from "react-data-table-component";
import Chart from "react-apexcharts";
import CetakLaporanPenjualanBulananKeseluruhan from "./CetakLaporanPenjualanBulananKeseluruhan";

const LaporanPenjualanProdukBulananKeseluruhan = () => {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [year, setYear] = useState(new Date().getFullYear());
    
    const fetchLaporanPenjualanKeseluruhan = () => {
        setIsLoading(true);
        GetLaporanPenjualanKeseluruhan(year)
        .then((res) => {
            setData(res.data);
            setChartData({
                options: {
                    title:{
                        text: "Laporan Penjualan Bulanan Keseluruhan Tahun " + year,
                        align: "center",
                    },
                    chart: {
                      id: "basic-bar"
                    },
                    plotOptions:{
                        bar:{
                            columnWidth: "20%"
                        }
                    },
                    xaxis: {
                      categories: res.data.map((item) => {
                        if(item.bulan == 1){
                            return "Januari";
                        }else if(item.bulan == 2){
                            return "Februari";
                        }else if(item.bulan == 3){
                            return "Maret";
                        }else if(item.bulan == 4){
                            return "April";
                        }else if(item.bulan == 5){
                            return "Mei";
                        }else if(item.bulan == 6){
                            return "Juni";
                        }else if(item.bulan == 7){
                            return "Juli";
                        }else if(item.bulan == 8){
                            return "Agustus";
                        }else if(item.bulan == 9){
                            return "September";
                        }else if(item.bulan == 10){
                            return "Oktober";
                        }else if(item.bulan == 11){
                            return "November";
                        }else if(item.bulan == 12){
                            return "Desember";
                        }
                    })
                  },
                },
                  series: [
                    {
                      name: "Jumlah Uang",
                      data: res.data.map((item) => item.jumlah_uang)
                    }
                  ]
            })
            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            setData([]);
        });
    
    }

    useEffect(() => {
        fetchLaporanPenjualanKeseluruhan();
    }, [year]);

    const pageOptions = {
        rowsPerPageText: "Baris per halaman",
        rangeSeparatorText: "dari",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Semua",
    };


    const columns = [
        {
            name: <span className="font-bold text-base">Bulan</span>,
            selector: (row) => {
                if(row.bulan === 1){
                    return "Januari";
                }else if(row.bulan === 2){
                    return "Februari";
                }else if(row.bulan === 3){
                    return "Maret";
                }else if(row.bulan === 4){
                    return "April";
                }else if(row.bulan === 5){
                    return "Mei";
                }else if(row.bulan === 6){
                    return "Juni";
                }else if(row.bulan === 7){
                    return "Juli";
                }else if(row.bulan === 8){
                    return "Agustus";
                }else if(row.bulan === 9){
                    return "September";
                }else if(row.bulan === 10){
                    return "Oktober";
                }else if(row.bulan === 11){
                    return "November";
                }else if(row.bulan === 12){
                    return "Desember";
                }
            },
        },
        {
            name: <span className="font-bold text-base">Jumlah Transaksi</span>,
            selector: (row) => row.jumlah_transaksi
        },
        {
            name: <span className="font-bold text-base">Jumlah Uang</span>,
            selector: (row) => new Intl.NumberFormat("id-ID",{
                style: "currency",
                currency: "IDR",
                }).format(row.jumlah_uang)
        },
    ];

    const handleYear = (e) => {
        setYear(e.target.value);
    }

    return (
        <div className="w-screen p-4 min-h-screen overflow-y-auto">
            <div className="flex items-center">
                <h1 className="text-4xl text-[#8F5C54] font-semibold">
                    Laporan Penjualan Bulanan Keseluruhan
                </h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">Manajemen Laporan Atma Kitchen</p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                        <input
                            type="number"
                            value={year}
                            className="input bg-slate-100"
                            onChange={handleYear}
                        />
                        </div>
                        <div className="space-x-1">
                            {!isLoading && data.length > 0 && (
                                <CetakLaporanPenjualanBulananKeseluruhan data={data} year={year}/>
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
                        !isLoading && data.length > 0 && (
                            <div className="flex flex-col gap-y-4">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    paginationComponentOptions={pageOptions}
                                    noHeader
                                    persistTableHead
                                />
                                <Chart
                                    options={chartData.options}
                                    series={chartData.series}
                                    type="bar"
                                    width="100%"
                                    height="400"
                                    
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default LaporanPenjualanProdukBulananKeseluruhan;