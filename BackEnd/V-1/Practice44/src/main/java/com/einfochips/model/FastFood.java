package com.einfochips.model;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="FastFood")
public class FastFood {
	
	@Id
	private String id;
	
//	@NotNull
//	@Size(min = 6, max = 20)
	private String foodName;
	private String foodCategory;
	private String hotelName;
	private String description;
	private long price;
	private String image;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFoodName() {
		return foodName;
	}
	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}
	public String getFoodCategory() {
		return foodCategory;
	}
	public void setFoodCategory(String foodCategory) {
		this.foodCategory = foodCategory;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public long getPrice() {
		return price;
	}
	public void setPrice(long price) {
		this.price = price;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public FastFood() {
		super();
	}
	public FastFood(String id, String foodName, String foodCategory, String hotelName, String description, long price,
			String image) {
		super();
		this.id = id;
		this.foodName = foodName;
		this.foodCategory = foodCategory;
		this.hotelName = hotelName;
		this.description = description;
		this.price = price;
		this.image = image;
	}
	public FastFood(String foodName, String foodCategory, String hotelName, String description, long price,
			String image) {
		super();
		this.foodName = foodName;
		this.foodCategory = foodCategory;
		this.hotelName = hotelName;
		this.description = description;
		this.price = price;
		this.image = image;
	}
	
	
	
	

}
