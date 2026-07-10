import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute – wraps any route that requires authentication.
 * Optionally accepts `roles` to restrict by role.
 * If not logged in → redirect to /login
 * If wrong role → redirect to /login
 */
export default function ProtectedRoute({ children, roles }) {
    const { user } = useAuth();

    if (!user || !user.token) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
