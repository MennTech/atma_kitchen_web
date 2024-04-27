import { getCurrentUser } from "../api/userApi";

export const checkRoleKaryawan = async () => {
    try{
        const response = await getCurrentUser();
        if(response === null){
            return null;
        }

        if(response.role === null){
            return null;
        }

        if(response.role === "Admin"){
            return "Admin";
        }else if(response.role === "Manager Operasional"){
            return "Manager Operasional";
        }else{
            return "Owner";
        }
    }catch(error){
        console.log(error);
        return null;
    }
}