import { useState,useEffect } from "react";
import { ShowSaldoPending,AccSaldo,RejectSaldo } from "../../../api/Saldo";
import DataTable from "react-data-table-component";

const SaldoPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [saldo, setSaldo] = useState([]);
  
    const fetchSaldoPending = () => {
      setIsLoading(true);
      ShowSaldoPending()
        .then((response) => {
          setSaldo(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setSaldo([]);
        });
    };
    const handleApprove = (id) => {
      AccSaldo(id)
        .then((response) => {
          fetchSaldoPending();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const handleReject = (id) => {
      RejectSaldo(id)
        .then((response) => {
          fetchSaldoPending();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      fetchSaldoPending();
    }, []);
  
    const columns = [
      {
        name: <span className="font-bold text-base">Nama Customer</span>,
        selector: (row) => row.history_saldo_customer.nama_customer
      },
      {
        name: <span className="font-bold text-base">Nominal</span>,
        selector: (row) => "Rp."+row.nominal
      },
      {
        name: <span className="font-bold text-base">Nomor Rekening</span>,
        selector: (row) => row.nomor_rekening,
      },
      {
        name: <span className="font-bold text-base"></span>,
        cell: (row) => (
          <div className="grid grid-cols-3 gap-2">
            {row.status == "Pending" && (
              <>
                <button
                  className="btn btn-sm btn-outline hover:bg-[#DCD8D0] hover:text-[#253331] bg-[#00a26b] text-white"
                  onClick={() => handleApprove(row.id_history_saldo)}
                >
                  Terima
                </button>
                <button
                  className="btn btn-sm btn-outline hover:bg-[#DCD8D0] hover:text-[#253331] bg-red-900 text-white"
                  onClick={() => handleReject(row.id_history_saldo)}
                >
                  Tolak
                </button>
              </>
            )}
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
    return (
      <div className="w-screen p-4 min-h-screen overflow-y-auto">
        <div className="flex items-center">
          <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Pengajuan Penarikan Saldo</h1>
          <div className="divider divider-horizontal m-1"></div>
          <p className="text-slate-400">Manajemen Atma Kitchen</p>
        </div>
        <div className="card w-full h-fit bg-white mt-4">
          <div className="card-body h-full p-4">
            <div className="mt-2">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                  <span className="mt-2">Memuat Data...</span>
                </div>
              ) : saldo.length == 0 ? (
                <div className="flex flex-col items-center">
                  <span className="mt-2 text-lg font-mono">
                    Tidak Permintaan Penarikan Saldo Masuk Hari Ini 😭
                  </span>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={saldo}
                  pagination
                  highlightOnHover
                  paginationComponentOptions={paginationOptions}
                  responsive
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default SaldoPage;