package com.example.demo.controller;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.demo.model.FoodUserData;
import com.example.demo.repo.FoodUserDataRepo;
import com.example.demo.service.FoodUserDataService;

import jakarta.el.ELException;

@RestController
@CrossOrigin("http://localhost:3000")
public class FoodUserController {

	@Autowired
	private FoodUserDataService foodUserDataService;

	@Autowired
	private FoodUserDataRepo foodUserDataRepo;

	
	@GetMapping("/fetchAll")
	public List<FoodUserData> getAll()
	{
		return foodUserDataRepo.findAll();
	}

	@PostMapping("/addUser")
	public String addUserDetails(@RequestBody FoodUserData foodUserData) {

		return foodUserDataService.addUser(foodUserData);
	}

	@PostMapping("/validateUser")
	public com.example.demo.model.FoodUserData getUserDetails(@RequestBody FoodUserData foodUserData) throws UserPrincipalNotFoundException {
	
		return foodUserDataService.validateUSerByEmailAndByPassword(foodUserData.getEmail(), foodUserData.getPassword());
	}

}
