import { useState, useEffect } from "react";
const AddPengeluaranLain = () => {
  const [pengeluaran, setPengeluaran] = useState([
    { nama_pengeluaran: "", tanggal: "", harga: "" },
  ]);

  const handleAdd = () => {
    setPengeluaran([
      ...pengeluaran,
      { nama_pengeluaran: "", tanggal: "", harga: "" },
    ]);
  };

  const handleChange = (i, event) => {
    const { name, value } = event.target;
    const updatedPengeluaran = [...pengeluaran];
    updatedPengeluaran[i] = { ...updatedPengeluaran[i], [name]: value };
    setPengeluaran(updatedPengeluaran);
  };

  const handleDelete = (i) => {
    const updatedPengeluaran = [...pengeluaran];
    updatedPengeluaran.splice(i, 1);
    setPengeluaran(updatedPengeluaran);
  };
  return (
    <div className="w-screen p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">
          Tambah Pengeluaran Lain
        </h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <form>
            <div className="mt-2">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label htmlFor="namaBahan">Bahan Baku</label>
                </div>
                <div>
                  <label htmlFor="jumlah">Jumlah</label>
                </div>
                <div>
                  <label htmlFor="jumlah">Jumlah</label>
                </div>
              </div>
              <div>
                {pengeluaran.map((val, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 mt-3">
                    <div className="form-control">
                      <input
                        type="text"
                        name="nama_pengeluaran"
                        id="nama_pengeluaran"
                        className="input input-bordered bg-white"
                        onChange={(event) => handleChange(i, event)}
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="date"
                        name="tanggal"
                        id="tanggal"
                        className="input input-bordered bg-white"
                        onChange={(event) => handleChange(i, event)}
                      />
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
                        name="harga"
                        id="harga"
                        className="input input-bordered bg-white"
                        onChange={(event) => handleChange(i, event)}
                      />
                    </div>
                    <div>
                      <button
                        disabled={pengeluaran.length === 1}
                        className="btn btn-error text-white mr-3"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary text-white"
                        onClick={handleAdd}
                      >
                        Tambah Field
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="divider m-1"></div>
              <div className="flex justify-end">
                <div className="flex items-center mr-2">
                  <button className="btn btn-error text-white">Cancel</button>
                </div>
                <div className="space-x-1">
                  <button className="btn btn-primary text-white">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddPengeluaranLain;
