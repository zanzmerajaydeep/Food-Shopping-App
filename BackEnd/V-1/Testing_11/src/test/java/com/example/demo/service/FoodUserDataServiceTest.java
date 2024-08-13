package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.example.demo.model.FoodUserData;
import com.example.demo.repo.FoodUserDataRepo;

@ExtendWith(MockitoExtension.class)
class FoodUserDataServiceTest {

	@InjectMocks
	private FoodUserDataService foodUserDataService;
	
	@Mock
	private FoodUserDataRepo foodUserDataRepo;
	
	private FoodUserData FoodUserData;

	@BeforeEach
	public void setup() {
		
	}

	@Test
	void getStudentById_success()
	{
	
		Mockito.when(foodUserDataRepo.findAll()).thenReturn(List.of(new FoodUserData("jaydeep","5348")));

		String userName = "jaydeep";
	
		List<FoodUserData> food1 = foodUserDataService.getAllUser();

		assertEquals(userName, food1.get(0).getUsername());
	}
	
	@Test
	void addStudent_success()
	{
	
		FoodUserData foodUserData = new FoodUserData("jaydeep", "5348");
	    
	    Mockito.when(foodUserDataRepo.save(foodUserData)).thenReturn(foodUserData);

	    String result = foodUserDataService.addUser(foodUserData);

	    assertEquals("add success", result);
	}
	
	@Test
	void getUserByName_success() {
	    String username = "jaydeep";
	    FoodUserData expectedUserData = new FoodUserData(username, "5348");
	    
	    Mockito.when(foodUserDataRepo.findUserByUsername(username)).thenReturn(expectedUserData);

	    FoodUserData result = foodUserDataService.getUserByName(username);

	    assertEquals(expectedUserData, result);
	}
	
	@Test
	void getDeleteUser_success() {
	    String username = "jaydeep";
	    
	    Mockito.doNothing().when(foodUserDataRepo).deleteUserByUsername(username);

	    String result = foodUserDataService.getDeleteUser(username);

	    assertEquals("delete success", result);
	}
	

}
