import { useState,useEffect } from "react";
import { GetAllProduk } from "../api/produkApi";
import BgCake from "../assets/bg.png";
const Produk = () => {
  // const [produks, setProduks] = useState([]);
  const produks = [
    {
      id: 1,
      nama: "Red Velvet",
      harga: 100000,
      deskripsi: "Red Velvet Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 1,
      nama: "Red Velvet",
      harga: 100000,
      deskripsi: "Red Velvet Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 1,
      nama: "Red Velvet",
      harga: 100000,
      deskripsi: "Red Velvet Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 1,
      nama: "Red Velvet",
      harga: 100000,
      deskripsi: "Red Velvet Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 1,
      nama: "Red Velvet",
      harga: 100000,
      deskripsi: "Red Velvet Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 2,
      nama: "Chocolate Cake",
      harga: 150000,
      deskripsi: "Chocolate Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 3,
      nama: "Cheese Cake",
      harga: 200000,
      deskripsi: "Cheese Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    },
    {
      id: 1,
      nama: "Red Velvet",
      harga: 100000,
      deskripsi: "Red Velvet Cake",
      stok: 10,
      gambar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    }
  ];
  // const fetchProduk = async () => {
  //     try {
  //         const response = await GetAllProduk();
  //         if(response.success){
  //             setProduks(response.produks);
  //         }else{
  //             console.log(response);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }
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
                backgroundImage: `url(${BgCake})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
            </div>
            <div className="mt-4">
                <h1 className="sm:text-xl text-lg flex justify-center text-[#253331]">{produk.nama}</h1>
                <h2 className="sm:text-lg text-base flex justify-center text-[#253331]">Rp.{produk.harga}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Produk;
