// src/components/modals/AddAddressModal.tsx
import React from "react";
import type { Address } from "../../types/types";

type Props = {
  show: boolean;
  onClose: () => void;
  form: { name: string; line1: string; line2: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ name: string; line1: string; line2: string }>
  >;
  onAdd: (addr: Omit<Address, "id">) => void;
};

export function AddAddressModal({ show, onClose, form, setForm, onAdd }: Props) {
  if (!show) return null;

  const handleAdd = () => {
    // Expecting "City, ST 12345"
    const [cityPart, stateZipPart] = form.line2.split(",");
    const city = cityPart?.trim() || "";

    const [state, zip] = stateZipPart
      ? stateZipPart.trim().split(" ")
      : ["", ""];

    onAdd({
      name: form.name,
      line1: form.line1,
      line2: form.line2,
      city,
      state,
      zip
    });

    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">Add New Address</h3>

        <input
          className="modalInput"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="modalInput"
          placeholder="Address Line 1"
          value={form.line1}
          onChange={(e) => setForm({ ...form, line1: e.target.value })}
        />

        <input
          className="modalInput"
          placeholder="City, State ZIP"
          value={form.line2}
          onChange={(e) => setForm({ ...form, line2: e.target.value })}
        />

        <div className="modalBtns">
          <button className="saveBtn" onClick={handleAdd}>Add</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
