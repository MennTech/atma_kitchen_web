import { useState,React } from "react";
import BgCake from "../assets/bg.png";


const AboutUs = () => {
    return(
        <div className="grid grid-cols-2 py-36" id="about">
            <div className="px-10 grid grid-cols-2 gap-x-9">
                <div>
                    <div className="">
                        <h1 className="text-4xl text-center">About us</h1>
                        <p className="text-center pt-2">Atma Kitchen adalah toko kue yang didedikasikan untuk membawa kebahagiaan melalui setiap gigitan. Kami percaya bahwa setiap kue memiliki cerita, dan di Atma Kitchen, kami berusaha untuk membuat setiap cerita itu istimewa.</p>
                    </div>
                </div>
                <div className="pt-24">
                    <div className="">
                        <h1 className="text-4xl text-center">Our story</h1>
                        <p className="text-center pt-2">Bermula dari dapur kecil di rumah, Atma Kitchen lahir dari cinta kami terhadap seni pembuatan kue dan keinginan untuk berbagi kebahagiaan dengan orang lain. Nama "Atma" diambil dari bahasa Sansekerta yang berarti "jiwa", mencerminkan komitmen kami untuk menaruh hati dan jiwa kami dalam setiap kue yang kami buat.</p>
                    </div>
                </div>
                <div >
                    <div className="">
                        <h1 className="text-4xl text-center">Our mission</h1>
                        <p className="text-center pt-2">Misi kami adalah untuk menciptakan kue yang tidak hanya lezat tetapi juga indah dipandang. Kami menggunakan bahan-bahan berkualitas tinggi, resep tradisional yang diwariskan secara turun-temurun, dan sentuhan inovasi untuk menghasilkan kue yang menggugah selera dan menyentuh hati.</p>
                    </div>
                </div>
                <div className="pt-24">
                    <div className="">
                        <h1 className="text-4xl text-center">Our commitment</h1>
                        <p className="text-center pt-2">Kami berkomitmen untuk selalu mengutamakan kepuasan pelanggan dengan menyediakan produk berkualitas tinggi dan layanan yang ramah. Setiap kue yang keluar dari Atma Kitchen dibuat dengan penuh cinta dan perhatian terhadap detail, memastikan bahwa Anda mendapatkan pengalaman terbaik.</p>  
                    </div>
                </div>
                <div >
                    <div className="">
                        <h1 className="text-4xl text-center">Visit us</h1>
                        <p className="text-center pt-2">Kami mengundang Anda untuk mengunjungi toko kami dan merasakan sendiri kelezatan dan keindahan kue kami. Atma Kitchen adalah tempat di mana cita rasa bertemu dengan keahlian, dan setiap kue adalah cerminan dari dedikasi kami untuk menyajikan yang terbaik.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div
                    className="w-[450px] sm:h-72 lg:h-[800px] rounded-t-full rounded-b-full overflow-hidden"
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