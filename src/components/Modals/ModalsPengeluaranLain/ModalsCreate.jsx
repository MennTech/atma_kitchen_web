import { useState } from "react";
import { CreatePengeluaranLain } from "../../../api/PengeluaranLain";
import { toast } from 'sonner';

const ModalCreate = ({onClose}) => {
  const [data, setData] = useState({
    id_pengeluaran_lain: "",
    nama_pengeluaran:"",
    tanggal: "",
    harga: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitData = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("nama_pengeluaran", data.nama_pengeluaran);
      formData.append("tanggal", data.tanggal);
      formData.append("harga", data.harga);
      CreatePengeluaranLain(formData)
      .then((response) => { 
        toast.success('Success', {
          className: 'my-classname',
          description: response.message,
          duration: 5000,
        });
        handleOnClose();
        onClose();
      })
      .catch((err) => {
        toast.error('Failed', {
          className: 'my-classname',
          description: 'Semua Field Harus Diisi',
          duration: 5000,
        });
      });
  };
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleOnClose = () => {
    setShowModal(false);
    setData({nama_pengeluaran:"",
    tanggal: "",
    harga: "",});
  }
  return (
    <>
    <button className='btn btn-outline bg-[#d08854] text-white' onClick={handleShow}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      Tambah Pengeluaran lain
    </button>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">
            Tambah Pengeluaran lain
          </h1>
          <form onSubmit={submitData}>
            <div className="mb-4">
              <label htmlFor="nama_pengeluaran" className="block text-sm font-medium text-gray-700">
                Nama Pengeluaran lain
              </label>
              <input
                type="text"
                name="nama_pengeluaran"
                id="nama_pengeluaran"
                value={data.nama_pengeluaran}
                onChange={handleChange}
                className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white"
              />
            </div>
            <div className="mb-4 ">
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 ">
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                id="tanggal"
                value={data.tanggal}
                onChange={handleChange}
                className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white"
              />
            </div>
            <div className="mb-4 ">
              <label htmlFor="harga" className="block text-sm font-medium text-gray-700 ">
                Harga
              </label>
              <input
                type="number"
                name="harga"
                id="harga"
                value={data.harga}
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
