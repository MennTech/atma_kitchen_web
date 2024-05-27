import { useState } from "react";
import { toast } from "sonner";
import { MdEditLocationAlt } from "react-icons/md";
import { InputJarak } from "../../../api/pesanan";

const ModalInputJarak = ({ onClose, value }) => {
  const [jarak, setJarak] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    setJarak(event.target.value);
  };

  const handleShow = () => {
    setShowModal(true);
    setJarak(0);
  };

  const handleOnClose = () => {
    setShowModal(false);
    setJarak(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    InputJarak(value, jarak)
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
          description: err.message,
          duration: 5000,
        });
      });
  };

  return (
    <>
      <div className="tooltip" data-tip="input jarak">
        <a
          className="text-[#ff8e28] content-center cursor-pointer"
          onClick={handleShow}
        >
          <MdEditLocationAlt size={30} />
        </a>
      </div>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">
            Input Jarak Pesanan
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label
                htmlFor="jarak"
                className="block text-sm font-medium text-gray-700"
              >
                Jarak
              </label>
              <input
                type="number"
                name="jarak"
                id="jarak"
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
                disabled={jarak <= 0}
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

export default ModalInputJarak;
