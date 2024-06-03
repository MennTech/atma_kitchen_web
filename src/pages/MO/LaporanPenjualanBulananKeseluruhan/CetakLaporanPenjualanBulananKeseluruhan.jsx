import ReactToPrint from "react-to-print";
import { useRef } from "react";

const CetakLaporanPenjualanBulananKeseluruhan = ({ data, year }) => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="btn btn-ghost">Cetak Laporan</button>}
                content={() => componentRef.current}
                documentTitle={`Laporan Penjualan Bulanan Keseluruhan : ${year}`}
                pageStyle="print"
            />
            <div className="overflow-hidden h-0 w-0">
                <div
                    ref={componentRef}
                    className="flex flex-col px-24 py-16"
                >
                    <p className="text-start font-bold text-xl">
                        Atma Kitchen
                    </p>
                    <p className="text-start font-vold text-md">
                        Jl.Centralpark No.10 Yogyakarta
                    </p>
                    <p className="text-start font-bold text-md mt-5 underline">
                        Laporan Penjualan Bulanan Keseluruhan
                    </p>
                    <p className="text-start font-vold text-md">
                        Tahun : {year}
                    </p>
                    <p className="text-start font-vold text-md">
                        Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    <table className="mt-2 border border-black border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">Bulan</th>
                                <th className="border border-black px-4 py-2">Jumlah Transaksi</th>
                                <th className="border border-black px-4 py-2">Jumlah Uang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{
                                        item.bulan === 1 ? "Januari" : 
                                        item.bulan === 2 ? "Februari" : 
                                        item.bulan === 3 ? "Maret" : 
                                        item.bulan === 4 ? "April" : 
                                        item.bulan === 5 ? "Mei" : 
                                        item.bulan === 6 ? "Juni" : 
                                        item.bulan === 7 ? "Juli" : 
                                        item.bulan === 8 ? "Agustus" : 
                                        item.bulan === 9 ? "September" : 
                                        item.bulan === 10 ? "Oktober" : 
                                        item.bulan === 11 ? "November" : 
                                        item.bulan === 12 ? "Desember" : ""
                                    }</td>
                                    <td className="border border-black px-4 py-2">{item.jumlah_transaksi}</td>
                                    <td className="border border-black px-4 py-2">{new Intl.NumberFormat("id-ID",{
                                        style: "currency",
                                        currency: "IDR",
                                        }).format(item.jumlah_uang)}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="border border-black px-4 py-2" colSpan={2}>
                                    <p className="font-bold">Total</p>
                                </td>
                                <td className="border border-black px-4 py-2">
                                    <p className="font-bold">{new Intl.NumberFormat("id-ID",{
                                        style: "currency",
                                        currency: "IDR",
                                        }).format(data.reduce((acc, curr) => acc + curr.jumlah_uang, 0))}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CetakLaporanPenjualanBulananKeseluruhan;