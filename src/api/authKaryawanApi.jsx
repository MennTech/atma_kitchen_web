import useAxios from ".";

const LoginKaryawan = async (data) => {
    try{
        const response = await useAxios.post("/karyawan/login", data);
        return response.data;
    }catch (error){
        return error.response.data;
    }
}

const LogoutKaryawan = async () => {
    try{
        const response = await useAxios.post("/karyawan/logout", null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        
        });
        return response.data;
    }catch (error){
        return error.response.data;
    }
}

export { LoginKaryawan, LogoutKaryawan }