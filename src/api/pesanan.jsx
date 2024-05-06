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