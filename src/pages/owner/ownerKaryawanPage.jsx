import { GetAllKaryawan, UpdateBonus } from "../../api/karyawanApi";
import { GetAllRole } from "../../api/roleApi";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast } from "sonner";

const OwnerKaryawanPage = () => {
  const [karyawan, setKaryawan] = useState([]);
  const [role, setRole] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idKaryawan, setIdKaryawan] = useState(null);
  const [bonus, setBonus] = useState(0);

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
    GetAllRole()
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

  const columns = [
    {
      name: <span className="font-bold text-base"> No</span>,
      selector: (row, rowIndex) => rowIndex + 1,
    },
    {
      name: <span className="font-bold text-base">Nama Karyawan</span>,
      selector: (row) => row.nama_karyawan,
    },
    {
      name: <span className="font-bold text-base">Email</span>,
      selector: (row) => row.email_karyawan,
    },
    {
      name: <span className="font-bold text-base">Jabatan</span>,
      selector: (row) => getRole(row.id_role),
    },
    {
      name: <span className="font-bold text-base">No Telp</span>,
      selector: (row) => row.no_telp,
    },
    {
      name: <span className="font-bold text-base">Bonus</span>,
      selector: (row) => row.bonus,
    },
    {
      name: <span className="font-bold text-base">Aksi</span>,
      cell: (row) => (
        <div className="flex space-x-1">
          <button
            className="btn btn-sm btn-warning text-white"
            onClick={() => handleShowModal(row.id_karyawan)}
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
    karyawan.forEach((value) => {
      value.id_karyawan == id ? setBonus(value.bonus) : null;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateBonus = () => {
    UpdateBonus(idKaryawan, bonus)
      .then((response) => {
        toast.success("Berhasil mengupdate bonus karyawan");
        fetchKaryawan();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Gagal mengupdate bonus karyawan");
      });
  };

  const handleChange = (event) => {
    setBonus(event.target.value);
  };

  return (
    <div className="w-screen min-h-screen p-4 overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Karyawan</h1>
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
          <h3 className="font-bold text-lg">Edit Bonus Karyawan</h3>
          <div className="modal-action">
            <div className="w-full grid grid-rows-2 gap-1">
              <div className="form-control">
                <label htmlFor="bonus">Bonus Karyawan</label>
                <input
                  type="number"
                  className="input input-bordered bg-white"
                  placeholder="Bonus Karyawan"
                  id="bonus"
                  name="bonus"
                  value={bonus}
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
                    handleUpdateBonus();
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

export default OwnerKaryawanPage;
