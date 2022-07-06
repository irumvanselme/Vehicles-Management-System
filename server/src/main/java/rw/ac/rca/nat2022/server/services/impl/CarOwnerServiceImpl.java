package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.CarOwner;
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
    public CarOwner save(CarOwner carOwner) {
        return carOwnerRepository.save(carOwner);
    }

    @Override
    public Page<CarOwner> all(Pageable pageable) {
        return carOwnerRepository.findAll(pageable);
    }

    @Override
    public CarOwner findById(Long ownerId) {
        return carOwnerRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Car owner with this id not found"));
    }
}
