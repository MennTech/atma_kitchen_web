import { useState } from "react";
import { HapusResep } from "../../../api/resepApi";
import { toast } from 'sonner';

const ModalDelete = ({value,onClose}) => {

  const submitData = (event) => {
    console.log(value.id_resep);
      event.preventDefault();
      HapusResep(value.id_resep)
      .then((response) => { 
        console.log(response.status);
        if(response.status){
            toast.success('Success', {
              className: 'my-classname',
              description: response.message,
              duration: 5000,
            });
            handleOnClose();
            onClose();
        } else {
          toast.error('Failed', {
            className: 'my-classname',
            description: "Resep Ini masih digunakan oleh produk!",
            duration: 5000,
          });
          handleOnClose();
        }
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
  }
  return (
    <>
    <button className="btn btn-sm btn-outline bg-red-500 text-white" onClick={handleShow}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </button>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">Delete Resep</h1>
          <form onSubmit={submitData}>
            <div className="text-center">
              <h3 className="p-5">Apakah anda yakin ingin menghapus resep ini?</h3>
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
export default ModalDelete;
