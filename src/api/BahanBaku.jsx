import useAxios from ".";
// Mendapatkan semua content untuk ditaruh di halaman dashboard
export const GetAllBahanBaku = async () => {
  try {
    const response = await useAxios.get("/bahan_baku", {
      headers: {
        "Content-Type": "application/json"
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};