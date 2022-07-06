package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.VehicleOwner;
import rw.ac.rca.nat2022.server.repositories.IVehicleOwnerRepository;
import rw.ac.rca.nat2022.server.services.IVehicleOwnerService;

@Service
public class VehicleOwenerServiceImpl implements IVehicleOwnerService {

    private final IVehicleOwnerRepository repository;

    @Autowired
    public VehicleOwenerServiceImpl(IVehicleOwnerRepository repository) {
        this.repository = repository;
    }

    @Override
    public VehicleOwner save(VehicleOwner vehicleOwner) {
        return repository.save(vehicleOwner);
    }

    @Override
    public Page<VehicleOwner> all(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public VehicleOwner findById(Long ownerId) {
        return repository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Vehicle owner with this id not found"));
    }
}
