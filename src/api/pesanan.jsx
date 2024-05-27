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