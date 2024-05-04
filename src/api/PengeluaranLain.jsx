import useAxios from ".";
export const GetAllPengeluaranLain = async () => {
  try {
    const response = await useAxios.get("/pengeluaran_lain", {
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
export const EditPengeluaranLain = async (data) => {
  try {
    const response = await useAxios.put(`/pengeluaran_lain_update/${data.id_pengeluaran_lain}`, data, {
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
export const CreatePengeluaranLain = async (data) => {
  try {
    const response = await useAxios.post("/input_pengeluaran_lain", data, {
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
export const DeletePengeluaranLain = async (id) => {
  try {
    const response = await useAxios.delete(`/pengeluaran_lain_deleted/${id}`, {
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