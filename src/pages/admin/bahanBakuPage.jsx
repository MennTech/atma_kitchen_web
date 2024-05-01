import { useEffect, useState } from "react";
import { GetAllBahanBaku } from "../../api/BahanBaku";
import DataTable from "react-data-table-component";
import CreateModal from "../../components/modals/ModalsCreateBahanBaku"


const BahanBakuPage = () => {
  const [bahanBaku, setBahanBaku] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const fetchData = async () => {
    setIslLoading(true);
    GetAllBahanBaku()
      .then((response) => {
        setBahanBaku(response);
        setSearch(response);
        setIslLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    {
      name: 'Nama',
      selector: row => row.nama_bahan_baku,
      sortable: true,
    },
    {
      name: 'Stok',
      cell: row => `${row.stok}  ${row.satuan}`,
    },
  ];
  const paginationOptions = {
    rowsPerPageText: 'Baris per halaman',
    rangeSeparatorText: 'dari',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Semua'
  };
  const [search, setSearch] = useState([]);
  function handleSearch(event) {
    let value = event.target.value;
    let result = bahanBaku.filter((data) => {
      return data.nama_bahan_baku.toLowerCase().includes(value.toLowerCase());
    });
    setSearch(result);
  }
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleOnClose = () => setShowModal(false);
  return (
    <div className='w-screen p-4 min-h-screen overflow-y-auto'>
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">Data Bahan Baku</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">
          Manajemen Bahan Baku Atma Kitchen
        </p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className='flex justify-between'>
            <div className="flex items-center">
              <input type="text" placeholder="Cari Bahan Baku" className='input bg-slate-100 px-4' onChange={handleSearch} />
            </div>
            <div className="space-x-1">
              <button className='btn btn-outline bg-[#d08854] text-white' onClick={handleShow}>Tambah Bahan Baku</button>
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
                data={search}
                pagination
                highlightOnHover
                paginationComponentOptions={paginationOptions}
                responsive
              />
            }
          </div>
        </div>
      </div>
      <CreateModal visible={showModal} onClose={handleOnClose} />
    </div>
  );
};
export default BahanBakuPage;