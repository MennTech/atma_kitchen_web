import useAxios from ".";

const GetAllRole = async () => {
    try {
        const response = await useAxios.get("/role");
        return response;
    } catch (error) {
        return error;        
    }
}

const ShowRole = async (id) => {
    try {
        const response = await useAxios.get(`/role/${id}`);
        return response;
    } catch (error) {
        return error;        
    }
}

const AddRole = async (data) => {
    try{
        const response = await useAxios.post("/role", {
            jabatan: data
        });
        return response;
    } catch (error){
        return error;
    }
}

const EditRole = async (id, data) => {
    try {
        const response = await useAxios.put(`/role/${id}`, {
            jabatan: data
        });
        return response;
    } catch (error) {
        return error;
    }
}

const EditGajiRole = async (id, data) => {
    try {
        const response = await useAxios.put(`/role/${id}/gaji`, {
            gaji: data
        });
        return response;
    } catch (error) {
        return error;
    }
}

const DeleteRole = async (id) => {
    try {
        const response = await useAxios.delete(`/role/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export { GetAllRole, ShowRole, AddRole, EditRole, EditGajiRole, DeleteRole };