import useAxios from ".";

const GetAllKaryawan = async () => {
    try {
        const response = await useAxios.get("/karyawan");
        return response;
    } catch (error) {
        return error;        
    }
}

const ShowKaryawan = async (id) => {
    try {
        const response = await useAxios.get(`/karyawan/${id}`);
        return response;
    } catch (error) {
        return error;        
    }
}

const TambahKaryawan = async (data) => {
    try{
        const response = await useAxios.post("/karyawan", data);
        return response;
    } catch (error){
        return error;
    }
}

const EditKaryawan = async (id, data) => {
    try {
        const response = await useAxios.put(`/karyawan/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
}

const DeleteKaryawan = async (id) => {
    try {
        const response = await useAxios.delete(`/karyawan/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

const UpdateBonus = async (id, data) => {
    try {
        const response = await useAxios.put(`/karyawan/${id}/bonus`, {
            bonus: data
        });
        return response;
    } catch (error) {
        return error;
    }

}

export { GetAllKaryawan, ShowKaryawan ,TambahKaryawan, EditKaryawan, DeleteKaryawan, UpdateBonus};