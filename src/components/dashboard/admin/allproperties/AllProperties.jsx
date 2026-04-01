import { useEffect, useState } from "react";
import Property from "./Property";
import useAxiosPublic from "../../../../hooks/axiosPublic/useAxiosPublic";
import toast from "react-hot-toast";

function Allproperties() {
    const [properties, setProperties] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/home/allcheckout')
            .then(e => setProperties(e.data))
            .catch(e => console.log(e.message));
    }, [axiosPublic]);

    const deleteProperty = (id) => {
        axiosPublic.delete(`/admin/property/delete?id=${id}`)
            .then(e => {
                if (e.data.deletedCount) {
                    setProperties(prev => prev.filter(d => d._id !== id));
                    toast.success('Property removed successfully');
                }
            });
    };

    if (!properties) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-bars loading-lg text-blue-500" />
                    <p className="text-sm text-gray-400">Loading properties...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">

            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">All Properties</h2>
                    <p className="text-sm text-gray-400 mt-0.5">{properties.length} properties listed</p>
                </div>
            </div>

            {/* Empty state */}
            {properties.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
                    </svg>
                    <p className="text-sm">No properties found</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-left">
                                    <th className="px-4 py-3 font-semibold text-gray-500 w-10">#</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500">Title</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500">Location</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500">Agent Email</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500">Price</th>
                                    <th className="px-4 py-3 font-semibold text-gray-500 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {properties.map((d, index) => (
                                    <Property
                                        key={d._id}
                                        deleteProperty={deleteProperty}
                                        index={index}
                                        d={d}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Allproperties;