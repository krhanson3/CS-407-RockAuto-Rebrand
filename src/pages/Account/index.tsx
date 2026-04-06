import { useState} from "react";
import "../../styles/accountPage.css";
import type { Address } from "../../types/account";
import { initialAddresses, initialVehicles } from "../../data/account";


export default function AccountPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [newsletter, setNewsletter] = useState("yes");
  const [language, setLanguage] = useState("English");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", line1: "", line2: "" });

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", line1: "", line2: "" });
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState("");
  const [passwordForm, setPasswordForm] = useState({ current: "", new1: "", new2: "" });
  const [emailForm, setEmailForm] = useState({ current: "", new1: "" });

  const startEdit = (addr: Address) => {
    setEditingId(addr.id);
    setEditForm({ name: addr.name, line1: addr.line1, line2: addr.line2 });
  };

  const saveEdit = () => {
    setAddresses(addresses.map((a) => (a.id === editingId ? { ...a, ...editForm } : a)));
    setEditingId(null);
  };

  const deleteAddress = (id: number) => setAddresses(addresses.filter((a) => a.id !== id));
  const deleteVehicle = (id: number) => setVehicles(vehicles.filter((v) => v.id !== id));

  const addAddress = () => {
    if (!newAddress.name.trim()) return;
    setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
    setNewAddress({ name: "", line1: "", line2: "" });
    setShowAddAddress(false);
  };

  const addVehicle = () => {
    if (!newVehicle.trim()) return;
    setVehicles([...vehicles, { id: Date.now(), label: newVehicle }]);
    setNewVehicle("");
    setShowAddVehicle(false);
  };

  return (
      <div className="page">
        {/* Main Content */}
        <main className="main">
          {/* Account Settings */}
          <h2 className="sectionTitle">Account Settings</h2>

            <div className="card">
              <div className="cardRow" onClick={() => setShowPasswordModal(true)}>
                <span className="cardLabel">Change Password</span>
              </div>

              <div className="cardRow" onClick={() => setShowEmailModal(true)}>
                <span className="cardLabel">Change Email Address</span>
              </div>

              <div className="cardRowInline">
                <span className="cardLabel">Receive RockAuto Newsletter and Discount Emails?</span>

                <label className="radioLabel">
                  <input
                    type="radio"
                    name="newsletter"
                    checked={newsletter === "yes"}
                    onChange={() => setNewsletter("yes")}
                    className="radio"
                  />
                  Yes
                </label>

                <label className="radioLabel">
                  <input
                    type="radio"
                    name="newsletter"
                    checked={newsletter === "no"}
                    onChange={() => setNewsletter("no")}
                    className="radio"
                  />
                  No
                </label>
              </div>

              <div className="cardRowInline">
                <span className="cardLabel">Preferred Language for Emails</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="select"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>

            {/* Saved Addresses */}
            <h2 className="sectionTitle">Saved Addresses</h2>
            <div className="card">
              {addresses.map((addr) => (
                <div key={addr.id} className="addressBlock">
                  {editingId === addr.id ? (
                    <div className="editArea">
                      <input
                        className="editInput"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Name"
                      />
                      <input
                        className="editInput"
                        value={editForm.line1}
                        onChange={(e) => setEditForm({ ...editForm, line1: e.target.value })}
                        placeholder="Address Line 1"
                      />
                      <input
                        className="editInput"
                        value={editForm.line2}
                        onChange={(e) => setEditForm({ ...editForm, line2: e.target.value })}
                        placeholder="City, State ZIP"
                      />

                      <div className="editBtns">
                        <button className="saveBtn" onClick={saveEdit}>Save</button>
                        <button className="cancelBtn" onClick={() => setEditingId(null)}>Cancel</button>
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
                        <button className="editBtn" onClick={() => startEdit(addr)}>Edit</button>
                        <button className="deleteBtn" onClick={() => deleteAddress(addr.id)}>Delete</button>
                      </div>
                    </>
                  )}

                  <div className="separator" />
                </div>
              ))}

              <div className="addRow" onClick={() => setShowAddAddress(true)}>
                + Add New Address
              </div>
            </div>

            {/* Saved Vehicles */}
            <h2 className="sectionTitle">Saved Vehicles</h2>
            <div className="card">
              {vehicles.map((v) => (
                <div key={v.id} className="vehicleBlock">
                  <span className="vehicleLabel">{v.label}</span>
                  <button className="deleteBtn" onClick={() => deleteVehicle(v.id)}>Delete</button>
                  <div className="separator" />
                </div>
              ))}

              <div className="addRow" onClick={() => setShowAddVehicle(true)}>
                + Add New Vehicle
              </div>
            </div>
          </main>

        {/* Password Modal */}
          {showPasswordModal && (
            <div className="overlay" onClick={() => setShowPasswordModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="modalTitle">Change Password</h3>

                <input
                  className="modalInput"
                  type="password"
                  placeholder="Current Password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                />

                <input
                  className="modalInput"
                  type="password"
                  placeholder="New Password"
                  value={passwordForm.new1}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new1: e.target.value })}
                />

                <input
                  className="modalInput"
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordForm.new2}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new2: e.target.value })}
                />

                <div className="modalBtns">
                  <button className="saveBtn" onClick={() => { setShowPasswordModal(false); setPasswordForm({ current: "", new1: "", new2: "" }); }}>Save</button>
                  <button className="cancelBtn" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}


        {/* Email Modal */}
        {showEmailModal && (
          <div className="overlay" onClick={() => setShowEmailModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="modalTitle">Change Email Address</h3>

              <input
                className="modalInput"
                type="email"
                placeholder="Current Email"
                value={emailForm.current}
                onChange={(e) => setEmailForm({ ...emailForm, current: e.target.value })}
              />

              <input
                className="modalInput"
                type="email"
                placeholder="New Email Address"
                value={emailForm.new1}
                onChange={(e) => setEmailForm({ ...emailForm, new1: e.target.value })}
              />

              <div className="modalBtns">
                <button
                  className="saveBtn"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailForm({ current: "", new1: "" });
                  }}
                >
                  Save
                </button>

                <button className="cancelBtn" onClick={() => setShowEmailModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Add Address Modal */}
        {showAddAddress && (
          <div className="overlay" onClick={() => setShowAddAddress(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="modalTitle">Add New Address</h3>

              <input
                className="modalInput"
                placeholder="Full Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              />

              <input
                className="modalInput"
                placeholder="Address Line 1"
                value={newAddress.line1}
                onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
              />

              <input
                className="modalInput"
                placeholder="City, State ZIP"
                value={newAddress.line2}
                onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
              />

              <div className="modalBtns">
                <button className="saveBtn" onClick={addAddress}>Add</button>
                <button className="cancelBtn" onClick={() => setShowAddAddress(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Add Vehicle Modal */}
        {showAddVehicle && (
          <div className="overlay" onClick={() => setShowAddVehicle(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="modalTitle">Add New Vehicle</h3>

              <input
                className="modalInput"
                placeholder="e.g. 2020 Hyundai Sonata"
                value={newVehicle}
                onChange={(e) => setNewVehicle(e.target.value)}
              />

              <div className="modalBtns">
                <button className="saveBtn" onClick={addVehicle}>Add</button>
                <button className="cancelBtn" onClick={() => setShowAddVehicle(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

</div>
);
}
