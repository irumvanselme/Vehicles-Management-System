package rw.ac.rca.nat2022.server.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rw.ac.rca.nat2022.server.models.VehicleOwner;
import rw.ac.rca.nat2022.server.models.Vehicle;
import rw.ac.rca.nat2022.server.models.VehicleOwnerShip;
import rw.ac.rca.nat2022.server.repositories.IVehicleRepository;
import rw.ac.rca.nat2022.server.services.IVehicleOwnerService;
import rw.ac.rca.nat2022.server.services.IVehicleOwnershipService;
import rw.ac.rca.nat2022.server.services.IVehicleService;
import rw.ac.rca.nat2022.server.utils.dtos.NewVehicleDTO;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class VehicleServiceImpl implements IVehicleService {

    private final IVehicleRepository vehicleRepository;

    private final IVehicleOwnerService vehicleOwnerService;
    private final IVehicleOwnershipService vehicleOwnershipService;

    @Autowired
    public VehicleServiceImpl(IVehicleRepository vehicleRepository, IVehicleOwnerService vehicleOwnerService, IVehicleOwnershipService vehicleOwnershipService) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleOwnerService = vehicleOwnerService;
        this.vehicleOwnershipService = vehicleOwnershipService;
    }

    @Override
    public Page<Vehicle> all(Pageable pageable) {
        return vehicleRepository.findAll(pageable);
    }

    @Override
    public Vehicle create(NewVehicleDTO dto) {
        if (!dto.getIsNew() && (dto.getPlateNumber() == null || dto.getPlateNumber().isEmpty())) {
            throw new RuntimeException("Plate number is required since the vehicle is not new");
        }

        if (!(dto.getPlateNumber() == null || dto.getPlateNumber().isEmpty())) {
            if (vehicleRepository.existsByPlateNumber(dto.getPlateNumber())) {
                throw new RuntimeException("Vehicle with this plate number is already registered");
            }
        } else {
            dto.setPlateNumber(generatePlateNumber());
        }


        Vehicle vehicle = new Vehicle();

        vehicle.setPlateNumber(dto.getPlateNumber());
        vehicle.setChassisNumber(dto.getChassisNumber());
        vehicle.setPlateNumber(dto.getPlateNumber());
        vehicle.setPrice(dto.getPrice());
        vehicle.setManufuctureCompany(dto.getManufuctureCompany());
        vehicle.setManufucturedYear(dto.getManufucturedYear());
        vehicle.setModelName(dto.getModelName());

        return vehicleRepository.save(vehicle);
    }

    @Override
    @Transactional
    public Vehicle link(Long id, Long ownerId) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new RuntimeException("Vehicle with this id not found"));
        VehicleOwner vehicleOwner = vehicleOwnerService.findById(ownerId);

        vehicleOwnershipService.endOwnerShip(vehicle);

        VehicleOwnerShip newOwnerShip = new VehicleOwnerShip();
        newOwnerShip.setOwner(vehicleOwner);
        newOwnerShip.setVehicle(vehicle);
        newOwnerShip.setStart(LocalDateTime.now());

        vehicleOwnershipService.save(newOwnerShip);

        vehicle.setOwner(vehicleOwner);

        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle findById(Long id) {
        return vehicleRepository.findById(id).orElseThrow(() -> new RuntimeException("Vehicle with this id not found"));
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
