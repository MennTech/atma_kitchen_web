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
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    }catch (error){
        return error.response.data;
    }
}

const Register = async (data) => {
    try {
        const response = await useAxios.post("/register", data);
        return response.data;
    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            if (data.message && data.message.email_customer) {
                throw new Error(data.message.email_customer[0]);
            }
            return data;
        }
    }
}

const ForgotPassword = async (data) => {
    try {
        const response = await useAxios.post("forgot-password", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
const fetchVerificationStatus = async () => {
    try {
        const response = await useAxios.get("/tampilan",{
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

const ResetPassword = async (data) => {
    try {
        const response = await useAxios.post("/reset-password", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export { Login, Logout, Register, ForgotPassword,ResetPassword, fetchVerificationStatus};