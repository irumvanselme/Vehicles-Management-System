package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.VehicleOwner;
import rw.ac.rca.nat2022.server.repositories.ICarOwnerRepository;
import rw.ac.rca.nat2022.server.services.ICarOwnerService;

@Service
public class CarOwnerServiceImpl implements ICarOwnerService {

    private final ICarOwnerRepository carOwnerRepository;

    @Autowired
    public CarOwnerServiceImpl(ICarOwnerRepository carOwnerRepository) {
        this.carOwnerRepository = carOwnerRepository;
    }

    @Override
    public VehicleOwner save(VehicleOwner vehicleOwner) {
        return carOwnerRepository.save(vehicleOwner);
    }

    @Override
    public Page<VehicleOwner> all(Pageable pageable) {
        return carOwnerRepository.findAll(pageable);
    }

    @Override
    public VehicleOwner findById(Long ownerId) {
        return carOwnerRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Car owner with this id not found"));
    }
}
