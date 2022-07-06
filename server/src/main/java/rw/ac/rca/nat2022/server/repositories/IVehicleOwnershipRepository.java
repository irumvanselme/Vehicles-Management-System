package rw.ac.rca.nat2022.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.nat2022.server.models.VehicleOwner;
import rw.ac.rca.nat2022.server.models.Vehicle;
import rw.ac.rca.nat2022.server.models.VehicleOwnerShip;

@Repository
public interface IVehicleOwnershipRepository extends JpaRepository<VehicleOwnerShip, Long> {

    VehicleOwnerShip findTopByVehicleAndOwner(Vehicle vehicle, VehicleOwner owner);
}
