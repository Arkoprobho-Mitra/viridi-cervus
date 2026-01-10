package com.viridicervus.backend.product;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 2000)
    private String description;

    private BigDecimal price;
    private String imageUrl;
    private String brand;
    private String gender; // e.g., 'men', 'women', 'kids'

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Double rating;
    private Integer reviewCount;
}
