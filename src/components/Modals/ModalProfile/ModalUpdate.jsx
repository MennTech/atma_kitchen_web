import { useState } from "react";
import { UpdateProfile } from "../../../api/userApi";
import { toast } from 'sonner';

const ModalEdit = ({ onClose,value, props}) => {
  const [data, setData] = useState({
        nama_customer: "",
        no_telp: ""
    });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    setData({...data,[event.target.name]: event.target.value,});
  };
  
  const handleShow = ()=>{
    setShowModal(true);
    setData(value);
  }

  const handleOnClose = () => {
    setShowModal(false);
    setData(value);
  }

  const submitData = (event) => {
      event.preventDefault();
      UpdateProfile(data)
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
    <button className="text-blue-500 underline" onClick={handleShow}>
        Ubah
    </button>
      <dialog className="modal  bg-black bg-opacity-30" open={showModal}>
        <div className="bg-white w-1/3 p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-center">
            {`Edit ${props.title}`}
          </h1>
          <form onSubmit={submitData}>
            <div className="mb-4">
              <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
                {props.title}
              </label>
              <input
                type="text"
                name={props.name}
                id={props.name}
                value={data[props.name]}
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
