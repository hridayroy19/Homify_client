import { useEffect, useState } from "react";
import Annualreport from "./dashbardcomponent/Annualreport";
import useAxiosPublic from "../../../hooks/axiosPublic/useAxiosPublic";

const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400 font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    const axiosPublic = useAxiosPublic();
    const [totals, setTotal] = useState([]);
    const [availables, setAvailable] = useState([]);

    useEffect(() => {
        axiosPublic.get('/admin/availablesold')
            .then(e => {
                setTotal(e.data.total);
                setAvailable(e.data.available);
            })
            .catch(err => console.log(err.message));
    }, [axiosPublic]);

    const totalCount     = totals?.length || 0;
    const availableCount = availables?.length || 0;
    const soldCount      = totalCount - availableCount;

    const stats = [
        {
            label: "Total Properties",
            value: totalCount,
            color: "bg-amber-50 text-amber-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
                </svg>
            ),
        },
        {
            label: "Available",
            value: availableCount,
            color: "bg-green-50 text-green-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            label: "Sold",
            value: soldCount,
            color: "bg-blue-50 text-blue-500",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
                </svg>
            ),
        },
    ];

    return (
        <div className="p-4 md:p-6">

            {/* Page title */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-sm text-gray-400 mt-0.5">Overview of all property activity</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {stats.map(stat => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">Annual Report</h3>
                <Annualreport />
            </div>

        </div>
    );
};

export default AdminDashboard;