package rw.ac.rca.nat2022.server.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Entity
@Table(name = "owners")
public class CarOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotEmpty
    private String fullNames;

    @NotEmpty
    private String nationalId;

    @NotEmpty
    private String phoneNumber;

    @NotEmpty
    private String address;
}
