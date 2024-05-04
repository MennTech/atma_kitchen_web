import { useState, useEffect } from "react";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import { TambahResep } from "../../../api/resepApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const AddResepPage = () => {
  const navigate = useNavigate();
  const [dataBahanBaku, setDataBahanBaku] = useState([]);
  const [namaResep, setNamaResep] = useState("");
  const [detailResep, setDetailResep] = useState([
    { id_bahan_baku: "", jumlah_bahan: 0 },
  ]);
  const [errors, setErrors] = useState({});

  const fecthDataBahanBaku = () => {
    GetAllBahanBaku()
      .then((response) => {
        setDataBahanBaku(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fecthDataBahanBaku();
  }, []);

  const handleNamaResep = (event) => {
    setNamaResep(event.target.value);
  };

  const addResep = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!namaResep.trim()) {
      validationErrors.nama_resep = "Nama Resep harus diisi";
      toast.error("Nama Resep harus diisi");
    }

    // Set untuk menyimpan id_bahan_baku unik
    const idBahanBakuSet = new Set();

    detailResep.forEach((item, index) => {
      if (!item.id_bahan_baku) {
        validationErrors[`detail_resep[${index}].id_bahan_baku`] =
          "Bahan Baku harus dipilih";
        toast.error(`Bahan Baku pada baris ${index + 1} harus dipilih`);
      } else if (idBahanBakuSet.has(item.id_bahan_baku)) {
        validationErrors[`detail_resep[${index}].id_bahan_baku`] =
          "Bahan Baku tidak boleh sama";
        toast.error(`Bahan Baku pada baris ${index + 1} tidak boleh sama`);
      } else {
        idBahanBakuSet.add(item.id_bahan_baku);
      }
      if (item.jumlah_bahan <= 0) {
        validationErrors[`detail_resep[${index}].jumlah_bahan`] =
          "Jumlah Bahan harus lebih dari 0";
        toast.error(`Jumlah Bahan pada baris ${index + 1} harus lebih dari 0`);
      }
    });

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        nama_resep: namaResep,
        detail_resep: detailResep,
      };
      TambahResep(data)
        .then((response) => {
          toast.success("Resep berhasil ditambahkan");
          navigate("/dashboard/resep");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    setDetailResep([...detailResep, { id_bahan_baku: "", jumlah_bahan: 0 }]);
  };

  const handleChange = (i, event) => {
    const values = [...detailResep];
    values[i][event.target.name] = event.target.value;
    setDetailResep(values);
  };

  const handleDelete = (i, id, event) => {
    event.preventDefault();
    // const values = detailResep.filter((item, index) => index !== i || item.id_bahan_baku !== id);
    const values = [...detailResep];
    values.splice(i, 1);
    setDetailResep(values);
  };

  return (
    <div className="w-screen p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">Tambah Resep</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Resep Atma Kitchen</p>
      </div>

      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <form onSubmit={addResep}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <button
                  className="btn btn-error text-white"
                  onClick={() => navigate("/dashboard/resep")}
                >
                  Cancel
                </button>
              </div>
              <div className="space-x-1">
                <button
                  className="btn btn-primary text-white"
                  onClick={handleClick}
                >
                  Tambah Field
                </button>
              </div>
            </div>
            <div className="divider m-1"></div>
            <div className="mt-2">
              <div className="form-control">
                <label htmlFor="namaResep">Nama Resep</label>
                <div className="grid grid-cols-2">
                  <div>
                    <input
                      type="text"
                      id="namaResep"
                      name="nama_resep"
                      className="input input-bordered bg-white"
                      onChange={handleNamaResep}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <label htmlFor="namaBahan">Bahan Baku</label>
                </div>
                <div>
                  <label htmlFor="jumlah">Jumlah</label>
                </div>
              </div>
              <div>
                {detailResep.map((val, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 mt-3">
                    <div className="form-control">
                      <select
                        name="id_bahan_baku"
                        id="namaBahan"
                        className="select select-bordered bg-white"
                        defaultValue="Pilih Bahan Baku"
                        onChange={(event) => handleChange(i, event)
                        }
                      >
                        <option disabled>Pilih Bahan Baku</option>
                        {dataBahanBaku.map((bahan) => (
                          <option
                            key={bahan.id_bahan_baku}
                            value={bahan.id_bahan_baku}
                          >
                            {bahan.nama_bahan_baku}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <input
                        type="number"
                        name="jumlah_bahan"
                        id="jumlah"
                        className="input input-bordered bg-white"
                        onChange={(event) => handleChange(i, event)}
                      />
                    </div>
                    <div>
                      <button
                        disabled={detailResep.length === 1}
                        className="btn btn-error text-white"
                        onClick={(event) => {handleDelete(i, val.id_bahan_baku ,event)
                          console.log(val.id_bahan_baku)
                          console.log(i)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-success text-white" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResepPage;
