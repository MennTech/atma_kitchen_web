import { useState, useEffect } from "react";
import { GetAllRole, EditGajiRole} from "../../api/roleApi";
import { toast } from "sonner";
import DataTable from "react-data-table-component";

const OwnerJabatanPage = () => {
  const [role, setRole] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idRole, setIdRole] = useState(null);
  const [gaji, setGaji] = useState(0);

  const fetchRole = () => {
    setIslLoading(true);
    GetAllRole()
      .then((response) => {
        setRole(response.data.data);
        setRecords(response.data.data);
        setIslLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIslLoading(true);
    fetchRole();
  }, []);


  const columns = [
    {
      name: "No",
      selector: (row, rowIndex) => rowIndex + 1,
    },
    {
      name: "Nama Jabatan",
      selector: (row) => row.jabatan,
    },
    {
      name: "Gaji",
      selector: (row) => row.gaji,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex space-x-1">
          <button
            className="btn btn-sm btn-warning text-white"
            onClick={() => handleShowModal(row.id_role)}
          >
            Edit
          </button>
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
    const newData = role.filter((row) => {
      return row.jabatan
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const handleShowModal = (id) => {
    setShowModal(true);
    setIdRole(id);
    role.forEach((value) => {
      value.id_role == id ? setGaji(value.gaji) : null;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateGaji = () => {
    EditGajiRole(idRole, gaji)
      .then((response) => {
        toast.success("Berhasil mengupdate gaji jabatan");
        fetchRole();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setGaji(event.target.value);
  };

  return (
    <div className="w-screen min-h-screen p-4 overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">Data Jabatan</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Jabatan Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-2">
        <div className="card-body h-full p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Jabatan"
                className="input bg-slate-100"
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
      <dialog className="modal" open={showModal}>
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Edit Gaji Karyawan</h3>
          <div className="modal-action">
            <div className="w-full grid grid-rows-2 gap-1">
              <div className="form-control">
                <label htmlFor="gaji">Gaji Jabatan</label>
                <input
                  type="number"
                  className="input input-bordered bg-white"
                  placeholder="Gaji Jabatan"
                  id="gaji"
                  name="bonus"
                  value={gaji}
                  onChange={handleChange}
                />
              </div>
              <div className="space-x-1 mt-3">
                <button
                  className="btn btn-error text-white"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary text-white"
                  onClick={() => {
                    handleUpdateGaji();
                    handleCloseModal();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default OwnerJabatanPage;
