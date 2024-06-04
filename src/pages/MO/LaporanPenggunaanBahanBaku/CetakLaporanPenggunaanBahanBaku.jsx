import ReactToPrint from "react-to-print";
import { useRef } from "react";

const CetakLaporanPenggunaanBahanBaku = ({ data, startDate, endDate }) => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="btn btn-ghost">Cetak Laporan</button>}
                content={() => componentRef.current}
                documentTitle={`Laporan Peenggunaan Bahan Baku : ${startDate} - ${endDate}`}
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
                        Laporan Penggunaan Bahan Baku
                    </p>
                    <p className="text-start font-vold text-md">
                        Periode : {startDate} - {endDate}
                    </p>
                    <p className="text-start font-vold text-md">
                        Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    <table className="mt-2 border border-black border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">Nama Bahan</th>
                                <th className="border border-black px-4 py-2">Satuan</th>
                                <th className="border border-black px-4 py-2">Digunakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{item.nama_bahan_baku}</td>
                                    <td className="border border-black px-4 py-2">{item.satuan}</td>
                                    <td className="border border-black px-4 py-2">{item.digunakan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CetakLaporanPenggunaanBahanBaku;