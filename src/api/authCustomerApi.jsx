import useAxios from ".";

const Login = async (data) => {
    try{
        const response = await useAxios.post("/customer/login", data);
        return response.data;
    }catch (error){
        return error.response.data;
    }
};

const Logout = async () => {
    try{
        const response = await useAxios.post("/customer/logout", null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    }catch (error){
        return error.response.data;
    }
}

export { Login, Logout };