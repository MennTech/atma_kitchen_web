import { useState } from "react";

const ModalDetailPesanan = ({ value }) => {
  const [showModal, setShowModal] = useState(false);
  const [detailPesanan, setDetailPesanan] = useState([]);

  const handleShow = () => {
    setShowModal(true);
    setDetailPesanan(value);
  };

  const handleOnClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="btn btn-sm btn-outline hover:bg-[#DCD8D0] hover:text-[#253331] bg-[#8F5C54] text-white" onClick={handleShow}>
        Detail
      </button>
      {showModal && (
        <dialog className="modal bg-black bg-opacity-30" open={showModal}>
          <div className="bg-white w-1/3 p-5 rounded-lg">
            <h1 className="text-2xl font-semibold text-center">Detail Pesanan</h1>
            <div className="my-4">
            {detailPesanan.map((item, index) => (
                <div key={index}>
                  {item.produk ? (
                    <>
                      <h1 className="font-bold"><strong>Produk:</strong> {item.produk.nama_produk}</h1>
                      <h1 className="font-bold"><strong>Jumlah:</strong> {item.jumlah}</h1>
                      <h1 className="font-bold"><strong>Subtotal:</strong> {item.subtotal}</h1>
                    </>
                  ) : item.hampers ? (
                    <>
                      <h1 className="font-bold"><strong>Hampers:</strong> {item.hampers.nama_hampers}</h1>
                      <h1 className="font-bold"><strong>Jumlah:</strong> {item.jumlah}</h1>
                      <h1 className="font-bold"><strong>Subtotal:</strong> {item.subtotal}</h1>
                    </>
                  ) : (
                    <p>Detail tidak tersedia</p>
                  )}
                </div>
              ))}
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={handleOnClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400 hover:bg-opacity-30 hover:text-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ModalDetailPesanan;
