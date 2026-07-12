"use client";
import { createContext, useContext, useState } from "react";
import { styles } from "./styles";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);

  function showToast(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2400);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && <div style={styles.toast}>{message}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast doit être utilisé dans ToastProvider");
  return ctx;
}
