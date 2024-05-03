import useAxios from ".";

const GetAllResep = async () => {
    try {
        const response = await useAxios.get("/resep");
        return response;
    } catch (error) {
        return error;
    }
}

const ShowResep = async (id) => {
    try {
        const response = await useAxios.get(`/resep/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

const TambahResep = async (data) =>{
    try {
        const respone = await useAxios.post("/resep", data);
        return respone;
    } catch (error) {
        return error;
    }
}

const EditResep = async (id, data) =>{
    try {
        const respone = await useAxios.put(`/resep/${id}`, data);
        return respone;
    } catch (error) {
        return error;
    }
}

const HapusResep = async (id) =>{
    try {
        const respone = await useAxios.delete(`/resep/${id}`);
        return respone;
    } catch (error) {
        return error;
    }
}
export {GetAllResep, ShowResep, TambahResep, EditResep, HapusResep};