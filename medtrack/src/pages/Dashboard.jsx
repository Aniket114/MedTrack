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
      const res = await axios.get("http://localhost:5000/api/medicine/all", {
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
    const updated = [...takenMeds, id];
    setTakenMeds(updated);
    localStorage.setItem("takenMeds", JSON.stringify(updated));
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/medicine/${id}`, {
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
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Medicines</h2>

      {medicines.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-800 mb-1 font-medium">
            Daily Progress: {takenMeds.length} of {medicines.length} taken
          </p>
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all duration-500 text-right pr-2 text-white text-sm font-bold flex items-center justify-end"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}

      {medicines.length === 0 ? (
        <p className="text-gray-700">No medicines added yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {medicines.map((med) => {
            const isTaken = takenMeds.includes(med._id);
            return (
              <motion.li
                key={med._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className={`border rounded p-4 shadow bg-white text-gray-900 relative ${
                  isTaken ? "opacity-60" : ""
                }`}
              >
                <h3 className="font-bold text-lg">{med.name}</h3>
                <p><strong>Dosage:</strong> {med.dosage}</p>
                <p>
                  <strong>Time:</strong>{" "}
                  {Array.isArray(med.time) ? med.time[0] : med.time}
                  <span className="ml-2 text-sm text-blue-600">
                    ⏳ {getCountdown(med.time, med.days)}
                  </span>
                </p>
                <p>
                  <strong>Days:</strong>{" "}
                  {Array.isArray(med.days) ? med.days.join(", ") : med.days || "-"}
                </p>

                {!isTaken ? (
                  <button
                    onClick={() => handleMarkTaken(med._id)}
                    className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-200"
                  >
                    Mark as Taken
                  </button>
                ) : (
                  <p className="text-green-700 font-semibold mt-3">✅ Taken</p>
                )}

                <button
                  onClick={() => handleDelete(med._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </motion.li>
            );
          })}
        </ul>
      )}

      <WeeklyCalendar medicines={medicines} />
    </div>
  );
};

export default Dashboard;
