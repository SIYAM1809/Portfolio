import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './pages/admin/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Admin Routes */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

// Placeholder components - Replace these with your actual pages
const HomePage = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%)',
        color: '#00D9FF',
        fontSize: '2rem',
        fontWeight: 'bold'
    }}>
        Portfolio Home Page
        <br />
        <a href="/login" style={{ fontSize: '1rem', marginTop: '1rem', color: '#7B2FFF' }}>
            Go to Login
        </a>
    </div>
);

const LoginPage = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%)',
        color: '#00D9FF',
        gap: '1rem'
    }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Login Page</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Replace this with your actual login form
        </p>
        <button
            onClick={() => {
                // Demo: Set a fake token for testing
                localStorage.setItem('token', 'demo-token-12345');
                window.location.href = '/admin';
            }}
            style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #00D9FF, #7B2FFF)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
            }}
        >
            Demo Login (Sets Token)
        </button>
    </div>
);

export default App;
