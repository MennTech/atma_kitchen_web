const HampersPage = () => {
    return (
        <div className='w-screen min-h-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Data Hampers</h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">
                    Manajemen Hampers Atma Kitchen
                </p>
            </div>
            <div className="card w-full h-fit bg-white mt-4">
                <div className="card-body h-full p-4">
                    <div className='flex justify-between'>
                        <div className="flex items-center">
                            <input type="text" placeholder="Cari Hampers" className='input bg-slate-100' />
                        </div>
                        <div className="space-x-1">
                            <button className='btn btn-outline bg-[#d08854] text-white'>Tambah Hampers</button>
                        </div>
                    </div>
                    <div className="divider m-1"></div>
                    <div className='mt-2'>
                        {/* <DataTable columns={columns} data={records} fixedHeader pagination className='mt-2'>
                        </DataTable> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HampersPage;