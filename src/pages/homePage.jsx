import React from "react";
import BgCake from "../assets/bg.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="text-[#DCD8D0] h-screen flex flex-col relative" id="home">
      <div className="absolute inset-0 z-0">
        <img
          src={BgCake}
          alt="Chocolate Cake"
          className="w-screen h-full object-cover"
        />
      </div>
      <div className="z-10 lg:p-28 sm:p-16 p-4 lg:mt-20 sm:mt-28 mt-40">
        <h2 className="lg:text-8xl sm:text-6xl text-5xl font-bold mb-4 ">Sweet chocolate</h2>
        <h3 className="lg:text-8xl sm:text-6xl text-5xl font-bold mb-10">low fat</h3>
        <p className="w-[300px] lg:text-lg mb-16">Chocolate cake layer with vanilla topped with thick chocolate and decorated with berries</p>
        <div>
          <button className="bg-[#DCD8D0] text-[#253331] hover:bg-[#253331] hover:text-[#DCD8D0] px-8 py-2 rounded-full mr-4" onClick={() => navigate("/login")}>Sign In</button>
          <button className="bg-[#DCD8D0] text-[#253331] hover:bg-[#253331] hover:text-[#DCD8D0] px-8 py-2 rounded-full" onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
