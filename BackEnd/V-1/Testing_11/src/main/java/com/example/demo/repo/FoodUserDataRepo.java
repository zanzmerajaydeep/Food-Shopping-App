package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;

import com.example.demo.model.FoodUserData;

@Validated
public interface FoodUserDataRepo  extends MongoRepository<FoodUserData, String>{

	FoodUserData findUserByUsername(String username);
	
	FoodUserData findFoodUserByUsernameAndPassword(String username,String password);
	
	FoodUserData findFoodUserDataByEmailAndPassword(String email,String password);
	

	void deleteUserByUsername(String username);
 
}
