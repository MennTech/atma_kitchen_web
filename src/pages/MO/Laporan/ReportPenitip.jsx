import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ReportPenitip } from "../../../api/laporanPenitip";

const LaporanPenitip = () => {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const tanggalCetak = today.getDate() + "-" + currentMonth + "-" + currentYear;

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const requestData = {
        bulan: parseInt(bulan),
        tahun: parseInt(tahun),
      };
      const response = await ReportPenitip(requestData);
      const responseData = response.data;
      console.log(responseData);
      if (Array.isArray(responseData) && responseData.length > 0) {
        // Akumulasi total dari setiap penitip
        const total = responseData.reduce((acc, curr) => {
          // Akumulasi total dari setiap produk dalam penitip
          const penitipTotal = curr.produk.reduce((subtotal, product) => {
            // Tambahkan total produk ke subtotal penitip
            return subtotal + product.total;
          }, 0);
          // Tambahkan total penitip ke total akumulasi
          return acc + penitipTotal;
        }, 0);
        // Set total ke state total
        setTotal(total);
      }
      setData(responseData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Laporan Penitip</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex items-center">
            <label htmlFor="bulan" className="mr-2">
              Bulan:
            </label>
            <input
              type="number"
              id="bulan"
              min="1"
              max="12"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="border rounded-md px-2 py-1 mr-4 bg-white"
            />
            <label htmlFor="tahun" className="mr-2">
              Tahun:
            </label>
            <input
              type="number"
              id="tahun"
              min="1970"
              max="2100"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border rounded-md px-2 py-1 mr-4 bg-white"
            />
            <button
              type="submit"
              className="bg-[#8F5C54] hover:bg-[#DCD8D0] hover:text-[#253331] text-white font-bold py-2 px-4 rounded"
            >
              Lihat Laporan
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : data.length > 0 ? (
        <div>
          {data.map((item, index) => {
            let jumlah = 0;
            const handlePrint = (item) => {
              const doc = new jsPDF();

              // Set font size to 12
              doc.setFontSize(12);

              doc.text("AtmaKitchen", 15, 10);
              doc.text("Jl.Centralpark No. 10 Yogyakarta", 15, 15);
              doc.text("Laporan Transkrip Penitip", 15, 25);
              doc.text(`ID Penitip: ${item.id_penitip}`, 15, 30);
              doc.text(`Nama Penitip: ${item.nama_penitip}`, 15, 35);
              doc.text(`Bulan: ${bulan}`, 15, 40);
              doc.text(`Tahun: ${tahun}`, 15, 45);
              doc.text(`Tanggal Cetak: ${tanggalCetak}`, 15, 50);

              const tableData = item.produk.map((prod) => [
                prod.nama_produk,
                prod.jumlah,
                prod.harga,
                prod.subtotal,
                prod.komisi,
                prod.total,
              ]);

              doc.autoTable({
                head: [
                  [
                    "Nama Produk",
                    "Jumlah",
                    "Harga",
                    "Subtotal",
                    "Komisi 20%",
                    "Total",
                  ],
                ],
                body: tableData,
                startY: 55,
                styles: { cellPadding: 3 },
                columnStyles: {
                  0: { cellWidth: "auto", halign: "left" },
                  1: { cellWidth: 30, halign: "right" },
                  2: { cellWidth: 30, halign: "right" },
                },
              });

              const jumlah = item.produk.reduce(
                (acc, prod) => acc + prod.total,
                0
              );

              doc.autoTable({
                body: [
                  [
                    {
                      content: "Total",
                      styles: { fontStyle: "bold", halign: "Center" },
                    },
                    {
                      content: jumlah,
                      styles: { fontStyle: "bold", halign: "right" },
                    },
                  ],
                ],
                startY: doc.lastAutoTable.finalY,
                styles: { cellPadding: 3 },
                columnStyles: {
                  0: { cellWidth: "auto" },
                  1: { cellWidth: 30 },
                  2: { cellWidth: 30 },
                },
              });

              doc.save(
                `Laporan_Transkrip_Penitip_${item.nama_penitip}_${bulan}_${tahun}.pdf`
              );
            };
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 mt-2 mb-10"
              >
                <div className="border-t border-l border-r border-b border-black">
                  <div className="ml-2 mt-2">
                    <h3 className="text-lg font-bold">AtmaKitchen</h3>
                    <h3 className="text-lg font-light mb-5">
                      Jl.Centralpark No. 10 Yogyakarta
                    </h3>
                  </div>
                  <div className="ml-2">
                    <h3 className="text-lg font-bold">
                      Laporan Transkrip Penitip
                    </h3>
                    <h3 className="text-lg font-light">
                      ID Penitip: {item.id_penitip}
                    </h3>
                    <h3 className="text-lg font-light">
                      Nama Penitip: {item.nama_penitip}
                    </h3>
                    <h3 className="text-lg font-light">Bulan: {bulan}</h3>
                    <h3 className="text-lg font-light">Tahun: {tahun}</h3>
                    <h3 className="text-lg font-light mb-3">
                      Tangal Cetak: {tanggalCetak}
                    </h3>
                  </div>
                </div>
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 border-black">Nama</th>
                      <th className="border px-4 py-2 border-black">QTY</th>
                      <th className="border px-4 py-2 border-black">
                        Harga Jual
                      </th>
                      <th className="border px-4 py-2 border-black">Total</th>
                      <th className="border px-4 py-2 border-black">
                        20% Komisi
                      </th>
                      <th className="border px-4 py-2 border-black">
                        Yang Diterima
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.produk.map(
                      (prod, index) => (
                        (jumlah += prod.total),
                        (
                          <tr key={index}>
                            <td className="border px-4 py-2 border-black">
                              {prod.nama_produk}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {prod.jumlah}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {prod.harga}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {prod.subtotal}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {prod.komisi}
                            </td>
                            <td className="border px-4 py-2 border-black">
                              {prod.total}
                            </td>
                          </tr>
                        )
                      )
                    )}

                    <tr>
                      <td
                        className="border px-4 py-2 font-bold border-black text-center"
                        colSpan="5"
                      >
                        Total
                      </td>
                      <td className="border px-4 py-2 font-bold border-black">
                        {jumlah}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end">
                  <button
                    className="bg-[#8F5C54] hover:bg-[#DCD8D0] hover:text-[#253331] text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={()=>handlePrint(item)}
                  >
                    Cetak Laporan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Tidak ada data yang ditemukan.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default LaporanPenitip;
