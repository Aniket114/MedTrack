import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-r from-blue-200 via-white to-blue-100 text-gray-800 py-20 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-12">
        <h1 className="text-4xl font-extrabold mb-6 tracking-wide text-center text-blue-700">
          About <span className="text-blue-500">MedTrack</span>
        </h1>
        <p className="text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          MedTrack is your personal health assistant, designed to ensure you never miss a dose. 
          Our app combines simplicity, speed, and reliability so you can focus on your health — not on remembering your medication times.
        </p>
        <div className="flex justify-center mb-6">
          <img
  src="/image/aboutus1.png"
  alt="Medicine icon"
  loading="lazy"
  className="w-52 h-52 rounded-full object-cover shadow-lg border-4 border-indigo-300 hover:scale-105 transition-transform duration-500"
/>

        </div>
        <p className="text-base max-w-3xl mx-auto text-center text-gray-700">
          With MedTrack, experience peace of mind knowing your medication schedule is under control. Our intuitive interface and real-time reminders ensure your health stays on track every day.
        </p>
      </div>
    </section>
  );
};

export default About;
