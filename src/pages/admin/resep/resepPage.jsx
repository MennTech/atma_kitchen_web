import { GetAllResep} from "../../../api/resepApi";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
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
      name: "No",
      selector: (row, rowIndex) => rowIndex + 1,
    },
    {
      name: "Nama Resep",
      selector: (row) => row.nama_resep,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="space-x-2">
          <button   
            className="btn btn-sm btn-outline bg-[#e6a525] text-white"
            onClick={() => navigate(`/dashboard/edit-resep/${row.id_resep}`)}
          >
            Edit
          </button>
          <button className="btn btn-sm btn-outline bg-[#e74d42] text-white">
            Hapus
          </button>
        </div>
      ),
    },
  ];
  
  const paginationOptions = {
    rowsPerPageText: 'Baris per halaman',
    rangeSeparatorText: 'dari',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Semua'
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
        <p className="text-slate-400">
          Manajemen Resep Atma Kitchen
        </p>
        </div>
        <div className="card w-full h-fit bg-white mt-4">
          <div className="card-body h-full p-4">
            <div className='flex justify-between'>
              <div className="flex items-center">
              <input type="text" placeholder="Cari Bahan Baku" className='input bg-slate-100 px-4' onChange={handleSearch} />
              </div>
              <div className="space-x-1">
                <button
                  className="btn btn-outline bg-[#d08854] text-white"
                  onClick={() => navigate("/dashboard/tambah-resep")}
                >
                  Tambah Resep
                </button>
              </div>
            </div>
            <div className="divider m-1"></div>
            <div className='mt-2'>
              {isLoading &&
                <div className="flex flex-col items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                  <span className="mt-2">Memuat Data...</span>
                </div>
              }
              {!isLoading &&
                <DataTable
                  columns={columns}
                  data={records}
                  pagination
                  highlightOnHover
                  paginationComponentOptions={paginationOptions}
                  responsive
                />
              }
            </div>
          </div>
        </div>
    </div>
  );
};

export default ResepPage;
