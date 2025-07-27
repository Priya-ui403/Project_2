import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Upload from './pages/Upload';
import Results from './pages/Results';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { OCRProvider } from "./contexts/OCRContext";

function App() {
  return (
    <AuthProvider>
      <OCRProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Landing Page Route */}
              <Route path="/" element={<LandingPage />} />

            {/* Auth Pages */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />  {/* ✅ case fixed */}

            {/* Protected App Routes */}
            <Route path="/app" element={<Layout />}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="upload" element={<Upload />} />
              <Route path="results" element={<Results />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      </OCRProvider>
    </AuthProvider>
  );
}

export default App;
