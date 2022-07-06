package rw.ac.rca.nat2022.server.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rw.ac.rca.nat2022.server.models.CarOwner;
import rw.ac.rca.nat2022.server.models.Vehicle;
import rw.ac.rca.nat2022.server.repositories.IVehicleRepository;
import rw.ac.rca.nat2022.server.services.ICarOwnerService;
import rw.ac.rca.nat2022.server.services.IVehicleService;
import rw.ac.rca.nat2022.server.utils.dtos.NewVehicleDTO;

import java.util.Random;

@Service
public class VehicleServiceImpl implements IVehicleService {

    private final IVehicleRepository vehicleRepository;

    private final ICarOwnerService carOwnerService;

    @Autowired
    public VehicleServiceImpl(IVehicleRepository vehicleRepository, ICarOwnerService carOwnerService) {
        this.vehicleRepository = vehicleRepository;
        this.carOwnerService = carOwnerService;
    }

    @Override
    public Page<Vehicle> all(Pageable pageable) {
        return vehicleRepository.findAll(pageable);
    }

    @Override
    public Vehicle create(NewVehicleDTO dto) {
        if (!dto.getIsNew() && dto.getPlateNumber().length() == 0) {
            throw new RuntimeException("Plate number is required since the car is not new");
        }

        if (dto.getPlateNumber().length() > 0) {
            if (vehicleRepository.existsByPlateNumber(dto.getPlateNumber())) {
                throw new RuntimeException("Car with this plate number is already registered");
            }
        }

        dto.setPlateNumber(generatePlateNumber());

        Vehicle vehicle = (new ModelMapper()).map(dto, Vehicle.class);

        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle link(Long id, Long ownerId) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new RuntimeException("Vehicle with this id not found"));
        CarOwner carOwner = carOwnerService.findById(ownerId);

        vehicle.setOwner(carOwner);

        return vehicleRepository.save(vehicle);
    }

    private String generatePlateNumber() {
        Random random = new Random();
        String plateNumber;
        do {
            plateNumber = "RAE" + (1000 + random.nextFloat() * 900) + "K";

        } while (vehicleRepository.existsByPlateNumber(plateNumber));

        System.out.println(plateNumber);

        return plateNumber;

    }
}
