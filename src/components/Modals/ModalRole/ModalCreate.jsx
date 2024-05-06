import { useState } from "react";
import { AddRole } from "../../../api/roleApi";
import { toast } from "sonner";

const ModalCreate = ({ onClose }) => {
  const [jabatan, setJabatan] = useState("");

  const handleChange = (event) => {
    setJabatan(event.target.value);
    console.log(event.target.value);
  };

  const submitData = (event) => {
    event.preventDefault();
    AddRole(jabatan)
      .then((response) => {
        toast.success("Success", {
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
          description: "Semua Field Harus Diisi",
          duration: 5000,
        });
      });
  };

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  const handleOnClose = () => {
    setShowModal(false);
    setJabatan("");
  };

  return (
    <>
      <button
        className="btn btn-outline bg-[#d08854] text-white"
        onClick={handleShow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Tambah Jabatan
      </button>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">Tambah Jabatan</h1>
          <form onSubmit={submitData}>
            <div className="mb-4">
              <label
                htmlFor="jabatan"
                className="block text-sm font-medium text-gray-700"
              >
                Jabatan
              </label>
              <input
                type="text"
                name="jabatan"
                id="jabatan"
                value={jabatan}
                onChange={handleChange}
                className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white"
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

export default ModalCreate;
