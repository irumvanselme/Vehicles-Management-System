package rw.ac.rca.nat2022.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nat2022.server.models.Vehicle;
import rw.ac.rca.nat2022.server.services.IVehicleService;
import rw.ac.rca.nat2022.server.utils.dtos.NewVehicleDTO;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final IVehicleService vehicleService;

    @Autowired
    public VehicleController(IVehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("")
    public ResponseEntity<?> save(@Valid @RequestBody NewVehicleDTO dto) {
        return ResponseEntity.accepted().body(vehicleService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> findById(@PathVariable Long id){
        return ResponseEntity.ok().body(vehicleService.findById(id));
    }

    @GetMapping
    public ResponseEntity<?> all(@RequestParam(required = false, defaultValue = "0") int page, @RequestParam(required = false, defaultValue = "5") int limit) {
        Pageable pageable = PageRequest.of(page, limit,  Sort.Direction.DESC, "id");

        return ResponseEntity.ok(vehicleService.all(pageable));
    }


    @PutMapping("/{id}/link/{ownerId}")
    public ResponseEntity<Vehicle> link(@PathVariable Long id, @PathVariable Long ownerId){
        return ResponseEntity.accepted().body(vehicleService.link(id, ownerId));
    }
}
