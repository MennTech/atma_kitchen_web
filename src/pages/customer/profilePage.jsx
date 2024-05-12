import { useState, useEffect } from "react";
import { GetProfile } from "../../api/userApi";
import ModalEdit from "../../components/Modals/ModalProfile/ModalUpdate";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  const fetchProfile = () => {
    GetProfile()
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-screen">
        <div className="card mx-60 mt-10 mb-20 shadow-lg bg-white">
          <div className="card-body">
              <div>
                <h1 className="text-lg font-bold">Profile Saya</h1>
                <p className="text-sm">Kelola informasi profil Anda</p>
                <div className="divider divider-neutral mt-1"></div>
              </div>
              <div className="w-full flex">
                <div  style={{ width:"70%" }}>
                  <div className="grid grid-rows-6 gap-3 ">
                    <div className="grid grid-cols-5 gap-5">
                      <div>
                        <label htmlFor="nama" style={{ color:"#555555"}}>Nama</label>
                      </div>
                      <div>
                        <p id="nama">{profile.nama_customer}</p>
                      </div>
                      <div>
                        <ModalEdit onClose={fetchProfile} value={profile} props={{title: "Nama", name: "nama_customer"}} />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-5">
                      <div>
                        <label htmlFor="Email" style={{ color:"#555555"}}>Email</label>
                      </div>
                      <div>
                        <p id="Email">{profile.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-5">
                      <div>
                        <label htmlFor="nomor" style={{ color:"#555555"}}>Nomor Telepon</label>
                      </div>
                      <div>
                        <p id="nomor">{profile.no_telp}</p>
                      </div>
                      <div>
                        <ModalEdit onClose={fetchProfile} value={profile} props={{title: "Nomor Telepon", name: "no_telp"}} />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-5">
                      <div>
                        <label htmlFor="tgl_lahir" style={{ color:"#555555"}}>Tanggal Lahir</label>
                      </div>
                      <div>
                        <p id="tgl_lahir">{profile.tanggal_lahir}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-5">
                      <div>
                        <label htmlFor="poin" style={{ color:"#555555"}}>Jumlah Poin</label>
                      </div>
                      <div>
                        <p id="poin">{profile.saldo}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-5">
                      <div>
                        <label htmlFor="saldo" style={{ color:"#555555"}}>Saldo Customer</label>
                      </div>
                      <div>
                        <p id="saldo">{new Intl.NumberFormat("id-ID",{
                          style: "currency",
                          currency: "IDR",
                        }).format(profile.saldo)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider divider-horizontal divider-neutral"></div>
                <div style={{ width:"30%" }} className="grid justify-center content-start">
                  <div className="avatar">
                    <div className="w-28  rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
  );
};

export default ProfilePage;