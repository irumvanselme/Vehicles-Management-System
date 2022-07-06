package rw.ac.rca.nat2022.server.services;

import rw.ac.rca.nat2022.server.models.Vehicle;
import rw.ac.rca.nat2022.server.models.VehicleOwnerShip;

public interface IVehicleOwnershipService {
    void endOwnerShip(Vehicle vehicle);

    void save(VehicleOwnerShip newOwnerShip);
}
