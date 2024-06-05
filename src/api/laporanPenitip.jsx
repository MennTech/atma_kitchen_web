import useAxios from ".";
export const ReportPenitip = async (data) => {
    try {
      const response = await useAxios.post("/laporan-penitip",data, {
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