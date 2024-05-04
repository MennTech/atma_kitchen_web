import { GetAllKaryawan, GetRole, DeleteKaryawan } from "../../api/karyawanApi";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const KaryawanPage = () => {
  const [karyawan, setKaryawan] = useState([]);
  const [role, setRole] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIslLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idKaryawan, setIdKaryawan] = useState(null);

  const fetchKaryawan = () => {
    setIslLoading(true);
    GetAllKaryawan()
      .then((response) => {
        setKaryawan(response.data.data);
        setRecords(response.data.data);
        setIslLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    GetRole()
      .then((response) => {
        setRole(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIslLoading(true);
    fetchKaryawan();
  }, []);

  const getRole = (id_role) => {
    const foundRole = role.find((r) => r.id_role === id_role);
    return foundRole ? foundRole.jabatan : "-";
  };
  
  const deleteKaryawan = (event) => {
    event.preventDefault();
    DeleteKaryawan(idKaryawan)
      .then(() => {
        setShowModal(false);
        fetchKaryawan();
        toast.success("Data Karyawan Berhasil Dihapus");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      name: "No",
      selector: (row, rowIndex) => rowIndex + 1,
    },
    {
      name: "Nama Karyawan",
      selector: (row) => row.nama_karyawan,
    },
    {
      name: "Email Karyawan",
      selector: (row) => row.email_karyawan,
    },
    {
      name: "Jabatan Karyawan",
      selector: (row) => getRole(row.id_role),
    },
    {
      name: "No Telpon ",
      selector: (row) => row.no_telp,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="space-x-2">
          <button
            className="btn btn-sm btn-outline bg-[#e6a525] text-white"
            onClick={() => navigate(`/dashboard/edit-karyawan/${row.id_karyawan}`)}
          >
            Edit
          </button>
          <button className="btn btn-sm btn-outline bg-[#e74d42] text-white"
          onClick={()=>handleShowModal(row.id_karyawan)}>
            Hapus
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
    const newData = karyawan.filter((row) => {
      return row.nama_karyawan
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const handleShowModal = (id) => {
    setShowModal(true);
    setIdKaryawan(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className="w-screen min-h-screen p-4 overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">Data Karyawan</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Karyawan Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-2">
        <div className="card-body h-full p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Karyawan"
                className="input bg-slate-100"
                onChange={handleSearch}
              />
            </div>
            <div className="space-x-1">
              <button className="btn btn-outline bg-[#d08854] text-white" onClick={() => navigate('/dashboard/tambah-karyawan')}>
                Tambah Karyawan
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
      <dialog className="modal" open={showModal}>
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Delete Karyawan</h3>
          <p className="py-4">Yakin Ingin Menghapus Karyawan</p>
          <div className="modal-action">
            <form onSubmit={deleteKaryawan}>
              <div className="space-x-1">
                <button className="btn btn-error text-white" onClick={handleCloseModal}>Cancel</button>
                <button
                  className="btn btn-primary text-white"
                  type="submit"
                  onClick={handleCloseModal}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default KaryawanPage;
