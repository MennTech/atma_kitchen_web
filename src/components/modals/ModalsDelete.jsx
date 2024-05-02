import { useEffect, useState } from "react";
import { DeleteBahanBaku } from "../../api/BahanBaku";
import { toast } from 'sonner';

const DeleteBahan = ({value,onClose}) => {
  const submitData = (event) => {
      event.preventDefault();
      DeleteBahanBaku(value.id_bahan_baku)
      .then((response) => { 
        console.log(response.data);
        toast.success('Success', {
          className: 'my-classname',
          description: response.message,
          duration: 5000,
        });
        handleOnClose();
      })
      .catch((err) => {
        toast.error('Failed', {
          className: 'my-classname',
          description: err.message,
          duration: 5000,
        });
        handleOnClose();
      });
  };
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleOnClose = () => {
    setShowModal(false);
    onClose();
  }
  return (
    <>
    <button className="btn btn-sm btn-outline bg-red-500 text-white" onClick={handleShow}>Delete</button>
      <dialog className="modal  bg-black bg-opacity-30 backdrop-blur-sm" open={showModal}>
        <div className="bg-white p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">Delete Bahan Baku</h1>
          <form onSubmit={submitData}>
            <div className="text-center">
              <h3 className="p-5">Apakah anda yakin ingin menghapus bahan baku ini?</h3>
              <button
                type="button"
                onClick={handleOnClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400 hover:bg-opacity-30 hover:text-red-500"
              >
                No
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 hover:bg-opacity-30 hover:text-green-500"
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
export default DeleteBahan;
