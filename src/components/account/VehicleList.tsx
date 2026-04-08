import type { Vehicle } from "../../types/types";

type Props = {
  vehicles: Vehicle[];
  deleteVehicle: (id: number) => void;
  onAddClick: () => void;
  onEditClick: (vehicle: Vehicle) => void;
};

export function VehicleList({ vehicles, deleteVehicle, onAddClick, onEditClick }: Props) {
  return (
    <div className="card">
      {vehicles.map((v) => (
        <div key={v.id} className="vehicleBlock">
          <span className="vehicleLabel">
            {v.year} {v.make} {v.model} — {v.engine}
          </span>

          <div className="vehicleActions">
            <button className="editBtn" onClick={() => onEditClick(v)}>
              Edit
            </button>

            <button className="deleteBtn" onClick={() => deleteVehicle(v.id)}>
              Delete
            </button>
          </div>

          <div className="separator" />
        </div>
      ))}

      <div className="addRow" onClick={onAddClick}>
        + Add New Vehicle
      </div>
    </div>
  );
}
