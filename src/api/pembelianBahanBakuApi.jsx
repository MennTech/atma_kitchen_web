import useAxios from ".";

export const GetAllPembelianBahanBaku = async () => {
    try {
        const response = await useAxios.get("/pembelian-bahan-baku");
        return response.data;
    } catch (error) {
        return error;
    }
}

export const SearchPembelianBahanBaku = async (keyword) => {
    try {
        const response = await useAxios.get(`/pembelian-bahan-baku/cari?key=${keyword}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const ShowPembelianBahanBaku = async (id) => {
    try {
        const response = await useAxios.get(`/pembelian-bahan-baku/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const CreatePembelianBahanBaku = async (data) => {
    try {
        const response = await useAxios.post("/pembelian-bahan-baku", data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const UpdatePembelianBahanBaku = async (id, data) => {
    try {
        const response = await useAxios.put(`/pembelian-bahan-baku/${id}`, data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const DeletePembelianBahanBaku = async (id) => {
    try {
        const response = await useAxios.delete(`/pembelian-bahan-baku/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}