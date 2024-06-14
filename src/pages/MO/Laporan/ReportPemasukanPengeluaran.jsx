import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ReportPemasukanPengeluaran } from "../../../api/laporanPemasukanPengeluaran";

const LaporanTransaksi = () => {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [data, setData] = useState([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const response = await ReportPemasukanPengeluaran(requestData);
      console.log(response.data);
      const combinedData = combineData(response.data);
      setData(combinedData.data);
      setTotalPemasukan(combinedData.totalPemasukan);
      setTotalPengeluaran(combinedData.totalPengeluaran);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const combineData = (responseData) => {
    const pemasukan = responseData.pemasukan
      .filter((item) => item.nama !== "Total")
      .map((item) => ({
        ...item,
        type: "pemasukan",
      }));
    const pengeluaran = responseData.pengeluaran
      .filter((item) => item.nama !== "Total")
      .map((item) => ({
        ...item,
        type: "pengeluaran",
      }));
    const totalPemasukan =
      responseData.pemasukan.find((item) => item.nama === "Total")?.jumlah || 0;
    const totalPengeluaran =
      responseData.pengeluaran.find((item) => item.nama === "Total")?.jumlah ||
      0;
    return {
      data: [...pemasukan, ...pengeluaran],
      totalPemasukan,
      totalPengeluaran,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    // Set font size to 12
    doc.setFontSize(12);

    doc.text("AtmaKitchen", 15, 10);
    doc.text("Jl.Centralpark No. 10 Yogyakarta", 15, 15);
    doc.text("Laporan Pemasukan dan Pengeluaran", 15, 25);
    doc.text(`Bulan: ${bulan}`, 15, 30);
    doc.text(`Tahun: ${tahun}`, 15, 35);
    doc.text(`Tanggal Cetak: ${tanggalCetak}`, 15, 40);

    const tableData = data.map((item) => [
      item.nama,
      item.type === "pemasukan" ? item.jumlah.toLocaleString() : "-",
      item.type === "pengeluaran" ? item.jumlah.toLocaleString() : "-",
    ]);

    doc.autoTable({
      head: [["", "Pemasukan", "Pengeluaran"]],
      body: tableData,
      startY: 45,
      styles: { cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: "auto", halign: "left" },
        1: { cellWidth: 40, halign: "right" },
        2: { cellWidth: 40, halign: "right" },
      },
    });

    doc.autoTable({
      body: [
        [
          { content: "Total", styles: { fontStyle: "bold", halign: "left" } },
          {
            content: totalPemasukan.toLocaleString(),
            styles: { fontStyle: "bold", halign: "right" },
          },
          {
            content: totalPengeluaran.toLocaleString(),
            styles: { fontStyle: "bold", halign: "right" },
          },
        ],
      ],
      startY: doc.lastAutoTable.finalY + 10,
      styles: { cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
      },
    });

    doc.save(`Laporan_${bulan}_${tahun}.pdf`);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          Laporan Pemasukan dan Pengeluaran
        </h2>
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
      <div className="bg-white shadow-md rounded-lg p-6 mt-2">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : data.length > 0 ? (
          <div>
            <div className="border-t border-l border-r border-b border-black">
              <div className="ml-2 mt-2">
                <h3 className="text-lg font-bold">AtmaKitchen</h3>
                <h3 className="text-lg font-light mb-5">
                  Jl.Centralpark No. 10 Yogyakarta
                </h3>
              </div>
              <div className="ml-2">
                <h3 className="text-lg font-bold">
                  Laporan Pemasukan dan Pengeluaran
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
                  <th className="border px-4 py-2 border-black"></th>
                  <th className="border px-4 py-2 border-black">Pemasukan</th>
                  <th className="border px-4 py-2 border-black">Pengeluaran</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 border-black">
                      {item.nama}
                    </td>
                    <td className="border px-4 py-2 border-black">
                      {item.type === "pemasukan"
                        ? item.jumlah.toLocaleString()
                        : "-"}
                    </td>
                    <td className="border px-4 py-2 border-black">
                      {item.type === "pengeluaran"
                        ? item.jumlah.toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-bold border-black">
                    Total
                  </td>
                  <td className="border px-4 py-2 font-bold border-black">
                    {totalPemasukan.toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 font-bold border-black">
                    {totalPengeluaran.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="bg-[#8F5C54] hover:bg-[#DCD8D0] hover:text-[#253331] text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handlePrint}
              >
                Cetak Laporan
              </button>
            </div>
          </div>
        ) : (
          <p>Tidak ada data yang ditemukan.</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default LaporanTransaksi;
