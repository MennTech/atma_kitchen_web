import { getCurrentUser } from "../api/userApi";

export const checkRoleKaryawan = async () => {
    try{
        const response = await getCurrentUser();
        if(response.status !== 200){
            return null;
        }

        if(response.status === 200 && response.role === null){
            return null;
        }

        if(sessionStorage.getItem("token") || sessionStorage.getItem("karaywan") === null){
            return null;
        }

        const role = sessionStorage.getItem("karaywan").role.jabatan;

        if(role === "Admin"){
            return "Admin";
        }else if(role === "Manager Operasional"){
            return "Manager Operasional";
        }else{
            return "Owner";
        }
    }catch(error){
        console.log(error);
        return null;
    }
}