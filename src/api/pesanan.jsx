import useAxios from ".";
export const GetAllPesanan = async (id) => {
  try {
    const response = await useAxios.get(`/pesanan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const GetKeranjangPesanan = async () => {
  try {
    const response = await useAxios.get(`/pesanan/keranjang`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const InitPesanan = async () => {
  try {
    const response = await useAxios.post(`/pesanan/init`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const AddProdukToKeranjang = async (data) => {
  try {
    const response = await useAxios.patch(`/pesanan/keranjang`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const EditMetodePesan = async (data) => {
  try {
    const response = await useAxios.patch(`pesanan/keranjang/metode`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const HapusProdukKeranjang = async (data) => {
  try {
    const response = await useAxios.patch(`/pesanan/keranjang/hapus`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const HapusSatuProdukKeranjang = async (data) => {
  try {
    const response = await useAxios.patch(`/pesanan/keranjang/hapus-produk`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const TambahJumlahProdukKeranjang = async (data) => {
  try {
    const response = await useAxios.patch(`/pesanan/keranjang/tambah-jumlah`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const KurangJumlahProdukKeranjang = async (data) => {
  try {
    const response = await useAxios.patch(`/pesanan/keranjang/kurang-jumlah`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const CheckoutPesanan = async (data) => {
  try {
    const response = await useAxios.patch(`/pesanan/checkout`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const ShowPesanan = async () => {
  try {
    const response =  await useAxios.get('/pesanan-masuk');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const InputJarak = async (id, jarak) => {
  try {
    const response = await useAxios.put(`/input-jarak-pesanan/${id}`, {
      jarak: jarak,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const InputJumlahBayar = async (id, jumlah_pembayaran) => {
  try {
    const response = await useAxios.put(`/input-jumlah-bayar/${id}`, {
      jumlah_pembayaran: jumlah_pembayaran,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const ShowPesananValid = async () =>{
  try {
    const response = await useAxios.get("/pesanan-bayar-valid", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const ApprovePesanan = async (id) => {
  try {
    const response = await useAxios.post(`/accept-pesanan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const RejectPesanan = async (id) => {
  try {
    const response = await useAxios.post(`/reject-pesanan/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const ShowPesananDiproses = async () => {
  try {
    const response = await useAxios.get("/pesanan-diproses");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const UpdateStatusPesanan = async (id, status) => {
  try {
    const response = await useAxios.put(`/update-status-pesanan/${id}`, {
      status: status,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const ShowPesananTelatBayar = async () => {
  try {
    const response = await useAxios.get("/pesanan-telat-bayar");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const UpdateStatusPesananTelatBayar = async (id) => {
  try {
    const response = await useAxios.post(`/batal-pesanan/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const ShowPesananPerluDiproses = async () => {
  try {
    const response = await useAxios.get("/pesanan/perlu-diproses");
    return response.data;
  } catch (error) {
    return error;
  }
}

export const ShowPenggunaanBahanPesanan = async (array) => {
  let modifiedArray = array.map((item) => `id_pesanan[]=${item}`);
  try {
    const response = await useAxios.get(`/pesanan/perlu-diproses/penggunaan-bahan?${modifiedArray.join('&')}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const ProsesPesanan = async (data) => {
  try {
    const response = await useAxios.patch(`/pesanan/proses`, {
      id_pesanan: data,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}