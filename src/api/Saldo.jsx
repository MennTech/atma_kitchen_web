import useAxios from ".";
export const ShowSaldoPending = async () => {
  try {
    const response = await useAxios.get("/history-saldo-pending", {
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
export const AccSaldo = async (id) => {
    try {
      const response = await useAxios.post(`/konfirmasi-penarikan-saldo/${id}`, {
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
  export const RejectSaldo = async (id) => {
    try {
      const response = await useAxios.post(`/tolak-penarikan-saldo/${id}`, {
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
