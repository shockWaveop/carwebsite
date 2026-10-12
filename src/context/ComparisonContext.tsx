import React, { createContext, useContext, useState, useEffect } from 'react';

interface ComparisonContextType {
  comparisonIds: string[];
  addVehicle: (id: string) => boolean;
  removeVehicle: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonIds, setComparisonIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('autoverse_comparison');
      return stored ? JSON.parse(stored) : ['car-porsche-taycan-turbo-s', 'car-tesla-model-s-plaid'];
    } catch {
      return ['car-porsche-taycan-turbo-s', 'car-tesla-model-s-plaid'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('autoverse_comparison', JSON.stringify(comparisonIds));
    } catch {
      // storage quota or disabled
    }
  }, [comparisonIds]);

  const addVehicle = (id: string): boolean => {
    if (comparisonIds.includes(id)) return true;
    if (comparisonIds.length >= 4) {
      alert('You can compare a maximum of 4 vehicles at a time. Please remove one first.');
      return false;
    }
    setComparisonIds((prev) => [...prev, id]);
    return true;
  };

  const removeVehicle = (id: string) => {
    setComparisonIds((prev) => prev.filter((item) => item !== id));
  };

  const clearComparison = () => {
    setComparisonIds([]);
  };

  const isInComparison = (id: string) => comparisonIds.includes(id);

  return (
    <ComparisonContext.Provider
      value={{
        comparisonIds,
        addVehicle,
        removeVehicle,
        clearComparison,
        isInComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error('useComparison must be used within ComparisonProvider');
  return ctx;
}
