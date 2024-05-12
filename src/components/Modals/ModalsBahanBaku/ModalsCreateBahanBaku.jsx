import { useEffect, useState } from "react";
import { CreateBahanBaku } from "../../../api/BahanBaku";
import { toast } from 'sonner';

const ModalCreateBahanBaku = ({ onClose}) => {
  const [data, setData] = useState({
    id_bahan_baku: "",
    nama_bahan_baku:"",
    stok: "",
    satuan: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitData = (event) => {
      event.preventDefault();
      if (data.nama_bahan_baku === "" || data.stok === "" || data.satuan === "") {
        toast.error("Semua data harus diisi");
        return;
      }

      if (data.stok <= 0) {
          toast.error("Stok tidak boleh kurang dari sama dengan 0");
          return;
      }
      const formData = new FormData();
      formData.append("nama_bahan_baku", data.nama_bahan_baku);
      formData.append("stok", data.stok);
      formData.append("satuan", data.satuan);
      CreateBahanBaku(formData)
      .then((response) => { 
        console.log(response.data);
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
          description: 'Gagal menambahkan data bahan baku',
          duration: 5000,
        });
      });
  };
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleOnClose = () => {
    setShowModal(false);
    setData({nama_bahan_baku: "",
        stok: "",
        satuan: ""});
  }
  return (
    <>
    <button className='btn btn-outline bg-[#d08854] text-white' onClick={handleShow}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      Tambah Bahan Baku
    </button>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">
            Tambah Bahan Baku
          </h1>
          <form onSubmit={submitData}>
            <div className="mb-4">
              <label htmlFor="nama_bahan_baku" className="block text-sm font-medium text-gray-700">
                Nama Bahan Baku
              </label>
              <input
                type="text"
                name="nama_bahan_baku"
                id="nama_bahan_baku"
                value={data.nama_bahan_baku}
                onChange={handleChange}
                className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white"
              />
            </div>
            <div className="mb-4 ">
              <label htmlFor="stok" className="block text-sm font-medium text-gray-700 ">
                Stok
              </label>
              <input
                type="number"
                name="stok"
                id="stok"
                value={data.stok}
                onChange={handleChange}
                className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white"
              />
            </div>
            <div className="mb-4 ">
              <label htmlFor="satuan" className="block text-sm font-medium text-gray-700 ">
                Satuan
              </label>
              <select
                type="text"
                name="satuan"
                id="satuan"
                value={data.satuan}
                onChange={handleChange}
                className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white"
              >
                <option value="" disabled>Pilih Satuan</option>
                <option value="gr">gram</option>
                <option value="buah">buah</option>
                <option value="ml">ml</option>
                <option value="butir">butir</option>
              </select>
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
export default ModalCreateBahanBaku;
