package rw.ac.rca.nat2022.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
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

    @NotEmpty
    private String chassisNumber;

    @NotEmpty
    private String manufuctureCompany;

    @NonNull
    private Short manufucturedYear;

    @NonNull
    private Double price;

    private String plateNumber;

    @NotEmpty
    private String modelName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registeredDate = LocalDateTime.now();

    @ManyToOne
    private CarOwner owner;
}
