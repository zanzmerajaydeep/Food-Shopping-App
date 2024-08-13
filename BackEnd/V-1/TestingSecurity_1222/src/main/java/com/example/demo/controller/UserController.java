package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import com.example.demo.model.UserData;
import com.example.demo.model.LoginRequest;
import com.example.demo.repo.UserDataRepo;
import com.example.demo.service.UserDataService;

import jakarta.el.ELException;
import jakarta.validation.Valid;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

	@Autowired
	private UserDataService userDataService;

	@Autowired
	private UserDataRepo userDataRepo;

	private UserData UserData;

	@GetMapping("/welcome")
	public String getTest()
	{
		return "workingg..........";
	}
	
	@GetMapping("/fetchAll")
	public List<UserData> getAll()
	{
		return userDataRepo.findAll();
	}
	
	@PostMapping("/adduserDetails")
	public ResponseEntity<String> addRegisterUserDetails(@Valid @RequestBody UserData userData, BindingResult bindingResult) {
	    // Check if the email is already registered
	    if (userDataRepo.existsByEmail(userData.getEmail())) {
	        String errorMessage = "Email is already registered.";
	        return ResponseEntity.badRequest().body(errorMessage);
	    }

	    // Validate request payload
	    if (bindingResult.hasErrors()) {
	        StringBuilder errorMessage = new StringBuilder();
	        for (FieldError error : bindingResult.getFieldErrors()) {
	            errorMessage.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("; ");
	        }
	        return ResponseEntity.badRequest().body("Validation errors: " + errorMessage.toString());
	    }

	    // Save the user data
	    String result = userDataService.addUser(userData);
	    return ResponseEntity.ok(result);
	}





	@PostMapping("/validateUser")
	public ResponseEntity<?> getUserDetails(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        // Return validation error messages
	        StringBuilder errorMessage = new StringBuilder();
	        for (FieldError error : bindingResult.getFieldErrors()) {
	            errorMessage.append(error.getField()).append(": ").append(error.getDefaultMessage()).append("; ");
	        }
	        return ResponseEntity.badRequest().body("Validation errors: " + errorMessage.toString());
	    }

	    try {
	        UserData resultData = userDataService.getUserDetailsByEmailAndByPassword(loginRequest.getEmail(), loginRequest.getPassword());
	        return ResponseEntity.ok(resultData);
	    } catch (UsernameNotFoundException e) {
	        // Return error message for user not found or invalid password
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}


}
