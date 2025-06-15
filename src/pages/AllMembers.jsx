import React, { useState, useEffect } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/members`;

function AllMembers() {
    const [members, setMembers] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(API);
                setMembers(res.data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-100 text-gray-900 font-sans">
                <h1 className="text-4xl font-bold mb-10">All Members</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                    {members.map((m) => (
                        <div
                            key={m._id}
                            onClick={() => setSelected(m)}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") setSelected(m);
                            }}
                            className="bg-white border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
                        >
                            <div className="w-16 h-16 mb-3 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                                {m.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-lg font-semibold mb-1">{m.name}</h2>
                            <p className="text-sm text-gray-600 truncate">{m.email}</p>
                            <p className="text-xs text-gray-500 mt-1">Expires: {formatDate(m.membershipDate)}</p>
                        </div>
                    ))}
                </div>

                {selected && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setSelected(null)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl text-center relative"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                            >
                                &times;
                            </button>
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-400 flex items-center justify-center text-3xl text-white font-bold">
                                {selected.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-2xl font-bold">{selected.name}</h2>
                            <p className="text-gray-600">{selected.email}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Membership expires on {formatDate(selected.membershipDate)}
                            </p>
                            <hr className="my-4" />
                            <p className="text-sm text-gray-700">
                                This member has access to all standard features and is currently active in our database.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AllMembers;
