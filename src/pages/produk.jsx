import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { GetAllProduk } from "../api/produkApi";
import { getProdukPhoto } from "../api/index";
import BgCake from "../assets/bg-2.png";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
const Produk = () => {
  const navigate = useNavigate();
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
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const CurrencyFormatter = ({ amount }) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits:0,
    });
  
    return <span>{formatter.format(amount)}</span>;
  };
  useEffect(() => {
    fetchProduk();
  }, []);
  return (
    <div id="produk" className="relative">
      <div className="absolute inset-0 z-0">
        <img
          src={BgCake}
          alt="Chocolate Cake"
          className="w-screen h-full object-cover"
        />
      </div>
      <div className="relative grid grid-cols-2 h-screen">
        <div className="lg:p-24 sm:p-16 p-4 lg:mt-3 sm:mt-28 mt-40 lg:ml-24">
            <h1 className="poppins-bold lg:text-8xl sm:text-6xl text-5xl">
                Our Cake Collection
            </h1>
            <p className="w-[550px] lg:text-3xl mt-24 poppins-light">
            Our cakes are the perfect blend of delicious taste and the best quality ingredients. Made with a traditional recipe that is rich in flavor, every bite brings unforgettable deliciousness.
            </p>
        </div>
        <div className="flex items-center p-5">
          <Swiper
            slidesPerView={3}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            modules={[Pagination, Navigation, EffectCoverflow]}
          >
            {produks.map((produk, index) => (
              <SwiperSlide className="swiper_container">
                <div className="card w-96 bg-white " key={index}>
                  <figure>
                      <img className=" w-full object-cover h-60" src={getProdukPhoto(produk.gambar_produk)} alt={produk.nama_produk} />
                  </figure>
                  <div className="card-body h-60">
                    <h2 className="card-title">{produk.nama_produk}</h2>
                    <p>{truncateText(produk.deskripsi_produk, 100)}</p>
                    {/* <p>Rp.{produk.harga}</p> */}
                    <CurrencyFormatter amount={produk.harga}/>
                    <div className="card-actions justify-end">
                      <button
                        className="btn bg-[#8F5C54] text-[#DCD8D0] hover:bg-[#DCD8D0] hover:text-[#253331]"
                        onClick={() => navigate("/login")}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="slider-controller mt-10">
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default Produk;
