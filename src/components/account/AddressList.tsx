// src/components/account/AddressList.tsx
import React from "react";
import type { Address } from "../../types/types";

type Props = {
  addresses: Address[];
  editingIndex: number | null;
  editForm: { name: string; line1: string; line2: string };
  setEditForm: React.Dispatch<
    React.SetStateAction<{ name: string; line1: string; line2: string }>
  >;
  startEdit: (addr: Address, index: number) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  deleteAddress: (index: number) => void;
  onAddClick: () => void;
};

export function AddressList({
  addresses,
  editingIndex,
  editForm,
  setEditForm,
  startEdit,
  saveEdit,
  cancelEdit,
  deleteAddress,
  onAddClick,
}: Props) {
  return (
    <div className="card">
      {addresses.map((addr, index) => (
        <div key={index} className="addressBlock">
          {editingIndex === index ? (
            <div className="editArea">
              <input
                className="editInput"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                className="editInput"
                value={editForm.line1}
                onChange={(e) =>
                  setEditForm({ ...editForm, line1: e.target.value })
                }
                placeholder="Address Line 1"
              />
              <input
                className="editInput"
                value={editForm.line2}
                onChange={(e) =>
                  setEditForm({ ...editForm, line2: e.target.value })
                }
                placeholder="City, State ZIP"
              />

              <div className="editBtns">
                <button className="saveBtn" onClick={saveEdit}>
                  Save
                </button>
                <button className="cancelBtn" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="addressInfo">
                <div className="addressName">{addr.name}</div>
                <div className="addressLine">{addr.line1}</div>
                <div className="addressLine">{addr.line2}</div>
              </div>

              <div className="addressActions">
                <button className="editBtn" onClick={() => startEdit(addr, index)}>
                  Edit
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => deleteAddress(index)}
                >
                  Delete
                </button>
              </div>
            </>
          )}

          <div className="separator" />
        </div>
      ))}

      <div className="addRow" onClick={onAddClick}>
        + Add New Address
      </div>
    </div>
  );
}
