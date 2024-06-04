import { useState, useEffect } from "react";
import { CreatePengeluaranLain } from "../../../api/PengeluaranLain";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
const AddPengeluaranLain = () => {
  const navigate = useNavigate();
  const [pengeluaran, setPengeluaran] = useState([{nama_pengeluaran: "", tanggal: "", harga: ""}]);
  const handleClick = (event) => {
    event.preventDefault();
    setPengeluaran([
      ...pengeluaran,
      { nama_pengeluaran: "", tanggal: "", harga: "" },
    ]);
  };

  const handleChange = (i, event) => {
    const { name, value } = event.target;
    const values = [...pengeluaran];
    values[i][name] = value;
    setPengeluaran(values);
  };

  const handleDelete = (i) => {
    const values = [...pengeluaran];
    values.splice(i, 1);
    setPengeluaran(values);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Promise.all(pengeluaran.map(async (item) => {
        const data = {
          nama_pengeluaran: item.nama_pengeluaran,
          tanggal: item.tanggal,
          harga: item.harga
        };
        if (data.nama_pengeluaran === "" || data.tanggal === "" || data.harga === "" || data.harga === 0) {
          toast.error("Semua data harus diisi");
          return;
        }
        if (data.harga < 0) {
            toast.error("harga tidak boleh kurang dari 0");
            return;
        }
        await CreatePengeluaranLain(data);
      }));
      toast.success('Success', {
        className: 'my-classname',
        description: 'Data berhasil ditambahkan',
        duration: 5000,
      });
      navigate("/dashboard/pengeluaranLain");
      setPengeluaran([{ nama: "", jumlah: "", tanggal: new Date() }]);
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    }
  };
  useEffect(() => {
    setPengeluaran([{nama_pengeluaran: "", tanggal: "", harga: ""}]);
  }, []);
  return (
    <div className="w-screen p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#8F5C54] font-semibold">
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
                  <label htmlFor="nama_pengeluaran">Nama Pengeluaran</label>
                </div>
                <div>
                  <label htmlFor="tanggal">Tanggal</label>
                </div>
                <div>
                  <label htmlFor="harga">Harga</label>
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
                        disabled={i !== pengeluaran.length - 1 || pengeluaran.length === 1}
                        className="btn btn-error text-white mr-3"
                          onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                      
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary text-white mt-2"
                onClick={handleClick}
              >
                Tambah Field
              </button>
              <div className="divider m-1"></div>
              <div className="flex justify-end">
                <div className="flex items-center mr-2">
                  <button className="btn btn-error text-white" onClick={() => navigate("/dashboard/pengeluaranLain")}>Cancel</button>
                </div>
                <div className="space-x-1">
                  <button onClick={handleSubmit} className="btn btn-primary text-white">Save</button>
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