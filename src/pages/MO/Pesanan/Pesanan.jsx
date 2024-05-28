import { useEffect, useState } from "react";
import { ShowPesananValid } from "../../../api/pesanan";
import DataTable from "react-data-table-component";
import DetailPesanan from "../../../components/Modals/ModalPesanan/detailPesanan";
import { ApprovePesanan, RejectPesanan } from "../../../api/pesanan";
import { BahanBakuKurang } from "../../../api/BahanBaku";

const PesananPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pesanan, setPesanan] = useState([]);
  const [bahanBaku, setBahanBaku] = useState([]);

  const fetchBahanBaku = () => {
    BahanBakuKurang()
      .then((response) => {
        setBahanBaku(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPesanan = () => {
    setIsLoading(true);
    ShowPesananValid()
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
  const handleApprove = (id) => {
    ApprovePesanan(id)
      .then((response) => {
        fetchPesanan();
        console.log(berhasil);
      })
      .catch((error) => {
        console.log(error);
        console.log(gagal);
      });
  };
  const handleReject = (id) => {
    RejectPesanan(id)
      .then((response) => {
        fetchPesanan();
        console.log(berhasil);
      })
      .catch((error) => {
        console.log(error);
        console.log(gagal);
      });
  };
  useEffect(() => {
    fetchPesanan();
    fetchBahanBaku();
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
      name: <span className="font-bold text-base">Tanggal Ambil</span>,
      selector: (row) => row.tanggal_ambil,
    },
    {
      name: <span className="font-bold text-base">Status Pesanan</span>,
      selector: (row) => row.status,
    },
    {
      name: <span className="font-bold text-base">Metode Pesan</span>,
      selector: (row) => row.metode_pesan,
    },
    {
      name: <span className="font-bold text-base"></span>,
      cell: (row) => (
        <div className="grid grid-cols-3 gap-2">
          {row.status == "Pembayaran Valid" && (
            <>
              <DetailPesanan value={row.detail_pesanan} />
              <button
                className="btn btn-sm btn-outline hover:bg-[#DCD8D0] hover:text-[#253331] bg-[#00a26b] text-white"
                onClick={() => handleApprove(row.id_pesanan)}
              >
                Terima
              </button>
              <button
                className="btn btn-sm btn-outline hover:bg-[#DCD8D0] hover:text-[#253331] bg-red-900 text-white"
                onClick={() => handleReject(row.id_pesanan)}
              >
                Tolak
              </button>
            </>
          )}
        </div>
      ),
    },
  ];
  const columnsBahan = [
    {
      name: <span className="font-bold text-base">Nama Bahan Baku</span>,
      selector: (row) => row.nama_bahan_baku,
    },
    {
      name: <span className="font-bold text-base">Jumlah Kurang</span>,
      selector: (row) => Math.abs(row.stok),
    },
    {
      name: <span className="font-bold text-base">Satuan</span>,
      selector: (row) => row.satuan,
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
        <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Pesanan</h1>
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
            ) : records.length == 0 ? (
              <div className="flex flex-col items-center">
                <span className="mt-2 text-lg font-mono">
                  Tidak Pesanan Masuk Hari Ini 😭
                </span>
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
            )}
          </div>
        </div>
      </div>
      {bahanBaku.length != 0 && (
        <div className="mt-5 rounded-badge bg-red-900 flex justify-center p-3">
          <h1 className="poppins-bold text-white text-xl">Ada Bahan Baku yang kurang</h1>
        </div>
      )}
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className="mt-2">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="mt-2">Memuat Data...</span>
              </div>
            ) : bahanBaku.length == 0 ? (
              <div className="flex flex-col items-center"></div>
            ) : (
              <DataTable
                columns={columnsBahan}
                data={bahanBaku}
                pagination
                highlightOnHover
                paginationComponentOptions={paginationOptions}
                responsive
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PesananPage;
