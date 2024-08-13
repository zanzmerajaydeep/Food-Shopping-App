package com.example.demo.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.apache.tomcat.util.http.parser.MediaType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.demo.model.FoodUserData;
import com.example.demo.repo.FoodUserDataRepo;
import com.example.demo.service.FoodUserDataService;
import com.fasterxml.jackson.databind.ObjectMapper;

class FoodUserDataControllerTest {
	
    @InjectMocks
	private FoodUserController foodUserController;
	
	@Mock
	private FoodUserDataService foodUserDataService;
	
	@Mock
	private FoodUserDataRepo foodUserDataRepo;
	
	private FoodUserData FoodUserData;
	
	//imp
	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}
	
	private MockMvc mockMvc;


	//test for addUserDetails Controller method
    @Test
	public void testAddUserDetails() throws Exception {
		// Create a FoodUserData object for testing
		FoodUserData foodUserData = new FoodUserData("jaydeep", "5348");
		
		// Configure the behavior of the foodUserDataService mock
		Mockito.when(foodUserDataService.addUser(Mockito.any(FoodUserData.class))).thenReturn("add success");
		
		// Initialize the MockMvc instance
		mockMvc = MockMvcBuilders.standaloneSetup(foodUserController).build();
		
		// Perform the POST request and assert the response
		mockMvc.perform(post("/addUser")
				.contentType(org.springframework.http.MediaType.APPLICATION_JSON)
				.content(asJsonString(foodUserData)))
				.andExpect(status().isOk())
				.andExpect(content().string("add success"));
	}
    
    
  //test for test GetUserDetails method Controller method
	@Test
	public void testGetUserDetails() throws Exception {
		// Create a list of FoodUserData objects for testing
		List<FoodUserData> foodUserDataList = List.of(
				new FoodUserData("user1", "password1"),
				new FoodUserData("user2", "password2"),
				new FoodUserData("user3", "password3")
		);
		
		// Configure the behavior of the foodUserDataService mock
		Mockito.when(foodUserDataService.getAllUser()).thenReturn(foodUserDataList);
		
		// Initialize the MockMvc instance
		mockMvc = MockMvcBuilders.standaloneSetup(foodUserController).build();
		
		// Perform the GET request and assert the response
		mockMvc.perform(get("/fetch"))
				.andExpect(status().isOk())
				.andExpect(content().json(asJsonString(foodUserDataList)));
	}
	
	public static String asJsonString(Object object) {
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        return objectMapper.writeValueAsString(object);
	    } catch (Exception e) {
	        throw new RuntimeException(e);
	    }
	}
}
