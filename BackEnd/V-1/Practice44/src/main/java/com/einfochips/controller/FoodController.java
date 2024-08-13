package com.einfochips.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.einfochips.model.CartFastFood;
import com.einfochips.model.FastFood;
import com.einfochips.repo.CartFastFoodRepository;
import com.einfochips.repo.FoodRepository;
import com.einfochips.service.FoodService;


@RestController
@CrossOrigin("http://localhost:3000")
public class FoodController {
	
	@Autowired
	FoodService foodService;
	
	@Autowired
	CartFastFoodRepository cartFastFoodRepository;
	
	@Autowired
	FoodRepository foodRepository;
	

	//method for insert Fast Food details.....
	@RequestMapping("/addFastFoodDetails")
	public String InsertFood(@RequestParam String id, MultipartFile image, String foodName,String foodCategory,String hotelName,
			 String description,long price) throws IOException
	{
		
		System.out.println("uploading");
		
		
		String fileString=Base64.getEncoder().encodeToString(image.getBytes());
		
		foodRepository.save(new FastFood(id,foodName,foodCategory,hotelName,description,price,fileString));
		System.out.println("image saved ");
		return "insert Food successfully....";
	}
	
	
	//method for Update Fast Food details.....
		@PostMapping("/updateFastFoodDetails")
	public String updateFood(@RequestParam String id , String foodName,String foodCategory,String hotelName,
				 String description,long price,MultipartFile image) throws IOException
	//	public String updateFood(@RequestBody FastFood fastFood) throws IOException
		{
			
//			System.out.println(foodName);
//			System.out.println("calll");
			String fileString=Base64.getEncoder().encodeToString(image.getBytes());
			
			
			//fastFood.setImage(Base64.getEncoder().encodeToString(fastFood.getImage().getBytes()));
			
			foodRepository.save(new FastFood(id,foodName,foodCategory,hotelName,description,price,fileString));
			
			return "update sussccefully Food successfully....";
		}
	
	
	//method for add FastFood item in to cart
	@RequestMapping("/addCartFastFoodDetails")
	public String InsertCartFood(@RequestParam String image, String foodName,String foodCategory,String hotelName,
			 String description,long price) throws IOException
	{
		
		System.out.println("uploading");
		
		
		//String fileString=Base64.getEncoder().encodeToString(image.getBytes());
		
		cartFastFoodRepository.save(new CartFastFood(foodName,foodCategory,hotelName,description,price,image));
		//System.out.println("image saved ");
		return "insert CartFood successfully....";
	}
	
	//method for get All FastFood data 
	@GetMapping("/getFastFoodDeatils")
	public List<FastFood> getFoodDetails()
	{
		return foodService.fetchFoodDetails();		
		
	}
	
	//methid for get FastFood By ID
	@GetMapping("/getFastFoodDeatilsById")
	public Optional<FastFood> getFoodDetailsById(@RequestParam("id") String id)
	{
		return foodRepository.findById(id);	
		
		
	}
	
	   //==========methid for get FastFood By Food Name search=====================================================
		@GetMapping("/getFastFoodDeatilsBySearch")
		public List<FastFood> getFoodDetailsBySearch(@RequestParam("searchFoodName") String searchFoodName)
		{
			List<FastFood> foodlist =foodService.fetchFoodDetails();
			List<FastFood> newFAstFood= new ArrayList<FastFood>();
			
				for(FastFood f :foodlist)
				{
					if(f.getFoodName().toLowerCase().startsWith(searchFoodName.toLowerCase())  && searchFoodName != "")
					{
						newFAstFood.add(f);
					}
					
				}
			
				return newFAstFood;
			
		}
	
	@GetMapping("/getFastFoodIDDeatils")
	public List<String> getFoodDetails2()
	{
		 foodService.fetchFoodDetails();	
		 
		 List<FastFood> documents = foodRepository.findAll();
	        List<String> documentIds = new ArrayList<>();
	        for (FastFood document : documents) {
	            String id = document.getId();
	            documentIds.add(id);
	        }
	        
	        return documentIds;
	
	}

	@GetMapping("deleteFastFoodByID")
	public String deleteFastFoodById(@RequestParam("id") String id)
	{
		foodRepository.deleteById(id);
		return "With this ID : "+id+" item delete succesfully";
		
	}

}
