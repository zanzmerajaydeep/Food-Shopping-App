package com.example.demo.service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.example.demo.model.FoodUserData;
import com.example.demo.repo.FoodUserDataRepo;


@Service
@Validated
public class FoodUserDataService {
	
	@Autowired
	private FoodUserDataRepo foodUserRepo;
	
	@Autowired
	

	public List<FoodUserData> getAllUser() {
		return foodUserRepo.findAll();
	}

	public FoodUserData getUserByName(String username) {
		return foodUserRepo.findUserByUsername(username);
	}

	public String addUser(FoodUserData foodUserData) {
	    StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();
	    String encodedPassword = passwordEncryptor.encryptPassword(foodUserData.getPassword());
	    foodUserData.setPassword(encodedPassword);
	    foodUserRepo.save(foodUserData);
	    return "add success";
	}

	
	
	public FoodUserData validateUSerByEmailAndByPassword(String email, String password) throws UserPrincipalNotFoundException {
	    StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();
	   // String encodedPassword = passwordEncryptor.encryptPassword(password);
	    FoodUserData resultdata = new FoodUserData();
	    List<FoodUserData> foodUserData = foodUserRepo.findAll();
	    for (FoodUserData data : foodUserData) {
	        if (passwordEncryptor.checkPassword(password, data.getPassword()) && data.getEmail().equalsIgnoreCase(email)) {
	            //.setPassword(password);
	            resultdata = data;
	        } else {
	            throw new UserPrincipalNotFoundException("User Not Found!...");
	        }
	    }
	    return resultdata;
	}
	

	public String getDeleteUser(String username) {
		
		foodUserRepo.deleteUserByUsername(username);
		return "delete success";
	}

}
