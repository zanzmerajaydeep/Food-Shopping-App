package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UserData;


public interface UserDataRepo  extends MongoRepository<UserData, String>{

	UserData findUserByUsername(String username);
	
	
	
	UserData findUserDataByEmailAndPassword(String email,String password);
	

	void deleteUserByUsername(String username);
	
	boolean existsByEmail(String email);
 
}
