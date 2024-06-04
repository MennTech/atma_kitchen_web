import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { GetAllRole } from '../../../api/roleApi';
import ModalCreate from '../../../components/Modals/ModalRole/ModalCreate';
import ModalUpdate from '../../../components/Modals/ModalRole/ModalUpdate';
import ModalDelete from '../../../components/Modals/ModalRole/ModalDelete';

const RolePage = () => {
    const [role, setRole] = useState([]);
    const [records, setRecords] = useState([]);
    const [isLoading, setIslLoading] = useState(false);

    const fetchRole = () => {
        setIslLoading(true);
        GetAllRole()
            .then((response) => {
                setRole(response.data.data);
                setRecords(response.data.data);
                setIslLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setIslLoading(true);
        fetchRole();
    }, []);

    const columns = [
        {
            name: <span className="font-bold text-base">No</span>,
            selector: (row, rowIndex) => rowIndex + 1,
        },
        {
            name: <span className="font-bold text-base">Jabatan</span>,
            selector: (row) => row.jabatan,
        },
        {
            name: <span className="font-bold text-base">Aksi</span>,
            cell: (row) => (
                <div className="space-x-2">
                  <ModalUpdate onClose={fetchRole} value={row}/>
                  <ModalDelete onClose={fetchRole} value={row}/>
                </div>
            ),
        },
    ];

    const paginationOptions = {
        rowsPerPageText: 'Baris per halaman',
        rangeSeparatorText: 'dari',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Semua'
    };

    function handleSearch(event) {
        const newData = role.filter((row) => {
            return row.jabatan
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    }

    return (
        <div className="w-screen min-h-screen p-4 overflow-y-auto">
      <div className="flex items-center">
        <h1 className="text-4xl text-[#8F5C54] font-semibold">Data Jabatan</h1>
        <div className="divider divider-horizontal m-1"></div>
        <p className="text-slate-400">Manajemen Jabatan Atma Kitchen</p>
      </div>
      <div className="card w-full h-fit bg-white mt-2">
        <div className="card-body h-full p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Karyawan"
                className="input bg-slate-100"
                onChange={handleSearch}
              />
            </div>
            <div className="space-x-1">
              <ModalCreate onClose={fetchRole}/>
            </div>
          </div>
          <div className="divider m-1"></div>
          <div className="mt-2">
            {isLoading && (
              <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg"></span>
                <span className="mt-2">Memuat Data...</span>
              </div>
            )}
            {!isLoading && (
              <DataTable
                columns={columns}
                data={records}
                pagination
                highlightOnHover
                paginationComponentOptions={paginationOptions}
                responsive
              />
            )}
          </div>
        </div>
      </div>
    </div>
    );
}

export default RolePage;