import { useEffect, useState } from "react";
import { CreateBahanBaku } from "../../api/BahanBaku";
import { EditBahanBaku } from "../../api/BahanBaku";
import { toast } from 'sonner';

const ModalCreateContent = ({ onClose, visible,value}) => {
  
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
    if(data.id_bahan_baku === undefined){
      event.preventDefault();
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
        setData({nama_bahan_baku: "",
        stok: "",
        satuan: ""});
        onClose();
      })
      .catch((err) => {
        toast.error('Failed', {
          className: 'my-classname',
          description: err.message,
          duration: 5000,
        });
      });
    }else{
      event.preventDefault();
      EditBahanBaku(data)
      .then((response) => {
        console.log(response.data);
        toast.success('Success', {
          className: 'my-classname',
          description: response.message,
          duration: 5000,
        });
        setData({nama_bahan_baku: "",
        stok: "",
        satuan: ""});
        onClose();
      })
      .catch((err) => {
        toast.error('Failed', {
          className: 'my-classname',
          description: err.message,
          duration: 5000,
        });
      });
    }
    
  };
  useEffect(() => {
    if(value.id_bahan_baku === undefined) return;
    setData({
      id_bahan_baku: value.id_bahan_baku ? value.id_bahan_baku : "",
      nama_bahan_baku: value.nama_bahan_baku ? value.nama_bahan_baku : "",
      stok: value.stok ? value.stok : "",
      satuan: value.satuan ? value.satuan : "",
    });
  }, [value]);
  return (
    <>
      <dialog className="modal  bg-black bg-opacity-30 backdrop-blur-sm" open={visible}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">
            {value.id_bahan_baku ? 'Edit Bahan Baku' : 'Tambah Bahan Baku'}
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
                <option value="" disabled selected>Pilih Satuan</option>
                <option value="gr">gram</option>
                <option value="buah">buah</option>
                <option value="ml">ml</option>
                <option value="butir">butir</option>
              </select>
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={onClose}
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
export default ModalCreateContent;
