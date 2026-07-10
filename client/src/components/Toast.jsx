import { useState, useEffect } from "react";
import "./Toast.css";

let toastQueue = [];
let listeners = [];

function notify(listeners) {
    listeners.forEach((l) => l([...toastQueue]));
}

export function showToast(message, type = "success", duration = 3500) {
    const id = Date.now() + Math.random();
    toastQueue.push({ id, message, type });
    notify(listeners);
    setTimeout(() => {
        toastQueue = toastQueue.filter((t) => t.id !== id);
        notify(listeners);
    }, duration);
}

export default function Toast() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handler = (q) => setToasts([...q]);
        listeners.push(handler);
        return () => {
            listeners = listeners.filter((l) => l !== handler);
        };
    }, []);

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast toast-${toast.type} animate-toast`}>
                    <span className="toast-icon">
                        {toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : "ℹ️"}
                    </span>
                    <span className="toast-message">{toast.message}</span>
                </div>
            ))}
        </div>
    );
}
