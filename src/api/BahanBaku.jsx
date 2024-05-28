import useAxios from ".";
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
export const EditBahanBaku = async (data) => {
  try {
    const response = await useAxios.put(`/bahan_baku_update/${data.id_bahan_baku}`, data, {
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
export const DeleteBahanBaku = async (id) => {
  try {
    const response = await useAxios.delete(`/bahan_baku_deleted/${id}`, {
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
export const BahanBakuKurang = async () => {
  try {
    const response = await useAxios.get("/bahan-kurang", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
}