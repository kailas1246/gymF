import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        amount: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/payment/create-payment-link`, form);
            window.location.href = response.data.payment_url; // Redirect to Razorpay payment link
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-white flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Gym Management Payment</h1>

                <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full mb-3 p-3 bg-gray-200 rounded-lg" />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full mb-3 p-3 bg-gray-200 rounded-lg" />
                <input name="contact" type="tel" placeholder="Phone Number" value={form.contact} onChange={handleChange} className="w-full mb-3 p-3 bg-gray-200 rounded-lg" />
                <input name="amount" type="number" placeholder="Amount in INR" value={form.amount} onChange={handleChange} className="w-full mb-6 p-3 bg-gray-200 rounded-lg" />

                <button onClick={handlePayment} className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition">
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default Payment;
