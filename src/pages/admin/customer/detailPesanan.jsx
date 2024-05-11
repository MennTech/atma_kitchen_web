import { useEffect, useState } from "react";
import { GetDetailPesanan } from "../../../api/detailPesanan"
import DataTable from "react-data-table-component";


const DetailPesananPage = () => {
  const {id} = useParams();
  const [detailPesanan, setDetailPesanan] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const fetchData = async () => {
    setIslLoading(true);
    GetDetailPesanan(id)
      .then((response) => {
        console.log(response);
        setDetailPesanan(response);
        setSearch(response);
        setIslLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      name: <span className="font-bold text-base">Produk</span>,
      selector: row => row.produk.nama_produk,
      sortable: true,
    },
    {
      name: <span className="font-bold text-base">Hampers</span>,
      selector: row => row.hampers ? row.hampers.nama_hampers : "-",
    },
    {
      name: <span className="font-bold text-base">Jumlah</span>,
      selector: row => row.jumlah,
    },
    {
      name: <span className="font-bold text-base">Subtotal</span>,
      selector: row => row.subtotal,
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
    let result = detailPesanan.filter((data) => {
      return data.nama_customer.toLowerCase().includes(value.toLowerCase());
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
        <h1 className="text-4xl text-[#d08854] font-semibold">Data Pesanan Customer</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">
          Manajemen Atma Kitchen
        </p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className='flex justify-between'>
            <div className="flex items-center">
              <input type="text" placeholder="Cari Bahan Baku" className='input bg-slate-100 px-4' onChange={handleSearch}/>
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
export default DetailPesananPage;