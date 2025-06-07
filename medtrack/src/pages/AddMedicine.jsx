import React, { useState } from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    time: '',
    days: []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'https://medtrack-backend-r6g5.onrender.com/api/medicine/add',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Medicine saved successfully');
      setForm({ name: '', dosage: '', time: '', days: [] }); // ✅ Reset
    } catch (err) {
      console.error("Error adding medicine:", err.response?.data);
      alert(err.response?.data?.message || 'Error adding medicine');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Medicine</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          className="w-full p-2 mb-4 border rounded text-black placeholder-gray-400 bg-white"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dosage"
          placeholder="Dosage (e.g., 500mg)"
          className="w-full p-2 mb-4 border rounded text-black placeholder-gray-400 bg-white"
          value={form.dosage}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          className="w-full p-2 mb-4 border rounded text-black placeholder-gray-400 bg-white"
          value={form.time}
          onChange={handleChange}
          required
        />

        {/* ✅ Days checkboxes */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-800">Select Days</label>
          <div className="grid grid-cols-3 gap-2 text-sm text-black">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="days"
                  value={day}
                  checked={form.days.includes(day)}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      setForm({ ...form, days: [...form.days, value] });
                    } else {
                      setForm({
                        ...form,
                        days: form.days.filter((d) => d !== value),
                      });
                    }
                  }}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
