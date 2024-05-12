import useAxios from ".";
export const GetDetailPesanan = async (id) => {
    try {
      const response = await useAxios.get(`/pesanan/detail/${id}`, {
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