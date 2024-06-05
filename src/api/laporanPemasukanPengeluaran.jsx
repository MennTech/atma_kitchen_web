import useAxios from ".";
export const ReportPemasukanPengeluaran = async (data) => {
    try {
      const response = await useAxios.post("/laporan-transaksi",data, {
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


