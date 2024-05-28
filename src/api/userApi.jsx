import useAxios from ".";

const getCurrentUser = async () => {
    try{
        const response = await useAxios.get("/user", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response;
    }catch(error){
        return error;
    }
}

const GetProfile = async () => {
    try{
        const response = await useAxios.get("/customer/profile", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response;
    }catch(error){
        return error;
    }
};

const UpdateProfile = async (data) => {
    try{
        const response = await useAxios.put("/customer/profile", {
            nama_customer: data.nama_customer,
            no_telp: data.no_telp
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response;
    }catch(error){
        return error;
    }
}

const GetHistory = async () => {
    try{
        const response = await useAxios.get("/customer/history", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response;
    }catch(error){
        return error;
    }
}

const GetAlamat = async () => {
    try{
        const response = await useAxios.get("/customer/alamat", {
          headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    }catch(error){
        return error;
    }
}

const GetMustbePaid = async () => {
    try{
        const response = await useAxios.get("/customer/mustbepaid", {
           headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
      return response;
    }catch(error){
        return error;
    }
}
const Pembayaran = async (data) => {
    try{
        const response = await useAxios.post("/customer/bukti-transfer", data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'multipart/form-data',
            },
        });
      return response.data;
    }catch(error){
        return error;
    }
}


export { getCurrentUser, GetProfile, UpdateProfile, GetHistory, GetAlamat, GetMustbePaid, Pembayaran};
