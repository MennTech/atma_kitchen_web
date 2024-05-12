import { useEffect, useState } from "react";
import { GetAllPesanan } from "../../../api/pesanan";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";

const DetailPesananPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const fetchData = async () => {
    setIslLoading(true);
    GetAllPesanan(id)
      .then((response) => {
        console.log(response);
        setPesanan(response);
        setSearch(response);
        setIslLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      name: <span className="font-bold text-base">Tanggal Pesan</span>,
      selector: (row) => row.tanggal_pesan,
      sortable: true,
    },
    {
      name: <span className="font-bold text-base">Tanggal Ambil</span>,
      selector: (row) => row.tanggal_ambil,
    },
    {
      name: <span className="font-bold text-base">Tanggal Lunas</span>,
      selector: (row) => row.tanggal_lunas,
    },
    {
      name: <span className="font-bold text-base">Alamat</span>,
      selector: (row) => row.alamat,
    },
    {
      name: <span className="font-bold text-base">Delivery</span>,
      selector: (row) => row.delivery,
    },
    {
      name: <span className="font-bold text-base">Total</span>,
      selector: (row) => row.total,
    },
    {
      name: <span className="font-bold text-base">Ongkos Kirim</span>,
      selector: (row) => row.ongkos_kirim,
      sortable: true,
    },
    {
      name: <span className="font-bold text-base">Tip</span>,
      selector: (row) => (row.tip !== null ? row.tip : "0"),
    },
    {
      name: <span className="font-bold text-base">Status</span>,
      selector: (row) => row.status,
    },
    {
      name: <span className="font-bold text-base">Jumlah Pembayaran</span>,
      selector: (row) => row.jumlah_pembayaran,
    },
    {
      name: <span className="font-bold text-base">Poin dipakai</span>,
      selector: (row) => row.poin_dipakai,
    },
    {
      name: <span className="font-bold text-base">Poin didapat</span>,
      selector: (row) => row.poin_didapat,
    },
    {
      name: <span className="font-bold text-base">Bukti Pembayaran</span>,
      selector: (row) => row.bukti_pembayaran,
    },
    {
      name: "",
      cell: (row) => (
        <button
          className="btn btn-sm btn-outline hover:bg-[#DCD8D0] hover:text-[#253331] bg-[#8F5C54] text-white"
          onClick={() =>
            navigate(`/dashboard/detail_pesanan/${row.id_customer}`)
          }
        >
          Detail
        </button>
      ),
      right: "true",
    },
  ];
  const paginationOptions = {
    rowsPerPageText: "Baris per halaman",
    rangeSeparatorText: "dari",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Semua",
  };
  function handleSearch(event) {
    let value = event.target.value;
    let result = pesanan.filter((data) => {
      return (
        data.tanggal_pesan.toLowerCase().includes(value.toLowerCase()) ||
        data.tanggal_ambil.toLowerCase().includes(value.toLowerCase()) ||
        data.tanggal_lunas.toLowerCase().includes(value.toLowerCase()) ||
        data.alamat.toLowerCase().includes(value.toLowerCase()) ||
        data.delivery.toLowerCase().includes(value.toLowerCase()) ||
        data.total.toString().toLowerCase().includes(value.toLowerCase()) ||
        data.ongkos_kirim.toString() .toLowerCase().includes(value.toLowerCase()) ||
        data.status.toLowerCase().includes(value.toLowerCase()) ||
        data.jumlah_pembayaran.toString().toLowerCase().includes(value.toLowerCase()) ||
        data.poin_dipakai.toString().toLowerCase().includes(value.toLowerCase()) ||
        data.poin_didapat.toString() .toLowerCase() .includes(value.toLowerCase())
      );
    });
    setSearch(result);
  }
  useEffect(() => {
    setIslLoading(true);
    fetchData();
  }, []);
  return (
    <div className="w-screen p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">
          Data Pesanan Customer
        </h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="2024-06-01"
                className="input bg-slate-100 px-4"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="divider m-1"></div>
          <div className="mt-2">
            {isLoading && (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="mt-2">Memuat Data...</span>
              </div>
            )}
            {!isLoading && (
              <DataTable
                columns={columns}
                data={search}
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
export default DetailPesananPage;
