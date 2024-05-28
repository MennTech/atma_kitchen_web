import HomeCaruosel from "../../components/Carousel";
import ProdukSection from "../../components/Sections/ProdukSection";
import HampersSection from "../../components/Sections/HampersSection";
import PenitipSection from "../../components/Sections/PenitipSection";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";


const HomeCustomer = () => {
    const slides = [
        "/event/promo1.png",
        "/event/promo2.png",
        "/event/promo3.png",
    ]

    const nextTwoDate = new Date();
    nextTwoDate.setDate(nextTwoDate.getDate() + 2);
    const formattedDate = new Date(nextTwoDate.getTime() - (nextTwoDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    const { handleClickPO, handleClickLangsung} = useOutletContext();
    const [date, setDate] = useState("");

    useEffect(() => {
        setDate(formattedDate);
    }, [formattedDate]);


    const handleDateChange = (e) => {
        if(e.target.value < formattedDate){
            setDate(formattedDate);
            return;
        }
        setDate(e.target.value);
    }

    return (
        <div className="flex flex-col gap-y-8 w-screen py-8 px-64 max-lg:px-16 max-md:px-16 max-sm:px-16 overflow-x-hidden">
            <div className="flex justify-center w-full drop-shadow-md">
                <div className="max-w-full">
                    <HomeCaruosel>
                        {slides.map((s, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <img
                                key={index}
                                src={s}
                                className="min-w-full aspect-[16/6] max-xl:aspect-[16/6] max-lg:aspect-[16/6] max-sm:aspect-[16/6]"
                            />
                        ))}
                    </HomeCaruosel>
                    <p className="italic text-sm opacity-40">
                        *Syarat dan ketentuan berlaku
                    </p>
                </div>
            </div>
            {/* date picker input with label to check stock PO */}
            <div className="flex flex-col justify-start mt-8">
                <div className="flex flex-row w-full items-center gap-x-4">
                    <label htmlFor="date" className="text-lg font-bold">Cek Ketersediaan PO</label>
                    <input
                        type="date"
                        min={formattedDate}
                        value={date}
                        onChange={handleDateChange}
                        id="date"
                        className="max-w-lg input input-bordered border p-2 bg-white rounded-lg"
                    />
                </div>
                <p className="italic text-sm opacity-50">
                    *Cek ketersediaan PO hanya untuk Produk Atma Kitchen dan Hampers
                </p>
                {/* Taruh di cart */}
                {/* <p className="italic text-sm opacity-60 mt-2">
                    *Pembelian PO dapat dilakukan maksimal 2 hari sebelum tanggal yang dipilih
                </p>
                <p className="italic text-sm opacity-60">
                    *Pembelian PO dan pembelian langsung tidak dapat dilakukan secara bersamaan
                </p> */}
            </div>
            <ProdukSection date={date} handleClickPO={handleClickPO} handleClickLangsung={handleClickLangsung} />
            <HampersSection date={date} handleClickPO={handleClickPO} handleClickLangsung={handleClickLangsung} />
            <PenitipSection handleClickLangsung={handleClickLangsung} />
            {
                status.status === "success" && (
                    <Toaster
                        message={status.message}
                        toastOptions={{
                            style: {
                                backgroundColor: "#00FF00",
                                border: "none",
                                color: "#FFFFFF"
                            }
                        }}
                    />
                )
            }
            {
                status.status === "error" && (
                    <Toaster
                        message={status.message}
                        toastOptions={{
                            style: {
                                backgroundColor: "#FF0000",
                                border: "none",
                                color: "#FFFFFF"
                            }
                        }}
                    />
                )
            }
        </div>
    );
};

export default HomeCustomer;