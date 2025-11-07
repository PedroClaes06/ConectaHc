import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User, AuthCredentials } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'conectahc_user';
const COOKIE_KEY = 'conectahc_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    const cookieAuth = Cookies.get(COOKIE_KEY);

    if (storedUser && cookieAuth) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(STORAGE_KEY);
        Cookies.remove(COOKIE_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    try {
      if (credentials.email === 'pedro@gmail.com' && credentials.password === 'pedro123') {
        const userData: User = {
          id: '1',
          email: credentials.email,
          name: 'Pedro Silva',
          role: 'patient',
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        Cookies.set(COOKIE_KEY, 'authenticated', { expires: 7 });
        setUser(userData);
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    Cookies.remove(COOKIE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
