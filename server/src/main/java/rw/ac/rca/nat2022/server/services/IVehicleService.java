package rw.ac.rca.nat2022.server.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.ac.rca.nat2022.server.models.Vehicle;
import rw.ac.rca.nat2022.server.utils.dtos.NewVehicleDTO;

public interface IVehicleService {

    Page<Vehicle> all(Pageable pageable);

    Vehicle create(NewVehicleDTO dto);

    Vehicle link(Long id, Long ownerId);

    Vehicle findById(Long id);
}
