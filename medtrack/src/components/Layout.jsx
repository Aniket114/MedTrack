import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
