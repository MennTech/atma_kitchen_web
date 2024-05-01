import { useState, useEffect } from "react";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import { TambahResep } from "../../../api/resepApi";
import { useNavigate } from "react-router-dom";
const AddResepPage = () => {
  const navigate = useNavigate();
  const [dataBahanBaku, setDataBahanBaku] = useState([]);
  const [namaResep, setNamaResep] = useState("");
  const [detailResep, setDetailResep] = useState([
    {
      id_bahan_baku: "",
      jumlah_bahan: 0,
    },
  ]);

  const fecthDataBahanBaku = () => {
    GetAllBahanBaku()
      .then((response) => {
        setDataBahanBaku(response);
        console.log(response);
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

  const addResep = () => {
    const data = {
      nama_resep: namaResep,
      detail_resep: detailResep,
    };
    TambahResep(data)
      .then((response) => {
        navigate("/resep"); 
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleDelete = (i, event) => {
    event.preventDefault();
    const values = [...detailResep];
    values.splice(i, 1);
    setDetailResep(values);
  };

  return (
    <div className="w-screen">
      <div className="flex justify-between mt-5 ms-3 me-3">
        <h1 className="text-3xl text-[#d08854] font-semibold">Tambah Resep</h1>
      </div>
      <div className="mt-5 mx-3">
        <form onSubmit={addResep}>
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
              <div>
                <button
                  className="btn btn-primary text-white"
                  onClick={handleClick}
                >
                  Tambah Field
                </button>
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
                <div className="grid grid-cols-5 gap-4 mt-3">
                  <div className="form-control">
                    <select
                      name="id_bahan_baku"
                      id="namaBahan"
                      className="select select-bordered bg-white"
                      onChange={(event) => handleChange(i, event)}
                    >
                      <option disabled selected>
                        Pilih Bahan Baku
                      </option>
                      {dataBahanBaku.map((bahan) => (
                        <option value={bahan.id_bahan_baku}>
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
                      className="btn btn-error text-white"
                      onClick={(event) => handleDelete(i, event)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-info" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResepPage;
