// eslint-disable-next-line react/prop-types
const ConfirmDeleteModal = ({ entity, message, onYes, onClose, showModal}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onYes();
    }
    return (
        <>
            <dialog className="modal bg-black bg-opacity-30 w-screen" open={showModal}>
                <div className="bg-white p-5 rounded-lg">
                    <h1 className="text-2xl font-semibold text-center">Delete {entity}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3 className="p-5">{message}</h3>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-400 hover:bg-opacity-30 hover:text-red-500"
                            >
                                Tidak
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 hover:bg-opacity-30 hover:text-green-500"
                            >
                                Ya
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default ConfirmDeleteModal;