import { useState } from "react";
import { FaBitcoin } from "react-icons/fa6";
import { getBuktiBayarPhoto } from "../../../api/index.jsx";

const ModalBuktiBayar = ({ value }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="tooltip" data-tip="Bukti Bayar">
        <a
          className="text-[#4068be] content-center cursor-pointer"
          onClick={handleShow}
        >
          <FaBitcoin size={30} />
        </a>
      </div>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">Bukti Bayar</h1>
          <div className="my-4">
            <img src={getBuktiBayarPhoto(value)} alt={value} />
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={handleOnClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400 hover:bg-opacity-30 hover:text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalBuktiBayar;
