import { useState,React } from "react";
import BgCake from "../assets/bg.png";


const AboutUs = () => {
    return(
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:py-36 sm:py-20 py-10" id="about">
            <div className="px-10 grid sm:grid-cols-2 grid-cols-1 gap-x-9 lg:order-1 order-2">
                <div>
                    <div className="">
                        <h1 className="sm:text-4xl text-3xl sm:text-center text-start">About us</h1>
                        <p className="sm:text-center text-balance pt-2">Atma Kitchen adalah toko kue yang didedikasikan untuk membawa kebahagiaan melalui setiap gigitan. Kami percaya bahwa setiap kue memiliki cerita, dan di Atma Kitchen, kami berusaha untuk membuat setiap cerita itu istimewa.</p>
                    </div>
                </div>
                <div className="sm:pt-24 lg:pt-24 pt-8">
                    <div className="">
                        <h1 className="sm:text-4xl text-3xl sm:text-center text-start">Our story</h1>
                        <p className="sm:text-center text-balancer pt-2">Bermula dari dapur kecil di rumah, Atma Kitchen lahir dari cinta kami terhadap seni pembuatan kue dan keinginan untuk berbagi kebahagiaan dengan orang lain. Nama "Atma" diambil dari bahasa Sansekerta yang berarti "jiwa", mencerminkan komitmen kami untuk menaruh hati dan jiwa kami dalam setiap kue yang kami buat.</p>
                    </div>
                </div>
                <div >
                    <div className="sm:pt-0 lg:pt-0 pt-8">
                        <h1 className="sm:text-4xl text-3xl sm:text-center text-start">Our mission</h1>
                        <p className="sm:text-center text-balance pt-2">Misi kami adalah untuk menciptakan kue yang tidak hanya lezat tetapi juga indah dipandang. Kami menggunakan bahan-bahan berkualitas tinggi, resep tradisional yang diwariskan secara turun-temurun, dan sentuhan inovasi untuk menghasilkan kue yang menggugah selera dan menyentuh hati.</p>
                    </div>
                </div>
                <div className="sm:pt-24 lg:pt-24 pt-8">
                    <div className="">
                        <h1 className="sm:text-4xl text-3xl sm:text-center text-start">Our commitment</h1>
                        <p className="sm:text-center text-balance pt-2">Kami berkomitmen untuk selalu mengutamakan kepuasan pelanggan dengan menyediakan produk berkualitas tinggi dan layanan yang ramah. Setiap kue yang keluar dari Atma Kitchen dibuat dengan penuh cinta dan perhatian terhadap detail, memastikan bahwa Anda mendapatkan pengalaman terbaik.</p>  
                    </div>
                </div>
                <div >
                    <div className="sm:pt-0 lg:pt-0 pt-8">
                        <h1 className="sm:text-4xl text-3xl sm:text-center text-start">Visit us</h1>
                        <p className="sm:text-center text-balance pt-2">Kami mengundang Anda untuk mengunjungi toko kami dan merasakan sendiri kelezatan dan keindahan kue kami. Atma Kitchen adalah tempat di mana cita rasa bertemu dengan keahlian, dan setiap kue adalah cerminan dari dedikasi kami untuk menyajikan yang terbaik.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center lg:order-2 order-1 lg:m-0 sm:mb-12 mb-10">
                <div
                    className="lg:w-[450px] w-screen h-72 lg:h-[800px] lg:rounded-t-full lg:rounded-b-full overflow-hidden sm:mx-16 lg:mx-0 mx-10 rounded-r-xl rounded-l-xl sm:rounded-r-xl sm:rounded-l-xl"
                    style={{
                        backgroundImage: `url(${BgCake})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                    >
                </div>
            </div>
        </div>
    )
};
export default AboutUs;