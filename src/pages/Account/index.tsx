import { useState } from "react";


import "../../styles/global.css";
import "../../styles/accountPage.css";

import type { Address } from "../../types/account";

import { initialAddresses, initialVehicles } from "../../data/account";

import { ChangePasswordModal } from "../../components/account/ChangePasswordModal";
import { ChangeEmailModal } from "../../components/account/ChangeEmailModal";
import { AddAddressModal } from "../../components/account/AddAddressModal";
import { AddVehicleModal } from "../../components/account/AddVehicleModal";

import { AddressList } from "../../components/account/AddressList";
import { VehicleList } from "../../components/account/VehicleList";
import { AccountSettings } from "../../components/account/AccountSettings";


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
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  
  const [newAddress, setNewAddress] = useState({ name: "", line1: "", line2: "" });
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
        <main className="main">
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
              editingId={editingId}
              editForm={editForm}
              setEditForm={setEditForm}
              startEdit={startEdit}
              saveEdit={saveEdit}
              cancelEdit={() => setEditingId(null)}
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
          onSave={() => { setShowPasswordModal(false);}}
        />

        <ChangeEmailModal
          show={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          form={emailForm}
          setForm={setEmailForm}
          onSave={() => {  setShowEmailModal(false);}}
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
          value={newVehicle}
          setValue={setNewVehicle}
          onAdd={addVehicle}
        />
</div>
);
}
