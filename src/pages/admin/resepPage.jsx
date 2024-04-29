import {GetAllResep} from '../../api/resepApi';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
const ResepPage = () => {
    const [resep, setResep] = useState([]);
    const [records, setRecords] = useState([]);
    const fetchResep = () => {
        GetAllResep().then((response) => {
            setResep(response.data.data);
            setRecords(response.data.data);
            console.log(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchResep();
    }, []);

    const columns = [
        {
            name: 'No',
            selector: (row, rowIndex) => rowIndex + 1,
        },
        {
            name: 'Nama Resep',
            selector: (row) => row.nama_resep,
        },
        {
            name: 'Aksi',
            cell: (row) => (
                <div className='space-x-2'>
                    <button className='btn btn-sm btn-outline bg-[#5467d0] text-white'>Details</button>
                    <button className='btn btn-sm btn-outline bg-[#e74d42] text-white'>Hapus</button>
                </div>
            )
        }
    ];

    function handleSearch (event) {
        const newData = resep.filter(row => {
            return row.nama_resep.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setRecords(newData);
    }

    return (
        <div className='w-screen'>
            <div className='flex justify-between mt-5 ms-3 me-3'>
                <h1 className="text-3xl text-[#d08854] font-semibold">Data Resep</h1>
                <button className='btn btn-outline bg-[#d08854] text-white'>Tambah Resep</button>
            </div>
            <div className='mt-2 mx-5'>
                <div className='text-start'>
                    <input type="text" className='input bg-slate-300' onChange={handleSearch}/>
                </div>
                    <DataTable columns={columns} data={records} fixedHeader pagination className='mt-2'>
                    </DataTable>
            </div>
        </div>
    )
}

export default ResepPage;