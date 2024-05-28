import { useState, useEffect } from "react";
import { FaMoneyBills } from "react-icons/fa6";
import { toast } from "sonner";
import { InputJumlahBayar } from "../../../api/pesanan";

const ModalInputJumlahBayar = ({ onClose, value }) => {
  const [jumlahBayar, setJumlahBayar] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    setJumlahBayar(event.target.value);
  };

  const handleShow = () => {
    setShowModal(true);
    setJumlahBayar(0);
  };

  const handleOnClose = () => {
    setShowModal(false);
    setJumlahBayar(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    InputJumlahBayar(value, jumlahBayar)
      .then((response) => {
        toast.success("Succes", {
          className: "my-classname",
          description: response.message,
          duration: 5000,
        });
        handleOnClose();
        onClose();
      })
      .catch((err) => {
        toast.error("Failed", {
          className: "my-classname",
          description: err.message.jumlah_pembayaran,
          duration: 5000,
        });
      });
  };

  return (
    <>
      <div className="tooltip" data-tip="input jumlah pembayaran">
        <a className="text-[#00a26b] content-center cursor-pointer"
        onClick={handleShow}>
          <FaMoneyBills size={30} />
        </a>
      </div>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">
            Input Jumlah Pembayaran Customer
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label
                htmlFor="jumlahBayar"
                className="block text-sm font-medium text-gray-700"
              >
                Jumlah Yang Dibayar Customer
              </label>
              <input
                type="number"
                name="jumlahBayar"
                id="jumlahBayar"
                onChange={handleChange}
                className="input input-bordered mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md bg-white"
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={handleOnClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400 hover:bg-opacity-30 hover:text-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 hover:bg-opacity-30 hover:text-green-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalInputJumlahBayar;
