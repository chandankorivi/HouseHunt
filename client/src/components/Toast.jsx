import { useState, useEffect } from "react";

let toastQueue = [];
let toastListener = null;

export function showToast(message, type = "info") {
    const id = Date.now();
    const toast = { id, message, type };
    toastQueue.push(toast);
    if (toastListener) toastListener([...toastQueue]);
}

export default function Toast() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        toastListener = setToasts;
        return () => { toastListener = null; };
    }, []);

    const remove = (id) => {
        toastQueue = toastQueue.filter(t => t.id !== id);
        setToasts([...toastQueue]);
    };

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                const oldest = toasts[0];
                if (oldest) remove(oldest.id);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [toasts]);

    const colors = {
        success: "#22c55e",
        error: "#ef4444",
        info: "#6366f1",
        warning: "#f59e0b"
    };

    const icons = {
        success: "✅",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️"
    };

    return (
        <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    onClick={() => remove(toast.id)}
                    style={{
                        background: "#1e1b4b",
                        border: `1px solid ${colors[toast.type] || colors.info}`,
                        color: "#fff",
                        padding: "12px 18px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        minWidth: "260px",
                        maxWidth: "380px",
                        animation: "slideIn 0.3s ease",
                        fontSize: "14px"
                    }}
                >
                    <span>{icons[toast.type] || icons.info}</span>
                    <span>{toast.message}</span>
                </div>
            ))}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
            `}</style>
        </div>
    );
}
