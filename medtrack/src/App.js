import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddMedicine from './pages/AddMedicine';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Layout><Landing /></Layout>} />
  <Route path="/about" element={<Layout><About /></Layout>} />
  <Route path="/contact" element={<Layout><Contact /></Layout>} />
  <Route path="/signup" element={<Layout><Signup /></Layout>} />
  <Route path="/login" element={<Layout><Login /></Layout>} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Layout><Dashboard /></Layout>
      </ProtectedRoute>
    }
  />
  <Route
    path="/add"
    element={
      <ProtectedRoute>
        <Layout><AddMedicine /></Layout>
      </ProtectedRoute>
    }
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;
