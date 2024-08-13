package com.einfochips.controller;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PracticeController {
	
	@GetMapping("/reservationTest")
	public String getDate(@RequestParam String fromDate,@RequestParam String toDate)
	{
		String msg="fromDate : "+fromDate+" n/  toDate : "+toDate+"";
		System.out.println(msg);
		
		
		  LocalDate date1 = LocalDate.now(); // First date
	       LocalDate date2 = LocalDate.now().plusDays(1); // Second date
		
		int compare =date1.compareTo(date2);
		if(compare <0)
		{
			System.out.println("is less then ");
		}else if (compare >0)
		{
			System.out.println("is greater then ");
			
		}else
		{
			System.out.println("is equals!!");
		}
		return msg;
		
		
	}
	
	
	
	
	
	

}
