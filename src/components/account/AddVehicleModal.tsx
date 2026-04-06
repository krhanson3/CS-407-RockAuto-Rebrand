// src/components/modals/AddVehicleModal.tsx
import React from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onAdd: () => void;
};

export function AddVehicleModal({ show, onClose, value, setValue, onAdd }: Props) {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">Add New Vehicle</h3>

        <input
          className="modalInput"
          placeholder="e.g. 2020 Hyundai Sonata"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="modalBtns">
          <button className="saveBtn" onClick={onAdd}>Add</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
