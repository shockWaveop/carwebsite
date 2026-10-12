import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.js';
import { api } from '../lib/api.js';

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (vehicleId: string) => Promise<boolean>;
  isFavorite: (vehicleId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('autoverse_favorites');
      return stored ? JSON.parse(stored) : ['car-porsche-taycan-turbo-s', 'car-ferrari-296-gtb'];
    } catch {
      return ['car-porsche-taycan-turbo-s'];
    }
  });

  // When user logs in, sync favorites from backend
  useEffect(() => {
    if (user) {
      api.getFavorites()
        .then((res) => {
          const ids = res.favorites.map((v) => v.id);
          setFavoriteIds(ids);
          localStorage.setItem('autoverse_favorites', JSON.stringify(ids));
        })
        .catch((err) => console.warn('Could not load user favorites:', err));
    }
  }, [user]);

  const toggleFavorite = async (vehicleId: string): Promise<boolean> => {
    if (user) {
      try {
        const res = await api.toggleFavorite(vehicleId);
        setFavoriteIds(res.favorites);
        localStorage.setItem('autoverse_favorites', JSON.stringify(res.favorites));
        return res.isFavorite;
      } catch (err) {
        console.warn('Backend favorite sync failed, falling back to local state:', err);
      }
    }

    // Local fallback for anonymous visitors
    let updated: string[];
    let isFav = false;
    if (favoriteIds.includes(vehicleId)) {
      updated = favoriteIds.filter((id) => id !== vehicleId);
      isFav = false;
    } else {
      updated = [...favoriteIds, vehicleId];
      isFav = true;
    }
    setFavoriteIds(updated);
    localStorage.setItem('autoverse_favorites', JSON.stringify(updated));
    return isFav;
  };

  const isFavorite = (vehicleId: string) => favoriteIds.includes(vehicleId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
