import HomeCaruosel from "../../components/Carousel";
import ProdukSection from "../../components/Sections/ProdukSection";
import HampersSection from "../../components/Sections/HampersSection";
import PenitipSection from "../../components/Sections/PenitipSection";

const HomeCustomer = () => {
    const slides = [
        "/event/promo1.png",
        "/event/promo2.png",
        "/event/promo3.png",
    ]

    return (
        <div className="flex flex-col gap-y-8 w-screen py-8 px-36 max-lg:px-16 max-md:px-16 max-sm:px-16 overflow-x-hidden">
            <div className="flex justify-center w-full drop-shadow-md">
                <div className="max-w-full">
                    <HomeCaruosel autoSlideInterval={3000}>
                        {slides.map((s, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <img
                                key={index}
                                src={s}
                                className="min-w-full aspect-[16/6] max-xl:aspect-[16/6] max-lg:aspect-[16/6] max-sm:aspect-[16/6]"
                            />
                        ))}
                    </HomeCaruosel>
                </div>
            </div>
            <ProdukSection />
            <HampersSection />
            <PenitipSection />
        </div>
    );
};

export default HomeCustomer;