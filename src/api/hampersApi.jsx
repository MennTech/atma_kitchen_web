import useAxios from ".";

export const GetAllHampers = async () => {
    try{
        const response = await useAxios.get("/hampers");
        return response;
    }catch(error){
        return error;
    }
}

export const SearchHampers = async (keyword) => {
    try{
        const response = await useAxios.get(`/hampers/cari?key=${keyword}`);
        return response;
    }catch(error){
        return error;
    }
}

export const ShowHampers = async (id) => {
    try{
        const response = await useAxios.get(`/hampers/${id}`);
        return response;
    }catch(error){
        return error;
    }
}

export const CreateHampers = async (data) => {
    try{
        const response = await useAxios.post("/hampers", data);
        return response;
    }catch(error){
        return error;
    }
}

export const UpdateHampers = async (id, data) => {
    try{
        const response = await useAxios.put(`/hampers/${id}`, data);
        return response;
    }catch(error){
        return error;
    }
}

export const DeleteHampers = async (id) => {
    try{
        const response = await useAxios.delete(`/hampers/${id}`);
        return response;
    }catch(error){
        return error;
    }
}