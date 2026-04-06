// src/components/modals/ChangePasswordModal.tsx
import React from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  form: { current: string; new1: string; new2: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ current: string; new1: string; new2: string }>
  >;
  onSave: () => void;
};

export function ChangePasswordModal({ show, onClose, form, setForm, onSave }: Props) {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">Change Password</h3>

        <input
          className="modalInput"
          placeholder="Current Password"
          type="password"
          value={form.current}
          onChange={(e) => setForm({ ...form, current: e.target.value })}
        />

        <input
          className="modalInput"
          placeholder="New Password"
          type="password"
          value={form.new1}
          onChange={(e) => setForm({ ...form, new1: e.target.value })}
        />

        <input
          className="modalInput"
          placeholder="Confirm New Password"
          type="password"
          value={form.new2}
          onChange={(e) => setForm({ ...form, new2: e.target.value })}
        />

        <div className="modalBtns">
          <button className="saveBtn" onClick={onSave}>Save</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
