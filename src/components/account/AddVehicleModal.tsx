// src/components/modals/AddVehicleModal.tsx
import React from "react";

type VehicleForm = {
  year: string;
  make: string;
  model: string;
  engine: string;
};

type Props = {
  show: boolean;
  onClose: () => void;
  form: VehicleForm;
  setForm: React.Dispatch<React.SetStateAction<VehicleForm>>;
  onAdd: () => void;
};

export function AddVehicleModal({ show, onClose, form, setForm, onAdd }: Props) {
  if (!show) return null;

  const update = (field: keyof VehicleForm, value: string) =>
    setForm({ ...form, [field]: value });

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">Add New Vehicle</h3>

        <input
          className="modalInput"
          placeholder="Year"
          value={form.year}
          onChange={(e) => update("year", e.target.value)}
        />

        <input
          className="modalInput"
          placeholder="Make"
          value={form.make}
          onChange={(e) => update("make", e.target.value)}
        />

        <input
          className="modalInput"
          placeholder="Model"
          value={form.model}
          onChange={(e) => update("model", e.target.value)}
        />

        <input
          className="modalInput"
          placeholder="Engine"
          value={form.engine}
          onChange={(e) => update("engine", e.target.value)}
        />

        <div className="modalBtns">
          <button className="saveBtn" onClick={onAdd}>Add</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
