export default function MemberTable({ members, onDelete, onEdit, onSearch }) {
    return (
        <div>
            <input
                type="text"
                placeholder="Search members..."
                onChange={(e) => onSearch(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Age</th>
                        <th className="p-2 border">Membership Type</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((m) => (
                        <tr key={m._id}>
                            <td className="p-2 border">{m.name}</td>
                            <td className="p-2 border">{m.email}</td>
                            <td className="p-2 border">{m.age}</td>
                            <td className="p-2 border">{m.membershipType}</td>
                            <td className="p-2 border">
                                {new Date(m.membershipDate).toLocaleDateString()}
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => onEdit(m._id)}
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(m._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
