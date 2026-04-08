type EditVehicleModalProps = {
  show: boolean;
  onClose: () => void;
  form: {
    year: string;
    make: string;
    model: string;
    engine: string;
  };
  setForm: (form: {
    year: string;
    make: string;
    model: string;
    engine: string;
  }) => void;
  onSave: () => void;
};

export function EditVehicleModal({
  show,
  onClose,
  form,
  setForm,
  onSave,
}: EditVehicleModalProps) {
  if (!show) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modalTitle">Edit Vehicle</h3>

        <input
          className="modalInput"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />

        <input
          className="modalInput"
          placeholder="Make"
          value={form.make}
          onChange={(e) => setForm({ ...form, make: e.target.value })}
        />

        <input
          className="modalInput"
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />

        <input
          className="modalInput"
          placeholder="Engine"
          value={form.engine}
          onChange={(e) => setForm({ ...form, engine: e.target.value })}
        />

        <div className="modalBtns">
          <button className="saveBtn" onClick={onSave}>Save</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
