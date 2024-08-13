package com.einfochips.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;

import com.einfochips.model.CartFastFood;
import com.einfochips.model.FastFood;
import com.einfochips.repo.FoodRepository;

@ExtendWith(MockitoExtension.class)
class FoodServiceTest {

	@InjectMocks 
	FoodService foodService;
	
	@Mock
	FoodRepository foodRepository ;
	
	@Mock 
	FastFood fastFood;
	
	@Test
	void addFood_success()
	{
		FastFood fastFood= new FastFood("1","dalm","fastFood","kathiyavadi","chapati",88,"123");
		Mockito.when(foodRepository.save(fastFood)).thenReturn(fastFood);
		
		String reasult=foodService.insertFoodDetails(fastFood);
		assertEquals("inserted food details.... ", reasult);
		
	}
	
	@Test 
	void fetchFooddetails_success(){
		//FastFood fastFood= new FastFood(new FastFood("1","dalm","fastFood","kathiyavadi","chapati",88,"123"));
		Mockito.when(foodRepository.findAll()).thenReturn(List.of(new FastFood("1","dal","fastFood","kathiyavadi","chapati",88,"123")));
		List<FastFood> result=foodService.fetchFoodDetails();
		String name ="dal";
		assertEquals(name, result.get(0).getFoodName());
	}

}
