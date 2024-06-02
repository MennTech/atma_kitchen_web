import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ShowPesanan } from "../../../api/pesanan";
import ModalInputJarak from "../../../components/Modals/ModalPesanan/ModalInputJarak";
import ModalInputJumlahBayar from "../../../components/Modals/ModalPesanan/ModalInputJumlahBayar";
import ModalBuktiBayar from "../../../components/Modals/ModalPesanan/ModalBuktiBayar";

const PesananPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pesanan, setPesanan] = useState([]);

  const fetchPesanan = () => {
    setIsLoading(true);
    ShowPesanan()
      .then((response) => {
        setPesanan(response.data);
        setRecords(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setRecords([]);
      });
  };

  useEffect(() => {
    fetchPesanan();
  }, []);

  const columns = [
    {
      name: <span className="font-bold text-base">No Pesanan</span>,
      selector: (row) => {
        const date = new Date(row.tanggal_pesan);
        const year = String(date.getFullYear()).slice(2);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return `${year}.${month}.${row.id_pesanan}`;
      },
    },
    {
      name: <span className="font-bold text-base">Nama Pemesan</span>,
      selector: (row) => row.customer.nama_customer,
    },
    {
      name: <span className="font-bold text-base">Status Pesanan</span>,
      selector: (row) => row.status,
    },
    {
      name: <span className="font-bold text-base">Total Harga</span>,
      selector: (row) => new Intl.NumberFormat("id-ID",{
        style: "currency",
        currency: "IDR",
      }).format(row.total),
    },
    {
      name: <span className="font-bold text-base">Aksi</span>,
      cell: (row) => (
        <div className="grid grid-cols-2 gap-2">
          {row.status == "Menunggu Konfirmasi Admin" && (
            <>
              <ModalBuktiBayar value={row.bukti_pembayaran}/>
              <ModalInputJumlahBayar onClose={fetchPesanan} value={row.id_pesanan}/>
            </>
          )}
          {row.status == "Menunggu Konfirmasi Pesanan" && (
            <ModalInputJarak onClose={fetchPesanan} value={row.id_pesanan}/>
          )}
        </div>
      ),
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Baris per halaman",
    rangeSeparatorText: "dari",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Semua",
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    const search = pesanan.filter((data) => {
      return (
        data.customer.nama_customer.toLowerCase().includes(keyword) ||
        data.status.toLowerCase().includes(keyword)
      );
    });
    setRecords(search);
  };

  return (
    <div className="w-screen p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Pesanan Masuk</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Pesanan Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Pesanan"
                className="input bg-[#F3EFEA] px-4"
                onChange={handleSearch}
              />
            </div>
            <div className="space-x-1"></div>
          </div>
          <div className="divider m-1"></div>
          <div className="mt-2">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="mt-2">Memuat Data...</span>
              </div>
            )
             : 
            (
              records.length == 0 ? (
                <div className="flex flex-col items-center">
                  <span className="mt-2 text-lg font-mono">Tidak Pesanan Masuk Hari Ini 😭</span>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={records}
                  pagination
                  highlightOnHover
                  paginationComponentOptions={paginationOptions}
                  responsive
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PesananPage;
