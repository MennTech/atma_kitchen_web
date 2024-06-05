/* eslint-disable react/prop-types */
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const CetakLaporanStokBahan = ({ item, date }) => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="btn btn-ghost">Cetak Laporan</button>}
                content={() => componentRef.current}
                documentTitle={`Laporan Stok Bahan Baku : ${date}`}
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
                        Laporan Stok Bahan Baku
                    </p>
                    <p className="text-start font-vold text-md">
                        Tanggal Cetak : {date}
                    </p>
                    <table className="my-4 border border-black">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">Nama Bahan Baku</th>
                                <th className="border border-black px-4 py-2">Satuan</th>
                                <th className="border border-black px-4 py-2">Stok</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map((data, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{data.nama_bahan_baku}</td>
                                    <td className="border border-black px-4 py-2">{data.satuan}</td>
                                    <td className="border border-black px-4 py-2">{data.stok}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CetakLaporanStokBahan;