/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { AuthContextType, AuthProviderProps, User, SignupData } from "./types";
import { PatientData } from "@/types/patient";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  signIn: async () => false,
  signOut: () => {},
  creationOfPatient: () => {},
});

const SESSION_KEY = "easyCareSession";

function readSessionUser(): User | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    return parsed.fullName && parsed.userRole ? parsed : null;
  } catch {
    return null;
  }
}

function persistUser(user: User | null) {
  if (user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserState] = useState<User | null>(() => readSessionUser());
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = (next: User | null) => {
    setUserState(next);
    persistUser(next);
  };

  const signup = async (data: SignupData) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        ...data,
        name: fullName,
      })
    );

    setUser({
      fullName,
      userRole: data.userRole,
    });

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  const signIn = async (
    username: string,
    password: string,
    selectedRole?: string
  ): Promise<boolean> => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password.trim()) return false;

    if (selectedRole) {
      setUser({
        fullName: trimmedUsername,
        userRole: selectedRole,
      });
      return true;
    }

    const stored = localStorage.getItem("mockUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      const matchesUser =
        (parsed.username === trimmedUsername ||
          parsed.email === trimmedUsername) &&
        parsed.password === password;
      if (matchesUser) {
        const nameFromSignup =
          parsed.name ||
          `${parsed.firstName ?? ""} ${parsed.lastName ?? ""}`.trim();
        setUser({
          fullName: nameFromSignup || parsed.username || trimmedUsername,
          userRole: parsed.userRole,
        });
        return true;
      }
    }

    return false;
  };

  const signOut = () => {
    localStorage.removeItem("mockUser");
    setUser(null);
  };

  const creationOfPatient = (data: PatientData) => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    const updated = [...stored, data];
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, signIn, signOut, creationOfPatient }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
