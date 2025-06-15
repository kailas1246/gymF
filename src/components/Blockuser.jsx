// src/pages/BlockUser.jsx
import { useState } from 'react';
import { ShieldX, Mail } from 'lucide-react';

const BlockUser = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleBlock = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/admin/block-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
            } else {
                setStatus({ type: 'success', message: data.message });
                setEmail('');
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Server error.' });
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4 py-10">
            <div className="bg-[#1e293b] w-full max-w-md rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-center mb-6">
                    <ShieldX className="text-red-500 w-8 h-8 mr-2" />
                    <h1 className="text-2xl font-bold">Block a User</h1>
                </div>

                <form onSubmit={handleBlock} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm mb-1">User Email</label>
                        <div className="flex items-center bg-[#334155] rounded-lg px-3 py-2">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-transparent focus:outline-none text-white"
                                placeholder="Enter user's email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 transition-all py-2 rounded-lg font-bold"
                    >
                        Block User
                    </button>
                </form>

                {status.message && (
                    <div
                        className={`mt-4 p-3 rounded-lg text-sm text-center ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                            }`}
                    >
                        {status.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockUser;
