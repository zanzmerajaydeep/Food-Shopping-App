package com.einfochips.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.einfochips.model.FastFood;
import com.einfochips.repo.FoodRepository;

@Service
public class FoodService {
	
	@Autowired
	FoodRepository foodRepository;
	
	public String insertFoodDetails(FastFood fastFood)
	{
		foodRepository.save(fastFood);
		return "inserted food details.... ";
	}
	
	public List<FastFood> fetchFoodDetails()
	{
		return foodRepository.findAll();
	}

}
