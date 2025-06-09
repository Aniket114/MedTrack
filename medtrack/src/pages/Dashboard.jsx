import React, { useEffect, useState } from "react";
import axios from "axios";
import WeeklyCalendar from "../components/WeeklyCalendar";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [takenMeds, setTakenMeds] = useState(() => {
    const saved = localStorage.getItem("takenMeds");
    return saved ? JSON.parse(saved) : [];
  });
  const [remindedMeds, setRemindedMeds] = useState(() => {
    const saved = localStorage.getItem("remindedMeds");
    return saved ? JSON.parse(saved) : {};
  });

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const fetchMeds = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://medtrack-backend-r6g5.onrender.com/api/medicine/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetched = res.data.medicines;
      setMedicines(fetched);

      const validTaken = takenMeds.filter((id) =>
        fetched.some((med) => med._id === id)
      );
      setTakenMeds(validTaken);
      localStorage.setItem("takenMeds", JSON.stringify(validTaken));
    } catch (err) {
      alert("Error fetching medicines");
      console.error(err.response?.data);
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkReminder = () => {
      const now = new Date();
      const nowTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:00`;

      medicines.forEach((med) => {
        const time =
          typeof med.time === "string"
            ? med.time
            : Array.isArray(med.time)
            ? med.time[0]
            : "00:00";

        const [h, m] = time.split(":");
        const targetTime = `${h}:${m}:00`;
        const todayKey = new Date().toISOString().split("T")[0];
        const medKey = `${med._id}_${todayKey}`;

        if (
          Array.isArray(med.days) &&
          med.days.includes(today) &&
          nowTime === targetTime &&
          !remindedMeds[medKey]
        ) {
          showNotification(med.name);
          const updated = { ...remindedMeds, [medKey]: true };
          setRemindedMeds(updated);
          localStorage.setItem("remindedMeds", JSON.stringify(updated));
        }
      });
    };

    const interval = setInterval(checkReminder, 1000);
    return () => clearInterval(interval);
  }, [medicines, remindedMeds, today]);

  const showNotification = (medicineName) => {
    if (Notification.permission === "granted") {
      new Notification(`💊 Time to take: ${medicineName}`);
      const audio = new Audio("/beep.mp3");
      audio.play().catch(() => {});
    }
  };

  const getCountdown = (targetTimeRaw, medDays) => {
    const targetTime = Array.isArray(targetTimeRaw)
      ? targetTimeRaw[0]
      : targetTimeRaw;

    if (!targetTime || typeof targetTime !== "string" || !targetTime.includes(":")) {
      return "00:00:00";
    }

    if (!Array.isArray(medDays) || medDays.length === 0) {
      return "Not scheduled";
    }

    const [targetHour, targetMinute] = targetTime.split(":").map(Number);
    const now = new Date();

    const weekdays = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const todayIndex = now.getDay();

    for (let i = 0; i < 7; i++) {
      const dayIndex = (todayIndex + i) % 7;
      const dayName = weekdays[dayIndex];

      if (medDays.includes(dayName)) {
        const next = new Date(now);
        next.setDate(now.getDate() + i);
        next.setHours(targetHour, targetMinute, 0, 0);

        const diff = next - now;
        if (diff <= 0) continue;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        return `${days > 0 ? `${days}d ` : ""}${hrs
          .toString()
          .padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`;
      }
    }

    return "00:00:00";
  };

  const handleMarkTaken = (id) => {
    if (!takenMeds.includes(id)) {
      const updated = [...takenMeds, id];
      setTakenMeds(updated);
      localStorage.setItem("takenMeds", JSON.stringify(updated));
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://medtrack-backend-r6g5.onrender.com/api/medicine/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Deleted successfully");

      const updatedMeds = medicines.filter((m) => m._id !== id);
      setMedicines(updatedMeds);

      const updatedTaken = takenMeds.filter((tid) => tid !== id);
      setTakenMeds(updatedTaken);
      localStorage.setItem("takenMeds", JSON.stringify(updatedTaken));
    } catch (err) {
      alert("Error deleting medicine");
      console.error(err.response?.data);
    }
  };

  const progress =
    medicines.length === 0
      ? 0
      : Math.round((takenMeds.length / medicines.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-28 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-indigo-800 text-center">
        Your Medicines
      </h2>

      {/* Progress Bar */}
      {medicines.length > 0 && (
        <div className="mb-10 max-w-xl mx-auto">
          <p className="text-gray-700 mb-2 font-semibold text-center">
            Daily Progress: {takenMeds.length} of {medicines.length} taken
          </p>
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className="bg-green-600 h-full text-white text-sm font-bold flex items-center justify-end pr-3 transition-all duration-700"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}

      {/* Medicines Grid */}
      {medicines.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No medicines added yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {medicines.map((med) => {
            const isTaken = takenMeds.includes(med._id);
            return (
              <motion.li
                key={med._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
                className={`relative bg-white rounded-xl border border-gray-200 p-6 shadow-md flex flex-col justify-between transition-opacity duration-300 ${
                  isTaken ? "opacity-60" : "opacity-100"
                }`}
              >
                <div>
                  <h3 className="text-xl font-extrabold text-indigo-900 mb-1 truncate">
                    {med.name}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Dosage:</strong> {med.dosage || "-"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Time:</strong>{" "}
                    {Array.isArray(med.time) ? med.time[0] : med.time || "-"}
                    <span className="ml-2 text-blue-600 font-mono text-sm">
                      ⏳ {getCountdown(med.time, med.days)}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Days:</strong>{" "}
                    {Array.isArray(med.days) ? med.days.join(", ") : med.days || "-"}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {!isTaken ? (
                    <button
                      onClick={() => handleMarkTaken(med._id)}
                      className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white rounded-md py-2 font-semibold"
                    >
                      Mark as Taken
                    </button>
                  ) : (
                    <p className="text-green-700 font-semibold text-center">✅ Taken</p>
                  )}

                  <button
                    onClick={() => handleDelete(med._id)}
                    className="bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white rounded-md py-2 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}

      <div className="mt-16">
        <WeeklyCalendar medicines={medicines} />
      </div>
    </div>
  );
};

export default Dashboard;
