package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.Vehicle;
import rw.ac.rca.nat2022.server.models.VehicleOwnerShip;
import rw.ac.rca.nat2022.server.repositories.IVehicleOwnershipRepository;
import rw.ac.rca.nat2022.server.services.IVehicleOwnershipService;

import java.time.LocalDateTime;

@Service
public class VehicleOwnershipServiceImpl implements IVehicleOwnershipService {

    private final IVehicleOwnershipRepository repository;

    public VehicleOwnershipServiceImpl(IVehicleOwnershipRepository repository) {
        this.repository = repository;
    }

    @Override
    public void endOwnerShip(Vehicle vehicle) {
        if (vehicle.getOwner() != null) {
            VehicleOwnerShip ownerShip = repository.findTopByVehicleAndOwner(vehicle, vehicle.getOwner());
            ownerShip.setEnd(LocalDateTime.now());
            repository.save(ownerShip);
        }
    }

    @Override
    public void save(VehicleOwnerShip newOwnerShip) {
        repository.save(newOwnerShip);
    }
}
