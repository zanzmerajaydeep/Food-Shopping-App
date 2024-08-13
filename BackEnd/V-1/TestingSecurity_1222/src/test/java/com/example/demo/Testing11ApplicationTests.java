package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import com.example.demo.model.UserData;
import com.example.demo.repo.UserDataRepo;
import com.example.demo.service.UserDataService;
import com.mongodb.connection.Stream;

@SpringBootTest(classes = Testing11Application.class)
class Testing11ApplicationTests {
	
	@Test
	void contextLoads() {
	}

//	
//	@Autowired
//	private UserDataService foodUserDataService;
//	
//	@InjectMocks
//	private UserDataRepo foodUserDataRepo;
//	
//	@Test
//	public void getUserTest()
//	{
//		when(foodUserDataRepo.findAll()).thenReturn(java.util.stream.Stream
//				.of(new UserData("jay","53")).collect(Collectors.toList()));
//		assertEquals(1, foodUserDataService.getAllUser().size());
//		
//	}
	
	

	
}
