import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ShowPesananDiproses, UpdateStatusPesanan } from "../../../api/pesanan";

const PesananDiproses = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pesanan, setPesanan] = useState([]);

    const fetchPesanan = () => {
        setIsLoading(true);
        ShowPesananDiproses()
            .then((response) => {
                setPesanan(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setPesanan([]);
            });
    }

    useEffect(() => {
        fetchPesanan();
    }, []);

    const handleStatus = (id, event) => {
        UpdateStatusPesanan(id, event.target.value)
            .then((response) => {
                fetchPesanan();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const columns = [
        {
          name: <span className="font-bold text-base">No Pesanan</span>,
          selector: (row) => {
            const date = new Date(row.tanggal_pesan);
            const year = String(date.getFullYear()).slice(2);
            const month = String(date.getMonth() + 1).padStart(2, "0");
            return `${year}.${month}.${row.id_pesanan}`;
          },
        },
        {
          name: <span className="font-bold text-base">Nama Pemesan</span>,
          selector: (row) => row.customer.nama_customer,
        },
        {
          name: <span className="font-bold text-base">Delivery</span>,
          selector: (row) => row.delivery,
        },
        {
          name: <span className="font-bold text-base">Status Pesanan</span>,
          selector: (row) => {
            return (
                <div className="p-1">
                    <select name="status" className="select select-bordered bg-white text-black" value={row.status} onChange={(event)=> handleStatus(row.id_pesanan, event)}>
                        {row.status == "Siap Di-pickup" ? (
                            <>
                                <option value={row.status} disabled>{row.status}</option>
                                <option value="Sudah Di-pickup">Sudah Di-pickup</option>
                                <option value="Selesai">Diambil Sendiri</option>
                            </>
                        )
                        :
                        (
                            <>
                                <option value={row.status} disabled>{row.status}</option>
                                {row.delivery == "Pickup" ? 
                                  <option value="Siap Di-pickup">Siap Di-pickup</option>
                                :
                                  <option value="Sedang Dikirim">Sedang Dikirim</option>
                                }
                            </>
                        )}
                        
                    </select>
                </div>
            )
          }
        }
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
        <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Pesanan Diproses</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Pesanan Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <div className="divider m-1"></div>
          <div className="mt-2">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="mt-2">Memuat Data...</span>
              </div>
            )
             : 
            (
              pesanan.length == 0 ? (
                <div className="flex flex-col items-center">
                  <span className="mt-2 text-lg font-mono">Belum ada pesanan yang diproses 🤷‍♂️</span>
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={pesanan}
                  pagination
                  highlightOnHover
                  paginationComponentOptions={paginationOptions}
                  responsive
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PesananDiproses;