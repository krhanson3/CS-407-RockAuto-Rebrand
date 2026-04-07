import type { Vehicle } from "../../types/types";

type Props = {
  vehicles: Vehicle[];
  deleteVehicle: (index: number) => void;
  onAddClick: () => void;
};

export function VehicleList({ vehicles, deleteVehicle, onAddClick }: Props) {
  return (
    <div className="card">
      {vehicles.map((v, index) => (
        <div key={index} className="vehicleBlock">
          <span className="vehicleLabel">
            {v.year} {v.make} {v.model} — {v.engine}
          </span>

          <button className="deleteBtn" onClick={() => deleteVehicle(index)}>
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
