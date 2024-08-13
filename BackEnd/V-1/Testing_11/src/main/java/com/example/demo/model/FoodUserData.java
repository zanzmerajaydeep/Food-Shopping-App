package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class FoodUserData {

	@Id
	private String id;
	private String username;

	@Indexed(unique = true)
	private String email;

	@Indexed(unique = true)
	private String password;
	private String role;

	@Override
	public String toString() {
		return "FoodUserData [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", role=" + role + "]";
	}

	public FoodUserData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FoodUserData(String username, String email, String password, String role) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public FoodUserData(String id, String username, String email, String password, String role) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public FoodUserData(String string, String string2) {
		// TODO Auto-generated constructor stub
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}



//@Null
//private String nullProperty; // Valid if null
//
//@NotNull
//private String notNullProperty; // Invalid if null
//
//@NotBlank
//private String notBlankProperty; // Invalid if null or blank
//
//@NotEmpty
//private List<String> notEmptyList; // Invalid if null or empty
//
//@Size(min = 2, max = 10)
//private String sizeLimitedProperty; // Invalid if length is less than 2 or greater than 10
//
//@Min(18)
//private int minValue; // Invalid if less than 18
//
//@Max(100)
//private int maxValue; // Invalid if greater than 100
//
//@Email
//private String email; // Invalid if not a valid email address
//
//@Pattern(regexp = "\\d{3}-\\d{3}-\\d{4}")
//private String phone; // Invalid if not in the format XXX-XXX-XXXX
//
//@Digits(integer = 5, fraction = 2)
//private BigDecimal decimalNumber; // Invalid if not a decimal number with 5 integer and 2 fractional digits
//
//@Range(min = 1, max = 100)
//private int rangeLimitedProperty; // Invalid if not within the range 1-100
//
//@AssertTrue
//private boolean flag; // Invalid if false
//
//@AssertFalse
//private boolean oppositeFlag; // Invalid if true

// Constructors, getters, and setters
