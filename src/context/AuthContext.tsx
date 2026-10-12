import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/automotive.js';
import { api, getAuthToken, setAuthToken } from '../lib/api.js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  requestOtp: (phone: string) => Promise<{ success: boolean; message: string; cooldownSeconds: number; devCode?: string }>;
  verifyOtp: (phone: string, code: string, countryCode: string, name?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadUser() {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { user: fetchedUser } = await api.getMe();
        setUser(fetchedUser);
      } catch (err) {
        console.warn('Session expired or invalid:', err);
        setAuthToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const requestOtp = async (phone: string) => {
    return api.requestOtp(phone);
  };

  const verifyOtp = async (phone: string, code: string, countryCode: string, name?: string): Promise<boolean> => {
    try {
      const result = await api.verifyOtp({
        phoneNumber: phone,
        code,
        countryCode,
        name
      });

      if (result.token && result.user) {
        setAuthToken(result.token);
        setUser(result.user);
        setIsAuthModalOpen(false);
        return true;
      }
      return false;
    } catch (err: any) {
      throw new Error(err.message || 'Verification failed');
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (err) {
      // ignore network error on logout
    }
    setAuthToken(null);
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    const res = await api.updateProfile(data);
    setUser(res.user);
  };

  const deleteAccount = async () => {
    await api.deleteAccount();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        requestOtp,
        verifyOtp,
        logout,
        updateProfile,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
