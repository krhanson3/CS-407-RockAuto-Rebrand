import { createContext, useContext, useEffect, useState } from "react";
import type { Address } from "../../types/types";

type SavedAddressContextType = {
  savedAddresses: Address[];
  addAddress: (addr: Omit<Address, "id">) => void;
  updateAddress: (id: number, updated: Partial<Address>) => void;
  removeAddress: (id: number) => void;
};

const SavedAddressContext = createContext<SavedAddressContextType | undefined>(undefined);

export function SavedAddressProvider({ children }: { children: React.ReactNode }) {
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    const stored = localStorage.getItem("savedAddresses");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  const addAddress = (addr: Omit<Address, "id">) => {
    setSavedAddresses(prev => [
      ...prev,
      { id: Date.now(), ...addr }
    ]);
  };

  const updateAddress = (id: number, updated: Partial<Address>) => {
    setSavedAddresses(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updated } : a))
    );
  };

  const removeAddress = (id: number) => {
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <SavedAddressContext.Provider
      value={{ savedAddresses, addAddress, updateAddress, removeAddress }}
    >
      {children}
    </SavedAddressContext.Provider>
  );
}

export function useSavedAddresses() {
  const ctx = useContext(SavedAddressContext);
  if (!ctx) throw new Error("useSavedAddresses must be used inside SavedAddressProvider");
  return ctx;
}
