package rw.ac.rca.nat2022.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String chassisNumber;

    private String manufuctureCompany;

    private Short manufucturedYear;

    private Double price;

    private String plateNumber;

    private String modelName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registeredDate = LocalDateTime.now();

    @ManyToOne
    private VehicleOwner owner;
}
