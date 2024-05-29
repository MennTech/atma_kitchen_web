import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { GetAllProduk } from "../api/produkApi";
import { getProdukPhoto } from "../api/index";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";

const produk = () => {
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
  useEffect(() => {
    fetchProduk();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div className="lg:p-24 sm:p-16 p-4 lg:mt-40 sm:mt-28 mt-40 lg:ml-16">
            <h1 className="poppins-bold lg:text-8xl sm:text-6xl text-5xl">
                Our Cake Collection
            </h1>
            <p className="w-[550px] lg:text-3xl mt-10 poppins-light">
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
                    <p>Rp.{produk.harga}</p>
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
export default produk;
