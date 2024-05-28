/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import ReactToPrint from "react-to-print";
import { useRef } from "react";
const CetakNota = ({ item, customer }) => {
    const componentRef = useRef();

    const formatOrderNumber = (idPesanan, tanggal) => {
        const orderDate = new Date(tanggal);
        const year = orderDate.getFullYear().toString().slice(-2);
        const month = (orderDate.getMonth() + 1).toString().padStart(2, "0");
        return `${year}.${month}.${idPesanan}`;
    };

    return (
        <div>
            <ReactToPrint
                trigger={() => <button className="btn btn-ghost">Cetak Nota</button>}
                content={() => componentRef.current}
                documentTitle={`Nota Pembelian : ${formatOrderNumber(item.id_pesanan, item.tanggal_pesan)}`}
                pageStyle="print"
            />
            <div className="overflow-hidden h-0 w-0">
                <div
                    ref={componentRef}
                    className="flex flex-col px-64 py-16">
                    <p className="text-center font-bold text-xl">
                        Atma Kitchen
                    </p>
                    <p className="text-center font-bold text-md">
                        Nota Pembelian
                    </p>
                    <div className="divider m-0"></div>

                    <table className="mb-4 border-none">
                        <tr>
                            <td>Nomor Nota</td>
                            <td className="text-end">:</td>
                            <td className="text-end">{formatOrderNumber(item.id_pesanan, item.tanggal_pesan)}</td>
                        </tr>
                        <tr>
                            <td>Tanggal Pesan</td>
                            <td className="text-end">:</td>
                            <td className="text-end">{item.tanggal_pesan}</td>
                        </tr>
                        <tr>
                            <td>Lunas Pada</td>
                            <td className="text-end">:</td>
                            <td className="text-end">{item.tanggal_lunas}</td>
                        </tr>
                        <tr>
                            <td>Tanggal Ambil</td>
                            <td className="text-end">:</td>
                            <td className="text-end">{item.tanggal_ambil}</td>
                        </tr>
                        <tr className="pt-4">
                            <td>Nama Customer</td>
                            <td className="text-end">:</td>
                            <td className="text-end">{customer.nama_customer}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className="text-end">:</td>
                            <td className="text-end">{customer.email}</td>
                        </tr>
                        <tr>
                            <td>Alamat</td>
                            <td className="text-end">:</td>
                            <td className="text-end">{item.alamat}</td>
                        </tr>
                    </table>

                    <table className="my-4 border-none">
                        {item.detail_pesanan.map((detail, index) => (
                            item.produk !== null ? (
                                <tr key={index}>
                                    <td>{detail.jumlah} </td>
                                    <td>{detail.produk.nama_produk}</td>
                                    <td className="text-end">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(detail.jumlah * detail.produk.harga)
                                        }
                                    </td>
                                </tr>
                            ) : (
                                <tr key={index}>
                                    <td>{detail.jumlah}</td>
                                    <td>{detail.hampers.nama_hampers}</td>
                                    <td className="text-end">
                                        {
                                            new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(detail.jumlah * detail.hampers.harga)
                                        }
                                    </td>
                                </tr>
                            )
                        ))}
                    </table>

                    <table className="my-4 border-none">
                        {/* total produk */}
                        <tr>
                            <td>Subtotal</td>
                            <td></td>
                            <td className="text-end">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(
                                    item.detail_pesanan.reduce((total, detail) => {
                                        return total + (detail.produk !== null ? detail.produk.harga : detail.hampers.harga) * detail.jumlah;
                                    }, 0)
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Ongkos Kirim ({item.jarak || 0}km)</td>
                            <td></td>
                            <td className="text-end">{item.ongkos_kirim || 0}</td>
                        </tr>
                        <tr>
                            <td>Potongan {item.poin_dipakai} poin</td>
                            <td></td>
                            <td className="text-end">
                                - {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(item.poin_dipakai * 100)}
                            </td>
                        </tr>
                    </table>
                    <div className="divider m-0"></div>
                    <table className="my-4 border-none">
                        <tr>
                            <td className="font-semibold">Total</td>
                            <td></td>
                            <td className="font-semibold text-end">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(item.total)}
                            </td>
                        </tr>
                        <tr>
                            <td>Poin yang didapat</td>
                            <td></td>
                            <td className="text-end">{item.poin_didapat}</td>
                        </tr>
                        <tr>
                            <td>Total poin customer</td>
                            <td></td>
                            <td className="text-end">{customer.poin + item.poin_didapat}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CetakNota;