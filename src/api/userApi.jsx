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

export { getCurrentUser };