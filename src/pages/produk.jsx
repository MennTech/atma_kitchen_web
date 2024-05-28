import { useState,useEffect } from "react";
import { GetAllProduk } from "../api/produkApi";
import { getProdukPhoto } from "../api/index";
const Produk = () => {
  const [produks, setProduks] = useState([]);
  const fetchProduk = async () => {
      GetAllProduk()
      .then((response) => {
          console.log(response);
          setProduks(response);
      })
      .catch((error) => {
          console.log(error);
      });
  }
  useEffect(() => {
      fetchProduk();
  }, []);
  return (
    <div className="w-screen bg-[#DCD8D0] lg:py-36 lg:px-[450px] sm:py-20 sm:px-40 py-10 px-10" id="produk">
      <div className="flex justify-center">
        <h1 className="lg:text-7xl sm:text-4xl text-3xl">Cake Collection</h1>
      </div>
      <div className="grid lg:grid-cols-4 lg:gap-14 sm:grid-cols-3 sm:gap-10 grid-cols-2 mt-10 gap-10">
        {produks.map((produk, index) => (
          <div>
            <div
              key={index}
              className="sm:h-72 h-60 rounded-t-full rounded-b-full overflow-hidden"
              style={{
                backgroundImage: `url(${getProdukPhoto(produk.gambar_produk)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* <img className="" src={getProdukPhoto(produk.gambar_produk)} alt={produk.nama_produk} /> */}
            </div>
            <div className="mt-4">
                <h1 className="sm:text-xl text-lg flex justify-center text-[#253331]">{produk.nama_produk}</h1>
                <h2 className="sm:text-lg text-base flex justify-center text-[#253331]">Rp.{produk.harga}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Produk;
