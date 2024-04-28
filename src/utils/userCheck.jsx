import { getCurrentUser } from "../api/userApi";

const checkCurrentUser = async () => {
    try{
        const response = await getCurrentUser();
        if(response.status === 200){
            return response;
        }else{
            return null;
        }
    }catch(error){
        console.log(error);
        return null;
    }
}

export const isLoggedIn = () => {
    const user = checkCurrentUser();
    if(user === null){
        return false;
    }else{
        if (sessionStorage.getItem("token") && (sessionStorage.getItem("customer") || sessionStorage.getItem("karyawan"))) {
            return true;
        } else {
            return false;
        }
    }
}

export const userTypes = () => {
    const user = checkCurrentUser();
    if(user === null){
        return null;
    }else{
        if (
            user.id_customer !== null && 
            sessionStorage.getItem("customer")) {
            return "customer";
        } else if (
            user.id_karyawan !== null && 
            sessionStorage.getItem("karyawan")) {
            return "karyawan";
        } else {
            return null;
        }
    }
}