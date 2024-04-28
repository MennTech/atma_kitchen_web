import { useEffect,useState } from "react";
import { GetAllBahanBaku } from "../../api/BahanBaku";
  
const BahanBakuPage = () =>{
    const [bahanBaku, setBahanBaku] = useState([]);
    const fetchData = async () => {
     GetAllBahanBaku()
        .then((response) => {
            setBahanBaku(response);
        }).catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);
      
    return (
        <div className="flex justify-center">
              <table className="divide-y w-1/2 divide-gray-950 mt-3 mx-auto">
                <thead className="bg-yellow-950">
                  <tr>
                    <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        No
                      </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Stok
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bahanBaku?.map((bahan,index) => (
                    <tr key={bahan.id} className="border-b border-gray-200">
                        <td className="px-6 py-4">
                          {index+1}
                        </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{bahan.nama_bahan_baku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{bahan.stok} {bahan.satuan}</div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      );
  };
  export default BahanBakuPage;