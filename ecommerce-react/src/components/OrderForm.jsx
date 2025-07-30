import React from "react";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function OrderForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, phone } = formData;
    if (!name || !address || !phone) {
      alert("All fields are required!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      <button type="submit">Place Order</button>
    </form>
  );
}
