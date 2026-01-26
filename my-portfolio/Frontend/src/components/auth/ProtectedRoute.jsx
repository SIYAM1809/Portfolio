import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import './ProtectedRoute.css';

/**
 * ProtectedRoute Component
 * Redirects unauthorized users away from protected admin routes
 * Validates JWT token with backend before allowing access
 */
const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = auth status
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                // Verify token with backend
                const response = await api.get('/auth/verify');

                if (response.data.status === 'success') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="auth-loading">
                <div className="loading-spinner-container">
                    <div className="neon-spinner"></div>
                    <p>Verifying authentication...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render protected content
    return children;
};

export default ProtectedRoute;
