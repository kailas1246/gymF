import { useState, useEffect } from "react";
import { useNotification } from "./NotificationProvider";

export default function MemberForm({ onAdd, editingMember }) {
    const { showNotification } = useNotification();


    const [form, setForm] = useState({
        name: "",
        email: "",
        age: "",
        membershipType: "Monthly",
        membershipDate: "",
    });

    useEffect(() => {
        if (editingMember) {
            setForm({
                name: editingMember.name || "",
                email: editingMember.email || "",
                age: editingMember.age || "",
                membershipType: editingMember.membershipType || "Monthly",
                membershipDate: editingMember.membershipDate?.split("T")[0] || "",
            });
        } else {
            setForm({
                name: "",
                email: "",
                age: "",
                membershipType: "Monthly",
                membershipDate: "",
            });
        }
    }, [editingMember]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(form).some((v) => v === "")) {
            showNotification({
                type: "warning",
                message: "Please fill in all the fields!",
            });
            return;
        }

        onAdd(form);
        showNotification({
            type: editingMember ? "info" : "success",
            message: editingMember
                ? "Member updated successfully!"
                : "New member registered successfully!",
        });

        setForm({
            name: "",
            email: "",
            age: "",
            membershipType: "Monthly",
            membershipDate: "",
        });
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="input"
            />
            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="input"
            />
            <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="input"
            />

            <select
                name="membershipType"
                value={form.membershipType}
                onChange={handleChange}
                className="input"
            >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
            </select>

            <input
                name="membershipDate"
                type="date"
                value={form.membershipDate}
                onChange={handleChange}
                className="input"
            />

            <button
                type="submit"
                className="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded"
            >
                {editingMember ? "Update Member" : "Add Member"}
            </button>
        </form>
    );
}
