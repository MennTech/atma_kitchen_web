/* eslint-disable react/prop-types */
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const CetakLaporanPenjualanBulanan = ({ data, produks, bulan, tahun }) => {
    const componentRef = useRef();
    const getMonthName = (monthNumber) => {
        const date = new Date(2000, parseInt(monthNumber, 10) - 1, 1);
        return date.toLocaleString('id', { month: 'long' }) || 'Invalid Month';
    };

    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="btn btn-ghost">Cetak Laporan</button>}
                content={() => componentRef.current}
                documentTitle={`Laporan Penjualan Produk ${getMonthName(bulan)} ${tahun}`}
                pageStyle="print"
            />
            <div className="overflow-hidden h-0 w-0">
                <div
                    ref={componentRef}
                    className="flex flex-col px-24 py-16"
                >
                    <p className="text-center font-bold text-xl">
                        Atma Kitchen
                    </p>
                    <p className="text-start font-bold text-md">
                        Laporan Penjualan Bulanan
                    </p>
                    <p className="text-start font-vold text-md">
                        Bulan : {getMonthName(bulan)}
                    </p>
                    <p className="text-start font-vold text-md">
                        Tahun : {tahun}
                    </p>
                    <p className="text-start font-vold text-md">
                        Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    <table className="my-4 border border-black">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">Produk</th>
                                <th className="border border-black px-4 py-2">Kuantitas</th>
                                <th className="border border-black px-4 py-2">Harga</th>
                                <th className="border border-black px-4 py-2">Jumlah Uang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produks.map((data, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{data.nama}</td>
                                    <td className="text-center border border-black px-4 py-2">{data.jumlah}</td>
                                    <td className="text-center border border-black px-4 py-2">Rp{data.harga}</td>
                                    <td className="text-center border border-black px-4 py-2">Rp{data.total}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" className="border border-black px-4 py-2">Total</td>
                                <td className="text-center border border-black px-4 py-2">Rp{data.total_penjualan}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default CetakLaporanPenjualanBulanan;