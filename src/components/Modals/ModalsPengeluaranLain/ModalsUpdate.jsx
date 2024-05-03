import { useState } from "react";
import { EditPengeluaranLain } from "../../../api/PengeluaranLain";
import { toast } from 'sonner';

const ModalEdit = ({ onClose,value}) => {
  const [data, setData] = useState([])
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const [showModal, setShowModal] = useState(false);
  const handleShow = ()=>{
    setShowModal(true);
    setData(value);
  }
  const handleOnClose = () => {
    setShowModal(false);
    setData({nama_pengeluaran:"",
    tanggal: "",
    harga: ""});
  }
  const submitData = (event) => {
      event.preventDefault();
      EditPengeluaranLain(data)
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
          description: err.message,
          duration: 5000,
        });
      });
  };
  
  return (
    <>
    <button className="btn btn-sm btn-outline bg-[#d08854] text-white" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
    </button>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">
            Edit Pengeluaran lain
          </h1>
          <form onSubmit={submitData}>
            <div className="mb-4">
              <label htmlFor="nama_pengeluaran" className="block text-sm font-medium text-gray-700">
                Nama Pengeluaran Lain
              </label>
              <input
                type="text"
                name="nama_pengeluaran"
                id="nama_pengeluaran"
                value={data?.nama_pengeluaran}
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
                value={data?.tanggal}
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
                value={data?.harga}
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
export default ModalEdit;
