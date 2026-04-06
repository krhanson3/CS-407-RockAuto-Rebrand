// src/components/modals/AddAddressModal.tsx
import React from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  form: { name: string; line1: string; line2: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ name: string; line1: string; line2: string }>
  >;
  onAdd: () => void;
};

export function AddAddressModal({ show, onClose, form, setForm, onAdd }: Props) {
  if (!show) return null;

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
          <button className="saveBtn" onClick={onAdd}>Add</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
