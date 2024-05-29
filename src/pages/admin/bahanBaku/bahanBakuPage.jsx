import { useEffect, useState } from "react";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import DataTable from "react-data-table-component";
import CreateModal from "../../../components/Modals/ModalsBahanBaku/ModalsCreateBahanBaku"
import DeleteModal from "../../../components/Modals/ModalsBahanBaku/ModalsDelete"
import EditModal from "../../../components/Modals/ModalsBahanBaku/ModalsUpdate"


const BahanBakuPage = () => {
  const [bahanBaku, setBahanBaku] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [search, setSearch] = useState([]);
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
  const columns = [
    {
      name: <span className="font-bold text-base">Nama</span>,
      selector: row => row.nama_bahan_baku,
      sortable: true,
    },
    {
      name: <span className="font-bold text-base">Stok</span>,
      cell: row => `${row.stok}  ${row.satuan}`,
    },
    {
      name: '',
      cell: row => (
        <div className="flex gap-2 justify-end items-end">
          <EditModal onClose={fetchData} value={row}/>
          <DeleteModal onClose={fetchData} value={row}/>
        </div>
      ),
      right: "true",
    },
  ];
  const paginationOptions = {
    rowsPerPageText: 'Baris per halaman',
    rangeSeparatorText: 'dari',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Semua'
  };
  function handleSearch(event) {
    let value = event.target.value;
    let result = bahanBaku.filter((data) => {
      return data.nama_bahan_baku.toLowerCase().includes(value.toLowerCase())||data.stok.toString().includes(value.toLowerCase())||data.satuan.toLowerCase().includes(value.toLowerCase());
    });
    setSearch(result);
  }
  useEffect(() => {
    setIslLoading(true);
    fetchData();
  }, []);
  return (
    <div className='w-screen p-4 min-h-screen overflow-y-auto'>
      <div className="flex items-center">
        <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Bahan Baku</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">
          Manajemen Bahan Baku Atma Kitchen
        </p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className='flex justify-between'>
            <div className="flex items-center">
              <input type="text" placeholder="cth:Butter" className='input bg-[#F3EFEA] px-4' onChange={handleSearch}/>
            </div>
            <div className="space-x-1">
              <CreateModal onClose={fetchData}/>
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
    </div>
  );
};
export default BahanBakuPage;