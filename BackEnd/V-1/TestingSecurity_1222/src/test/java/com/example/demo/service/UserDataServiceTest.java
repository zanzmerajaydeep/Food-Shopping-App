package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.jasypt.util.password.StrongPasswordEncryptor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import com.example.demo.model.UserData;
import com.example.demo.repo.UserDataRepo;

class UserDataServiceTest {

	@InjectMocks
	private UserDataService userDataService;

	@Mock
	private UserDataRepo userDataRepo;

	private StrongPasswordEncryptor passwordEncryptor = new StrongPasswordEncryptor();

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void addUser_success() {
	    UserData userData = new UserData("jaydeep", "test@example.com", "password", "role");

	    String encodedPassword = "encodedPassword"; 

	   // when(passwordEncryptor.encryptPassword(userData.getPassword())).thenReturn(encodedPassword); // Update the mock method

	    String expectedResult = "add success";
	    when(userDataRepo.save(userData)).thenReturn(userData);
	    when(userDataRepo.findAll()).thenReturn(Collections.singletonList(userData)); 

	    String result = userDataService.addUser(userData);

	    assertEquals(expectedResult, result);
	    verify(userDataRepo).save(userData);
	    assertEquals(encodedPassword, userData.getPassword());
	}




	@Test
	public void getUserDetailsByEmailAndByPassword_validCredentials() {
		String email = "test@example.com";
		String password = "password";

		String encodedPassword = passwordEncryptor.encryptPassword(password);

		UserData userData = new UserData("jaydeep", email, encodedPassword, "role");

		List<UserData> userDataList = new ArrayList<>();
		userDataList.add(userData);

		when(userDataRepo.findAll()).thenReturn(userDataList);

		UserData result = userDataService.getUserDetailsByEmailAndByPassword(email, password);

		assertEquals(userData, result);
	}

	@Test
	public void getUserDetailsByEmailAndByPassword_invalidCredentials() {
		String email = "test@example.com";
		String password = "password";

		String encodedPassword = passwordEncryptor.encryptPassword("wrongpassword");

		UserData userData = new UserData("jaydeep", email, encodedPassword, "role");

		List<UserData> userDataList = new ArrayList();
		userDataList.add(userData);

		when(userDataRepo.findAll()).thenReturn(userDataList);

		assertThrows(UsernameNotFoundException.class,
				() -> userDataService.getUserDetailsByEmailAndByPassword(email, password));
	}

	@Test
	public void getUserDetailsByEmailAndByPassword_userNotFound() {
		String email = "test@example.com";
		String password = "password";

		List<UserData> userDataList = new ArrayList<>();

		when(userDataRepo.findAll()).thenReturn(userDataList);

		assertThrows(UsernameNotFoundException.class,
				() -> userDataService.getUserDetailsByEmailAndByPassword(email, password));
	}

}
