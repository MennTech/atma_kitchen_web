import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000"; // ganti kalo servernya dah dihosting

export const getProdukPhoto = (photo) => {
    return `${BASE_URL}/storage/produk/${photo}`
}

export const getHampersPhoto = (photo) => {
    return `${BASE_URL}/storage/hampers/${photo}`
}

const useAxios = axios.create({
    baseURL: `${BASE_URL}/api/`
})

export default useAxios;