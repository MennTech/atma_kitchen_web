const ProdukPage = () => {
    return (
        <div className='w-screen p-4 overflow-y-auto'>
            <div className="flex items-center">
                <h1 className="text-4xl text-[#d08854] font-semibold">Data Produk</h1>
                <div className="divider divider-horizontal m-1"></div>
                <p className="text-slate-400">
                    Manajemen Segala Produk Atma Kitchen
                </p>
            </div>
            <div className="card w-full min-h-screen bg-white mt-2">
                <div className="card-body p-4">
                    <div className='flex justify-between'>
                        <div className="flex items-center">
                            <label className="label">Cari Produk: </label>
                            <input type="text" className='input bg-slate-200' />
                        </div>
                        <div className="space-x-1">
                            <button className='btn btn-outline bg-[#d08854] text-white'>Tambah Produk Penitip</button>
                            <button className='btn btn-outline bg-[#d08854] text-white'>Tambah Produk Atma Kitchen</button>
                        </div>
                    </div>
                    <div className="divider m-1"></div>
                </div>
            </div>
            <div className='mt-2'>
                {/* <DataTable columns={columns} data={records} fixedHeader pagination className='mt-2'>
                </DataTable> */}
            </div>
        </div>
    )
}

export default ProdukPage;