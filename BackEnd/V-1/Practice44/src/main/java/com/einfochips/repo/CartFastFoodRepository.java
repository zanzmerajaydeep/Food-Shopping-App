package com.einfochips.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.einfochips.model.CartFastFood;

public interface CartFastFoodRepository extends MongoRepository<CartFastFood, String> {

}
