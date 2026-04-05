import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";

type Address = { id: number; name: string; line1: string; line2: string };
type Vehicle = { id: number; label: string };

const initialAddresses: Address[] = [
  {
    id: 1,
    name: "Raheem Crayton",
    line1: "1959 Awesome Lane",
    line2: "Foosha Village, Dawn Island 3786",
  },
];

const initialVehicles: Vehicle[] = [{ id: 1, label: "2020 Hyundai Sonata" }];

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
      <div style={styles.page}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logoGroup}>
            <div style={styles.logo}>Rock Auto.com</div>
            <Link to="/" style={styles.homeBtn}>Home</Link>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLinkActive}>Account</a>
            <a href="#" style={styles.navLink}>Cart</a>
          </nav>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Account Settings */}
          <h2 style={styles.sectionTitle}>Account Settings</h2>
          <div style={styles.card}>
            <div style={styles.cardRow} onClick={() => setShowPasswordModal(true)}>
              <span style={styles.cardLabel}>Change Password</span>
            </div>
            <div style={styles.cardRow} onClick={() => setShowEmailModal(true)}>
              <span style={styles.cardLabel}>Change Email Address</span>
            </div>
            <div style={styles.cardRowInline}>
              <span style={styles.cardLabel}>Receive RockAuto Newsletter and Discount Emails?</span>
              <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="newsletter"
                    checked={newsletter === "yes"}
                    onChange={() => setNewsletter("yes")}
                    style={styles.radio}
                />
                Yes
              </label>
              <label style={styles.radioLabel}>
                <input
                    type="radio"
                    name="newsletter"
                    checked={newsletter === "no"}
                    onChange={() => setNewsletter("no")}
                    style={styles.radio}
                />
                No
              </label>
            </div>
            <div style={styles.cardRowInline}>
              <span style={styles.cardLabel}>Preferred Language for Emails</span>
              <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={styles.select}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          {/* Saved Addresses */}
          <h2 style={styles.sectionTitle}>Saved Addresses</h2>
          <div style={styles.card}>
            {addresses.map((addr) => (
                <div key={addr.id} style={styles.addressBlock}>
                  {editingId === addr.id ? (
                      <div style={styles.editArea}>
                        <input
                            style={styles.editInput}
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            style={styles.editInput}
                            value={editForm.line1}
                            onChange={(e) => setEditForm({ ...editForm, line1: e.target.value })}
                            placeholder="Address Line 1"
                        />
                        <input
                            style={styles.editInput}
                            value={editForm.line2}
                            onChange={(e) => setEditForm({ ...editForm, line2: e.target.value })}
                            placeholder="City, State ZIP"
                        />
                        <div style={styles.editBtns}>
                          <button style={styles.saveBtn} onClick={saveEdit}>Save</button>
                          <button style={styles.cancelBtn} onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                      </div>
                  ) : (
                      <>
                        <div style={styles.addressInfo}>
                          <div style={styles.addressName}>{addr.name}</div>
                          <div style={styles.addressLine}>{addr.line1}</div>
                          <div style={styles.addressLine}>{addr.line2}</div>
                        </div>
                        <div style={styles.addressActions}>
                          <button style={styles.editBtn} onClick={() => startEdit(addr)}>Edit</button>
                          <button style={styles.deleteBtn} onClick={() => deleteAddress(addr.id)}>Delete</button>
                        </div>
                      </>
                  )}
                  <div style={styles.separator} />
                </div>
            ))}
            <div
                style={styles.addRow}
                onClick={() => setShowAddAddress(true)}
            >
              + Add New Address
            </div>
          </div>

          {/* Saved Vehicles */}
          <h2 style={styles.sectionTitle}>Saved Vehicles</h2>
          <div style={styles.card}>
            {vehicles.map((v) => (
                <div key={v.id} style={styles.vehicleBlock}>
                  <span style={styles.vehicleLabel}>{v.label}</span>
                  <button style={styles.deleteBtn} onClick={() => deleteVehicle(v.id)}>Delete</button>
                  <div style={styles.separator} />
                </div>
            ))}
            <div
                style={styles.addRow}
                onClick={() => setShowAddVehicle(true)}
            >
              + Add New Vehicle
            </div>
          </div>
        </main>

        {/* Password Modal */}
        {showPasswordModal && (
            <div style={styles.overlay} onClick={() => setShowPasswordModal(false)}>
              <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Change Password</h3>
                <input
                    style={styles.modalInput}
                    type="password"
                    placeholder="Current Password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                />
                <input
                    style={styles.modalInput}
                    type="password"
                    placeholder="New Password"
                    value={passwordForm.new1}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new1: e.target.value })}
                />
                <input
                    style={styles.modalInput}
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordForm.new2}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new2: e.target.value })}
                />
                <div style={styles.modalBtns}>
                  <button style={styles.saveBtn} onClick={() => { setShowPasswordModal(false); setPasswordForm({ current: "", new1: "", new2: "" }); }}>Save</button>
                  <button style={styles.cancelBtn} onClick={() => setShowPasswordModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
        )}

        {/* Email Modal */}
        {showEmailModal && (
            <div style={styles.overlay} onClick={() => setShowEmailModal(false)}>
              <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Change Email Address</h3>
                <input
                    style={styles.modalInput}
                    type="email"
                    placeholder="Current Email"
                    value={emailForm.current}
                    onChange={(e) => setEmailForm({ ...emailForm, current: e.target.value })}
                />
                <input
                    style={styles.modalInput}
                    type="email"
                    placeholder="New Email Address"
                    value={emailForm.new1}
                    onChange={(e) => setEmailForm({ ...emailForm, new1: e.target.value })}
                />
                <div style={styles.modalBtns}>
                  <button style={styles.saveBtn} onClick={() => { setShowEmailModal(false); setEmailForm({ current: "", new1: "" }); }}>Save</button>
                  <button style={styles.cancelBtn} onClick={() => setShowEmailModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
        )}

        {/* Add Address Modal */}
        {showAddAddress && (
            <div style={styles.overlay} onClick={() => setShowAddAddress(false)}>
              <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Add New Address</h3>
                <input
                    style={styles.modalInput}
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                />
                <input
                    style={styles.modalInput}
                    placeholder="Address Line 1"
                    value={newAddress.line1}
                    onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                />
                <input
                    style={styles.modalInput}
                    placeholder="City, State ZIP"
                    value={newAddress.line2}
                    onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                />
                <div style={styles.modalBtns}>
                  <button style={styles.saveBtn} onClick={addAddress}>Add</button>
                  <button style={styles.cancelBtn} onClick={() => setShowAddAddress(false)}>Cancel</button>
                </div>
              </div>
            </div>
        )}

        {/* Add Vehicle Modal */}
        {showAddVehicle && (
            <div style={styles.overlay} onClick={() => setShowAddVehicle(false)}>
              <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Add New Vehicle</h3>
                <input
                    style={styles.modalInput}
                    placeholder="e.g. 2020 Hyundai Sonata"
                    value={newVehicle}
                    onChange={(e) => setNewVehicle(e.target.value)}
                />
                <div style={styles.modalBtns}>
                  <button style={styles.saveBtn} onClick={addVehicle}>Add</button>
                  <button style={styles.cancelBtn} onClick={() => setShowAddVehicle(false)}>Cancel</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
    background: "#ffffff",
    minHeight: "100vh",
    color: "#000",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    borderBottom: "none",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "900",
    fontStyle: "italic",
    color: "#000",
    letterSpacing: "-0.5px",
  },
  homeBtn: {
    background: "#222",
    color: "#fff",
    textDecoration: "none",
    padding: "6px 14px",
    fontWeight: "700",
    fontSize: "14px",
    border: "1px solid #000",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    gap: "24px",
  },
  navLink: {
    color: "#000",
    textDecoration: "none",
    fontSize: "15px",
    cursor: "pointer",
  },
  navLinkActive: {
    color: "#000",
    textDecoration: "underline",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },
  main: {
    maxWidth: "680px",
    padding: "40px 32px 60px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "900",
    margin: "32px 0 12px",
    color: "#000",
  },
  card: {
    background: "#888",
    borderRadius: "0",
    padding: "16px 20px",
    marginBottom: "8px",
  },
  cardRow: {
    padding: "6px 0",
    cursor: "pointer",
  },
  cardRowInline: {
    padding: "6px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  cardLabel: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#fff",
  },
  radioLabel: {
    color: "#fff",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "3px",
    cursor: "pointer",
  },
  radio: {
    accentColor: "#4CAF50",
    cursor: "pointer",
  },
  select: {
    marginLeft: "8px",
    padding: "2px 6px",
    fontSize: "13px",
    border: "1px solid #aaa",
    borderRadius: "2px",
  },
  addressBlock: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "8px 0",
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#fff",
  },
  addressLine: {
    fontSize: "14px",
    color: "#e0e0e0",
    lineHeight: 1.4,
  },
  addressActions: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    alignItems: "flex-end",
  },
  editBtn: {
    background: "#222",
    color: "#fff",
    border: "1px solid #000",
    padding: "4px 16px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#cc0000",
    color: "#fff",
    border: "1px solid #900",
    padding: "4px 12px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
  separator: {
    width: "100%",
    height: "1px",
    background: "rgba(255,255,255,0.3)",
    marginTop: "8px",
  },
  addRow: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    padding: "10px 0 2px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  vehicleBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "8px 0",
  },
  vehicleLabel: {
    fontWeight: "700",
    fontSize: "15px",
    color: "#fff",
  },
  editArea: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
  },
  editInput: {
    padding: "6px 8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  editBtns: {
    display: "flex",
    gap: "8px",
    marginTop: "4px",
  },
  saveBtn: {
    background: "#222",
    color: "#fff",
    border: "1px solid #000",
    padding: "6px 20px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#999",
    color: "#fff",
    border: "1px solid #777",
    padding: "6px 16px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "28px",
    width: "380px",
    maxWidth: "90vw",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "900",
    margin: "0 0 16px",
    color: "#000",
  },
  modalInput: {
    display: "block",
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  modalBtns: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
};