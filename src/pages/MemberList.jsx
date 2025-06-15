import { useState, useEffect } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import MemberForm from "../components/MemberForm";
import MemberTable from "../components/MemberTable";
import axios from "axios";

function MemberList() {
    const [members, setMembers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [editingMember, setEditingMember] = useState(null);

    const API = `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`;

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get(API);
            setMembers(res.data);
            setFiltered(res.data);
        } catch (err) {
            console.error("Fetch error", err);
        }
    };

    const addMember = async (member) => {
        try {
            if (editingMember) {
                const res = await axios.put(`${API}/${editingMember._id}`, member);
                const updated = members.map((m) =>
                    m._id === editingMember._id ? res.data : m
                );
                setMembers(updated);
                setFiltered(updated);
                setEditingMember(null);
            } else {
                const res = await axios.post(API, member);
                const updated = [...members, res.data];
                setMembers(updated);
                setFiltered(updated);
            }
        } catch (err) {
            console.error("Add/Update error", err);
        }
    };

    const deleteMember = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            const updated = members.filter((m) => m._id !== id);
            setMembers(updated);
            setFiltered(updated);
        } catch (err) {
            console.error("Delete error", err);
        }
    };

    const editMember = (id) => {
        const m = members.find((mem) => mem._id === id);
        if (m) {
            setEditingMember(m);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const searchMembers = (term) => {
        const t = term.toLowerCase();
        setFiltered(
            members.filter(
                (m) =>
                    m.name.toLowerCase().includes(t) ||
                    m.email.toLowerCase().includes(t)
            )
        );
    };

    const today = new Date();
    const activeCount = members.filter(
        (m) => new Date(m.membershipDate) >= today
    ).length;
    const expiredCount = members.length - activeCount;

    return (
        <div className="p-4 sm:p-6 max-w-screen-xl mx-auto bg-gray-100 min-h-screen">
            <Header />

            {/* Stat Cards */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between mb-10">
                <StatCard title="Total Members" count={members.length} />
                <StatCard title="Active Members" count={activeCount} />
                <StatCard title="Expired Memberships" count={expiredCount} />
            </div>

            {/* Form + Table */}
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl text-indigo-700 mb-4 font-semibold">
                        {editingMember ? "Edit Member" : "Add New Member"}
                    </h2>
                    <div className="bg-white rounded-lg shadow p-4">
                        <MemberForm onAdd={addMember} editingMember={editingMember} />
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <h2 className="text-2xl text-indigo-700 mb-4 font-semibold">Members List</h2>
                    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
                        <MemberTable
                            members={filtered}
                            onDelete={deleteMember}
                            onEdit={editMember}
                            onSearch={searchMembers}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberList;
