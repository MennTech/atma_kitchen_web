import useAxios from ".";
export const ReportPresensi = async (data) => {
    try {
      const response = await useAxios.post("/monthly-report",data, {
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