import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);

    const API = `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`;

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(API);
            setMembers(res.data);
        } catch (err) {
            console.error("Failed to fetch members", err);
        }
    };



    const today = new Date();
    const activeCount = members.filter((m) => new Date(m.membershipDate) >= today).length;
    const expiredCount = members.length - activeCount;
    const totalCount = members.length;

    const summaryData = [
        { title: 'Total Members', value: totalCount, icon: '👥', bg: 'bg-indigo-600' },
        { title: 'Active Members', value: activeCount, icon: '✅', bg: 'bg-green-600' },
        { title: 'Expired Memberships', value: expiredCount, icon: '⏰', bg: 'bg-red-600' },
        { title: 'New Registrations', value: activeCount, icon: '🆕', bg: 'bg-yellow-500' },
    ];

    return (
        <div className="mt-5 flex flex-col md:flex-row min-h-screen bg-gray-100">

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow p-4 gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:block text-gray-600">Admin</span>

                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {summaryData.map(({ title, value, icon, bg }) => (
                            <div key={title} className={`rounded-lg shadow p-4 sm:p-5 flex items-center space-x-4 ${bg} text-white`}>
                                <div className="text-3xl sm:text-4xl">{icon}</div>
                                <div>
                                    <p className="text-sm font-semibold">{title}</p>
                                    <p className="text-xl sm:text-2xl font-bold">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Members Table */}
                    <section className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Members</h3>
                        <div className="overflow-x-auto w-full max-w-full">
                            <table className="w-full table-auto border-collapse border border-gray-200 min-w-[600px]">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.slice(0, 4).map(({ _id, name, email, status, membershipDate }) => (
                                        <tr key={_id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{name}</td>
                                            <td className="border border-gray-300 px-4 py-2">{email}</td>
                                            <td
                                                className={`border border-gray-300 px-4 py-2 font-semibold ${new Date(membershipDate) >= today ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                            >
                                                {new Date(membershipDate) >= today ? 'Active' : 'Expired'}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{membershipDate?.slice(0, 10)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
