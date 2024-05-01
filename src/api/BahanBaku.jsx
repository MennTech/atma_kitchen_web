import useAxios from ".";
// Mendapatkan semua content untuk ditaruh di halaman dashboard
export const GetAllBahanBaku = async () => {
  try {
    const response = await useAxios.get("/bahan_baku", {
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
export const EditBahanBaku = async (id, data) => {
  try {
    const response = await useAxios.put(`/bahan_baku/${id}`, data, {
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
export const CreateBahanBaku = async (data) => {
  try {
    const response = await useAxios.post("/input_bahan_baku", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};