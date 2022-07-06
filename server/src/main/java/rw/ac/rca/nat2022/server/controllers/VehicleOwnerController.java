package rw.ac.rca.nat2022.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nat2022.server.models.VehicleOwner;
import rw.ac.rca.nat2022.server.services.IVehicleOwnerService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/vehicle-owners")
public class CarOwnerController {

    private final IVehicleOwnerService carOwnerService;

    @Autowired
    public CarOwnerController(IVehicleOwnerService carOwnerService) {
        this.carOwnerService = carOwnerService;
    }

    @PostMapping
    private ResponseEntity<?> save(@Valid @RequestBody VehicleOwner vehicleOwner){
        return ResponseEntity.accepted().body(carOwnerService.save(vehicleOwner));
    }

    @GetMapping
    private ResponseEntity<?> all(@RequestParam(required = false, defaultValue = "0") int page, @RequestParam(required = false, defaultValue = "5") int limit){
        Pageable pageable = PageRequest.of(page, limit,  Sort.Direction.DESC, "id");

        return ResponseEntity.ok(carOwnerService.all(pageable));
    }
}
