import { useEffect, useState } from "react";
import { GetAllCustomer } from "../../../api/customer"
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";


const CustomerPage = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIslLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const fetchData = async () => {
    setIslLoading(true);
    GetAllCustomer()
      .then((response) => {
        console.log(response);
        setCustomer(response);
        setSearch(response);
        setIslLoading(false);
      }).catch((err) => {
        console.log(err);
        console.log(err);
      });
  };
  const columns = [
    {
      name: <span className="font-bold text-base">Nama</span>,
      selector: row => row.nama_customer,
      sortable: true,
    },
    {
      name: <span className="font-bold text-base">Email</span>,
      selector: row => row.email_customer,
    },
    {
      name: <span className="font-bold text-base">Tanggal Lahir</span>,
      selector: row => row.tanggal_lahir,
    },
    {
      name: <span className="font-bold text-base">Nomor Telepon</span>,
      selector: row => row.no_telp,
    },
    {
      name: <span className="font-bold text-base">Poin</span>,
      selector: row => row.poin,
    },
    {
      name: <span className="font-bold text-base">Saldo</span>,
      selector: row => row.saldo,
    },
    {
      name: '',
      cell: row => (
        <button className="btn btn-sm btn-outline bg-[#d08854] text-white" onClick={() => navigate(`/dashboard/pesanan/${row.id_customer}`)}>
          Pesanan
        </button>
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
    let result = customer.filter((data) => {
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
        <h1 className="text-4xl text-[#d08854] font-semibold">Data Customer</h1>
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
export default CustomerPage;