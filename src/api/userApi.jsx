import useAxios from ".";

const getCurrentUser = () => {
    try{
        const response = useAxios.get("/user", null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    }catch(error){
        return error.response.data;
    }
}

export { getCurrentUser };