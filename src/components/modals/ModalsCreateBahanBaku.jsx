import { useState } from "react";
import { CreateBahanBaku } from "../../api/BahanBaku";
const ModalCreateContent = ({ onClose, visible }) => {
  const [data, setData] = useState({
    nama_bahan_baku: "",
    stok: "",
    satuan: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const submitData = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nama_bahan_baku", data.nama_bahan_baku);
    formData.append("stok", data.stok);
    formData.append("satuan", data.satuan);
    CreateBahanBaku(formData)
      .then((response) => {
        console.log("berhasil");
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!visible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">Tambah Bahan Baku</h1>
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
                type="text"
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
              <input
                type="text"
                name="satuan"
                id="satuan"
                value={data.satuan}
                onChange={handleChange}
                className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white"
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-white hover:text-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-green-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ModalCreateContent;
