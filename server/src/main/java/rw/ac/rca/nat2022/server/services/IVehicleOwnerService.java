package rw.ac.rca.nat2022.server.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.ac.rca.nat2022.server.models.VehicleOwner;

public interface IVehicleOwnerService {
    VehicleOwner save(VehicleOwner vehicleOwner);

    Page<VehicleOwner> all(Pageable pageable);

    VehicleOwner findById(Long ownerId);
}
