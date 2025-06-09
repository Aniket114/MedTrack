import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMedicine = () => {
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    time: '',
    days: [],
  });

  const [medData, setMedData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);

  // Fetch JSON data from public folder
  useEffect(() => {
    fetch('/medicineData.json')
      .then((res) => res.json())
      .then((data) => setMedData(data))
      .catch((err) => console.error('Failed to load medicine data:', err));
  }, []);

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'name') {
      const match = medData.filter((med) =>
        med.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(match.slice(0, 5));
      const exactMatch = medData.find(
        (med) => med.name.toLowerCase() === value.toLowerCase()
      );
      setSelectedInfo(exactMatch || null);
    }
  };

  const handleSelectSuggestion = (name) => {
    setForm({ ...form, name });
    setSuggestions([]);
    const match = medData.find((med) => med.name === name);
    setSelectedInfo(match || null);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'https://medtrack-backend-r6g5.onrender.com/api/medicine/add',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Medicine saved successfully');
      setForm({ name: '', dosage: '', time: '', days: [] });
      setSelectedInfo(null);
    } catch (err) {
      console.error('Error adding medicine:', err.response?.data);
      alert(err.response?.data?.message || 'Error adding medicine');
    }
  };

  return (
    // Outer wrapper for centering and spacing below navbar
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-gray-100 px-4">
      {/* Form container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Add New Medicine
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Medicine name with suggestions */}
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            className="w-full p-2 mb-2 border rounded text-black focus:outline-blue-500"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="bg-white shadow rounded text-black mb-4 max-h-40 overflow-y-auto border border-gray-300">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}

          {/* Dosage */}
          <input
            type="text"
            name="dosage"
            placeholder="Dosage (e.g., 500mg)"
            className="w-full p-2 mb-4 border rounded text-black focus:outline-blue-500"
            value={form.dosage}
            onChange={handleChange}
            required
          />

          {/* Time */}
          <input
            type="time"
            name="time"
            className="w-full p-2 mb-4 border rounded text-black focus:outline-blue-500"
            value={form.time}
            onChange={handleChange}
            required
          />

          {/* Days */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-800">
              Select Days
            </label>
            <div className="grid grid-cols-3 gap-3 text-sm text-black">
              {[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ].map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    name="days"
                    value={day}
                    checked={form.days.includes(day)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setForm({
                        ...form,
                        days: checked
                          ? [...form.days, value]
                          : form.days.filter((d) => d !== value),
                      });
                    }}
                    className="cursor-pointer"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
          >
            Save Medicine
          </button>
        </form>

        {/* Preview section */}
        {selectedInfo && (
          <div className="mt-8 p-4 bg-gray-50 rounded shadow text-black">
            <h3 className="text-xl font-bold mb-2">{selectedInfo.name}</h3>
            <img
              src={selectedInfo.image}
              alt={selectedInfo.name}
              className="w-40 h-40 object-contain mb-4 rounded mx-auto"
            />
            <p>
              <strong>Uses:</strong> {selectedInfo.uses}
            </p>
            <p>
              <strong>Side Effects:</strong> {selectedInfo.sideEffects}
            </p>
            <div>
              <strong>Age Safety:</strong>
              <ul className="list-disc ml-5 mt-1">
                <li>Children: {selectedInfo.ageSafety.children}</li>
                <li>Adults: {selectedInfo.ageSafety.adults}</li>
                <li>Elderly: {selectedInfo.ageSafety.elderly}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMedicine;
