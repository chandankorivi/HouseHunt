import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

// Helper: decode JWT and check expiry
function getTokenExpiry(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000; // convert to ms
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const expiry = getTokenExpiry(token);
        if (expiry && Date.now() > expiry) {
            localStorage.clear();
            return null;
        }
        return {
            token,
            role: localStorage.getItem("role"),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            userId: localStorage.getItem("userId"),
        };
    });

    const login = useCallback((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.userId || "");
        setUser({
            token: data.token,
            role: data.role,
            name: data.name,
            email: data.email,
            userId: data.userId,
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.clear();
        setUser(null);
    }, []);

    // Auto-logout when token expires
    useEffect(() => {
        if (!user?.token) return;
        const expiry = getTokenExpiry(user.token);
        if (!expiry) return;
        const remaining = expiry - Date.now();
        if (remaining <= 0) {
            logout();
            return;
        }
        const timer = setTimeout(() => {
            logout();
        }, remaining);
        return () => clearTimeout(timer);
    }, [user?.token, logout]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
