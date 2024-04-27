export const isLoggedIn = () => {
    if (sessionStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

export const userType = (response) => {
    if (response.data.customer){
        return "customer";
    }else if(response.data.karyawan){
        return "karyawan";
    }else{
        return null;
    }
}