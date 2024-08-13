package com.payment.razorpay.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.payment.razorpay.service.PaymentModuleService;
import com.razorpay.RazorpayException;

@RestController
@CrossOrigin("http://localhost:3000")
public class PaymentController {
	
	 @Autowired
     PaymentModuleService paymentModuleService;
	
	 @PostMapping("/createorder")
	    public ResponseEntity<String> createOrder(@RequestBody Map<String, Object> requestData) {
		 System.out.println(requestData+"controller call");
	        try {
	            String orderResponse = paymentModuleService.createOrder(requestData);
	            return new ResponseEntity<>(orderResponse, HttpStatus.OK);
	        } catch (RazorpayException e) {
	            return new ResponseEntity<>("Error creating order: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
}
