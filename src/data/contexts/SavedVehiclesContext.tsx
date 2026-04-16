import { createContext, useContext, useState, useEffect } from "react";

export type SavedVehicle = {
  id: number;
  make: string;
  model: string;
  year: string;
  engine: string;
};

type SavedVehiclesContextType = {
  savedVehicles: SavedVehicle[];
  addVehicle: (vehicle: Omit<SavedVehicle, "id">) => void;
  updateVehicle: (id: number, updated: Partial<SavedVehicle>) => void;
  removeVehicle: (id: number) => void;
};

const SavedVehiclesContext = createContext<SavedVehiclesContextType | null>(null);

export function SavedVehiclesProvider({ children }: { children: React.ReactNode }) {
  const [savedVehicles, setSavedVehicles] = useState<SavedVehicle[]>([]);

  // Optional: persist to localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedVehicles");
    if (stored) setSavedVehicles(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedVehicles", JSON.stringify(savedVehicles));
  }, [savedVehicles]);

  const addVehicle = (vehicle: Omit<SavedVehicle, "id">) => {
    setSavedVehicles((prev) => [
      ...prev,
      { id: Date.now(), ...vehicle }
    ]);
  };

  const updateVehicle = (id: number, updated: Partial<SavedVehicle>) => {
    setSavedVehicles(prev =>
      prev.map(v => (v.id === id ? { ...v, ...updated } : v)));
  };


  const removeVehicle = (id: number) => {
    setSavedVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <SavedVehiclesContext.Provider value={{ savedVehicles, addVehicle, updateVehicle, removeVehicle }}>
      {children}
    </SavedVehiclesContext.Provider>
  );
}

export function useSavedVehicles() {
  const ctx = useContext(SavedVehiclesContext);
  if (!ctx) throw new Error("useSavedVehicles must be used inside SavedVehiclesProvider");
  return ctx;
}
