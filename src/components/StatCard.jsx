export default function StatCard({ title, count }) {
    return (
        <div className="bg-indigo-700 text-white p-5 rounded-xl shadow-md w-full sm:w-1/3 text-center">
            <h2 className="text-2xl mb-2">{title}</h2>
            <p className="text-3xl font-bold">{count}</p>
        </div>
    );
}
