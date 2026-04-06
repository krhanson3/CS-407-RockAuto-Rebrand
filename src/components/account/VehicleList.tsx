import type { Vehicle } from "../../types/account";

type Props = {
  vehicles: Vehicle[];
  deleteVehicle: (id: number) => void;
  onAddClick: () => void;
};

export function VehicleList({ vehicles, deleteVehicle, onAddClick }: Props) {
  return (
    <div className="card">
      {vehicles.map((v) => (
        <div key={v.id} className="vehicleBlock">
          <span className="vehicleLabel">{v.label}</span>
          <button className="deleteBtn" onClick={() => deleteVehicle(v.id)}>
            Delete
          </button>
          <div className="separator" />
        </div>
      ))}

      <div className="addRow" onClick={onAddClick}>
        + Add New Vehicle
      </div>
    </div>
  );
}
