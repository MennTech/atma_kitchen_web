export const isLoggedIn = () => {
    if (sessionStorage.getItem("token") && (sessionStorage.getItem("customer") || sessionStorage.getItem("karyawan"))) {
        return true;
    } else {
        return false;
    }
}

export const userTypes = () => {
    if (sessionStorage.getItem("customer")) {
        return "customer";
    } else if (sessionStorage.getItem("karyawan")) {
        return "karyawan";
    } else {
        return null;
    }
}