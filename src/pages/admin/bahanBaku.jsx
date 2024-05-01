import { useEffect,useState } from "react";
import { GetAllBahanBaku } from "../../api/BahanBaku";
import DataTable from "react-data-table-component";
import CreateModal from "../../components/modals/ModalsCreateBahanBaku"
 

const BahanBakuPage = () =>{
    const [bahanBaku, setBahanBaku] = useState([]);
    const fetchData = async () => {
     GetAllBahanBaku()
        .then((response) => {
            setBahanBaku(response);
            setSearch(response);
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
      <div className="flex p-5 bg-white w-screen flex-col">
        <div className=" bg-[#f9f9f1] p-3 w-full rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-4">
              <h1 className="text-start text-3xl text-[#d08854] font-semibold max-h-full">Bahan Baku</h1>
            </div>
            <div className="p-4 pr-0 text-end">
              <button className="bg-[#d08854] text-white text-base rounded-btn px-3 h-10 hover:bg-white hover:text-[#d08854]" onClick={handleShow}>Tambah Bahan Baku</button>
              <input type="text" className="bg-white rounded-lg p-1 ml-5" placeholder="Search" onChange={handleSearch}/>
            </div>
          </div>
        </div>
        <div className=" bg-[#f9f9f1] p-3 w-full mt-6 rounded-lg">
          <DataTable
			      columns={columns}
			      data={search}
            pagination
            highlightOnHover
            paginationComponentOptions={paginationOptions}
            responsive
		      />
        </div>
        <CreateModal visible={showModal} onClose={handleOnClose}/>
    </div>
      );
  };
  export default BahanBakuPage;