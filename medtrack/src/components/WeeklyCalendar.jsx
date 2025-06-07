import React from "react";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyCalendar = ({ medicines }) => {
  const getMedsForDay = (day) => {
    return medicines.filter((med) => {
      return med.days && med.days.includes(day);
    });
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Weekly Calendar</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {weekdays.map((day) => (
          <div key={day} className="bg-white rounded-lg shadow p-3">
            <h4 className="font-bold text-blue-600 mb-2 text-sm text-center">{day}</h4>
            {getMedsForDay(day).length === 0 ? (
              <p className="text-gray-400 text-sm text-center">No meds</p>
            ) : (
              <ul className="space-y-1">
                {getMedsForDay(day).map((med) => (
                  <li
                    key={med._id + day}
                    className="text-sm text-gray-800 border rounded px-2 py-1 bg-blue-50"
                  >
                    💊 {med.name} @ {med.time}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
