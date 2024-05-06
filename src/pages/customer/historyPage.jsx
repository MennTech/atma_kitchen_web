import { useState, useEffect } from "react";
import { GetHistory } from "../../api/userApi";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const fetchHistory = () => {
    GetHistory()
      .then((response) => {
        setHistory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatOrderNumber = (idPesanan, tanggal) => {
    const orderDate = new Date(tanggal);
    const year = orderDate.getFullYear().toString().slice(-2);
    const month = (orderDate.getMonth() + 1).toString().padStart(2, "0");
    return `${year}.${month}.${idPesanan}`;
  };

  function handleSearch(event) {
    const searchQuery = event.target.value.toLowerCase();
    if (searchQuery === "") {
      fetchHistory();
      return;
    } else {
      const filteredHistory = history.filter((order) => {
        return order.detail_pesanan.some((detail) => {
          if (detail.produk) {
            return detail.produk.nama_produk.toLowerCase().includes(searchQuery);
          } else if (detail.hampers) {
            return detail.hampers.nama_hampers.toLowerCase().includes(searchQuery);
          }
          return false;
        });
      });
  
      setHistory(filteredHistory);
    }
  }

  return (
    <div className="w-screen">
      <div className="mx-40 mt-6 mb-20">
        <div>
          <input
            type="text"
            placeholder="Cari Produk"
            className="input input-bordered bg-slate-100 w-full"
            onChange={handleSearch}
          />
        </div>
        <div>
          {history.map((item, index) => (
            <div key={index} className="card mt-2 bg-white">
              <div className="card-body pb-0">
                <div className="flex">
                  <p className="font-medium">
                    No Pesanan: {formatOrderNumber(item.id_pesanan, item.tanggal_pesan)}
                  </p>
                  <p className="font-medium contents">Status: {item.status}</p>
                </div>
                <div className="divider my-0"></div>
                <div>
                  {item.detail_pesanan.map((item, index) => (
                    <div key={index}>
                      {item.produk !== null ? (
                        <div className="flex space-x-2">
                          <img
                            src={item.produk.gambar_produk}
                            alt={item.produk.nama_produk}
                            className="w-32"
                          />
                          <div className="flex w-full justify-between">
                            <div className="space-y-2">
                              <p>{item.produk.nama_produk}</p>
                              <p>x{item.jumlah}</p>
                            </div>
                            <p className="text-end">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.produk.harga)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <img
                            src={item.hampers.gambar_hampers}
                            alt={item.hampers.nama_hampers}
                            className="w-32"
                          />
                          <div className="flex w-full justify-between">
                            <div className="space-y-2">
                              <p>{item.hampers.nama_hampers}</p>
                              <p>x{item.jumlah}</p>
                            </div>
                            <p className="text-end">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.produk.harga)}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="divider"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex ps-8 mb-2 space-x-2">
                <h1 className="text-2xl font-serif">Total Bayar: </h1>
                <p className="text-2xl content-center font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.jumlah_pembayaran)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
