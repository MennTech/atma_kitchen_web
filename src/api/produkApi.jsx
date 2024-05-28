import useAxios from "."

export const GetAllProduk = async () => {
    try{
        const response = await useAxios.get("/produk/produk");
        return response.data.data;
    }catch(error){
        return error;
    }
}

export const GetAtmaKitchenProduk = async () => {
    try{
        const response = await useAxios.get("/produk/atma_kitchen");
        return response.data;
    }catch(error){
        return error;
    }
}

export const GetPenitipProduk = async () => {
    try{
        const response = await useAxios.get("/produk/penitip");
        return response.data;
    }catch(error){
        return error;
    }
}

export const GetAtmaKitchenProdukAdmin = async () => {
    try{
        const response = await useAxios.get("/produk/admin/atma_kitchen");
        return response.data;
    }catch(error){
        return error;
    }
}

export const GetPenitipProdukAdmin = async () => {
    try{
        const response = await useAxios.get("/produk/admin/penitip");
        return response.data;
    }catch(error){
        return error;
    }
}

export const ShowProduk = async (id) => {
    try{
        const response = await useAxios.get(`/produk/${id}`);
        return response.data;
    }catch(error){
        return error;
    }
}

export const SearchProduk = async (keyword) => {
    try{
        const response = await useAxios.get(`/produk/cari?keyword=${keyword}`);
        return response.data;
    }catch(error){
        return error;
    }
}

export const SearchProdukAdmin = async (keyword) => {
    try{
        const response = await useAxios.get(`/produk/admin/cari?keyword=${keyword}`);
        return response.data;
    }catch(error){
        return error;
    }
}

export const CreateProduk = async (data) => {
    try{
        const response = await useAxios.post("/produk", data);
        return response.data;
    }catch(error){
        return error;
    }
}

export const UpdateProduk = async (id, data) => {
    try{
        const response = await useAxios.post(`/produk/${id}`, data, {
            headers: {
                "Access-Control-Request-Methods": "PUT",
            },
        });
        return response.data;
    }catch(error){
        return error;
    }
}

export const DeleteProduk = async (id) => {
    try{
        const response = await useAxios.patch(`/produk/${id}`);
        return response.data;
    }catch(error){
        return error;
    }
}