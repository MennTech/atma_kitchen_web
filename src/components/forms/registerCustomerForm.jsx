import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Register } from '../../api/authCustomerApi';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        nama_customer: "", 
        email: "", 
        password: "",
        tanggal_lahir: "",
        no_telp: "",
    });
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState('');

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value };
        setData(newData);
    }

    const register = (event) => {
        event.preventDefault();
        const validationErrors = {};
        setEmailError('');
        if(!data.nama_customer.trim()){
            validationErrors.nama_customer = "Nama Lengkap harus diisi";
        }
        if(!data.email.trim()){
            validationErrors.email_customer = "Email harus diisi";
        } else if(!/\S+@\S+\.\S+/.test(data.email)){
            validationErrors.email = "Email tidak valid";
        }
        if(!data.password.trim()){
            validationErrors.password = "Password harus diisi";
        } else if(data.password.length < 6){
            validationErrors.password = "Password minimal 6 karakter";
        }
        if(!data.tanggal_lahir.trim()){
            validationErrors.tanggal_lahir = "Tanggal Lahir harus diisi";
        }
        if(!data.no_telp.trim()){
            validationErrors.no_telp = "Nomor Telepon harus diisi";
        } else if(data.no_telp.length < 11 || data.no_telp.length > 13){
            validationErrors.no_telp = "Nomor Telepon harus 11 - 13 karakter";
        }
        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0){
            Register(data).then((response) => {
                if(response.success){
                    navigate("/login");
                }
            }).catch((error) => {
                console.log(error);
                setEmailError(error.message);
                
            });
        }
    }

    return (
        <form onSubmit={register}>
            <div className="space-y-2">
                <div className='form-control'>
                    <label htmlFor="nama">Nama Lengkap</label>
                    <input type="text" onChange={handleChange} className='input bg-gray-200' id='nama' name='nama_customer' />
                    {errors.nama_customer && <p className='text-red-500'>{errors.nama_customer}</p>}
                </div>    
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={handleChange} className='input bg-gray-200' id='email' name='email' />
                    {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    {emailError && <p className='text-red-500'>{emailError}</p>}
                </div>    
                <div className='form-control'>
                    <label htmlFor="pass">Password</label>
                    <input type="password" onChange={handleChange} className='input bg-gray-200' id='pass' name='password'/>
                    {errors.password && <p className='text-red-500'>{errors.password}</p>}
                </div>    
                <div className='form-control'>
                    <label htmlFor="nomor">Nomor Telepon</label>
                    <input type="number" onChange={handleChange} className='input bg-gray-200' id='nomor' name='no_telp'/>
                    {errors.no_telp && <p className='text-red-500'>{errors.no_telp}</p>}
                </div>    
                <div className='form-control'>
                    <label htmlFor="tanggal">Tanggal Lahir</label>
                    <input type="date" onChange={handleChange} className='input bg-gray-200' id='tanggal' name='tanggal_lahir' />
                    {errors.tanggal_lahir && <p className='text-red-500'>{errors.tanggal_lahir}</p>}
                </div>    
            </div>
            <div className='flex justify-center mt-3'>
                <button type='submit' className='btn btn-outline grow text-white' style={{ backgroundColor: "#D08B54"}}>Register</button>
            </div>
        </form>
    );
}

export default RegisterForm;