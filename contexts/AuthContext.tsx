import { authService } from "@/services/authService";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type User = {
  id?: number | string;
  email?: string;
  name?: string;
  [key: string]: unknown;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const sessionUser = await authService.verifySession();
        setUser(sessionUser ?? null);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(email, password);
      const nextUser =
        response?.user ?? (response ? { email: email.trim() } : null);
      setUser(nextUser);

      return true;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Connexion impossible. Vérifiez vos identifiants.";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      error,
      login,
      logout,
      clearError,
      setUser,
    }),
    [user, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
