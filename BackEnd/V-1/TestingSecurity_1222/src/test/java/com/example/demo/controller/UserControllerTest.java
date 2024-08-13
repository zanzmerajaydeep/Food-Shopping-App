package com.example.demo.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.MapBindingResult;

import com.example.demo.model.LoginRequest;
import com.example.demo.model.UserData;
import com.example.demo.repo.UserDataRepo;
import com.example.demo.service.UserDataService;

class UserControllerTest {

	 @InjectMocks
	    private UserController userController;

	    @Mock
	    private UserDataRepo userDataRepo;

	    @Mock
	    private UserDataService userDataService;

	    @Mock
	    private PasswordEncoder passwordEncoder;

	    @Mock
	    private BindingResult bindingResult;

	    @BeforeEach
	    public void setup() {
	        MockitoAnnotations.openMocks(this);
	    }

	    @Test
	    public void addRegisterUserDetails_validData() {
	        UserData userData = new UserData("jaydeep", "test@example.com", "password", "role");

	        when(userDataRepo.existsByEmail(userData.getEmail())).thenReturn(false);
	        when(bindingResult.hasErrors()).thenReturn(false);
	        when(userDataService.addUser(userData)).thenReturn("add success");

	        ResponseEntity<String> response = userController.addRegisterUserDetails(userData, bindingResult);

	        assertEquals(HttpStatus.OK, response.getStatusCode());
	        assertEquals("add success", response.getBody());
	        verify(userDataService).addUser(userData);
	    }

	    @Test
	    public void addRegisterUserDetails_existingEmail() {
	        UserData userData = new UserData("jaydeep", "test@example.com", "password", "role");

	        when(userDataRepo.existsByEmail(userData.getEmail())).thenReturn(true);

	        ResponseEntity<String> response = userController.addRegisterUserDetails(userData, bindingResult);

	        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	        assertEquals("Email is already registered.", response.getBody());
	        verify(userDataRepo).existsByEmail(userData.getEmail());
	    }
	    
	    @Test
	    public void addRegisterUserDetails_validationErrors() {
	        UserData userData = new UserData();

	        bindingResult = new MapBindingResult(Collections.emptyMap(), "userData"); // Initialize bindingResult

	        bindingResult.addError(new FieldError("userData", "username", "Username is required."));

	        ResponseEntity<String> response = userController.addRegisterUserDetails(userData, bindingResult);

	        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	        assertTrue(response.getBody().contains("Validation errors"));
	        assertTrue(response.getBody().contains("username: Username is required."));
	        assertTrue(bindingResult.hasErrors()); // Verify hasErrors() on bindingResult
	    }




	    @Test
	    public void getUserDetails_validCredentials() {
	        LoginRequest loginRequest = new LoginRequest("test@example.com", "password");

	        UserData userData = new UserData("jaydeep", "test@example.com", "encodedPassword", "role");

	        when(userDataService.getUserDetailsByEmailAndByPassword(loginRequest.getEmail(), loginRequest.getPassword()))
	                .thenReturn(userData);

	        ResponseEntity<?> response = userController.getUserDetails(loginRequest, bindingResult);

	        assertEquals(HttpStatus.OK, response.getStatusCode());
	        assertEquals(userData, response.getBody());
	        verify(userDataService).getUserDetailsByEmailAndByPassword(loginRequest.getEmail(), loginRequest.getPassword());
	    }

	    @Test
	    public void getUserDetails_invalidCredentials() {
	        LoginRequest loginRequest = new LoginRequest("test@example.com", "password");

	        when(userDataService.getUserDetailsByEmailAndByPassword(loginRequest.getEmail(), loginRequest.getPassword()))
	                .thenThrow(new UsernameNotFoundException("User not found"));

	        ResponseEntity<?> response = userController.getUserDetails(loginRequest, bindingResult);

	        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	        assertTrue(response.getBody().toString().contains("User not found"));
	        verify(userDataService).getUserDetailsByEmailAndByPassword(loginRequest.getEmail(), loginRequest.getPassword());
	    }


	    @Test
	    public void getUserDetails_validationErrors() {
	        LoginRequest loginRequest = new LoginRequest();

	        FieldError fieldError = new FieldError("loginRequest", "email", "Email is required.");
	        when(bindingResult.hasErrors()).thenReturn(true);
	        when(bindingResult.getFieldErrors()).thenReturn(Collections.singletonList(fieldError));

	        ResponseEntity<?> response = userController.getUserDetails(loginRequest, bindingResult);

	        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	        assertTrue(response.getBody().toString().contains("Validation errors"));
	        assertTrue(response.getBody().toString().contains("email: Email is required."));
	        verify(bindingResult).hasErrors();
	        verify(bindingResult).getFieldErrors();
	    }
}
