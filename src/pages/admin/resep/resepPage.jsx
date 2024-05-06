import { GetAllResep } from "../../../api/resepApi";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../../../components/Modals/ModalResep/ModalDelete";

const ResepPage = () => {
  const [resep, setResep] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIslLoading] = useState(false);
  const fetchResep = () => {
    setIslLoading(true);
    GetAllResep()
      .then((response) => {
        setResep(response.data.data);
        setRecords(response.data.data);
        setIslLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIslLoading(true);
    fetchResep();
  }, []);

  const columns = [
    {
      name: <span className="font-bold text-base">No</span>,
      selector: (row, rowIndex) => rowIndex + 1,
    },
    {
      name: <span className="font-bold text-base">Nama Resep</span>,
      selector: (row) => row.nama_resep,
    },
    {
      name: <span className="font-bold text-base"> Aksi</span>,
      cell: (row) => (
        <div className="space-x-2">
          <button
            className="btn btn-sm btn-outline bg-[#d08854] text-white"
            onClick={() => navigate(`/dashboard/edit-resep/${row.id_resep}`)}
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <ModalDelete onClose={fetchResep} value={row} />
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

  function handleSearch(event) {
    const newData = resep.filter((row) => {
      return row.nama_resep
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div className="w-screen p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">Data Resep</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Resep Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Resep"
                className="input bg-slate-100 px-4"
                onChange={handleSearch}
              />
            </div>
            <div className="space-x-1">
              <button
                className="btn btn-outline bg-[#d08854] text-white"
                onClick={() => navigate("/dashboard/tambah-resep")}
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
                Tambah Resep
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
    </div>
  );
};

export default ResepPage;
