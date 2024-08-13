package com.example.demo.service;

import java.util.List;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.example.demo.model.UserData;
import com.example.demo.repo.UserDataRepo;


@Service
public class UserDataService {
	
	@Autowired
	private UserDataRepo foodUserRepo;
	
	
	 private StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();

	public List<UserData> getAllUser() {
		return foodUserRepo.findAll();
	}

	public UserData getUserByName(String username) {
		return foodUserRepo.findUserByUsername(username);
	}

	public String addUser(UserData userData) {
		    String encodedPassword = passwordEncryptor.encryptPassword(userData.getPassword());
		    userData.setPassword(encodedPassword);
		    foodUserRepo.save(userData);
		    return "add success";
	}

	public String getDeleteUser(String username) {
		foodUserRepo.deleteUserByUsername(username);
		return "delete success";
	}
	public UserData getUserDetailsByEmailAndByPassword(String email, String password) throws UsernameNotFoundException {
	    List<UserData> foodUserDataList = foodUserRepo.findAll();

	    for (UserData data : foodUserDataList) {
	        if (data.getEmail().equals(email)) {
	            if (passwordEncryptor.checkPassword(password, data.getPassword())) {
	                // Return the matched user details
	                return data;
	            } else {
	                // Password does not match
	                throw new UsernameNotFoundException("Invalid password");
	            }
	        }
	    }

	    // No user found with the given email
	    throw new UsernameNotFoundException("User not found");
	}

	
	
//	public UserData getUserDetailsByEmailAndByPassword(String email ,String password)
//	{
//		UserData foodUserData=foodUserRepo.findFoodUserDataByEmailAndPassword(email, passwordEncoder.encode(password));
//		if(foodUserData == null)
//		{
//			throw new NullPointerException("User not Found!...");
//		}
//	    return foodUserData;
//	}


}
