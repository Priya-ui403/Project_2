import React, { createContext, useContext, useState, useEffect } from "react";

// Interfaces
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface FraudResult {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  riskScore: number;
  fraudType: string;
  description: string;
  patientId: string;
  doctor: string;
  medication: string;
  location: string;
  status: "active" | "investigating" | "resolved";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  fraudResults: FraudResult[];
  addFraudResult: (result: FraudResult) => void;
  updateFraudResult: (id: string, updates: Partial<FraudResult>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔵 Backend API base URL
const API_BASE_URL = "http://localhost:8000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fraudResults, setFraudResults] = useState<FraudResult[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // ✅ Updated login function to connect to FastAPI backend
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setIsLoading(false);
        return false;
      }

      const data = await response.json();

      const userData: User = {
        id: data.user_id,
        email: email,
        name: data.username || "User",
        role: "User",
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        setIsLoading(false);
        return false;
      }

      const data = await response.json();

      const userData: User = {
        id: data.user_id || Date.now().toString(),
        email,
        name,
        role: "Healthcare Professional",
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addFraudResult = (result: FraudResult) => {
    setFraudResults((prev) => [result, ...prev]);
  };

  const updateFraudResult = (
    id: string,
    updates: Partial<FraudResult>
  ) => {
    setFraudResults((prev) =>
      prev.map((result) =>
        result.id === id ? { ...result, ...updates } : result
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        fraudResults,
        addFraudResult,
        updateFraudResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
