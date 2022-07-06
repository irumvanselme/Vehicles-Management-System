package rw.ac.rca.nat2022.server.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import rw.ac.rca.nat2022.server.models.CarOwner;

public interface ICarOwnerService {
    CarOwner save(CarOwner carOwner);

    Page<CarOwner> all(Pageable pageable);

    CarOwner findById(Long ownerId);
}
