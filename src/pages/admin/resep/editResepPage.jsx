import { useState, useEffect } from "react";
import { GetAllBahanBaku } from "../../../api/BahanBaku";
import { EditResep, ShowResep } from "../../../api/resepApi";
import { useNavigate, useParams } from "react-router-dom";
const EditResepPage = () => {
  const navigate = useNavigate();
  const [resep, setResep] = useState([]);
  const [dataBahanBaku, setDataBahanBaku] = useState([]);
  const [namaResep, setNamaResep] = useState("");
  const params = useParams();
  const id_resep = params.id;
  const [detailResep, setDetailResep] = useState([
    {
      id_bahan_baku: "",
      jumlah_bahan: 0,
    },
  ]);

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const fetchResep = () => {
    ShowResep(id_resep)
      .then((response) => {
        setResep(response.data.data);
        setDetailResep(response.data.data.detail_resep);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchResep();
  }, []);

  return (
    <div className="w-screen">
      <div className="flex justify-between mt-5 ms-3 me-3">
        <h1 className="text-3xl text-[#d08854] font-semibold">Edit Resep</h1>
        <button
          className={`btn ${!edit ? "btn-primary" : "btn-error"}`}
          onClick={handleEdit}
        >
          {!edit ? "Edit Resep" : "Cancel Edit"}
        </button>
      </div>
      <div className="mt-5 mx-3">
        <form>
          <div className="form-control">
            <label htmlFor="namaResep">Nama Resep</label>
            <div className="grid grid-cols-2">
              <div>
                <input
                  type="text"
                  id="namaResep"
                  name="nama_resep"
                  className="input input-bordered bg-white"
                  value={resep.nama_resep}
                  disabled={!edit}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResepPage;
