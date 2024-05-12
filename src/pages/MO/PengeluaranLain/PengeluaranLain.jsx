import { useEffect, useState } from "react";
import { GetAllPengeluaranLain } from "../../../api/PengeluaranLain";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/Modals/ModalsPengeluaranLain/ModalsDelete";
import EditModal from "../../../components/Modals/ModalsPengeluaranLain/ModalsUpdate";

const PengeluaranLainPage = () => {
  const navigate = useNavigate();
  const [pengeluaran, setPengeluaran] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const fetchData = async () => {
    setIslLoading(true);
    GetAllPengeluaranLain()
      .then((response) => {
        setPengeluaran(response);
        setSearch(response);
        setIslLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      name: <span className="font-bold text-base">Nama Pengeluaran</span>,
      selector: (row) => row.nama_pengeluaran,
      sortable: true,
    },
    {
      name: <span className="font-bold text-base">Tanggal</span>,
      selector: (row) => row.tanggal,
      sortable: true,
    },
    {
      name: <span className="font-bold text-base">Harga</span>,
      selector: (row) => row.harga,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-2 justify-end items-end">
          <EditModal onClose={fetchData} value={row} />
          <DeleteModal onClose={fetchData} value={row} />
        </div>
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
    let result = pengeluaran.filter((data) => {
      return data.nama_pengeluaran.toLowerCase().includes(value.toLowerCase())||data.tanggal.toLowerCase().includes(value.toLowerCase())||data.harga.toString().toLowerCase().includes(value.toLowerCase());
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
          Data Pengeluaran Lain
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
                placeholder="cth:listrik"
                className="input bg-slate-100 px-4"
                onChange={handleSearch}
              />
            </div>
            <div className="space-x-1">
              <button
                className="btn btn-outline bg-[#d08854] text-white"
                onClick={() => navigate("/dashboard/addPengeluaranLain")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Tambah Pengeluaran lain
              </button>
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
export default PengeluaranLainPage;
