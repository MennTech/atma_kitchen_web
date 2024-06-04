import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ShowPesananTelatBayar, UpdateStatusPesanan } from "../../../api/pesanan";
import { toast } from "sonner";

const PesananTelatBayar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pesanan, setPesanan] = useState([]);
    
    const fetchPesanan = () => {
        setIsLoading(true);
        ShowPesananTelatBayar()
        .then((response) => {
            setPesanan(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setPesanan([]);
        });
    }

    useEffect(() => {
        fetchPesanan();
    }, []);

    const batalPesanan = () => {
        for (let index = 0; index <= pesanan.length; index++) {
            console.log(pesanan[index].id_pesanan);
            UpdateStatusPesanan(pesanan[index].id_pesanan, "Dibatalkan")
            .then(() => {
                toast.success('Success', {
                    className: 'my-classname',
                    description: "Berhasil membatalkan pesanan",
                    duration: 5000,
                  });
                fetchPesanan();
            })
            .catch(() => {
            });
        }
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
          name: <span className="font-bold text-base">Status Pesanan</span>,
          selector: (row) => (
            <div>
                <span className="badge badge-error font-mono text-base">Telat Bayar</span>
            </div>
          )
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
        <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Pesanan Telat Bayar</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Pesanan Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
        {pesanan.length != 0 && (
            <div className="flex justify-end">
                <div className="flex items-center">
                <button className="btn btn-error" onClick={batalPesanan}>
                    Batalkan Pesanan
                </button>
                </div>
                <div className="space-x-1"></div>
            </div>
        )}
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
                  <span className="mt-2 text-lg font-mono">Tidak Ada Pesanan Yang Telat Bayar 🤩</span>
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

export default PesananTelatBayar;