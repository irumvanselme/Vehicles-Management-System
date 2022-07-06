package rw.ac.rca.nat2022.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.nat2022.server.models.CarOwner;
import rw.ac.rca.nat2022.server.services.ICarOwnerService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/car-owners")
public class CarOwnerController {

    private final ICarOwnerService carOwnerService;

    @Autowired
    public CarOwnerController(ICarOwnerService carOwnerService) {
        this.carOwnerService = carOwnerService;
    }

    @PostMapping
    private ResponseEntity<?> save(@Valid @RequestBody CarOwner carOwner){
        return ResponseEntity.accepted().body(carOwnerService.save(carOwner));
    }

    @GetMapping
    private ResponseEntity<?> all(@RequestParam(required = false, defaultValue = "0") int page, @RequestParam(required = false, defaultValue = "5") int limit){
        Pageable pageable = PageRequest.of(page, limit);

        return ResponseEntity.ok(carOwnerService.all(pageable));
    }
}
