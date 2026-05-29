/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const TOKEN_KEY = "admin_auth_token";
const API_BASE_URL = "http://127.0.0.1:8000/api";

// Helper بسيط لأي request للـ API.
async function sendRequest(url, token = null, options = {}) {
  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || "Request failed";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // منين كيتحل التطبيق، كنشوفو واش token قديم باقي صالح.
  useEffect(() => {
    async function checkSavedToken() {
      const savedToken = localStorage.getItem(TOKEN_KEY);

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await sendRequest("/admin/me", savedToken);
        setToken(savedToken);
        setUser(currentUser);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    }

    checkSavedToken();
  }, []);

  async function login(formData) {
    const data = await sendRequest("/admin/login", null, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  }

  async function logout() {
    try {
      if (token) {
        await sendRequest("/admin/logout", token, { method: "POST" });
      }
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    }
  }

  // استعمل هادي لأي route محمي فـ Laravel.
  async function apiRequest(url, options = {}) {
    if (!token) {
      throw new Error("Not authenticated");
    }

    try {
      return await sendRequest(url, token, options);
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      }

      throw error;
    }
  }

  const value = {
    apiRequest,
    isAuthenticated: Boolean(token),
    loading,
    login,
    logout,
    token,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
