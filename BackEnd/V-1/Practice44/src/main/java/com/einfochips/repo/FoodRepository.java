package com.einfochips.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.einfochips.model.FastFood;

public interface FoodRepository extends MongoRepository<FastFood, String> {

	Optional<FastFood> findByFoodName(String searchValue);

}
