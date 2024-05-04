import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TambahKaryawan } from "../../api/karyawanApi";
import { GetRole } from "../../api/karyawanApi";
import { toast } from "sonner";

const AddKaryawanPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [karyawan, setKaryawan] = useState({
    nama_karyawan: "",
    no_telp: "",
    id_role: "",
    email_karyawan: "",
    password: null,
  });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const fetchRole = () => {
    GetRole()
      .then((response) => {
        setRole(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handleChange = (event) => {
    karyawan[event.target.name] = event.target.value;
    setKaryawan({ ...karyawan });
    karyawan.id_role == 1 || karyawan.id_role == 2
      ? setShow(true)
      : setShow(false);
  };

  const addKaryawan = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!karyawan.nama_karyawan.trim()) {
      validationErrors.nama_karyawan = "Nama Karyawan harus diisi";
      toast.error("Nama Karyawan harus diisi");
    } else if (!karyawan.no_telp.trim()) {
      validationErrors.no_telp = "No Telepon harus diisi";
      toast.error("No Telepon harus diisi");
    } else if (karyawan.no_telp.length < 11 || karyawan.no_telp.length > 13) {
      validationErrors.no_telp = "No Telepon harus 11 - 13 digit";
      toast.error("No Telepon harus 11 - 13 digit");
    } else if (!karyawan.id_role) {
      validationErrors.id_role = "Jabatan harus dipilih";
      toast.error("Jabatan harus dipilih");
    } else if (show && !karyawan.email_karyawan.trim()) {
      validationErrors.email_karyawan = "Email harus diisi";
      toast.error("Email harus diisi");
    } else if (!/\S+@\S+\.\S+/.test(karyawan.email_karyawan)) {
      validationErrors.email_karyawan = "Email tidak valid";
      toast.error("Email tidak valid");
    } else if (show && !karyawan.password.trim()) {
      validationErrors.password = "Password harus diisi";
      toast.error("Password harus diisi");
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      TambahKaryawan(karyawan)
        .then((response) => {
          toast.success("Karyawan berhasil ditambahkan");
          navigate("/dashboard/karyawan");
        })
        .catch((error) => {
          toast.error("Gagal menambahkan karyawan");
          console.log(error);
        });
    }
  };

  return (
    <div className="w-screen p-4 min-h-screen overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#d08854] font-semibold">
          Tambah Karyawan
        </h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Karyawan Atma Kitchen</p>
      </div>

      <div className="card w-full h-fit bg-white mt-4">
        <div className="card-body h-full p-4">
          <form onSubmit={addKaryawan}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <button
                  className="btn btn-error text-white"
                  onClick={() => navigate("/dashboard/karyawan")}
                >
                  Cancel
                </button>
              </div>
              <div className="space-x-1">
                <button className="btn btn-primary text-white" type="submit">
                  Submit
                </button>
              </div>
            </div>
            <div className="divider m-1"></div>
            <div className="mt-2">
              <div
                className={`grid ${show ? "grid-rows-2" : "grid-rows-1"} gap-4`}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="form-control">
                    <div className="grid grid-rows-1">
                      <label htmlFor="nama">Nama Karyawan</label>
                      <input
                        type="text"
                        id="nama"
                        name="nama_karyawan"
                        className="input input-bordered bg-white"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <div className="grid grid-rows-1">
                      <label htmlFor="noTelp">No Telepon</label>
                      <input
                        type="number"
                        id="noTelp"
                        name="no_telp"
                        className="input input-bordered bg-white"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <div className="grid grid-rows-1">
                      <label htmlFor="role">Jabatan</label>
                      <select
                        name="id_role"
                        id="id_role"
                        className="select select-bordered bg-white"
                        onChange={handleChange}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Pilih Jabatan
                        </option>
                        {role.map((val, i) => {
                          {
                            if (val.jabatan !== "Owner") {
                              return (
                                <option key={i} value={val.id_role}>
                                  {val.jabatan}
                                </option>
                              );
                            }
                          }
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="form-control">
                    <div className="grid grid-rows-1">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email_karyawan"
                        className="input input-bordered bg-white"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {show && (
                    <div className="form-control">
                      <div className="grid grid-rows-1">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="input input-bordered bg-white"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddKaryawanPage;
