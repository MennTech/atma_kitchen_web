import {useState} from "react";
import { Pembayaran } from "../../../api/userApi";
import { Toaster } from 'sonner';
import { toast } from 'sonner';


const BuktiPembayaran = ({ onClose, value }) => {
    const [data, setData] = useState({
        bukti_pembayaran: null,
        id_pesanan: value
    });
    
    const [showModal, setShowModal] = useState(false);
    const handleFileChange = (event) => {
        const newData = { ...data, bukti_pembayaran: event.target.files[0] };
        setData(newData);
    }
    const handleShow = () => {
        setShowModal(true)
        console.log(data.id_pesanan);
    };
    const handleOnClose = () => {
        setShowModal(false);
        setData({bukti_pembayaran: null});
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(data.bukti_pembayaran === null) {
            toast.error("Silahkan Upload Bukti Pembayaran");
            return;
        }

        if(data.bukti_pembayaran.size > 2000000) {
            toast.error("Ukuran gambar terlalu besar, maksimal 2MB");
            return;
        }

        if(data.bukti_pembayaran.type !== "image/jpeg" && data.bukti_pembayaran.type !== "image/png" && data.bukti_pembayaran.type !== "image/jpg" && data.bukti_pembayaran.type !== "image/webp") {
            toast.error("Format gambar tidak didukung");
            return;
        }

        const formData = new FormData();
        formData.append("bukti_pembayaran", data.bukti_pembayaran);
        formData.append("id_pesanan", data.id_pesanan);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        Pembayaran(formData).then((response) => { 
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
    }
    
  return (
    <>
    <button className="btn btn-primary m-3" onClick={handleShow}>Bayar</button>
    <Toaster richColors position="top-center"/>
    <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
      <div className="bg-white w-1/3 p-5 rounded-lg">
        <h1 className="text-2xl font-semibold text-center">
          Upload Bukti Pembayaran
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div>
              <label htmlFor="gambar_preview">Preview Gambar Produk :</label>
            </div>
          </div>
          <div className="grid grid-rows-1 gap-4 mt-2">
            <div>
              <div className="flex justify-center items-center min-h-[200px] w-full">
                {data.bukti_pembayaran === null && (
                  <div className="text-center">
                    <p>Belum ada Gambar</p>
                  </div>
                )}
                {data.bukti_pembayaran !== null && (
                  <img
                    src={URL.createObjectURL(data.bukti_pembayaran)}
                    alt="gambar_preview"
                    className="rounded-md shadow w-1/4 h-1/4 max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/webp"
                max={1}
                id="gambar"
                name="bukti_pembayaran"
                className="file-input file-input-bordered file:border-0 file:border-r file:border-slate-100 file:bg-white w-full h-full bg-white btn-danger"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="text-right mt-2">
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
export default BuktiPembayaran;
