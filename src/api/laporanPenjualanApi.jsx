import useAxios from ".";

export const GetPenjualanProdukMonth = async (month, year) => {
    try {
        const response = await useAxios.get(`/laporan/produk-bulanan?bulan=${month}&tahun=${year}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const GetLaporanPenjualanKeseluruhan = async (year) => {
    try {
        const response = await useAxios.get(`/laporan/penjualan-bulanan/${year}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const GetLaporanPenggunaanBahanBaku = async (startDate, endDate) => {
    try {
        const response = await useAxios.get(`/laporan/penggunaan-bahan-baku/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
