import useAxios from ".";

export const GetLimitByProdukAndDate = async (id_produk, date) => {
    try {
        const response = await useAxios.get(`/limit-produk/cari?tanggal=${date}&id_produk=${id_produk}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const GetLimitByDate = async (date) => {
    try {
        const response = await useAxios.get(`/limit-produk/cari/tanggal?tanggal=${date}`);
        return response.data;
    } catch (error) {
        return error;
    }
}