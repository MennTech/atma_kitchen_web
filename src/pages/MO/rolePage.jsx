const RolePage = () => {
    return (
        <div className="w-screen min-h-screen p-4 overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">Data Jabatan</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Jabatan Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-2">
        <div className="card-body h-full p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Karyawan"
                className="input bg-slate-100"
                onChange={handleSearch}
              />
            </div>
            <div className="space-x-1">
              <button className="btn btn-outline bg-[#d08854] text-white" onClick={() => navigate('/dashboard/tambah-karyawan')}>
                Tambah Jabatan
              </button>
            </div>
          </div>
          <div className="divider m-1"></div>
          <div className="mt-2">
            {isLoading && (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="mt-2">Memuat Data...</span>
              </div>
            )}
            {!isLoading && (
              <DataTable
                columns={columns}
                data={records}
                pagination
                highlightOnHover
                paginationComponentOptions={paginationOptions}
                responsive
              />
            )}
          </div>
        </div>
      </div>
      <dialog className="modal" open={showModal}>
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Delete Karyawan</h3>
          <p className="py-4">Yakin Ingin Menghapus Karyawan</p>
          <div className="modal-action">
            <form onSubmit={deleteKaryawan}>
              <div className="space-x-1">
                <button className="btn btn-error text-white" onClick={handleCloseModal}>Cancel</button>
                <button
                  className="btn btn-primary text-white"
                  type="submit"
                  onClick={handleCloseModal}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
    );
}

export default RolePage;