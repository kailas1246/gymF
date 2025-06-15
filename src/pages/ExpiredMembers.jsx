import { useEffect, useState } from "react";
import axios from "axios";
import { UserX2, RotateCw, X } from "lucide-react";

function ExpiredMembers() {
    const [expiredMembers, setExpiredMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [reactivateMonths, setReactivateMonths] = useState(1);
    const API = `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`;

    useEffect(() => {
        fetchExpiredMembers();
    }, []);

    const fetchExpiredMembers = async () => {
        try {
            const res = await axios.get(API);
            const today = new Date();
            const expired = res.data.filter(
                (m) => new Date(m.membershipDate) < today
            );
            setExpiredMembers(expired);
        } catch (err) {
            console.error("Fetch error", err);
        }
    };

    const handleReactivate = async (memberId, monthsToAdd) => {
        try {
            const newDate = new Date();
            newDate.setMonth(newDate.getMonth() + parseInt(monthsToAdd));
            const res = await axios.put(`${API}/${memberId}`, {
                membershipDate: newDate.toISOString(),
            });
            setExpiredMembers((prev) => prev.filter((m) => m._id !== memberId));
            setSelectedMember(null);
        } catch (err) {
            console.error("Reactivate error", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br bg-gray-100 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r bg-indigo-700 mb-12">
                    Expired Members
                </h1>

                {expiredMembers.length === 0 ? (
                    <p className="text-center text-gray-400 text-lg">
                        🎉 All memberships are active!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {expiredMembers.map((member) => (
                            <div
                                key={member._id}
                                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-red-600/30 transition-all duration-300 hover:scale-[1.025]"
                            >
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                                        {member.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {member.name}
                                        </h2>
                                        <p className="text-sm text-black">{member.email}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-black mt-2">
                                    Expired On:{" "}
                                    {new Date(member.membershipDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 shadow-inner shadow-red-500/20">
                                        Membership Expired
                                    </span>
                                    <UserX2 className="text-red-500 w-5 h-5" />
                                </div>

                                <button
                                    onClick={() => setSelectedMember(member)}
                                    className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/40 transition-all"
                                >
                                    <RotateCw className="w-4 h-4" />
                                    Reactivate
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Reactivate Modal */}
            {selectedMember && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full text-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                                Reactivate {selectedMember.name}
                            </h2>
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-400 mb-4">
                            How many months do you want to extend?
                        </p>

                        <select
                            value={reactivateMonths}
                            onChange={(e) => setReactivateMonths(e.target.value)}
                            className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-800 text-white border border-white/10 focus:outline-none"
                        >
                            {[1, 2, 3, 6, 12].map((m) => (
                                <option key={m} value={m}>
                                    {m} Month{m > 1 ? "s" : ""}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-between gap-4">
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="w-full py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    handleReactivate(selectedMember._id, reactivateMonths)
                                }
                                className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExpiredMembers;
