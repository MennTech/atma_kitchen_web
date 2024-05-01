import { GetAllResep} from "../../../api/resepApi";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
const ResepPage = () => {
  const [resep, setResep] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  
  const fetchResep = () => {
    GetAllResep()
      .then((response) => {
        setResep(response.data.data);
        setRecords(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
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

  function handleSearch(event) {
    const newData = resep.filter((row) => {
      return row.nama_resep
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex justify-between mt-5 ms-3 me-3">
        <h1 className="text-3xl text-[#d08854] font-semibold">Data Resep</h1>
        <button
          className="btn btn-outline bg-[#d08854] text-white"
          onClick={() => navigate("/dashboard/tambah-resep")}
        >
          Tambah Resep
        </button>
      </div>
      <div className="mt-2 mx-5">
        <div className="text-start">
          <label className="input input-bordered flex items-center gap-2 bg-white">
            <input
              type="text"
              className="grow"
              onChange={handleSearch}
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <DataTable
          columns={columns}
          data={records}
          fixedHeader
          pagination
          className="mt-2"
          fixedHeaderScrollHeight="530px"
        ></DataTable>
      </div>
    </div>
  );
};

export default ResepPage;
