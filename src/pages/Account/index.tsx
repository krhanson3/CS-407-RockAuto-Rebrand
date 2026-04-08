import { useState } from "react";

import "../../styles/global.css";
import "../../styles/accountPage.css";

import type { Address, Vehicle } from "../../types/types";

import { ChangePasswordModal } from "../../components/account/ChangePasswordModal";
import { ChangeEmailModal } from "../../components/account/ChangeEmailModal";
import { AddAddressModal } from "../../components/account/AddAddressModal";
import { AddVehicleModal } from "../../components/account/AddVehicleModal";
import { EditVehicleModal } from "../../components/account/EditVehicleModal";

import { AddressList } from "../../components/account/AddressList";
import { VehicleList } from "../../components/account/VehicleList";
import { AccountSettings } from "../../components/account/AccountSettings";

import { useSavedVehicles } from "../../data/SavedVehiclesContext";
import { useSavedAddresses } from "../../data/SavedAddressContext";

export default function AccountPage() {
  const { savedVehicles, addVehicle, removeVehicle, updateVehicle } = useSavedVehicles();
  const { savedAddresses, addAddress, updateAddress, removeAddress } = useSavedAddresses();

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleForm, setVehicleForm] = useState({
    year: "",
    make: "",
    model: "",
    engine: ""
  });

  const startEditVehicle = (v: Vehicle) => {
    setEditingVehicle(v);
    setVehicleForm({
      year: v.year,
      make: v.make,
      model: v.model,
      engine: v.engine
    });
  };

  const saveVehicleEdit = () => {
    if (!editingVehicle) return;
    updateVehicle(editingVehicle.id, vehicleForm);
    setEditingVehicle(null);
  };

  const handleAddVehicle = () => {
    if (!vehicleForm.make.trim() || !vehicleForm.model.trim()) return;

    addVehicle({
      year: vehicleForm.year,
      make: vehicleForm.make,
      model: vehicleForm.model,
      engine: vehicleForm.engine,
    });

    setVehicleForm({ year: "", make: "", model: "", engine: "" });
    setShowAddVehicle(false);
  };

  const handleDeleteVehicle = (id: number) => {
    removeVehicle(id);
  };

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", line1: "", line2: "" });

  const [newAddress, setNewAddress] = useState({
  name: "",
  line1: "",
  line2: ""
});

  
  const startEditAddress = (addr: Address, index: number) => {
    setEditingIndex(index);
    setEditForm({
      name: addr.name,
      line1: addr.line1,
      line2: addr.line2
    });
  };

  const saveAddressEdit = () => {
    if (editingIndex === null) return;

    const id = savedAddresses[editingIndex].id;
    updateAddress(id, editForm);

    setEditingIndex(null);
  };

  const handleAddAddress = (newAddress: Omit<Address, "id">) => {
    if (!newAddress.name.trim()) return;
    addAddress(newAddress);
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id: number) => {
    removeAddress(id);
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ current: "", new1: "", new2: "" });
  const [emailForm, setEmailForm] = useState({ current: "", new1: "" });

  const [newsletter, setNewsletter] = useState("yes");
  const [language, setLanguage] = useState("English");

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
          addresses={savedAddresses}
          editingIndex={editingIndex}
          editForm={editForm}
          setEditForm={setEditForm}
          startEdit={startEditAddress}
          saveEdit={saveAddressEdit}
          cancelEdit={() => setEditingIndex(null)}
          deleteAddress={handleDeleteAddress}
          onAddClick={() => setShowAddAddress(true)}
        />

        
        <h2 className="sectionTitle">Saved Vehicles</h2>
        <VehicleList
          vehicles={savedVehicles}
          deleteVehicle={handleDeleteVehicle}
          onAddClick={() => setShowAddVehicle(true)}
          onEditClick={startEditVehicle}
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
        onAdd={handleAddAddress}
      />


      <AddVehicleModal
        show={showAddVehicle}
        onClose={() => setShowAddVehicle(false)}
        form={vehicleForm}
        setForm={setVehicleForm}
        onAdd={handleAddVehicle}
      />

      <EditVehicleModal
        show={!!editingVehicle}
        onClose={() => setEditingVehicle(null)}
        form={vehicleForm}
        setForm={setVehicleForm}
        onSave={saveVehicleEdit}
      />
    </div>
  );
}
