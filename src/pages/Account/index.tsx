import { useState } from "react";

import "../../styles/global.css";
import "../../styles/accountPage.css";

import type { Address, Vehicle } from "../../types/types";

import { initialAddresses, initialVehicles } from "../../data/account";

import { ChangePasswordModal } from "../../components/account/ChangePasswordModal";
import { ChangeEmailModal } from "../../components/account/ChangeEmailModal";
import { AddAddressModal } from "../../components/account/AddAddressModal";
import { AddVehicleModal } from "../../components/account/AddVehicleModal";

import { AddressList } from "../../components/account/AddressList";
import { VehicleList } from "../../components/account/VehicleList";
import { AccountSettings } from "../../components/account/AccountSettings";

export default function AccountPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const [newsletter, setNewsletter] = useState("yes");
  const [language, setLanguage] = useState("English");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", line1: "", line2: "" });

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const [newAddress, setNewAddress] = useState({ name: "", line1: "", line2: "" });
  const [newVehicle, setNewVehicle] = useState({ year: "", make: "", model: "", engine: "" });

  const [passwordForm, setPasswordForm] = useState({ current: "", new1: "", new2: "" });
  const [emailForm, setEmailForm] = useState({ current: "", new1: "" });

  // Start editing an address
  const startEdit = (addr: Address, index: number) => {
    setEditingIndex(index);
    setEditForm({ name: addr.name, line1: addr.line1, line2: addr.line2 });
  };

  // Save edited address
  const saveEdit = () => {
    if (editingIndex === null) return;

    const updated = [...addresses];
    updated[editingIndex] = { ...updated[editingIndex], ...editForm };

    setAddresses(updated);
    setEditingIndex(null);
  };

  // Delete address by index
  const deleteAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  // Delete vehicle by index
  const deleteVehicle = (index: number) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  // Add new address
  const addAddress = () => {
    if (!newAddress.name.trim()) return;

    setAddresses([...addresses, { ...newAddress }]);
    setNewAddress({ name: "", line1: "", line2: "" });
    setShowAddAddress(false);
  };

  // Add new vehicle
  const addVehicle = () => {
    if (!newVehicle.make.trim() || !newVehicle.model.trim()) return;

    setVehicles([...vehicles, { ...newVehicle }]);
    setNewVehicle({ year: "", make: "", model: "", engine: "" });
    setShowAddVehicle(false);
  };

  return (
    <div className="account-page">
      <main className="main">
        <h2 className="sectionTitle">Account Settings</h2>
        <AccountSettings
          newsletter={newsletter}
          setNewsletter={setNewsletter}
          language={language}
          setLanguage={setLanguage}
          onPasswordClick={() => setShowPasswordModal(true)}
          onEmailClick={() => setShowEmailModal(true)}
        />

        <h2 className="sectionTitle">Saved Addresses</h2>
        <AddressList
          addresses={addresses}
          editingIndex={editingIndex}
          editForm={editForm}
          setEditForm={setEditForm}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={() => setEditingIndex(null)}
          deleteAddress={deleteAddress}
          onAddClick={() => setShowAddAddress(true)}
        />

        <h2 className="sectionTitle">Saved Vehicles</h2>
        <VehicleList
          vehicles={vehicles}
          deleteVehicle={deleteVehicle}
          onAddClick={() => setShowAddVehicle(true)}
        />
      </main>

      <ChangePasswordModal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        form={passwordForm}
        setForm={setPasswordForm}
        onSave={() => setShowPasswordModal(false)}
      />

      <ChangeEmailModal
        show={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        form={emailForm}
        setForm={setEmailForm}
        onSave={() => setShowEmailModal(false)}
      />

      <AddAddressModal
        show={showAddAddress}
        onClose={() => setShowAddAddress(false)}
        form={newAddress}
        setForm={setNewAddress}
        onAdd={addAddress}
      />

      <AddVehicleModal
        show={showAddVehicle}
        onClose={() => setShowAddVehicle(false)}
        form={newVehicle}
        setForm={setNewVehicle}
        onAdd={addVehicle}
      />
    </div>
  );
}
