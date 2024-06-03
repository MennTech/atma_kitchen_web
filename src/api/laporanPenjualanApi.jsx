import useAxios from ".";

export const GetPenjualanProdukMonth = async (month, year) => {
    try {
        const response = await useAxios.get(`/laporan/produk-bulanan?bulan=${month}&tahun=${year}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
